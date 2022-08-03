import React from 'react';
import { View, Text,Button } from 'react-native';
import { RootStackNavigation } from '../navigator';
/**
 * IProps为给this.props定义一个类型
 * navigation为导航器传递过来的一个参数
 */
interface IProps{
    navigation:RootStackNavigation,
}
class Account extends React.Component<IProps>{
    onPress = () => {
        const {navigation} = this.props;
        /**使用navigate()方法进行跳转 */
        navigation.navigate("Detail",{
            id:100,
        });
    }   
    render (){
        /**
         * this.props;在此处使用this.props可以获取从其他组件传过来的参数
         * onPress 为点击按钮触发的时间
         */
        
        return (
            <View>
                <Text>Account</Text>
                <Button title="跳转到详情页" onPress={this.onPress}/>
            </View>
        )
    }
}
export default Account;