import React from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { RootState } from '@/models/index';
import Touchable from '@/components/Touchable';
import { connect, ConnectedProps } from 'react-redux';
import { ICategory } from '@/models/category';
import { viewportWidth } from '@/utils/index';
import _ from 'lodash';
import Item from './Item';
import { RootStackNavigation } from '@/navigator/index';
import HeaderRightBtn from './HeaderRightBtn';
const mapStateToProps = ({category}:RootState) => {
    return {
        myCategorys:category.myCategorys,
        categorys:category.categorys,
        isEdit:category.isEdit,
    }
}
const connector = connect(mapStateToProps);
/**声明一个类型 */
type ModelState = ConnectedProps<typeof connector>
/**声明一个接口，继承自modelState,作为Category组件的类型传递进去 */
interface IPorps extends ModelState{
    navigation:RootStackNavigation;
}
/**声明一个变量作为存储类别组件中编辑按钮存储的数据 */
interface IState {
    myCategorys:ICategory[];
}

class Category extends React.Component<IPorps,IState>{
    state ={
        myCategorys:this.props.myCategorys,
    };
    constructor(props:IPorps){
        super(props);
        //分类界面头部添加编辑按钮,调用HeaderRightBtn组件，并给他传递一个参数
        props.navigation.setOptions({
            headerRight: () => <HeaderRightBtn onSubmit={this.onSubmit}/>
        });
    }
    //退出分类页面，初始化当前编辑和完成状态isEdit为false
    componentWillUnmount(){
        const {dispatch} = this.props;
        dispatch({
            type:'category/setState',
            payload:{
                isEdit:false,
            }
        }) 
    }
    onSubmit = () => {
        const {dispatch} = this.props;
        dispatch({
            type:'category/toggle',//调用category中toggle的函数
        })
    }
    //onLongPress长按时间
    onLongPress = () => {
        const {dispatch} = this.props;
        dispatch({
            type:'category/setState',//调用category中toggle的函数
            payload:{
                isEdit:true,
            }
        })
    }
    //onPress增加类别
    onPress = (item: ICategory,index: number) => {
        //首先判断当前类别点击项是否为编辑状态或未编辑状态
        const {isEdit} = this.props;
        const {myCategorys} = this.state;
        if(isEdit){
            //修改dva中myCategorys数据,点击时需要将合并成一个新的数组
            this.setState({
                myCategorys:myCategorys.concat([item]),
            })
        }
    }
    renderItem = (item: ICategory,index: number) => {
        const {isEdit} = this.props;
        //注入Item组件,并将从dva取出接口获取的数据以及isEdit值传递过去
        return <Item key = {item.id} data={item} isEdit={isEdit} selected/>
    }
    renderUnSelectedItem = (item: ICategory,index: number) => {
        const {isEdit} = this.props;
        return (
            <Touchable key={item.id} onPress={()=>this.onPress(item,index)} onLongPress={this.onLongPress}>
                {/* 注入Item组件,并将从dva取出接口获取的数据以及isEdit值传递过去 */}
                <Item data={item} isEdit={isEdit} selected={false}/>
            </Touchable>
        )
        
    }
    render (){
        const {categorys} = this.props;//拿到所有的类别
        const {myCategorys} = this.state;//拿到用户选择的类别
        const classifyGroup = _.groupBy(categorys,(item) => item.classify);
        return (
            <ScrollView style={styles.container}>
                <Text>我的分类</Text>
                <View style={styles.classifyView}>
                    {myCategorys.map(this.renderItem)}
                </View>
                <View>
                    {
                        Object.keys(classifyGroup).map(classify => {
                            return (
                                <View key={classify}>
                                    <Text style={styles.classifyName}>{classify}</Text>
                                    <View style={styles.classifyView}>
                                        {classifyGroup[classify].map((item,index) => {
                                            //在编辑状态时，往我的分类中添加类别，已添加的类别的id与全部分类中某个id一致，说明已加入到我的分类中 则返回null
                                            if(myCategorys.find(selectedItem=>selectedItem.id===item.id)){
                                                return null;
                                            }
                                            return this.renderUnSelectedItem(item,index);
                                        })}
                                    </View>
                                </View>
                            )
                        })
                    }
                    
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f3f6f6',
    },
    classifyName:{
        fontSize:16,
        marginTop:14,
        marginBottom:8,
        marginLeft:10,
    },
    classifyView:{
        flexDirection:'row',//水平布局
        flexWrap:'wrap',//自动换行
        padding:5,
    }
})
//使用connector包裹当前Category组件 作用是返回一个新的组件
export default connector(Category);