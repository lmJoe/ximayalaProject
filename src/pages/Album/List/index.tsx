import React from 'react';
import {View, Text, Animated, ListRenderItemInfo, StyleSheet, FlatList, Alert} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {IProgram} from '@/models/album';
import Item from './item';
const mapStateToProps = ({album}:RootState) => {
    return {
        list:album.list,
    }
}
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface IPorps extends ModelState {

}

class List extends React.Component<IPorps> {
    //入参类型为IProgram
    onPress = (data:IProgram) => {
        alert("节目")
    }
    keyExtractor = (item: IProgram) => item.id;
    renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
    return (
        <Item data={item} index={index} onPress={this.onPress}/>
        
    )
  };
  render() {
    const {list} = this.props; 
        return (
            <FlatList 
                style={styles.container}
                data={list}
                renderItem = {this.renderItem}
                keyExtractor={this.keyExtractor}
            />
        )
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    }
})

export default connector(List);