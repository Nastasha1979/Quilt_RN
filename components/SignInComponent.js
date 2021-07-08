import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Alert } from "react-native";
import { Text, Input, Button, CheckBox, Icon } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Quicksand_400Regular, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";
import { Girassol_400Regular } from "@expo-google-fonts/girassol";
import { createBottomTabNavigator } from 'react-navigation-tabs';

class SignInTab extends Component {
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

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon
                name="sign-in-alt"
                type="font-awesome-5"
                iconStyle={{color: tintColor}}
            />
        )
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
            <ScrollView style={style.container}>
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
            </ScrollView>
        );
    }
}

class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            username: "",
            password: "",
            email: "",
            newsletter: false
        }
    }

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon
                name="user-plus"
                type="font-awesome-5"
                iconStyle={{color: tintColor}}
            />
        )
    }
    handleRegister() {
        console.log(JSON.stringify(this.state));
        this.resetForm();
    }

    resetForm() {
        this.setState({
            name: "",
            username: "",
            password: "",
            email: "",
            newsletter: false
        });
    }

    render() {
        return(
            <ScrollView style={style.container}>
                <Text style={style.logo}>Needle & Thread</Text>
                <Text style={style.h2Text}>Register</Text>
                <Text style={style.h4Text}>Sign Up for an account today to take advantage of classes, articles, and more!</Text>
                <Input
                    placeholder='Your Name'
                    leftIcon={
                        <Entypo name="user" size={24} color="black" />
                    }
                    inputContainerStyle={style.emailContainer}
                    onChangeText={value => this.setState({name: value})}
                    value={this.state.name}
                />
                <Input
                    placeholder='Your Email'
                    leftIcon={
                        <Entypo name="user" size={24} color="black" />
                    }
                    inputContainerStyle={style.emailContainer}
                    onChangeText={value => this.setState({email: value})}
                    value={this.state.email}
                />
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
                    title="Sign Up for Newsletter"
                    center
                    checked={this.state.newsletter}
                    onPress={() => this.setState({remember: !this.state.newsletter})}
                    containerStyle={style.signInCheckbox}
                />                
                <Button
                    title="Register"
                    raised
                    buttonStyle={style.buttonStyle}
                    containerStyle={style.btnContainer}
                    onPress={() => {
                        this.handleRegister()
                    }}
                />
   
            </ScrollView>
        );
    }
}

const SignIn = createBottomTabNavigator(
    {
        "Sign In": SignInTab,
        Register: RegisterTab
    },
    {
        tabBarOptions: {
            activeBackgroundColor: "#f4dbbb",
            inactiveBackgroundColor: "#faeddd",
            activeTintColor: "#000000",
            inactiveTintColor: "#808080",
            labelStyle: {fontSize: 16, fontWeight: "bold"},
            showIcon: true,
            style: {height: 60}

        }
    }
);

const style = StyleSheet.create({
    container: {
        backgroundColor: "#faeddd",
        flex: 1
    },
    logo: {
        fontFamily: "Girassol_400Regular",
        fontSize: 38,
        marginTop: 50,
        marginBottom: 30,
        alignSelf: "center"
    },
    h2Text: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20,
        fontFamily: "Quicksand_600SemiBold",
        fontSize: 36,
        alignSelf: "center"
    },
    h4Text: {
        textAlign: "center",
        marginBottom: 30,
        width: 300,
        fontFamily: "Quicksand_600SemiBold",
        fontSize: 20,
        alignSelf: "center"
    },
    emailContainer: {
        marginHorizontal: 15,
        marginVertical: 7,
        alignSelf: "center"
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
        marginTop: 50,
        alignSelf: "center",
        justifyContent: "center",
        marginBottom: 20
    }

    
});

export default SignIn;