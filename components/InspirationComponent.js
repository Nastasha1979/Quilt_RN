import React, { Component } from "react";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";
import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import { Tile, ListItem } from "react-native-elements";
import { useFonts, Quicksand_400Regular, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";

const mapStateToProps = state => {
    return{
        carousel: state.carousel,
    };
};



    

class Inspiration extends Component {
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
        title: "Inspiration"
    }

    

    render() {
        const { navigate } = this.props.navigation;

        const renderTiles = ({item}) => {
                return(
                    <Tile
                        imageSrc={{ uri: baseUrl + item.src}}
                        featured
                        title={item.header}
                        caption={item.caption}
                        onPress={() => navigate("InspireDetail", { 
                            pictureId: item.key 
                        })}
                        captionStyle={style.caption}
                        titleStyle={style.topTitle}
                        overlayContainerStyle={style.contentContainerStyle}
                    />
    
                );
        };

        return(
            <ScrollView>
                <FlatList
                    data={this.props.carousel.carousel}
                    renderItem={renderTiles}
                    keyExtractor={item => item.key.toString()}
                />

            </ScrollView>
        );
    }
}

const style = StyleSheet.create({
    topTitle: {
        fontFamily: "Quicksand_600SemiBold",
        fontSize: 24,
        color: "black"
    },
    caption: {
        fontFamily: "Quicksand_400Regular",
        fontSize: 16,
        color: "black"
    },
    contentContainerStyle: {
        borderWidth: 1,
        height: 100,
        width: 300,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fdf9f2",
        borderRadius: 5,
        marginTop: 80,
        marginLeft: 50,
        opacity: .75
        
    }
})

export default connect(mapStateToProps)(Inspiration);