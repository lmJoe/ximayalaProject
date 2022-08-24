import React from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { IProgram } from '@/models/album';
import Touchable from '@/components/Touchable';
import IconFont from '@/assets/iconfont';
/**
 * 接收父组件文件传递过来的参数的类型
 */
interface IProps{
    data:IProgram;
    index:number;
    onPress:(data:IProgram) => void;//返回值void 入参类型为IProgram
}
class Item extends React.Component<IProps>{
    onPress = () => {
        const {onPress,data} = this.props;
        if(typeof onPress==='function'){
            onPress(data)
        }
    }
    render() {
        const {data,index} = this.props;
        return (
            <Touchable style={styles.item} onPress={this.onPress}>
                <Text style={styles.serial}>{index+1}</Text>
                <View style={styles.container}>
                    <Text style={styles.title}>{data.title}</Text>
                    <View style={styles.info}>
                        <View style={styles.IconView}>
                            <IconFont name="headset" size={14}/>
                            <Text style={styles.iconText}>{data.playVolume}</Text>
                        </View>
                        <View style={styles.IconView}>
                            <IconFont name="time" size={14}/>
                            <Text style={styles.iconText}>{data.duration}</Text>
                        </View>
                        
                        
                    </View>
                </View>
                <Text style={styles.date}>{data.date}</Text>
            </Touchable>
            
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:25,
    },
    item:{
        flexDirection:'row',
        padding:20,
        borderBottomColor:'#e3e3e3',
        borderBottomWidth:StyleSheet.hairlineWidth,//一般的宽度
        justifyContent:'center',
        alignItems:'center',
    },
    serial:{
        fontSize:14,
        color:'#838383',
        fontWeight:'800',
    },
    title:{
        fontWeight:'500',
        marginBottom:15,
    },
    info:{
        flexDirection:'row',
    },
    IconView:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:10,
    },
    iconText:{
        marginHorizontal:5,
        color:'#939393',
    },
    date:{
        color:'#939393',
    }
})
export default Item;