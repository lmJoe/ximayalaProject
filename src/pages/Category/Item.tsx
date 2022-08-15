import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { ICategory } from '@/models/category';
import { viewportWidth } from '@/utils/index';
interface IProps{
    isEdit:boolean;//代表编辑还是完成状态
    selected:boolean;//代表当前是否是已选择的状态
    data:ICategory;
}
//计算每个类别所占用的宽度
const parentWidth = viewportWidth - 10;
const itemWidth = parentWidth / 4;
class Item extends React.Component<IProps> {
    render(){
        const {data,isEdit,selected} = this.props;
        return (
            <View key={data.id} style={styles.itemWrapper}>
                <View style={styles.item}>
                    <Text>{data.name}</Text>
                    {
                        isEdit && (
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
        height:48,
    },
    item:{
        flex:1,
        backgroundColor:'#fff',
        margin:5,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,
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