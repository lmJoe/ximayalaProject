import React from 'react';
import { View, Text } from 'react-native';
import {RouteProp} from '@react-navigation/native'
import {RootStackParamList} from '@/navigator/index';
/**
 * interface定义一个IProps用于接收导航器传递过来的参数route
 * RouteProp为route的类型，RouteProp并且有两个参数：RootStackParamList和一个字符串（此处为Detail）
 *      RootStackParamList为navigator文件定义的被传递过来的
 *      'Detail'为Detail页面
 */
interface IProps{
    route:RouteProp<RootStackParamList,'Detail'>;
}
class Detail extends React.Component<IProps>{
    render (){
        const { route } = this.props;
        return (
            <View>
                <Text>Detail</Text>
                <Text>{route.params.id}</Text>
            </View>
        )
    }
}
export default Detail;
