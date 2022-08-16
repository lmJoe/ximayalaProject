import {create, Model} from 'dva-core-ts';
import createLoading from 'dva-loading-ts';
import models from '@/models/index';
import modelExtend from 'dva-model-extend';
import homeModel from '@/models/home';
/**
 * 1.创建实例
 */
const app = create();
/**
 * 2.加载model对象 
 * */
models.forEach(model =>{
    app.model(model);
})
//app中有一个use的方法帮助我们调用插件,需要在start方法之前
app.use(createLoading())
/** 
 * 3.启动dva
*/
app.start()
/**
 * 4.导出dva的数据
 */
const store = app._store;
export default store;
/**
 * 需要动态生成和home的Model结构一样的model
 * namespace不能写死，需要动态生成，从createHomeModel参数中获取
 * createHomeModel在每循环一次都会重新加载一次，重复多次加载
 * Cached处理此问题
 */
interface Cached {
    [key:string]:boolean;
}
const cached:Cached = {
    home:true,
}
function registerModel(model:Model){
    //如果在cached中没有找到，则需要加载
    if(!cached[model.namespace]){
        app.model(model);
        //cached对应的namespace则赋予true
        cached[model.namespace] = true;
    }
}
export function createHomeModel(namespace:string){
    const model = modelExtend(homeModel,{namespace});
    //将model加载在dva中，作为model函数的参数传进去，这样就可将model动态的插入到dva中
    registerModel(model);
}