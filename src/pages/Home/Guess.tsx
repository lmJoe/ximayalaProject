import React from 'react';
import {View,Text, FlatList,StyleSheet,Image} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import { RootState } from '@/models/index';
const mapStateToProps = ({home}:RootState) => {
    return {
        guess:home.guess,//从home的model中取得guess
    }
}
/**声明一个变量 */
const connector = connect(mapStateToProps);
//获取从connector中返回的值
type ModelsState = ConnectedProps<typeof connector>;
class Guess extends React.Component<ModelsState>{
    componentDidMount() {
        this.fetch();
    }
    fetch = () => {
        const {dispatch} = this.props;
        dispatch({
            type:'home/fetchGuess',
        });//dispatch刷新action中类型为type的数据值
    }
    _renderItem = ({item}) => {

        return (
            <View style={styles.container}>
                <Image 
                    source={{uri:item.image}} 
                    style={styles.image}/>
                <Text 
                    numberOfLines={2} //显示几行的数量
                >{item.title}</Text>
            </View>
        )
    }
    render(){
        const {guess} = this.props; 
        return (
            <View style={styles.container}>
                <FlatList 
                    data = {guess}
                    renderItem = {this._renderItem}
                    numColumns = {3}
                />
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
    }
})
export default connector(Guess);