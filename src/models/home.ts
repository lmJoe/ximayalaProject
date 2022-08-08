import {Model, Effect} from 'dva-core-ts';
import { Reducer } from 'redux';
import axios from 'axios';
//轮播图接口
const CAROUSEL_URL = '/mock/11/xmlaApi/carousel';
//猜你喜欢接口
const GUESS_URL = '/mock/11/xmlaApi/guess';
//首页列表
const CHANNEL_URL = '/mock/11/xmlaApi/channel';

/**定义一个接受轮播图参数的入口 并导出这个参数以便于其他页面调用此参数*/
export interface ICarousel {
    id:string;
    image:string;
    color:[string,string];
}
/**定义一个接收猜你喜欢内容参数的入口，并导出这个参数以便于其他页面调用此参数 */
export interface IGuess{
    id:string,
    title:string,
    image:string,
}
/**定义一个接收首页列表参数的入口，并导出这个参数以便于其他页面调用此参数 */
export interface IChannel{
    id:string,
    title:string,
    image:string,
    remark:string,
    played:string,
    playing:string,
}
export interface HomeState {
    carousels:ICarousel[];//存储轮播图数据
    guess:IGuess[],//存储猜你喜欢数据
    channels:IChannel[],//存储首页列表数据
}
/**声明一个接收参数的方法 */
interface homeModel extends Model{
    namespace: 'home';
    state: HomeState;
    //reducers在此处就是一个action的处理器，处理同步动作，用来得出最新的state
    reducers: {
        setState:Reducer<HomeState>
    };
    //effects和reducers一样都是action处理器，不同的是处理异步动作，如接口请求或本地数据库操作
    effects: {
        fetchCarousels:Effect,//定义轮播图的函数
        fetchGuess:Effect,//定义猜你喜欢的函数
        fetchChannels:Effect,//定义首页列表函数
    };
    // subscriptions?: SubscriptionsMapObject;
}
/** 初始state的类型为HomeState*/
const initialState:HomeState = {
    carousels:[],//轮播图数组默认值为空数组
    guess:[],//猜你喜欢数组，默认为空数组
    channels:[],//首页列表数据，默认为空数组
}
const homeModel:homeModel = {
    namespace: 'home',
    state:initialState,
    reducers:{
        //两个参数 第一个是当前model最新的state,第二个就是type对象
        setState(state = initialState,{payload,type}){
            //此处的payload会返回一个新对象
            return{
                ...state,//旧的对象
                ...payload,
            }
        },
    },
    //所有异步相关操作放置在effects对象中
    effects:{
        /**fetchCarousels有两个参数 第一个为action，第二个参数使用来处理异步操作的,此处fetchCarousels的作用就是调用setState函数设置数据
         * fetchCarousels为轮播图数组
         * fetchGuess为猜你喜欢数组
         */
        *fetchCarousels(_,{call,put}){//此处的_是一个占位符，没有任何意义
            const {data,state,msg} = yield call(axios.get,CAROUSEL_URL);
            console.log('轮播图数据',data)
            //put的作用和pages文件夹中home文件的dispatch功能一样，如果是当前的model,则不用写home
            yield put({
                type:'setState',
                payload:{//payload更新carousels数据
                    carousels:data, 
                },
            });
        },
        /**首页猜你喜欢列表 */
        *fetchGuess(_,{call,put}){
            const {data} = yield call(axios.get,GUESS_URL);
            console.log('猜你喜欢数据',data)
            yield put({
                type:'setState',
                payload:{//payload更新guess数据
                    guess:data, 
                },
            })
        },
        //首页列表
        *fetchChannels(_,{call,put}){
            const {data} = yield call(axios.get,CHANNEL_URL);
            console.log('首页列表数据',data);
            yield put({
                type:'setState',
                payload:{
                    channels:data.results,
                }
            })
        }
    }
}
export default homeModel;