import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import {IChannel} from '@/models/home';
import IconFont from '@/assets/iconfont';
/**声明一个接收参数的入口 */
interface IProps{
    data:IChannel;
}
class ChannelItem extends React.Component<IProps>{
    render () {
        const { data } = this.props;
        return (
            <View style={styles.container}>
                <Image 
                    source={{uri:data.image}}
                    style={styles.image}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
                    <Text style={styles.remark} numberOfLines={2}>{data.remark}</Text>
                    <View style={styles.bottom}>
                        <View style={styles.playdView}>
                            <IconFont name="icon-v" size={14}/>
                            <Text style={styles.number}>{data.played}</Text>
                        </View>
                        <View style={styles.playingView}>
                            <IconFont name="icon-shengying" size={14}/>
                            <Text style={styles.number}>{data.playing}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        margin:10,
        padding:10,
        borderRadius:8,
        backgroundColor:'#fff',
        shadowColor:'#ccc',
        shadowOffset:{
            width:0,
            height:5,
        },
        shadowOpacity:0.5,
        shadowRadius:10,
        // elevation:5,//安卓的投影效果
    },
    image:{
        width:100,
        heighty:100,
        borderRadius:8,
        marginRight:10,
        backgroundColor:'#dedede',
    },
    rightContainer:{
        flex:1,
        justifyContent:'space-around',
    },
    title:{
        fontSize:16,
        marginBottom:10,
    },
    remark:{
        backgroundColor:'#f8f8f8',
        padding:5,
        marginBottom:5,
    },
    bottom:{
        flexDirection:'row',
    },
    playdView:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:20,
    },
    playingView:{
        flexDirection:'row',
        alignItems:'center',
    },
    number:{
        marginLeft:5,
    }
})
export default ChannelItem;