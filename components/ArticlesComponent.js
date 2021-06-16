import React, { Component } from "react";
import { View, Text } from "react-native";


class Articles extends Component {
    
    static navigationOptions = {
        title: "Articles"
    }

    render() {
        return(
            <View>
                <Text>In Articles Component</Text>
            </View>
        );
    }
}

export default Articles;