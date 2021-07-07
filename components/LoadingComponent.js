import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";


function Loading() {
    return(
        <View style={style.loadingView}>
            <ActivityIndicator size={50} color="#faeddd" />
            <Text style={style.loadingText}>Loading Awesome Quilts Now...</Text>
        </View>
    );
}

const style = StyleSheet.create({
    loadingView: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    loadingText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black"
    }
});

export default Loading;