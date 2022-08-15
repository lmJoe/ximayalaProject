/**当前文件为本地存储文件 */
import AsyncStorage from '@react-native-community/async-storage';
import Storage,{LoadParams} from 'react-native-storage';
//传进去一个函数 这个函数就是storage的配置 
const storage = new Storage({
    size:1000,//最大容量，超过就会删除之前的数据
    //storageBackend存储的引擎，如果没有这个参数，storage数据就会保存在内存中，意味着一旦退出数据就会丢失
    storageBackend:AsyncStorage,
    defaultExpires:1000*3600*24*7,//保存时长 此处为7天 设置为null则永远不过期
    enableCache:true,//开启缓存
    sync:{//当从storage中获取数据时，如果storage没有相应数据，或者相应数据过期，这会调动sync对象中相对应的方法
        
    },

})
//声明一个函数load从storage中获取数据
const load = (params:LoadParams) =>{
    return storage.load(params);
}
export {load};
export default storage;