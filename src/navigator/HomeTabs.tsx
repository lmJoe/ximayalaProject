import React from 'react';
import {createMaterialTopTabNavigator, MaterialTopTabBar,MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';
import TopTabBarWrapper from '@/pages/views/TopTabBarWrapper';
import { StyleSheet } from 'react-native';



const Tab = createMaterialTopTabNavigator();
class HomeTabs extends React.Component{
    renderTabBar = (props:MaterialTopTabBarProps) => {
        //自定义的顶部标签栏
        //将props中的每一项都作为MaterialTopTabBar组件的属性传入
        return <TopTabBarWrapper {...props}/>
    }
    render(){
        return (
            <Tab.Navigator
                /**懒加载 */
                lazy={true}
                tabBar={this.renderTabBar} //自定义一个顶部标签，可以接收一个函数返回一个组件
                sceneContainerStyle={styles.sceneContainerStyle}
                tabBarOptions={{
                    scrollEnabled:true,//滚动设置
                    tabStyle:{
                        width:80,
                    },
                    indicatorStyle:{
                        height:4,
                        width:20,
                        marginLeft:30,
                        borderRadius:2,
                        backgroundColor:'#f86442',
                    },
                    /**选中样式 */
                    activeTintColor:'#f86442',
                    inactiveTintColor:'#333',
                }}
                screenOptions={{
                    tabBarStyle:{
                        flex: 1,
                        elevation: 0,
                        overflow: 'hidden',
                        backgroundColor: 'transparent', 
                    }
                }}
            >
                <Tab.Screen name="Home" component={Home} options={{tabBarLabel:'推荐'}}/>
            </Tab.Navigator>
        )
    }
}
const styles = StyleSheet.create({
    sceneContainerStyle:{
        backgroundColor:'transparent',
    },
})
export default HomeTabs;