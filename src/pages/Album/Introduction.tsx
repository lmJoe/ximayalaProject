import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootState } from '@/models/index';
import { connect,ConnectedProps } from 'react-redux';
/**从dva仓库中拿到数组
 * 
 */
const mapStateToProps = ({album}:RootState) =>{
    console.log("introduction---------",album);
    return {
        introduction:album.introduction,
    }
}
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>

class Introduction extends React.Component<ModelState>{
    render() {
        const {introduction} = this.props;
        return (
            <View style={styles.container}>
                <Text>{introduction}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        padding:10,
    }
})
export default connector(Introduction);