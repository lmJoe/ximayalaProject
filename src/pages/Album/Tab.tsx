import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import {TabView, SceneRendererProps, TabBar} from 'react-native-tab-view';
import Introduction from './Introduction';
import List from './List';
interface IRoute{
    key:string;
    title:string;
}
interface IState {
    routes:IRoute[];
    index:number;
}
interface IProps {
    
}
class Tab extends React.Component<IProps,IState>{
    state= {
        routes:[
            {key:'introduction',title:'简介'},
            {key:'albums',title:'节目'}
        ],
        index:1,
    }
    /**修改index函数方法 */
    onIndexChange = (index:number) => {
        this.setState({
            index,
        })
    }
    renderScene = ({route}: {route: IRoute}) => {
        switch(route.key){
            case 'introduction':
                return <Introduction />;
            case 'albums':
                return <List />
        }
    }
    /**获取类型为每个屏幕props的SceneRendererProps并且有可能是类型为IState的navigationState */
    renderTabBar = (props:SceneRendererProps & {navigationState:IState}) => {
       /**
        * ...props 为将props将里面的每一项都赋值给TabBar
        * scrollEnabled 为开启滚动,以此实现自定义宽度，默认是每个标签平分
        *  */
        return <TabBar  
            {...props} 
            scrollEnabled={true} 
            tabStyle={styles.tabStyle}
            labelStyle={styles.label}
            style={styles.tabBar}
            indicatorStyle={styles.indicator} //指示器样式
            /> 
    }
    render() {
        return (
            /**
             * 路由对象的数组
             * key: 标签的key值(必要)
             * title: 标签显示的字段
             * icon 标签的icon
             * index: 表示当前可视状态下路由的对象的数组下标
             */
            <TabView
                navigationState={this.state}
                onIndexChange={this.onIndexChange}
                renderScene={this.renderScene}
                renderTabBar={this.renderTabBar}
                
            />
        )
    }
}
const  styles = StyleSheet.create({
    tabStyle:{
        width:80,
    },
    label:{
        color:'#333',
    },
    tabBar:{
        backgroundColor:'#fff',
        ...Platform.select({ //针对安卓更改样式
            android:{
                elevation:0,
                borderBottonColor:'#e3e3e3',
                borderBottomWidth:StyleSheet.hairlineWidth,
            }
        })
    },
    indicator:{
        backgroundColor:'#eb6d48',
        borderLeftWidth:20,
        borderRightWidth:20,
        borderColor:'#fff',
    }
})
export default Tab;