import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card, Button } from "react-native-elements";
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
        const { navigate } = this.props.navigation;

        const renderClassItem = ({item}) => {
            return(
                <ListItem style={{flex: 1}}>
                    <Card style={{alignSelf: "stretch"}}>
                        <Card.Image source={require('./assets/class1.jpg')} />
                        <Card.Title>{item.title}</Card.Title>
                        <Text style={{marginBottom: 10}}>
                            {item.description}
                        </Text>
                        <Button
                            title="Learn More"
                            type="outline"
                            onPress={() => navigate("ClassDetail", { classId: item.id })}
                        />
                    </Card>
                </ListItem>
            );
        };

        return(
            <View>
                <Text style={{textAlign: "center", fontSize: 22, paddingTop: 10, fontWeight: "bold"}}>Available Classes</Text>
                <FlatList
                    data={this.state.classesData}
                    renderItem={renderClassItem}
                    keyExtractor={item => item.id.toString()}
                >
                </FlatList>
            </View>
        );
    }
}

export default Classes;