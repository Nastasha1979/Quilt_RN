import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Card, Text } from "react-native-elements";


class About extends Component {
    
    static navigationOptions = {
        title: "About Us"
    }

    render() {
        return(
            <ScrollView>
                <Card>
                    <Text h2>We are Quilt Lovers!</Text>
                    <Text h4>I am a hobby quilters who wishes to share knowledge to any and all who want it. Please browse our app in whatever way works for you and participate with other quilt-lovers</Text>
                    
                </Card>
                <Card>
                    <Text h2>Contact</Text>
                    <Text h4>123 Main Street San Antonio, TX 78229</Text>
                    <Text h4>NeedleAndThread@email.com</Text>
                </Card>
            </ScrollView>
        );
    }
}

export default About;