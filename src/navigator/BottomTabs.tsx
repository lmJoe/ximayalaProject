import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@/pages/Home';
import Listen from '@/pages/Listen';
import Found from '@/pages/Found';
import Account from '@/pages/Account';
import { RootStackNavigation,RootStackParamList } from '.';
import { RouteProp, TabNavigationState, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import IconFont from '@/assets/iconfont';
import HomeTabs from './HomeTabs';
export type BottomTabParamList = {
    HomeTabs:undefined,
    Listen:undefined,
    Found:undefined,
    Account:undefined,
}
/**
 * createBottomTabNavigator 也会返回两个组件
 * 使用Tab接收一个返回值
 */
const Tab = createBottomTabNavigator<BottomTabParamList>();
/**每个组件是可以接口两个参数的 */

type Route = RouteProp<RootStackParamList,'BottomTabs'> & { state?:TabNavigationState; }
interface IProps {
    navigation:RootStackNavigation;
    route:Route;
}
function getHeaderTitle(route:Route){
    const routeName = getFocusedRouteNameFromRoute(route);
    switch(routeName){
        case 'Home':
            return '首页';
        case 'Listen':
            return '我听';
        case 'Found':
            return '发现';
        case 'Account':
            return '账户';
        default:
            return '首页';
    }  
}
/**使用class创建BottomTabs创建当前组件 */
class BottomTabs extends React.Component<IProps> {
    /**
     * componentDidMount生命周期只会在当前组件渲染完成后渲染一次
     * componentDidUpdate
     *  */
    componentDidUpdate(){
        const {navigation,route} = this.props;
        navigation.setOptions({
            headerTitle:getHeaderTitle(route)
        })
    }
    render () {
        return (
            <Tab.Navigator 
                screenOptions={{
                    tabBarActiveTintColor:'#f86442',
                }}>
                <Tab.Screen 
                    name="HomeTabs" 
                    component={HomeTabs} 
                    options={{
                        tabBarLabel:'首页',
                        tabBarIcon:({color,size})=>(
                            <IconFont name="home-two" size={size} color={color} />
                        ),
                    }}
                />                
                <Tab.Screen 
                    name="Listen" 
                    component={Listen} 
                    options={{
                        tabBarLabel:'我听',
                        tabBarIcon:({color,size})=>(
                            <IconFont name="music-cd" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Found" 
                    component={Found} 
                    options={{
                        tabBarLabel:'发现',
                        tabBarIcon:({color,size})=>(
                            <IconFont name="music-menu" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Account" 
                    component={Account} 
                    options={{
                        tabBarLabel:'账户',
                        tabBarIcon:({color,size})=>(
                            <IconFont name="avatar" size={size} color={color}/>
                        ),
                    }}
                />
            </Tab.Navigator>
        )
    }
}
export default BottomTabs;