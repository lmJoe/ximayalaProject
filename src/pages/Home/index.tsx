import React from 'react';
import { View,FlatList, ListRenderItemInfo } from 'react-native';
import { RootStackNavigation } from '../../navigator';
/**使用connect获取到models文件中home文件中定义的num */
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import WCarousel from './Carousel';
import Guess from './Guess';
import ChannelItem from './ChannelItem';
import { IChannel } from '@/models/home';

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
const mapStateToProps = ({home,loading}:RootState) =>{
    return {
        carousels:home.carousels,//carousels为models文件夹中home中的carousels值即获取到轮播列表的数组
        channels:home.channels,//channels为models文件中home中的channels值即获取到首页列表的数组
        loading:loading.effects['home/fetchCarousels'],//次数的effects为models文件夹中home文件的effects对象里所有定义的方法
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
class Home extends React.Component<IProps>{
    //调用action出发接口请求，调用models文件夹中home文件的fetchCarousels方法
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
            type:'home/fetchCarousels',
        });
        dispatch({
            type:'home/fetchChannels',
        })
    }
    //接收从IChannel子组件传递来一个类型为IChannel的参数data
    onPress = (data:IChannel) => {
        console.log('data值',data);
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
    /**
     * renderItem可以接收一个参数，参数类型为ListRenderItemInfo
     * 并且要给这个参数传入一个泛型，如ListRenderItemInfo<IChannel>
     * 这个泛型定义的就是这个{item}:ListRenderItemInfo<IChannel>对象里面的一个属性item属性
     */
    _renderItem = ({item}:ListRenderItemInfo<IChannel>) => {
        /**由于channelItem组件中除了data 还接收了一个onPress组件
         * 因此次数除了传递data,还有一个onPress函数
         */
        return <ChannelItem data={item} onPress={this.onPress}/>
    }
    /**使用get */
    get header(){
        const {carousels} = this.props;
        return (
            <View>
                <WCarousel data={carousels}/>
                <Guess />
            </View>
        )
    }
    
    render (){
        const {channels} = this.props;
        /**
         * this.props;在此处使用this.props可以获取从其他组件传过来的参数
         * ListHeaderComponent属性可以接收函数,class,组件
         */
        return (
            <FlatList 
                ListHeaderComponent={this.header} 
                data={channels} 
                renderItem={this._renderItem}
                keyExtractor = {this.keyExtractor} //keyExtractor接收一个函数
            />
        )
    }
}
/**connector最终为一个函数，这个函数会接收一个Home组件的参数
 * connector(Home)最终返回了一个新的组件，帮我们把Home组件重新加工
 * 给Home组件的props属性注入了导出来的对象num,如：
 * const mapStateToProps = ({home}:RootState) =>({
    num:home.num,
    })
    所以可以从props得到num
 */
export default connector(Home);