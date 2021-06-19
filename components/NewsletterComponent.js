import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


class Newsletter extends Component {
    
    static navigationOptions = {
        title: "Newsletter"
    }

    render() {
        return(
            <View style={style.container}>
                <Text h2 style={style.h2Text}>Newsletter</Text>
                <Text h5 style={style.h5Text}>Get free tips, tricks, and patterns. Its Free!</Text>
                <Input
                    placeholder='First Name'
                    leftIcon={
                        <AntDesign name="user" size={24} color="black" />
                    }
                />
                <Input
                    placeholder='Email'
                    leftIcon={
                        <Entypo name="email" size={24} color="black" />
                    }
                    inputContainerStyle={style.emailContainer}
                />
                <Button
                    title="Sign Up"
                    raised
                    buttonStyle={style.buttonStyle}
                    containerStyle={style.btnContainer}
                />

            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#faeddd",
        flex: 1,
        alignItems: "center"
    },
    h2Text: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20
       
    },
    h5Text: {
        textAlign: "center",
        marginBottom: 20
        
    },
    emailContainer: {
        marginTop: 20,
        marginBottom: 20
    },
    buttonStyle: {
        backgroundColor: "red",
        width: 300,
        paddingTop: 7,
        paddingBottom: 7,
               
    },
    btnContainer: {
        marginTop: 50
    }

    
});

export default Newsletter;