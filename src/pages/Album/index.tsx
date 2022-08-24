import React from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { RootStackParamList } from '@/navigator/index';
import { RouteProp } from '@react-navigation/native';
import coverRight from '@/assets/cover-right.png';
/**背景模糊的库*/
import { BlurView } from '@react-native-community/blur';
/**导入Tab组件 */
import Tab from './Tab';
import { PanGestureHandler, PanGestureHandlerGestureEvent, State, PanGestureHandlerStateChangeEvent } from 'react-native-gesture-handler';
//声明mapStateToProps
const mapStateToProps = ({ album }: RootState) => {
  return {
    summary: album.summary,
    author: album.author,
    list: album.list,

  }
}
//接收connect函数返回的值
const connector = connect(mapStateToProps);
//声明一个类型，通过ConnectedProps帮助我们推导出connector的类型
type ModelState = ConnectedProps<typeof connector>
//IProps继承自ModelState
interface IProps extends ModelState {
  headerHeight: number,
  //route对象类型：通过RouteProp类型帮助我们推导出Album页面路由的信息，传递一个泛型RootStackParamList以及页面的名字
  route: RouteProp<RootStackParamList, 'Album'>
}
const USE_NATIVE_DRIVER = true;
class Album extends React.Component<IProps>{
  /**new一个react-native中的Animated
   * translateY为动画值
   */
  translateY = new Animated.Value(0);
  //声明一个偏移值
  translationYOffset = new Animated.Value;
  componentDidMount() {
    const { dispatch, route } = this.props;
    const { id } = route.params.item;
    dispatch({
      type: 'album/fetchAlbum',
      payload: {
        id,
      }
    });
    /**
     * 在组件加载完成之后修改translateY值
     * 使用方法：只有在动画组件中才能绑定动画值
     * 如果需求出现：背景颜色从白色改变至其他颜色 使用插值函数
     * Animated.timing为时间的变化
     * Animated.spring为弹簧一样的变化
     */
    // Animated.spring(this.translateY, {
    //   toValue: -170, //赋值
    //   tension: 100, //张力
    //   friction: 10,
    //   useNativeDriver: true,

    // }).start()
  }
  /**
   * PanGestureHandler监听拖动手势组件
   * 有一个函数方法onGestureEvent  在手指拖动的时候一直触发
   * 如  onGestureEvent = (event:PanGestureHandlerGestureEvent) =>{
          console.log("1",event.nativeEvent.translationY)
          }
    * 还支持使用动画的监听库 
    * Animated.event()作用是用来映射动画值
    * 第一个入参是一个数组，里面有一个nativeEvent，nativeEvent有一个属性为translationY
    * 给translationY绑定到this.translateY中
    * 第二个参数为一个配置，即一个对象，对象中使用useNativeDriver 
    * 值为true时表示启动原生动画的驱动 这样性能更好
   */

  onGestureEvent = Animated.event(
    [{nativeEvent: {translationY: this.translateY}}],
    {
      useNativeDriver: USE_NATIVE_DRIVER,
    },
  );
  /**
   * onHandlerStateChange是一个回调函数，在状态发生变化的时候调用
   * 首次状态未定，就是在没有监听到任何手势活动、还会监听手势失败、成功
   * 开始结束、正在活动、取消
   */
  onHandlerStateChange = ({nativeEvent}:PanGestureHandlerStateChangeEvent) => {
    //判断状态
    //上一次的状态是不是活动操作
    switch (nativeEvent.oldState) {
      case State.ACTIVE:
        //获取每次移动的translationY
        let {translationY} = nativeEvent;
        /**
         * extractOffset函数作用将translationYOffset动画值的value值设置到Offset属性上，然后清空value值
         * Animated.value对象里面都有两个值value和offset偏移值
         */
        this.translationYOffset.extractOffset();
        this.translationYOffset.setValue(translationY);
        /**
         * 将translationYOffset的offset和value相加然后重新赋值给value
         * value = value + offset
         */

        this.translationYOffset.flattenOffset()
        break;
    
      default:
        break;
    }
  }
  renderHeader = () => {
    const { headerHeight, summary, author, route } = this.props;
    const { title, image } = route.params.item;
    console.log("summary", summary);
    console.log("author", author);
    console.log("title", title);
    console.log("image", image);
    return (
      <View style={[styles.header, { paddingTop: headerHeight }]}>
        <Image source={{ uri: image }} style={styles.background} />
        <BlurView blurType="light" blurAmount={10} style={StyleSheet.absoluteFillObject} />
        <View style={styles.leftView}>
          <Image source={{ uri: image }} style={styles.thumbnai} />
          <Image source={coverRight} style={styles.coverRight} />
        </View>
        <View style={styles.rightView}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.summary}>
            <Text numberOfLines={1} style={styles.summaryText}>{summary}</Text>
          </View>
          <View style={styles.author}>
            <Image source={{ uri: author.avatar }} style={styles.avatar} />
            <Text style={styles.nameText}>{author.name}</Text>
          </View>
        </View>
      </View>
    )
  }
  render() {
    return (
      <PanGestureHandler 
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}>
        <Animated.View
          style={[
            styles.container,
            {
              // padding: 10,
              /**
               * opacity :透明度的变化
               */
              // opacity: this.translateY.interpolate({
              //   inputRange: [-170, 0],
              //   outputRange: [1, 0],
              // }),
              /**
               * 如果需求出现：背景颜色从白色改变至其他颜色 使用插值函数interpolate
               * interpolate接收一个对象inputRange 输入的范围 从小到大
               * outputRange接收一个输入的范围颜色
               */
              // backgroundColor:this.translateY.interpolate({
              //     inputRange:[-170,0],
              //     outputRange:['red','#fff']
              // }),
              transform: [{ translateY: this.translateY }]
            }
          ]}>
          {this.renderHeader()}
          <Tab />
        </Animated.View>
      </PanGestureHandler>
    )
  }
}
/**由于useHeaderHeight是一个hook函数，没有办法在class组件中使用
 * 所以需要一个高阶函数吧useHeaderHeight包裹起来
 */
function Wrapper(props: IProps) {
  //useHeaderHeight获取标题栏高度
  const headerHeight = useHeaderHeight();
  //...props为需要将里面的每一项都拿出来，在还给Album
  return <Album headerHeight={headerHeight} {...props} />
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 260,
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: '',
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#eee',
  },
  leftView: {
    marginRight: 26,
  },
  rightView: {
    flex: 1,
  },
  thumbnai: {
    width: 98,
    height: 98,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  coverRight: {
    height: 98,
    position: 'absolute',
    right: -23,
    resizeMode: 'contain',
  },
  summary: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
  },
  avatar: {
    height: 26,
    width: 26,
    borderRadius: 13,
    marginRight: 8,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  summaryText: {
    color: '#fff',
  },
  nameText: {
    color: '#fff',
  }
})
export default connector(Wrapper);