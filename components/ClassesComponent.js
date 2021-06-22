import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card, Button } from "react-native-elements";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = state => {
    return{
        classesData: state.classesData
    };
};

class Classes extends Component {
    
    static navigationOptions = {
        title: "Classes"
    }

    render() {
        const { navigate } = this.props.navigation;

        const renderClassItem = ({item}) => {
            console.log(item);
            return(
                <ListItem style={{flex: 1}}>
                    <Card style={{alignSelf: "stretch"}}>
                        <Card.Image source={{source: {uri: baseUrl + item.pic}}} />
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
                    data={this.props.classesData.classesData}
                    renderItem={renderClassItem}
                    keyExtractor={item => item.id.toString()}
                >
                </FlatList>
            </View>
        );
    }
}

export default connect(mapStateToProps)(Classes);