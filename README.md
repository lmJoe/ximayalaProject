# ximayalaProject
ERROR Invariant Violation: ViewPropTypes has been removed from React Native
由于高版本react-native已启用ViewPropTypes，使用打补丁方法解决当前问题
1.npm install deprecated-react-native-prop-types 或者 yarn add deprecated-react-native-prop-types
2.更改node_modules\react-native\index.js文件中436行后的代码
    隐藏ColorPropType、EdgeInsetsPropType、PointPropType、ViewPropTypes方法中invariant()方法中的代码
    分别增加
    return require('deprecated-react-native-prop-types').ColorPropType;
    return require('deprecated-react-native-prop-types').EdgeInsetsPropType;
    return require('deprecated-react-native-prop-types').PointPropType;
    return require('deprecated-react-native-prop-types').ViewPropTypes;
3.npx patch-package react-native 进行补丁增加
4.重新运行此项目yarn android