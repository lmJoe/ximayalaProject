/** 
 * 当前文件为引入依赖dva-model-extend的补充文件
*/
/**声明一个model
 * modelExtend接收一个参数,类型为数组
 */
declare module 'dva-model-extend'{
    import { Model } from "dva-core-ts";
    export default function modelExtend(...model:Model[]):Model;
}
declare module '*.png';