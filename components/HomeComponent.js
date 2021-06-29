import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Tile, Button } from "react-native-elements";

class Home extends Component {


    render() {
        const {navigate} = this.props.navigation;
        return(
            
                <View style={style.container}>
                    <Text style={style.topTitle}>Needle & Thread</Text>
                    <Tile
                        imageSrc={require("./assets/quilt2.jpg")}
                        title="Learn the timeless art of quilting"
                        titleNumberOfLines={2}
                        featured
                        caption="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
                        imageContainerStyle={style.imgStyle}
                        titleStyle={style.titleStyle}
                        captionStyle={style.captionStyle}
                    />                
                    <Button
                    title="Sign In"
                    type="solid"
                    color="red"
                    onPress={() => navigate("SignIn")} 
                    buttonStyle={style.button}
                    containerStyle={style.buttonContainer}
                    />
                </View>
                
            
        );
    }
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#faeddd",
        flex: 1
    },
    topTitle: {
        paddingTop: 50,
        paddingBottom: 35,
        textAlign: "center",
        fontSize: 36,
        

    },
    imgStyle: {
        height: 500,
        
    },
    titleStyle: {
        fontSize: 24,
        fontWeight: "bold"
        
    },
    captionStyle: {
        fontSize: 16
    },
    button: {
        marginTop: 200,
        fontSize: 22,
        width: "50%",
        backgroundColor: "red",
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center"
    }

})

export default Home;