import React, { Component } from "react";
import { View, Text } from "react-native";


class Newsletter extends Component {
    
    static navigationOptions = {
        title: "Newsletter"
    }

    render() {
        return(
            <View>
                <Text>In Newsletter Component</Text>
            </View>
        );
    }
}

export default Newsletter;