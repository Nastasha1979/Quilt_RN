import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Alert } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Quicksand_400Regular, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";
import { Girassol_400Regular } from "@expo-google-fonts/girassol";


class Newsletter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fName: "",
            email: "",
            fontsLoaded: {
                Quicksand_400Regular,
                Quicksand_600SemiBold,
                Girassol_400Regular
            }
        }
    }

    handleSubmit(){
        console.log(JSON.stringify(this.state));
        Alert.alert(
            `Thanks for signing up for our newsletter ${this.state.fName}!`,
            `Your first edition will be set to ${this.state.email} today`,
            [
                {
                    text: "OK",
                    onPress: () => this.resetForm()
                }
            ],
            {cancelable: false}
        );
        
    }

    resetForm(){
        this.setState({
            fName: "",
            email: ""
        });
    }

    render() {
        return(
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
                <View style={style.container}>
                    <Text style={style.logo}>Needle & Thread</Text>
                    <Text style={style.h2Text}>Newsletter</Text>
                    <Text style={style.h5Text}>Get free tips, tricks, and patterns. Its Free!</Text>
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
            </ScrollView>
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
        marginTop: 50
    },
    h2Text: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20,
        fontFamily: "Quicksand_600SemiBold",
        fontSize: 36
       
    },
    h5Text: {
        textAlign: "center",
        marginBottom: 30,
        width: 300,
        fontFamily: "Quicksand_600SemiBold",
        fontSize: 20
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
        marginVertical: 25
    }

    
});

export default Newsletter;