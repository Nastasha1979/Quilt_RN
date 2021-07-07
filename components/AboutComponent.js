import React, { Component } from "react";
import { ScrollView, StyleSheet} from "react-native";
import { Card, Text, Button, Icon } from "react-native-elements";
import * as MailComposer from "expo-mail-composer";
import { Quicksand_400Regular, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";

class About extends Component {
    constructor(props){
        super(props);
        this.state = {
            Quicksand_400Regular,
            Quicksand_600SemiBold
        }
    }
    static navigationOptions = {
        title: "About Us"
    }

    contactUs() {
        MailComposer.composeAsync({
            recipients: ["nastasha.leach@outlook.com"],
            subject: "Needle & Thread Inquiry",
            body: "My Message to Needle & Thread: \n\nThank you for contacting us. We will respond within 2 business days."
        });
    }
    render() {
        return(
            <ScrollView style={style.container}>
                <Card>
                    <Text style={style.mainTitle}>We are Quilt Lovers!</Text>
                    <Text style={style.additionalText}>I am a hobby quilters who wishes to share knowledge to any and all who want it. Please browse our app in whatever way works for you and participate with other quilt-lovers</Text>
                    
                </Card>
                <Card>
                    <Text style={style.mainTitle}>Contact</Text>
                    <Text style={style.additionalText}>123 Main Street San Antonio, TX 78229</Text>
                    <Button 
                        title="Contact Us"
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
                </Card>
            </ScrollView>
        );
    }
}

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
    container: {
        flex: 1
    }

})
export default About;