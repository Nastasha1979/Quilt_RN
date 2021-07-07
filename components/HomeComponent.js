import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Tile, Button } from "react-native-elements";
import { useFonts, Girassol_400Regular } from "@expo-google-fonts/girassol";
import { Quicksand_400Regular, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";

GetHome = ({navigate}) => {
    let [fontsLoaded] = useFonts({
        Girassol_400Regular,
        Quicksand_400Regular, 
        Quicksand_600SemiBold
      });

      if(fontsLoaded){
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
          
      } else {
          return <View />
      }
}

class Home extends Component {

    

    render() {
        const {navigate} = this.props.navigation;

                
            return(
                    <ScrollView style={style.scrollV}>
                        <GetHome navigate={navigate}/>
                    </ScrollView>
                    
                
            );

    }
}

const style = StyleSheet.create({
    scrollV: {
        flex: 1,
        height: "100%"
    },
    container: {
        backgroundColor: "#faeddd"
    },
    topTitle: {
        paddingTop: 40,
        paddingBottom: 35,
        textAlign: "center",
        fontSize: 42,
        fontFamily: "Girassol_400Regular",


    },
    imgStyle: {
        height: 600,
        
    },
    titleStyle: {
        fontSize: 24,
        fontFamily: "Quicksand_600SemiBold"
        
    },
    captionStyle: {
        fontSize: 16,
        fontFamily: "Quicksand_400Regular"
    },
    button: {
        marginTop: 200,
        fontSize: 22,
        width: "50%",
        backgroundColor: "red",
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    }

})

export default Home;