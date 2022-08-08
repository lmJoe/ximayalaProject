import React from 'react';
import {TouchableOpacity,TouchableOpacityProps} from 'react-native';
/**函数声明组件
 * 接收一个props
 * 给Touchable变量声明一个类型React.FC 就是函数组件的意思
 * 并且传入一个泛型TouchableOpacityProps
 * 组件中定义属性activeOpacity 为透明度
 * 组件优化重点：
 *      和class组件中React.pureComponent的作用同样是通过判断父组件传递过来的属性是否和上次的属性相等
 *      如果相等，则不再重新渲染当前组件即帮助我们实现pureComponent组件中的特有的生命周期函数shouldComponentUpdata,作用就是在重新渲染
 *      render函数之前，会调用并且会返回一个boolean值，当为false时render不会执行，当为true时则重新执行。通过props和state潜的对比，如果props
 *      中一个对象并且这个对象中某一个属性发生变化。如果React.pureComponent的父组件中传递过来的函数是一个匿名函数即this.onPress（例如
 *      _renderItem = ({item}:ListRenderItemInfo<IChannel>) => {
            return <ChannelItem data={item} onPress={this.onPress}/>
        }
 *      ），则意味着使用pureComponent无意义，因为
 *      每一次的都会传递一个新的onPress函数并且发生了变化
 *      函数组件优化方法：
 *      React.memo();将props后面的箭头函数作为memo函数的入参即可避免重复渲染
 *      
 */
const Touchable: React.FC<TouchableOpacityProps> = React.memo(props => (
    <TouchableOpacity activeOpacity={0.8} {...props} />
))
export default Touchable;