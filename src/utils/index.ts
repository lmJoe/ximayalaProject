import {Dimensions} from 'react-native';
import { NavigationState } from '@react-navigation/native';
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
function getActiveRouteName(state:NavigationState){
    let route;
    route = state.routes[state.index];
    while(route.state && route.state.index){
        route = route.state.routes[route.state.index];
    }
    return route.name;
}
export {
    viewportWidth,
    viewportHeight,
    wp,
    hp,
    getActiveRouteName
}