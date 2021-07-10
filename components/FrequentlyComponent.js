import React, { Component, useState } from "react";
import { ScrollView, View, FlatList, StyleSheet } from "react-native";
import { Text, ListItem, Icon } from "react-native-elements";
import { SwipeRow } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux"; 
import Loading from "./LoadingComponent";
import { Quicksand_400Regular, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";



const mapStateToProps = state => {
    return {
        frequently: state.frequently
    };
};

function RenderQuestion({questions, navigate}) {
    const returnItem = questions.map(item => {
        return(
            <SwipeRow rightOpenValue={-300} style={style.swipeRow} key={item.id}>
                <View style={style.deleteView}>							
                    <TouchableOpacity
                        style={style.deleteTouchable}
                    >
                    <Text style={style.deleteText}>{item.answer}</Text> 
                    </TouchableOpacity>
                </View>
                <View>
                    <ListItem
                        key={item.id}
                        containerStyle={style.listItemContainer}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={style.titleStyle}>{item.question}</ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            name="arrow-left"
                            type="font-awesome-5"
                            style={style.iconStyle}
                        />
                    </ListItem>
                </View>
            </SwipeRow>
        );
    });
    return returnItem;
}


class Frequently extends Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: false,
            fontsLoaded: {
                Quicksand_400Regular, 
                Quicksand_600SemiBold
            }
        }
    }

    static navigationOptions = {
        title: "Frequently Asked Questions"
    }

    render() {
        const { navigate } = this.props.navigation;
        
        if(this.props.frequently.isLoading){
            return <Loading />
        }

        return(
            <ScrollView>
                <RenderQuestion
                    questions={this.props.frequently.frequently}
                    navigate={navigate}
                />
            </ScrollView>
        );
    }
}

const style = StyleSheet.create({
    listItemContainer: {
        height: 250
    },
    titleStyle: {
        fontSize: 30,
        fontFamily: "Quicksand_600SemiBold",
        textAlign: "center"
    },
    deleteView: {
        justifyContent: "center",
        alignItems: "flex-end",
        flex: 1,
        backgroundColor: "#faeddd",
        paddingRight: 20
    },
    deleteText: {
        color: "black",
        fontWeight: "700",
        textAlign: "center",
        fontSize: 20,
        width: 240,
        fontFamily: "Quicksand_400Regular",

    },
    iconStyle: {
        color: "black",
        height: 40,
        fontWeight: "bold"
    }
});

export default connect(mapStateToProps)(Frequently);