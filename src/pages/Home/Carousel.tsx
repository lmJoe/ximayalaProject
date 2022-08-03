import React from 'react';
import { viewportWidth,wp, hp } from '@/utils/index';
import Carousel, { ParallaxImage, AdditionalParallaxProps, Pagination } from 'react-native-snap-carousel';
import { Image, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { ICarousel } from '@/models/home';
const sliderWidth = viewportWidth;
const slidwidth = wp(90);
const slidheight = hp(26);
const itemWidth = slidwidth + wp(2) *2;//每张图的真实宽度
/**定义一个接收参数的入口 */
interface IProps{
    data:ICarousel[],
}
/**
 * 将IProps作为一个泛型传入进去
 * */
class WCarousel extends React.Component<IProps>{
    state = {
        activeSlide:0,//定义轮播图下标默认值
    }
    onSnapToItem = (index:number) => {
        //记录当前轮播图下标
        this.setState({
            activeSlide:index
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
        const {data} = this.props;
        const {activeSlide} = this.state;
        return (
            <View style={styles.paginationWrapper}>
                {/* 分页的数量 */}
                <Pagination 
                    containerStyle={styles.paginationContainer}
                    dotContainerStyle={styles.dotContainer}//分页原点颜色样式
                    dotStyle={styles.dot}//原点样式
                    dotsLength={data.length}//定义分页数量
                    activeDotIndex={activeSlide} //轮播图显示图激活的相应下标
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
export default WCarousel;