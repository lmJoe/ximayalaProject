import React from 'react';
import { viewportWidth,wp, hp } from '@/utils/index';
import Carousel, { ParallaxImage, AdditionalParallaxProps, Pagination } from 'react-native-snap-carousel';
import { Image, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { ICarousel } from '@/models/home';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
const sliderWidth = viewportWidth;
const slidwidth = wp(90);
export const slidheight = hp(26); //并且将轮播图高度导出，用于和屏幕滚动距离相比较隐藏渐变色
const itemWidth = slidwidth + wp(2) *2;//每张图的真实宽度

/**connect函数会将整个dva的仓库作为参数传递到mapStateToProps函数中 
 * connect函数获取dva仓库来源是通过在index.tsx文件中使用Provider组件
 * Provider组件通过store属性，这个store就是通过dva创建的仓库
 * 通过react中的connect可以让处于Provider组件里面的任何一个层级的子组件都能够
 * 拿到store,所以从home组件中可以拿到仓库，所以connect就能知道store里面的state属性
 * state类型就是在models里index中定义的RootState的类别
*/
const mapStateToProps = ({home}:RootState) =>{
    return {
        data:home.carousels,//carousels为models文件夹中home中的carousels值即获取到轮播列表的数组
        activeCarouselIndex:home.activeCarouselIndex,//从carousels为models文件夹中home中获取
    }
    
}

const connector = connect(mapStateToProps);
/**通过ConnectProps方法得到导入对象的类型 */

type modelState = ConnectedProps<typeof connector>
/**
 * IProps为给this.props定义一个类型
 * navigation为导航器传递过来的一个参数
 */
interface IProps extends modelState{
}
/**
 * 将IProps作为一个泛型传入进去
 * */
class WCarousel extends React.Component<IProps>{

    onSnapToItem = (index:number) => {
        //从props中拿到dispatch函数
        const { dispatch } = this.props;
        //将当前轮播图显示图的下标存入dva中
        dispatch({
            type:'home/setState',
            payload:{
                activeCarouselIndex:index,
            }
        })
    }
    _renderItem = (
            {item}:{item:ICarousel},
            parallaxProps?:AdditionalParallaxProps
    ) => {
        return (
            <ParallaxImage 
                source={{uri:item.image}}
                style={styles.image}
                containerStyle={styles.imageContainer}
                parallaxFactor={0.8}//视差速度
                showSpinner//显示加载动画效果
                spinnerColor="rgba(0,0,0,0.25)"
                {...parallaxProps} //_renderItem中的第二个参数
            />
        )
    }
    /**此处定义一个get属性pagination，在函数中加一个get,意思就是将pagination函数当做
     * 一个变量一个属性使用，所以pagination不用传参数
     * 该函数用于定义分页数量
     */
    get pagination(){
        //从dva中获取轮播图数据和当前显示的轮播图下标
        const {data,activeCarouselIndex} = this.props;
        return (
            <View style={styles.paginationWrapper}>
                {/* 分页的数量 */}
                <Pagination 
                    containerStyle={styles.paginationContainer}
                    dotContainerStyle={styles.dotContainer}//分页原点颜色样式
                    dotStyle={styles.dot}//原点样式
                    dotsLength={data.length}//定义分页数量
                    activeDotIndex={activeCarouselIndex} //轮播图显示图激活的相应下标
                    inactiveDotScale={0.7}
                    inactiveDotOpacity={0.4}
                />
            </View>
        )
    }
    render(){
        const { data } = this.props;
        return (
            <View>
              <Carousel
                data={data}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                hasParallaxImages //轮播视差
                onSnapToItem={this.onSnapToItem}//监听轮播图滑动到哪一页，方便给Pagination分页标签值
                loop={true}
                autoplay={true}
            />  
            {this.pagination}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    imageContainer:{
        width:itemWidth,
        height:slidheight,
        borderRadius:8
    },
    image:{
        ...StyleSheet.absoluteFillObject,//绝对定位
        resizeMode:'cover',//设置图片伸缩模式
    },
    paginationWrapper:{
        justifyContent:'center',
        alignItems:'center',
    },
    paginationContainer:{
        position:'absolute',
        top:-20,
        backgroundColor:'rgba(0,0,0,0.35)',
        paddingHorizontal:3,//水平内边距
        paddingVertical:4,//垂直内边距
        borderRadius:8,
    },
    dotContainer:{
        marginHorizontal:6,//水平外边距

    },
    dot:{
        width:6,
        height:6,
        borderRadius:3,
        backgroundColor:'rgba(255,255,255,0.92)',
    }
})
export default connector(WCarousel);