import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import CLASSES_DATA from "../shared/ClassesData";


class Classes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classesData: CLASSES_DATA
        }
    }
    static navigationOptions = {
        title: "Classes"
    }

    render() {
        const renderClassItem = ({item}) => {
            return(
                <ListItem key={item.id} >
                    <Card style={{alignSelf: "stretch"}}>
                        <Card.Image source={require('./assets/class1.jpg')} />
                        <Card.Divider/>
                        <Card.Title>{item.title}</Card.Title>
                        <Text style={{marginBottom: 10}}>
                            {item.description}
                        </Text>
                    </Card>
                </ListItem>
            );
        };

        return(
            <View >
                <FlatList
                    data={this.state.classesData}
                    renderItem={renderClassItem}
                >
                </FlatList>
            </View>
        );
    }
}

export default Classes;