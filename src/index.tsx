import React from "react";
import Navigator from './navigator';
import { Provider } from "react-redux";
import store from "./config/dva";
import { StatusBar } from "react-native";
import '@/config/http';
export default class extends React.Component{
    render(){
        return(
            //Provider的作用是使被Provider包裹在里面的组件都能获取到store中的值
            <Provider store={store}>
                <Navigator />
                {/* 设置顶部导航和手机顶部相融合 translucent为半透明*/}
                <StatusBar 
                    backgroundColor="transparent" 
                    barStyle="dark-content"
                    translucent
                />
            </Provider>
        )
    }
};