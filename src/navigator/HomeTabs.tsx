import React from 'react';
import {createMaterialTopTabNavigator, MaterialTopTabBar,MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';
import TopTabBarWrapper from '@/pages/views/TopTabBarWrapper';
import { StyleSheet } from 'react-native';
import { RootState } from '../models';
import { connect, ConnectedProps } from 'react-redux';
import { ICategory } from '@/models/category';
import { createHomeModel } from '@/config/dva';

/**声明一个类型 HomeParamList
 * 将其作为一个泛型传入到顶部标签导航器中createMaterialTopTabNavigator
 * 根据key生成动态标签导航器 
 */
export type HomeParamList = {
    [key:string]:{
       namespace:string, 
    };
}
/**
 * 从dva中获取myCategroys
 */
const mapStateToProps = ({category}:RootState) => {
    return {
        myCategroys:category.myCategorys,
    }
}
/**声明一个变量,用来接收connect函数返回的值 */
const connector = connect(mapStateToProps);
/**声明一个类型,泛型为typeof connector ，这样就能得到函数的一个类型*/
type ModelState = ConnectedProps<typeof connector>
/**声明一个接口 */
interface IProps extends ModelState {

}
const Tab = createMaterialTopTabNavigator<HomeParamList>();
class HomeTabs extends React.Component<IProps>{
    renderTabBar = (props:MaterialTopTabBarProps) => {
        //自定义的顶部标签栏
        //将props中的每一项都作为MaterialTopTabBar组件的属性传入
        return <TopTabBarWrapper {...props}/>
    }
    renderScreen = (item:ICategory) =>{
        /**在map中每渲染一个页面都动态生成一个model
         * 调用createHomeModel,并将item.id传进去
         * 这样就可以动态生成model
         * 前置条件：需要将一个参数通过initialParams传递过去告诉我们需要从哪个model中获取对应的值
         */
        createHomeModel(item.id);
        return (
            <Tab.Screen 
                key={item.id} 
                name={item.id} 
                component={Home} 
                options={{tabBarLabel:item.name}}
                initialParams={{namespace:item.id}}

            />
        )
        
    }
    render(){
        const {myCategroys} = this.props;
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
                {
                    myCategroys.map(this.renderScreen)
                }
                
            </Tab.Navigator>
        )
    }
}
const styles = StyleSheet.create({
    sceneContainerStyle:{
        backgroundColor:'transparent',
    },
})
export default connector(HomeTabs);