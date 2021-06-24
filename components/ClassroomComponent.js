import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, ListItem, Input, Button, Icon } from "react-native-elements";
import YoutubePlayer from 'react-native-youtube-iframe';
import { FlatList } from "react-native-gesture-handler";

const mapStateToProps = state => {
    return{
        classInfo: state.classInfo,
        comments: state.comments
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
                    height={250}
                    play={false}
                    videoId={classStuff.youtube}
                />
            </View>
        </ScrollView>


    );
}

function RenderComments({comments}){
    const commentList = comments.map(comment => {
        return(
            <ListItem key={comment.id}>
                <ListItem.Content>
                    <ListItem.Title>{comment.header}</ListItem.Title>
                    <ListItem.Subtitle>{comment.body}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    });
        

    return(
        <View>
            <Text h4>Comments</Text>
            {commentList}
        </View>
    );
}

function PostComment(){
    return(
        <View>
            <Input
                placeholder='Your Comment'
            />
            <Button
                icon={
                    <Icon
                    name="edit"
                    type="font-awesome"
                    size={24}
                    />
                }
                title="Post Comment"
                type="clear"
            />
        </View>
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
        const comments = this.props.comments.comments.filter(comment => comment.classId === +classId);
        return(
            <View>
                <RenderVideo classStuff={classStuff} />
                <RenderComments comments={comments} />
                <PostComment />
            </View>
        );
    }
}

export default connect(mapStateToProps)(Classroom);