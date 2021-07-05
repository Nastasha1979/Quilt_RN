import React, { Component } from "react";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";
import { View, Text, ScrollView, FlatList, StyleSheet, Modal, Alert } from "react-native";
import { Tile, ListItem, Icon, Button, Input } from "react-native-elements";
import { Quicksand_400Regular, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";

const mapStateToProps = state => {
    return{
        carousel: state.carousel,
    };
};



    

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
            src: ""
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
            `${this.state.caption}, Thank you for submitting ${this.state.header} from ${this.state.src}. We will review. Check back later to see your quilt.`,
            [
                {
                    text: "Ok",
                    onPress: () => {
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
            src: ""
        });
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
                            pictureId: item.key 
                        })}
                        captionStyle={style.caption}
                        titleStyle={style.topTitle}
                        overlayContainerStyle={style.contentContainerStyle}
                    />
    
                );
        };

        return(
            <ScrollView>
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
                    keyExtractor={item => item.key.toString()}
                />
                <Modal
                    visible={this.state.showModal}
                    transparent={false}
                    animationType={"slide"}
                    
                >
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
                            <Input
                                placeholder=" Temporary Image URL"
                                onChangeText={src => this.setState({src: src})}
                                value={this.state.src}
                                leftIcon={{
                                    type: "font-awesome-5",
                                    name: "address-book",
                                    color: "gray"
                                }}
                            />
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
        height: 100,
        width: 300,
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
        alignSelf: "center",
        justifyContent: "center",
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
        marginHorizontal: 10,
        paddingHorizontal: 15
    },
    modalBtnTitleStyle: {
        color: "black",
        fontFamily: "Quicksand_400Regular"
    },
    modalInputView: {
        marginVertical: 60,
        marginHorizontal: 10
    }
})

export default connect(mapStateToProps)(Inspiration);