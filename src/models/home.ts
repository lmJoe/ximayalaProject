import {Model, Effect} from 'dva-core-ts';
import { Reducer } from 'redux';
import axios from 'axios';
import { RootState } from '.';
//轮播图接口
const CAROUSEL_URL = '/mock/11/xmlaApi/carousel';
//猜你喜欢接口
const GUESS_URL = '/mock/11/xmlaApi/guess';
//首页列表
const CHANNEL_URL = '/mock/11/xmlaApi/channel';

/**定义一个接受轮播图参数的入口 并导出这个参数以便于其他页面调用此参数*/
export interface ICarousel {
    colors: any;
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
/**声明一个接收参数的入口 */
export interface IPagination{
    current:number;
    total:number,
    hasMore:boolean;//用来判断是否还需要加载下一页的状态值
}
//存储dva数据
export interface HomeState {
    carousels:ICarousel[];//存储轮播图数据
    activeCarouselIndex:number,//存储当前显示的轮播图的下标
    gradientVisible:boolean;//渐变色组件是否显示的状态
    guess:IGuess[],//存储猜你喜欢数据
    channels:IChannel[],//存储首页列表数据
    pagination:IPagination;//存储首页里列表页码相关数据（主要是上拉加载用到）
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
    activeCarouselIndex:0,//设置轮播图当前显示图的下标默认值
    gradientVisible:true,//设置渐变色组件显示状态为true
    guess:[],//猜你喜欢数组，默认为空数组
    channels:[],//首页列表数据，默认为空数组
    pagination:{
        current:1,
        total:0,
        hasMore:true,
    }
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
        /**首页列表
         * 此处的入参callback则为首页列表下拉刷新时传递过来的一个回调函数值
         * payload为首页里列表上拉加载时传递过来的参数
         * 拿到之前已请求出来的channels数据，select作用就是拿到所有的state.home
         * call中第三个参数为请求接口入参
         */
        *fetchChannels({callback,payload},{call,put,select}){
            const {channels,pagination} = yield select((state:RootState)=>state.home)
            //如果存在的话则将当前的页码加1
            let page = 1;
            if(payload && payload.loadMore){
                console.log('当前页码',pagination);
                page = pagination.current + 1;
            }
            const {data} = yield call(axios.get,CHANNEL_URL,{
                params:{
                    page,
                },
            });
            console.log('首页列表数据',data);
            //如果payload和payload.loadMore为true,则加载更多需要拼接
            let newChannels = data.results;
            if(payload && payload.loadMore){
                newChannels = channels.concat(newChannels);
            }
            //使用setState更改state中的状态值
            yield put({
                type:'setState',
                payload:{
                    channels:newChannels,
                    pagination:{
                        current:data.pagination.current,
                        total:data.pagination.total,
                        //如果当前增加的分页数量小于分页总数量
                        hasMore:newChannels.length < data.pagination.total,
                    }
                }
            })
            //判断callback是否是一个函数
            if(typeof callback === 'function'){
                callback();
            }
        }
    }
}
export default homeModel;