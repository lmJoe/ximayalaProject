import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';
const Tab = createMaterialTopTabNavigator();
class HomeTabs extends React.Component{
    render(){
        return (
            <Tab.Navigator
                /**懒加载 */
                lazy={true}
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
            >
                <Tab.Screen name="Home" component={Home} options={{tabBarLabel:'推荐'}}/>
            </Tab.Navigator>
        )
    }
}
export default HomeTabs;