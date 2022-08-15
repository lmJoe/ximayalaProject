//按钮组件
import React from 'react';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import { RootState } from '@/models/index';
import { connect, ConnectedProps } from 'react-redux';
const mapStateProps = ({category}:RootState) => {
    return {
        isEdit:category.isEdit,
    }
}
const connector = connect(mapStateProps);
type ModelState = ConnectedProps<typeof connector>;
/**声明一个从父组件传递过来的参数 */
interface IProps extends ModelState {
    onSubmit: () => void;
}
//调用父组件传过来的函数
class HeaderRightBtn extends React.Component<IProps>{
    render() {
        const {onSubmit,isEdit} = this.props;
        return (
            <HeaderButtons>
                <Item title={isEdit?'完成':'编辑'} onPress={onSubmit}/>
            </HeaderButtons>
        )
    }
}
export default connector(HeaderRightBtn);