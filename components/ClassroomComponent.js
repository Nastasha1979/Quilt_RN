import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import YoutubePlayer from 'react-native-youtube-iframe';

const mapStateToProps = state => {
    return{
        classInfo: state.classInfo
    };
};

function RenderVideo({classStuff}) {
    return(
        <ScrollView>
            <View>
                <Text h4>{classStuff.title}</Text>
            </View>
            <View>
                <YoutubePlayer
                    height={500}
                    play={false}
                    videoId={classStuff.youtube}
                />
            </View>
        </ScrollView>


    );
}

class Classroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing:  false
        }
    }

    togglePlaying() {
        this.setState({playing: !this.state.playing});
    }
    
    static navigationOptions = {
        title: "Classroom"
    }

    render(props) {
        const classId = this.props.navigation.getParam("classId");
        const classStuff = this.props.classInfo.classInfo.filter(classInfo => classInfo.id === +classId)[0];
        return(
            <View>
                <RenderVideo classStuff={classStuff} />
            </View>
        );
    }
}

export default connect(mapStateToProps)(Classroom);