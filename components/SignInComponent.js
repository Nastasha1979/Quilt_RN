import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    handleSignIn() {
        console.log(JSON.stringify(this.state));
        this.resetForm();
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
                <Text h2 style={style.h2Text}>Sign In</Text>
                <Text h4 style={style.h4Text}>Save all of your favorite classes, articles, and more!</Text>
                <Input
                    placeholder='User Name'
                    leftIcon={
                        <AntDesign name="user" size={24} color="black" />
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
    h2Text: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20
       
    },
    h4Text: {
        textAlign: "center",
        marginBottom: 50,
        fontWeight: "bold",
        width: 250
    },
    emailContainer: {
        margin: 20 
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