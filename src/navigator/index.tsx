import React from 'react';
import { View, Text,Platform,StyleSheet, StatusBar, Animated } from 'react-native';
/**
 * NavigationContainer 是管理整个的导航素并包含导航状态的组件
 * createStackNavigator 是一个返回包含两个属性的对象的函数
 */
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createStackNavigator,HeaderStyleInterpolators,CardStyleInterpolators, StackNavigationProp} from '@react-navigation/stack';//引用了堆栈式导航器
import BottomTabs from './BottomTabs';
import Category from '@/pages/Category';
import Album from '@/pages/Album';
/**声明一个叫RootStackParamList的类型，此处的type是一个类型别名即给一个类型重新起一个名字 */
export type RootStackParamList = {
    BottomTabs:{
        screen?:string
    },
    Category:undefined,
    Album:{
        item:{
            id:string,
            title:string,
            image:string,
        }
    },
}
/**
 * Record是高级类型，是一个定义键的类型和值得类型，起到一个约束的作用，放置乱建立对象值和他的类型，可以接收两个类型
 * 例子1:
 * tyep UserName = '张三'|'李四'|'王五';
 * type Name = Record<UserName,string>;
 * 将鼠标放置在Name上可以看到Record返回了一个userName的对象，并且每个名字都赋予了string的值
 *  */

/**createStackNavigator这个函数本身是可以接收一个泛型的，即将RootStackParamList作为泛型传入到createStackNavigator中  */
let Stack = createStackNavigator<RootStackParamList>();
/**
 * getAlbumOptions接收一个类型为RouteProp的参数route,
 * 当前参数有一个泛型 RootStackNavigation和跳转到哪个页面的参数Album
 */
function getAlbumOptions({route}:{
    route:RouteProp<RootStackParamList,'Album'>
}){
    /**
     * 返回频道页面的配置
     * headerTitle：标题栏标题
     * headerTransparent: 标题栏透明效果
     * headerTitleStyle:头部标题栏样式
     */
    return {
        headerTitle:route.params.item.title,
        headerTransparent:true,
        headerTitleStyle:{
            opacity:0,
        },
        headerBackground:()=>{
            return (
                <Animated.View style={styles.headerBackground} />
            )
        }
    }
}
/**
 * 返回的两个属性
 * Navigator 导航器的组件
 * Screen 作为Navigator组件的子组件的用来定义路由
 */
/**
 * StackNavigationProp
 */

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;
class Navigator extends React.Component{
    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator
                screenOptions={{
                    headerTitleAlign:'center',
                    headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,//标题跳转动画
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,//页面跳转动画
                    gestureEnabled: true,//手势开启
                    gestureDirection: 'horizontal',//设置手势为左右方向
                    ...Platform.select({
                        android:{
                            headerStatusBarHeight:StatusBar.currentHeight,//状态栏的高度
                        }
                    }),//解决react0.61.5版本StatusBar.currentHeight返回的为undefined.0.62以上为null
                    headerBackTitleVisible:false,//页面返回按钮显示状态
                    headerTintColor:'#333',//标题颜色，修改标题和返回按钮的颜色
                    headerStyle: {
                        // backgroundColor: "#dedede",//标题栏颜色
                        ...Platform.select({
                            android: {//打包android项目时起作用
                                elevation: 0,
                                borderBottomWidth: StyleSheet.hairlineWidth
                            },
                        })
                    }
                }}>
                    <Stack.Screen name="BottomTabs" component={BottomTabs} options={{
                        headerTitle:'首页',
                    }}/>
                    <Stack.Screen name="Category" component={Category} options={{
                        headerTitle:'分类',
                    }}/>
                    
                    <Stack.Screen
                        name="Album" 
                        component={Album}
                        options={getAlbumOptions} //传递一个函数
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
const styles = StyleSheet.create({
    headerBackground:{
        flex:1,
        backgroundColor:'#fff',
        opacity:0,
    }
})
export default Navigator;