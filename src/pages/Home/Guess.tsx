import React from 'react';
import {View,Text, FlatList,StyleSheet,Image, Alert} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import { RootState } from '@/models/index';
import { IGuess } from '@/models/home';
import Touchable from '@/components/Touchable';
import IconFont from '@/assets/iconfont';
const mapStateToProps = ({home}:RootState) => {
    return {
        guess:home.guess,//从home的model中取得guess
    }
}
/**声明一个变量 */
const connector = connect(mapStateToProps);
//获取从connector中返回的值
type ModelsState = ConnectedProps<typeof connector>;
interface IProps extends ModelsState {
    namespace:string;
}
class Guess extends React.Component<IProps>{
    componentDidMount() {
        this.fetch();
    }
    fetch = () => {
        const {dispatch,namespace} = this.props;
        dispatch({
            type:namespace+'/fetchGuess',
        });//dispatch刷新action中类型为type的数据值
    }
    _renderItem = ({item}:{item:IGuess}) => {

        return (
            <Touchable style={styles.item}
                onPressonPress={()=>{
                    alert('点击');
                }}
            >
                <Image 
                    source={{uri:item.image}} 
                    style={styles.image}/>
                <Text 
                    numberOfLines={2} //显示几行的数量
                >{item.title}</Text>
            </Touchable>
        )
    }
    render(){
        const {guess} = this.props; 
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerRight}>
                        <IconFont name="collection-records"/>
                        <Text style={styles.headerTitle}>猜你喜欢</Text>
                    </View>
                    <View style={styles.headerLeft}>
                        <Text style={styles.moreText}>更多</Text>
                        <IconFont name="right"/>
                    </View>
                </View>
                <FlatList 
                    style={styles.flatList}
                    data = {guess}
                    renderItem = {this._renderItem}
                    numColumns = {3}
                />
                <Touchable 
                    style={styles.changeGuess}
                    onPress={this.fetch}
                >
                    <IconFont name="refresh" color="red"/>
                    <Text style={styles.changeGuessText}>换一批</Text>
                </Touchable>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        borderRadius:8,
        margin:16,
    },
    item:{
        flex:1,
        marginHorizontal:10,
        marginVertical:6,
    },
    image:{
        width:100,
        height:100,
        borderRadius:8,
        marginBottom:10,
    },
    header:{
        flexDirection:'row',//布局排序方式
        justifyContent:'space-between',//主轴排列方式
        padding:15,
        borderBottomColor:'#efefef',
        borderBottomWidth:StyleSheet.hairlineWidth,//StyleSheet.hairlineWidth对不同机型的线条一致，已经过计算
    },
    headerRight:{
        flexDirection:'row',
        alignItems:'center',
    },
    headerTitle:{
        marginLeft:5,
        color:'#333',
    },
    headerLeft:{
        flexDirection:'row',
        alignItems:'center',
    },
    moreText:{
        marginRight:5,
        color:'#6F6F6F',
    },
    changeGuess:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        padding:10,
    },
    changeGuessText:{
        marginLeft:5,
    },
    flatList:{
        padding:10,
    }

})
export default connector(Guess);