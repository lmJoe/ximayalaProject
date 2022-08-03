import {Dimensions} from 'react-native';
/**Dimensions对象根据get方法获取手机屏幕的宽高 */
const {width:viewportWidth,height:viewportHeight}  = Dimensions.get('window');
/**根据百分比获取宽度 */
function wp(percentage:number){
    const value = percentage*viewportWidth / 100;
    return Math.round(value);
}
/**计算高度百分比 */
function hp(percentage:number){
    const value = percentage*viewportHeight / 100;
    return Math.round(value);
}
export {
    viewportWidth,
    viewportHeight,
    wp,
    hp
}