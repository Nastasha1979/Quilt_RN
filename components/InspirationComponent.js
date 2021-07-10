import React, { Component } from "react";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";
import { postCarousel } from "../redux/ActionCreators";
import { View, Text, ScrollView, FlatList, StyleSheet, Modal, Alert, Image } from "react-native";
import { Tile, Icon, Button, Input } from "react-native-elements";
import { Quicksand_400Regular, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";
import * as ImagePicker from "expo-image-picker";

const mapStateToProps = state => {
    return{
        carousel: state.carousel,
    };
};

const mapDispatchToProps = {
    postCarousel: (header, caption, src) => (postCarousel(header, caption, src))
}



    

class Inspiration extends Component {
    constructor(props){
        super(props);
        this.state ={
            fontsLoaded: {
                Quicksand_400Regular, 
                Quicksand_600SemiBold
            },
            showModal: false,
            header: "",
            caption: "",
            uploadedImg: baseUrl + "assets/imageplaceholder.jpg"
        }
    }
    static navigationOptions = {
        title: "Inspiration"
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleSubmit() {
        Alert.alert(
            "Quilt Submission",
            `Thank you for submitting ${this.state.header} by ${this.state.caption}. We will review. Check back later to see your quilt.`,
            [
                {
                    text: "Ok",
                    onPress: () => {
                        this.props.postCarousel(this.state.header, this.state.caption, this.state.uploadedImg)
                        this.toggleModal()
                        this.resetForm()
                    }
                }
            ],
            {cancelable: false}
        )
    }
    
    resetForm() {
        this.setState({
            header: "",
            caption: "",
            uploadedImg: baseUrl + "assets/imageplaceholder.jpg"
        });
    }

    getImageFromDevice = async () => {
        const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(libraryPermission.status !== "granted"){
            Alert.alert("Sorry, we need camera roll permissions to upload an image.");
        }

        let newImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 2],
            quality: 1,
        });

        console.log(newImage);

        if(!newImage.cancelled){
            this.setState({uploadedImg: newImage.uri});
            console.log(newImage.uri);
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        const renderTiles = ({item}) => {
                return(
                    <Tile
                        imageSrc={{ uri: baseUrl + item.src}}
                        featured
                        title={item.header}
                        caption={item.caption}
                        onPress={() => navigate("InspireDetail", { 
                            pictureId: item.id 
                        })}
                        captionStyle={style.caption}
                        titleStyle={style.topTitle}
                        overlayContainerStyle={style.contentContainerStyle}
                    />
    
                );
        };


        return(
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
                <View style={style.viewIconContainerStyle}>
                    <Icon
                        name="plus"
                        type="font-awesome"
                        size={20}
                        color="green"
                        raised
                        onPress={() => this.toggleModal()}
                    />
                    <Text>Show Off Your Quilt Here</Text>
                </View>
                <FlatList
                    data={this.props.carousel.carousel}
                    renderItem={renderTiles}
                    keyExtractor={item => item.id.toString()}
                />
                <Modal
                    visible={this.state.showModal}
                    transparent={false}
                    animationType={"slide"}
                    
                >
                    <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
                    <View style={style.modalWhole}>
                        <Text style={style.modalHeader}>Upload You Quilt Creation</Text>
                        <View style={style.modalInputView}>
                            <Input 
                                placeholder=" Name of Your Quilt"
                                onChangeText={header => this.setState({header: header})}
                                value={this.state.header}
                                leftIcon={{
                                    type: "font-awesome-5",
                                    name: "paint-brush",
                                    color: "gray"
                                }}
                            />
                            <Input 
                                placeholder=" Your Name"
                                onChangeText={caption => this.setState({caption: caption})}
                                value={this.state.caption}
                                leftIcon={{
                                    type: "font-awesome-5",
                                    name: "signature",
                                    color: "gray"
                                }}
                            />
                            <View style={style.imgView}>
                                <Image
                                    source={{uri: this.state.uploadedImg}}
                                    style={style.modalImage}
                                />
                                <Button
                                    title="Upload Image"
                                    onPress={this.getImageFromDevice}
                                    buttonStyle={style.uploadBtn}
                                />
                            </View>
                        </View>
                        <View style={style.modalButtonView}>
                            <Button
                                title="Cancel"
                                onPress={() => {
                                    this.toggleModal()
                                    this.resetForm()
                                }}
                                buttonStyle={style.modalButton}
                                titleStyle={style.modalBtnTitleStyle}
                            />
                            <Button
                                title="Submit"
                                onPress={() => this.handleSubmit()}
                                buttonStyle={style.modalButton}
                                titleStyle={style.modalBtnTitleStyle}
                            />
                        </View>
                    </View>
                    </ScrollView>
                </Modal>
            </ScrollView>
        );
    }
}

const style = StyleSheet.create({
    topTitle: {
        fontFamily: "Quicksand_600SemiBold",
        fontSize: 24,
        color: "black"
    },
    caption: {
        fontFamily: "Quicksand_400Regular",
        fontSize: 16,
        color: "black"
    },
    contentContainerStyle: {
        borderWidth: 1,
        height: 130,
        width: 280,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fdf9f2",
        borderRadius: 5,
        marginTop: 80,
        marginLeft: 50,
        opacity: .75
        
    },
    viewIconContainerStyle: {
        backgroundColor: "#faeddd",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10
    },
    modalHeader: {
        textAlign: "center",
        fontSize: 30,
        fontFamily: "Quicksand_600SemiBold",
        paddingTop: 50
    },
    modalWhole: {
        backgroundColor: "#faeddd",
        flex: 1
    },
    modalButtonView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    modalButton: {
        backgroundColor: "#f3d6b1",
        marginHorizontal: 20,
        paddingHorizontal: 10
    },
    modalBtnTitleStyle: {
        color: "black",
        fontFamily: "Quicksand_400Regular"

    },
    modalInputView: {
        marginVertical: 60,
        marginHorizontal: 10
    },
    modalImage: {
        width: 300,
        height: 200
    },
    imgView: {
        alignItems: "center",
        justifyContent: "center"
    }
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Inspiration);