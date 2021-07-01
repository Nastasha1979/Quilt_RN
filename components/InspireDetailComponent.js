import React, { Component } from "react";
import { ScrollView, View, Modal, Image, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import ImageZoom from "react-native-image-pan-zoom";
import { NavigationEvents } from "react-navigation";
import { Button, Text } from "react-native-elements";

const mapStateToProps = state => {
    return{
        carousel: state.carousel,
    };
};



class InspireDetail extends Component {
    constructor(props) {
        super(props);
        this.state ={
            showModal: true
        }
    }
    static navigationOptions = {
        title: "Inspiration - Detail"
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    render() {
        const { navigate } = this.props.navigation;
        const pictureId = this.props.navigation.getParam("pictureId");
        const inspire = this.props.carousel.carousel.filter(inspire => inspire.key === +pictureId)[0];
        return(
            <Modal 
                visible={true} 
                transparent={false}
                animationType={"fade"}    
            >
                <ScrollView>
                    <Text h2>{inspire.header}</Text>
                    <Text h3>{inspire.caption}</Text>
                    <ImageZoom
                        cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height - 250}
                        imageWidth={400}
                        imageHeight={400}
                    >
                        <Image
                            source={{uri: baseUrl + inspire.src}}
                            style={{width: 400, height: 400}}
                        />
                    </ImageZoom>
                    <Button
                        title="Close"
                        type="solid"
                        color="red"
                        onPress={() => navigate("Inspiration")}
                    />
                </ScrollView>
            </Modal>
        );
    }
}

const style = StyleSheet.create({
    modalBody: {

    }
})

export default connect(mapStateToProps)(InspireDetail);