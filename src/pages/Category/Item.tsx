import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { ICategory } from '@/models/category';
import { viewportWidth } from '@/utils/index';
interface IProps{
    isEdit:boolean;//代表编辑还是完成状态
    selected:boolean;//代表当前是否是已选择的状态
    data:ICategory;
    disabled?:boolean;
}
//计算每个类别所占用的宽度
export const parentWidth = viewportWidth - 10;
export const itemWidth = parentWidth / 4;
export const itemHeight = 48;
export const margin = 5;
class Item extends React.Component<IProps> {
    render(){
        const {data,isEdit,selected,disabled} = this.props;
        return (
            <View key={data.id} style={styles.itemWrapper}>
                <View style={[styles.item,disabled&&styles.disabled]}>
                    <Text>{data.name}</Text>
                    {
                        // 如果当前状态为可编辑并且disabled为false
                        isEdit && !disabled &&(
                            <View style={styles.icon}>
                                <Text style={styles.iconText}>{selected ? '-':'+'}</Text>
                            </View>
                        )
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    itemWrapper:{
        width:itemWidth,
        height:itemHeight,
    },
    item:{
        flex:1,
        backgroundColor:'#fff',
        margin:5,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,
    },
    disabled:{
        backgroundColor:'#ccc',
    },
    icon:{
        position:'absolute',
        top:-5,
        right:-5,
        height:16,
        width:16,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f86442',
        borderRadius:8,
    },
    iconText:{
        color:'#fff',
        lineHeight:16,
    }
})
export default Item;