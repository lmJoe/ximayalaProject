import React from 'react';
import { MaterialTopTabBarProps,MaterialTopTabBar } from '@react-navigation/material-top-tabs';
import { View,Text } from 'react-native';
import Touchable from '@/components/Touchable';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import { StyleSheet } from 'react-native';
/**定义一个接收从父组件HomeTabs传递参数过来的接口 */
interface IProps extends MaterialTopTabBarProps{

}
/**将IProps作为TopTabBarWrapper的泛型传入 */
class TopTabBarWrapper extends React.Component<IProps>{
    render() {
        const {props} = this;
        return (
            <View style={styles.container}>
                <View style={styles.topTabBarView}>
                    <MaterialTopTabBar {...props} style={styles.tabbar} />
                    <Touchable style={styles.categoryBtn}>
                        <Text>分类</Text>
                    </Touchable>
                </View>
                <View style={styles.bottom}>
                    <Touchable style={styles.searchBtn}>
                        <Text>搜索按钮</Text>
                    </Touchable>
                    <Touchable style={styles.historyBtn}>
                        <Text>历史记录</Text>
                    </Touchable>
                </View>
            </View>
  
        )
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        paddingTop:getStatusBarHeight(),//getStatusBarHeight获取ios端状态栏的高度
    },
    topTabBarView:{
        flexDirection:'row',
        alignItems:'center',
    },
    tabbar:{
        flex:1,
        elevation:0,//投影
        overflow:'hidden',
        backgroundColor:'transparent',
    },
    categoryBtn:{
        paddingHorizontal:10,//水平内边距
        borderWidth:StyleSheet.hairlineWidth,
        borderLeftColor:'#ccc',
    },
    bottom:{
        flexDirection:'row',
        paddingVertical:7,//垂直内边距
        paddingHorizontal:15,//水平方向内边距
        alignItems:'center',
    },
    searchBtn:{
        flex:1,
        paddingLeft:12,
        height:30,
        justifyContent:'center',
        borderRadius:15,
        backgroundColor:'rgba(0,0,0,0.1)',
    },
    historyBtn:{
        marginLeft:24,
    }
})
export default TopTabBarWrapper;