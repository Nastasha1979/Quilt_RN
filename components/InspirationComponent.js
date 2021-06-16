import React, { Component } from "react";
import { View, Text } from "react-native";


class Inspiration extends Component {
    
    static navigationOptions = {
        title: "Inspiration"
    }

    render() {
        return(
            <View>
                <Text>In Inspiration Component</Text>
            </View>
        );
    }
}

export default Inspiration;