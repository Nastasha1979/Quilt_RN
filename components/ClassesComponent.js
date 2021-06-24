import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Card, Button, ListItem, Image } from "react-native-elements";
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
                <ListItem style={style.listItem}>
                    <Card >
                        <Image 
                            source={{uri: baseUrl + item.pic}} 
                            style={style.image}    
                        />
                        <Card.Title style={style.title}>{item.title}</Card.Title>
                        <Text style={style.description}>
                            {item.description}
                        </Text>
                        <Button
                            title="Learn More"
                            type="solid"
                            raised
                            buttonStyle={style.buttonContainer}
                            titleStyle={style.buttonTitleStyle}
                            onPress={() => navigate("ClassDetail", { 
                                classId: item.id 
                            })}
                        />
                    </Card>
                </ListItem>
            );
        };

        return(
            <View style={style.container}>
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


const style = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 18,
        marginTop: 10
    },
    description: {
        marginBottom: 10,
        textAlign: "center",
        fontSize: 16
    },
    listItem: {
        flex: 1,
        alignSelf: "stretch"
    },
    image: {
        width: 300,
        height: 175
    },
    buttonContainer: {
        backgroundColor: "#faeddd"
    },
    buttonTitleStyle: {
        color: "black"
    }
})

export default connect(mapStateToProps)(Classes);