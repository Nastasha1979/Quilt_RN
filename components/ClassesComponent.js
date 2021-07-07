import React, { Component } from "react";
import { ScrollView, View, Text, FlatList, StyleSheet, Dimensions} from "react-native";
import { Card, Button, ListItem, Image, Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Quicksand_400Regular, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";

const mapStateToProps = state => {
    return{
        classesData: state.classesData
    };
};

class Classes extends Component {
    constructor(props){
        super(props);
        this.state ={
            fontsLoaded: {
                Quicksand_400Regular, 
                Quicksand_600SemiBold
            }
        }
    }

    static navigationOptions = {
        title: "Classes"
    }


    render() {
        const { navigate } = this.props.navigation;

        const renderClassItem = ({item}) => {
            console.log(item);
            return(
                <ListItem>
                    <Tile
                        imageSrc={{uri: baseUrl + item.pic}}  
                        // style={style.image}    
                        featured
                        width={350}
                        title={item.title}
                        caption={item.description}
                        imageContainerStyle={style.imageContainerStyle}
                        titleStyle={style.titleStyle}
                        captionStyle={style.captionStyle}
                        overlayContainerStyle={style.overlayContainerStyle}
                        onPress={() => navigate("ClassDetail", { 
                            classId: item.id 
                        })}
                    />                       
                </ListItem>
            );
        };

        return(
            <ScrollView style={style.container}>
                <Text style={style.mainTitle}>Available Classes</Text>
                <FlatList
                    data={this.props.classesData.classesData}
                    renderItem={renderClassItem}
                    keyExtractor={item => item.id.toString()}
                    
                >
                </FlatList>
            </ScrollView>
        );
    }
}


const style = StyleSheet.create({
    container: {
        flex: 1
    },
    mainTitle: {
        textAlign: "center", 
        fontSize: 30, 
        paddingTop: 10, 
        fontFamily: "Quicksand_600SemiBold"
    },
    overlayContainerStyle: {
        borderWidth: 1,
        height: 200,
        width: 280,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fdf9f2",
        borderRadius: 5,
        marginTop: 50,
        marginLeft: 30,
        opacity: 1 
    },
    imageContainerStyle: {
        borderRadius: 15,
        width: Dimensions.get('window').width - 25 
    },
    titleStyle: {
        color: "black",
        fontFamily: "Quicksand_400Regular"
    },
    captionStyle: {
        color: "black",
        fontFamily: "Quicksand_400Regular",
        fontSize: 16
    }
    
})

export default connect(mapStateToProps)(Classes);