import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { Image } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";


const mapStateToProps = state => {
    return{
        carousel: state.carousel
    };
};

function GetImage({inspire}){
    
    return(
        <View>
            <Image
                source={{uri: baseUrl + inspire.src}}
                style={{width: 400, height: 600, resizeMode: "stretch",}}
            />
            <Text>{inspire.header}</Text>
            <Text>{inspire.caption}</Text>
        </View>
    );
}



class InspireDetail extends Component {

    static navigationOptions = {
        title: "Inspiration - Detail"
    }

    render() {
        const pictureId = this.props.navigation.getParam("pictureId");
        const inspire = this.props.carousel.carousel.filter(inspire => inspire.key === +pictureId)[0];
        return(
            <ScrollView>
                <GetImage inspire={inspire} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(InspireDetail);