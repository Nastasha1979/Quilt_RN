import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


class Newsletter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fName: "",
            email: "",
        }
    }

    handleSubmit(){
        console.log(JSON.stringify(this.state));
        this.resetForm();
    }

    resetForm(){
        this.setState({
            fName: "",
            email: ""
        });
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
                    onChangeText={value => this.setState({fName: value})}
                    value={this.state.fName}
                />
                <Input
                    placeholder='Email'
                    leftIcon={
                        <Entypo name="email" size={24} color="black" />
                    }
                    inputContainerStyle={style.emailContainer}
                    onChangeText={value => this.setState({email: value})}
                    value={this.state.email}
                />
                <Button
                    title="Sign Up"
                    raised
                    buttonStyle={style.buttonStyle}
                    containerStyle={style.btnContainer}
                    onPress={() => this.handleSubmit()}
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