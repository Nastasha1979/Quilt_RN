import React, { Component } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, Input, Button, CheckBox } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
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
            remember: false,
            signedIn: false,
            fontsLoaded: {
                Quicksand_400Regular,
                Quicksand_600SemiBold,
                Girassol_400Regular
            }
        }
    }

    handleSignIn() {
        console.log(JSON.stringify(`${this.state.username}, ${this.state.password}, ${this.state.remember}`));

        if(this.state.remember){
            SecureStore.setItemAsync("userinfo", JSON.stringify({
                username: this.state.username, 
                password: this.state.password,
                signedIn: this.state.signedIn
            }))
            .catch(error => console.log("Could not save userinfo'", error));
        } else{
            SecureStore.deleteItemAsync('userinfo').catch(error => console.log("Could not delete user info", error));
                
        }

        Alert.alert(
            `${this.state.username} is now signed in.`,
            "Enjoy our App!",
            [
                {
                    text: "OK"
                }
            ],
            {cancelable: false}
        );   
    }

    handleSignOut() {
        if(this.state.signedIn){
            SecureStore.deleteItemAsync('userinfo').catch(error => console.log("Could not delete user info", error));
        }
        this.setState({
            username: "",
            password: "",
            remember: false,
            signedIn: false
        });
        
    }


    componentDidMount() {
        SecureStore.getItemAsync('userinfo').then(userdata => {
            const userinfo = JSON.parse(userdata);
            if(userinfo){
                this.setState({username: userinfo.username});
                this.setState({password: userinfo.password});
                this.setState({remember: true});
                this.setState({signedIn: true});
            }
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
                <CheckBox
                    title="Keep Me Signed In"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={style.signInCheckbox}
                />
                {!this.state.signedIn ?
                    <Button
                        title="Sign In"
                        raised
                        buttonStyle={style.buttonStyle}
                        containerStyle={style.btnContainer}
                        onPress={() => {
                            this.handleSignIn()
                            this.setState({signedIn: !this.state.signedIn})
                        }}
                    />
                    :
                    <Button
                        title="Sign Out"
                        raised
                        buttonStyle={style.buttonStyle}
                        containerStyle={style.btnContainer}
                        onPress={() => {
                            this.handleSignOut()
                            this.setState({signedIn: !this.state.signedIn})
                        }}
                    />
                }
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
        marginTop: 50,
        marginBottom: 30
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
        marginVertical: 7
    },
    signInCheckbox: {
        backgroundColor: "#faeddd"
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