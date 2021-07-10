import React, { Component } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text, Button, Icon } from "react-native-elements";
import * as MailComposer from "expo-mail-composer";
import { Quicksand_400Regular, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import call from "react-native-phone-call";

class AboutTab extends Component {
    constructor(props){
        super(props);
        this.state = {
            Quicksand_400Regular,
            Quicksand_600SemiBold
        }
    }

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon
                name="universal-access"
                type="font-awesome-5"
                iconStyle={{color: tintColor}}
            />
        )
    }

    
    render() {
        const { navigate } = this.props.navigation;
        return(
            <ScrollView style={style.container}>
                <Card>
                    <Text style={style.mainTitle}>We are Quilt Lovers!</Text>
                    <Text style={style.additionalText}>I am a hobby quilters who wishes to share knowledge to any and all who want it. Please browse our app in whatever way works for you and participate with other quilt-lovers. Take advantage of our classes to upgrade your skills or sign up four our newsletter for tips sent straight to your inbox!</Text>
                    <View style={style.iconView}>
                        <Icon
                            name="chalkboard-teacher"
                            type="font-awesome-5"
                            raised
                            containerStyle={style.newsletterIconContainer}
                            iconStyle={style.newsletterIconStyle}
                            onPress={() => navigate("Classes")}
                        />
                        <Icon
                            name="plus-square"
                            type="font-awesome-5"
                            raised
                            containerStyle={style.newsletterIconContainer}
                            iconStyle={style.newsletterIconStyle}
                            onPress={() => navigate("Newsletter")}
                        />
                    </View>
                </Card>
            </ScrollView>
        );
    }
}

class ContactTab extends Component {
    constructor(props){
        super(props);
        this.state = {
            Quicksand_400Regular,
            Quicksand_600SemiBold
        }
    }

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon
                name="envelope"
                type="font-awesome-5"
                iconStyle={{color: tintColor}}
            />
        )
    }

    contactUs() {
        MailComposer.composeAsync({
            recipients: ["nastasha.leach@outlook.com"],
            subject: "Needle & Thread Inquiry",
            body: "My Message to Needle & Thread: \n\nThank you for contacting us. We will respond within 2 business days."
        });
    }

    callUs() {
        const args = {
            number: "2107639873",
            prompt: true
        };
        
        call(args).catch(console.error);
    }

    render() {
        return(
            <ScrollView style={style.container}>
                <Card
                    containerStyle={style.cardContainer}
                >
                    <Text style={style.mainTitle}>Contact</Text>
                    <Text style={style.additionalText}>123 Main Street San Antonio, TX 78229</Text>
                    <Button 
                        title="Email Us"
                        icon={
                            <Icon
                            name="envelope"
                            type="font-awesome-5"
                            iconStyle={{margin: 5}}
                            />
                        }
                        buttonStyle={style.buttonStyle}
                        titleStyle={style.btnTitleStyle}
                        onPress={() => this.contactUs()}
                    />
                    <Button
                        title="Call Us"
                        icon={
                            <Icon
                                name="phone"
                                type="font-awesome-5"
                                iconStyle={{margin: 5}}
                            />
                        }
                        buttonStyle={style.buttonStyle}
                        titleStyle={style.btnTitleStyle}
                        onPress={() => this.callUs()}
                    /> 
                </Card>
            </ScrollView>
        );
    }
}

const About = createMaterialTopTabNavigator(
    {
        About: AboutTab,
        Contact: ContactTab
    },
    {
        tabBarOptions: {
            activeTintColor: "#000000",
            inactiveTintColor: "#808080",
            labelStyle: {fontSize: 16, fontWeight: "bold"},
            showIcon: true,
            style: {backgroundColor: "#faeddd", height: 70}
        }
    }
);

const style = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#faeddd", 
        justifyContent: "center", 
        alignSelf: "center",
        marginVertical: 15
    },
    btnTitleStyle: {
        color: "black",
        fontFamily: "Quicksand_400Regular"
    },
    mainTitle: {
        fontSize: 30,
        fontFamily: "Quicksand_600SemiBold",
        textAlign: "center"
    },
    additionalText: {
        fontSize: 20,
        fontFamily: "Quicksand_400Regular",
        textAlign: "center"
    },
    iconView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        flex: 1
    },
    cardContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    newsletterIconContainer: {
        alignSelf: "center",
        justifyContent: "center"
    },
    newsletterIconStyle: {
        color: "#e29638"
    }

})
export default About;