import React from 'react';
import { View,FlatList, ListRenderItemInfo,Text, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { RootStackNavigation } from '../../navigator';
/**使用connect获取到models文件中home文件中定义的num */
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import WCarousel, { slidheight } from './Carousel';
import Guess from './Guess';
import ChannelItem from './ChannelItem';
import { IChannel, IGuess } from '@/models/home';
import { HomeParamList } from '@/navigator/HomeTabs';
import { RouteProp } from '@react-navigation/native';

/**
 * connect本身是一个函数，可以接收一个函数，同时也返回一个函数，用来帮我们
 * 把models文件夹home文件中定义的state映射到当前组件中，使用mapStateToProps参数
 * 该参数就是一个函数
 */
/**connect函数会将整个dva的仓库作为参数传递到mapStateToProps函数中 
 * connect函数获取dva仓库来源是通过在index.tsx文件中使用Provider组件
 * Provider组件通过store属性，这个store就是通过dva创建的仓库
 * 通过react中的connect可以让处于Provider组件里面的任何一个层级的子组件都能够
 * 拿到store,所以从home组件中可以拿到仓库，所以connect就能知道store里面的state属性
 * state类型就是在models里index中定义的RootState的类别
*/
const mapStateToProps = (state:RootState,{route}:{route:RouteProp<HomeParamList,string>}) =>{
    const {namespace} = route.params;
        //根据namespace获取对应的model
    const modelState = state[namespace];
    return {
        namespace,
        carousels:modelState.carousels,//carousels为models文件夹中home中的carousels值即获取到轮播列表的数组
        channels:modelState.channels,//channels为models文件中home中的channels值即获取到首页列表的数组
        hasMore:modelState.pagination.hasMore,//hasMore为models文件中home中的hasMore即是否需要上拉加载判断值
        gradientVisible:modelState.gradientVisible,//获取从models文件中home中存储的gradientVisible值，并在当前界面进行业务操作
        loading:state.loading.effects[namespace+'/fetchChannels'],//次数的effects为models文件夹中home文件的effects对象里所有定义的方法
    }
    
}

const connector = connect(mapStateToProps);
/**通过ConnectProps方法得到导入对象的类型 */

type modelState = ConnectedProps<typeof connector>
/**
 * IProps为给this.props定义一个类型
 * navigation为导航器传递过来的一个参数
 */
interface IProps extends modelState{
    navigation:RootStackNavigation,
}
/**声明一个接收参数的接口 */
interface IState{
    refreshing:boolean;
}
class Home extends React.Component<IProps,IState>{
    state = {
        refreshing:false,
    }
    //调用action出发接口请求，调用models文件夹中home文件的fetchCarousels方法
    componentDidMount(){
        const { dispatch,namespace } = this.props;
        dispatch({
            type:namespace+'/fetchCarousels',
        });
        dispatch({
            type:namespace+'/fetchChannels',
        })
    }
    //接收从IChannel子组件传递来一个类型为IChannel的参数data
    goAlbum = (data:IChannel | IGuess) => {
        const {navigation} = this.props;
        /**跳转并传递参数
         * item为传递的参数
         */
        navigation.navigate('Album',{item:data});
    }  
    /**
     * keyExtractor函数作用帮助ChannelItme组件生成一个不重复的key,
     * key的作用能够区分遍历出来的每一个channleItem组件，在刷新的时候就能确定变化的位置，
     * 减少重新渲染的性能消耗
     * 
     */
    keyExtractor = (item:IChannel) => {
        return item.id;
    }
    /**下拉刷新,在onRefresh中控制refreshing值
     * 首先在调用onRefresh时将refreshing状态改为true
     * 在数据传递过来后再将refreshing状态改为false
     */
    onRefresh = () => {
      //1.修改刷新状态为true
      this.setState({
        refreshing:true,
      })
      //2.获取数据
      const { dispatch,namespace } = this.props;
      dispatch({
          type:namespace+'/fetchChannels',
          callback:()=>{
            //3.修改刷新状态为false  
            this.setState({
                refreshing:false,
            })
          }
      })
      
    }
    /**
     * onEndReached 加载更多
     */
    onEndReached = () => {
        const { dispatch,loading,hasMore,namespace } = this.props;
        //如果当前状态为loading状态或hasMore为false
        if(loading || !hasMore) return;
        dispatch({
            type:namespace+'/fetchChannels',
            payload:{
                loadMore:true,
            }
        })
    }
    /**
     * renderItem可以接收一个参数，参数类型为ListRenderItemInfo
     * 并且要给这个参数传入一个泛型，如ListRenderItemInfo<IChannel>
     * 这个泛型定义的就是这个{item}:ListRenderItemInfo<IChannel>对象里面的一个属性item属性
     */
    _renderItem = ({item}:ListRenderItemInfo<IChannel>) => {
        /**由于channelItem组件中除了data 还接收了一个onPress组件
         * 因此次数除了传递data,还有一个onPress函数
         */
        return <ChannelItem data={item} onPress={this.goAlbum}/>
    }
    /**声明一个屏幕滚动函数
     * 这个函数设置类型为NativeSyntheticEvent 这样可以拿到原生事件
     */
    onScroll = ({nativeEvent}:NativeSyntheticEvent<NativeScrollEvent>) =>{
        //获取用户滚动的距离
        const offsetY = nativeEvent.contentOffset.y;
        //和轮播图高度进行比较
        let newGradientVisible = offsetY < slidheight;
        const {dispatch,gradientVisible,namespace} = this.props;
        //如果以前的渐变色显示状态和现在最新的显示状态不一致再调用
        if(gradientVisible !== newGradientVisible){
            dispatch({
                type:namespace+'/setState',
                payload:{
                    gradientVisible:newGradientVisible,//传递渐变色显示的状态
                }
            })
        }
        
    }
    /**使用get */
    get header(){
        const {namespace} = this.props;
        return (
            <View>
                <WCarousel />
                <View style={styles.background}>
                    <Guess namespace={namespace} goAlbum={this.goAlbum}/>
                </View>
                
            </View>
        )
    }
    get footer() {
        const {hasMore,loading,channels} = this.props;
        if(!hasMore){
            <View style={styles.end}>
                <Text>我是有底线的...</Text>
            </View>
        }
        if(loading&&hasMore&&channels.length>0){
            <View style={styles.loading}>
                <Text>正在加载中...</Text>
            </View>
        }
    }
    get empty(){
        const {loading} = this.props;
        if (loading) return;
        return (
            <View style={styles.empty}>
                <Text>暂无数据</Text>
            </View>
        )
    }
    render (){
        const {channels} = this.props;
        const {refreshing} = this.state;
        /**
         * this.props;在此处使用this.props可以获取从其他组件传过来的参数
         * ListHeaderComponent属性可以接收函数,class,组件
         */
        return (
            <FlatList 
                ListHeaderComponent={this.header}
                ListFooterComponent={this.footer} 
                ListEmptyComponent={this.empty}
                data={channels} 
                renderItem={this._renderItem}
                keyExtractor = {this.keyExtractor} //keyExtractor接收一个函数
                onRefresh = {this.onRefresh}//下拉刷新的属性
                refreshing={refreshing}
                onEndReached={this.onEndReached}//上拉到底部加载
                onEndReachedThreshold={0.2} //决定内容距离底部还有多少去执行
                onScroll={this.onScroll} //首页滚动的监听事件（此处用于滚动隐藏渐变色）
            />
        )
    }
}
const styles = StyleSheet.create({
    end:{
        alignItems:'center',
        paddingVertical:10,
    },
    loading:{
        alignItems:'center',
        paddingVertical:10,
    },
    empty:{
        alignItems:'center',
        paddingVertical:100,
    },
    background:{
        backgroundColor:'#fff',
    }
})
/**connector最终为一个函数，这个函数会接收一个Home组件的参数
 * connector(Home)最终返回了一个新的组件，帮我们把Home组件重新加工
 * 给Home组件的props属性注入了导出来的对象num,如：
 * const mapStateToProps = ({home}:RootState) =>({
    num:home.num,
    })
    所以可以从props得到num
 */
export default connector(Home);