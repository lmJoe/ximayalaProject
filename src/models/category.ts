import { Model,Effect, SubscriptionsMapObject } from "dva-core-ts";
import {Reducer} from 'redux';
import storage, { load } from "@/config/storage";
import axios from "axios";
import { RootState } from ".";
//类别接口
const CATEGORY_URL = '/mock/11/xmlaApi/category';
/**
 * 定义CategoryModelState对象数组中元素的类型
*/
export interface ICategory{
    id:string,
    name:string,
    classify?:string,//分组
}
interface CategoryModelState{
    isEdit:boolean,//右上角编辑按钮状态
    myCategorys:ICategory[],//我的分类
    categorys:ICategory[],//所有的分类
}
/**继承全局的Model对象，也就是从dva-core-ts中获取的Model */
interface CategoryModel extends Model{
    namespace:'category',//
    state:CategoryModelState,//state对象的类别为CategoryModelState
    effects:{
        //loadData加载数据的函数，需要从storage中获取数据，类型为Effect
        loadData:Effect;
        toggle:Effect;//切换编辑状态
    };
    //声明一个reducer对象
    reducers:{
        setState:Reducer<CategoryModelState>//reducer接收一个泛型
    };
    //订阅一个数据源，根据条件调用相应的action
    subscriptions:SubscriptionsMapObject;//类型为SubscriptionsMapObject

}
//声明一个初始的state
const initialState = {
    isEdit:false,
    myCategorys:[
        {
            id:'home',
            name:'推荐',
        },
        {
            id:'vip',
            name:'vip',
        }
    ],
    categorys:[],
}
//声明一个CategoryModel，类型为CategoryModel
const CategoryModel:CategoryModel = {
    namespace:'category',
    state:initialState,
    effects:{
        *loadData(_,{call,put}){
            //从storage中获取数据,load函数需要接收一个参数，参数类型为
            //此处的load函数为config文件夹中storage文件的load函数方法
            //定义myCategorys用于接收load函数返回的值
            const myCategorys = yield call(load,{key:'myCategorys'});
            const categorys = yield call(load,{key:'categorys'});
            //发起action,将数据保存在state
            //如果myCategorys存在的话,会将myCategorys和categorys重新保存到dva仓库中,如果不存在则只保存categorys
            if(myCategorys){
                yield put({
                    type:'setState',
                    payload:{
                        myCategorys,
                        categorys
                    }
                })
            }else{
                yield put({
                    type:'setState',
                    payload:{
                        categorys
                    }
                })
            }
            
        },
        *toggle({payload},{put,select}){
            //select可以从dva中拿到所有数据
            //select函数可以接收一个函数，函数的入参category就是整个dva的仓库中的一个 可以吧category换成state,就是整个dva仓库
            const category = yield select(({category}: RootState) => category);
            yield put({
                type:'setState',
                payload:{
                    isEdit: !category.isEdit,
                }
            })
        }
    },
    reducers:{
        setState(state,{payload}){
            return {
                ...state,//原来的对象和现在的合并成一个新的对象
                ...payload,//原来的对象和现在的合并成一个新的对象
            }
        }
    },
    //订阅函数
    subscriptions:{
        /**
         * 所有写在subscriptions对象中的函数，都将会被dva执行，dva在把所有数据加载完之后，就会执行subscriptions定义的
         *  函数,也就是说在代码被加载之后，会执行dispatch,发起一个action,这个action的类型loadData找到loadData函数
         * 在loadData函数里会从storage获取数据，然后将myCategorys和Categorys,保存在dva中
         */
        //声明一个setup函数
        setup({dispatch}){
            dispatch({type:'loadData'});
        },
        /**
         * storage同步远程数据的方法，因为在调用storage.load时候没有找到对应的数据就会去调动sync和load调用的key的名字相同的函数
         * 也就是定义在storage.ts文件中sync中的对象
         * 声明一个函数名asyncStorage，在这个函数中声明加载categorys执行的异步请求
         */
        asyncStorage(){
            storage.sync.categorys = async () => {
                const data = await axios.get(CATEGORY_URL);
                return data.data;
            },
            storage.sync.myCategorys = async () => {
                return null;
            }
        },

    }
}
export default CategoryModel;