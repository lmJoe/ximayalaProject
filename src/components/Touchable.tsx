import React from 'react';
import {TouchableOpacity,TouchableOpacityProps} from 'react-native';
/**函数声明组件
 * 接收一个props
 * 给Touchable变量声明一个类型React.FC 就是函数组件的意思
 * 并且传入一个泛型TouchableOpacityProps
 * 组件中定义属性activeOpacity 为透明度
 */
const Touchable: React.FC<TouchableOpacityProps> = (props) => (
    <TouchableOpacity activeOpacity={0.8} {...props} />
)
export default Touchable;