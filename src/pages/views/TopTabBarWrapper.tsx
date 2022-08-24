import React from 'react';
import { MaterialTopTabBarProps, MaterialTopTabBar } from '@react-navigation/material-top-tabs';
import { View, Text } from 'react-native';
import Touchable from '@/components/Touchable';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import LinearAnimatedGradientTransition from 'react-native-linear-animated-gradient-transition';//渐变色动画效果组件
import { StyleSheet } from 'react-native';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
import { getActiveRouteName } from '@/utils/index';
//声明一个mapStateTopProps从home中获取
const mapStateTopProps = (state: RootState, props: MaterialTopTabBarProps) => {
  const routeName = getActiveRouteName(props.state);
  const ModelState = state[routeName];
  return {
    //获取
    gradientVisible: ModelState.gradientVisible,//获取从models文件中home中存储的gradientVisible值，并在当前界面进行业务操作
    //获取和轮播图图片在同一个对象里面的颜色，这个颜色是从接口中获取的
    LinearColors: ModelState.carousels.length
      ? (ModelState.carousels[ModelState.activeCarouselIndex] ? ModelState.carousels[ModelState.activeCarouselIndex].colors : undefined)
      : undefined,
  }
}
//使用connect导入,将mapStateTopProps作为connect函数传入进去
const connector = connect(mapStateTopProps);
//声明一个ModelState 通过ConnectProps方法得到导入对象的类型
type ModelState = ConnectedProps<typeof connector>
/**使IProps既是MaterialTopTabBarProps也是ModelState类型 */
type IProps = MaterialTopTabBarProps & ModelState;
/**将IProps作为TopTabBarWrapper的泛型传入 */
class TopTabBarWrapper extends React.Component<IProps>{
  //跳转分类页面方法
  goCategory = () => {
    const { navigation } = this.props;
    navigation.navigate('Category');
  }
  //拿到颜色的数组
  get linearGradient() {
    const { gradientVisible, LinearColors = ['#ccc', '#e2e2e2'] } = this.props;
    //如果gradientVisible为true的话就显示渐变色组件
    if (gradientVisible) {
      return (
        <LinearAnimatedGradientTransition colors={LinearColors} style={styles.gradient} />
      )
    }
    return null;


  }
  render() {
    // const {props} = this; //使用了...restProps代替了props
    let { gradientVisible, indicatorStyle, ...restProps } = this.props;
    let textStyle = styles.text;
    let activeTintColor = '#333';
    //如果渐变色组件显示的话
    if (gradientVisible) {
      textStyle = styles.whiteText;
      activeTintColor = '#fff';
      if (indicatorStyle) {
        //compose作用就是合并两个样式
        indicatorStyle = StyleSheet.compose(indicatorStyle, styles.whiteBackgroundColor)
      }
    }
    return (
      <View style={styles.container}>
        {this.linearGradient}
        <View style={styles.topTabBarView}>
          {/* 给MaterialTopTabBar组件传递两个参数 */}
          <MaterialTopTabBar
            {...restProps}
            activeTintColor={activeTintColor}
          />
          <Touchable style={styles.categoryBtn} onPress={this.goCategory}>
            <Text style={textStyle}>分类</Text>
          </Touchable>
        </View>
        <View style={styles.bottom}>
          <Touchable style={styles.searchBtn}>
            <Text style={textStyle}>搜索按钮</Text>
          </Touchable>
          <Touchable style={styles.historyBtn}>
            <Text style={textStyle}>历史记录</Text>
          </Touchable>
        </View>
      </View>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: getStatusBarHeight(),//getStatusBarHeight获取ios端状态栏的高度
  },
  topTabBarView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBtn: {
    paddingHorizontal: 10,//水平内边距
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#ccc',
  },
  bottom: {
    flexDirection: 'row',
    paddingVertical: 7,//垂直内边距
    paddingHorizontal: 15,//水平方向内边距
    alignItems: 'center',
  },
  searchBtn: {
    flex: 1,
    paddingLeft: 12,
    height: 30,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  historyBtn: {
    marginLeft: 24,
  },
  gradient: {
    //绝对布局
    ...StyleSheet.absoluteFillObject,
    height: 260,
  },
  text: {
    color: '#333',
  },
  whiteText: {
    color: '#fff',
  },
  whiteBackgroundColor: {
    backgroundColor: '#fff',
  }
})
//使用connector函数将TopTabBarWrapper组件传递进去，才能拿到dva仓库的数组
export default connector(TopTabBarWrapper);