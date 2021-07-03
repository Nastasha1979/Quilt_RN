import React, { Component } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Quicksand_400Regular, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";
import { Girassol_400Regular } from "@expo-google-fonts/girassol";

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            fontsLoaded: {
                Quicksand_400Regular,
                Quicksand_600SemiBold,
                Girassol_400Regular
            }
        }
    }

    handleSignIn() {
        console.log(JSON.stringify(this.state));
        Alert.alert(
            `${this.state.username} is now signed in.`,
            "Enjoy our App!",
            [
                {
                    text: "OK",
                    onPress: () => this.resetForm()
                }
            ],
            {cancelable: false}
        );
    }

    resetForm() {
        this.setState({
            username: "",
            password: ""
        });
    }

    

    render() {
        return(
            <View style={style.container}>
                <Text style={style.logo}>Needle & Thread</Text>
                <Text style={style.h2Text}>Sign In</Text>
                <Text style={style.h4Text}>Save all of your favorite classes, articles, and more!</Text>
                <Input
                    placeholder='User Name'
                    leftIcon={
                        <Entypo name="user" size={24} color="black" />
                    }
                    inputContainerStyle={style.emailContainer}
                    onChangeText={value => this.setState({username: value})}
                    value={this.state.username}
                />
                <Input
                    placeholder='Password'
                    leftIcon={
                        <MaterialCommunityIcons name="form-textbox-password" size={24} color="black" />
                    }
                    inputContainerStyle={style.emailContainer}
                    onChangeText={value => this.setState({password: value})}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Button
                    title="Sign In"
                    raised
                    buttonStyle={style.buttonStyle}
                    containerStyle={style.btnContainer}
                    onPress={() => this.handleSignIn()}
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
    logo: {
        fontFamily: "Girassol_400Regular",
        fontSize: 38,
        marginTop: 70
    },
    h2Text: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20,
        fontFamily: "Quicksand_600SemiBold",
        fontSize: 36
       
    },
    h4Text: {
        textAlign: "center",
        marginBottom: 30,
        width: 300,
        fontFamily: "Quicksand_600SemiBold",
        fontSize: 20
    },
    emailContainer: {
        marginHorizontal: 15,
        marginVertical: 10
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

export default SignIn;