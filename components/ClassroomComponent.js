import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView, StyleSheet} from "react-native";
import { Text, ListItem, Input, Button, Icon, Avatar } from "react-native-elements";
import YoutubePlayer from 'react-native-youtube-iframe';
import {baseUrl} from "../shared/baseUrl";
import { postComment } from "../redux/ActionCreators";

const mapStateToProps = state => {
    return{
        classInfo: state.classInfo,
        comments: state.comments
    };
};

const mapDispatchToProps = {
    postComment: (classInfoId, heading, body) => (postComment(classInfoId, heading, body))
}

function RenderVideo({classStuff}) {
    return(
        <ScrollView>
            <View>
                <Text h4 style={style.title}>{classStuff.title}</Text>
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
            <ListItem 
                key={comment.id}
                topDivider
                bottomDivider    
            >
                <Avatar 
                    source={{uri: baseUrl + comment.avatar}} 
                    small
                    rounded   
                />
                <ListItem.Content>
                    <ListItem.Title style={style.commentHeader}>{comment.header}</ListItem.Title>
                    <ListItem.Subtitle>{comment.body}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    });
        

    return(
        <View>
            <Text h4 style={style.commentTitle}>Comments</Text>
            {commentList}
        </View>
    );
}


class Classroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing:  false,
            heading: "",
            body: ""
        }
    }

    togglePlaying() {
        this.setState({playing: !this.state.playing});
    }

    handleComment(classInfoId) {
        this.props.postComment(classInfoId, this.state.heading, this.state.body);
        console.log(classInfoId, this.state.heading, this.state.body);
    }

    resetForm() {
        this.setState({
            heading: "",
            body: ""
        });
    }

    newComment = ({classInfoId}) => {
        return(
            <View style={style.inputView}>
                <Input
                    placeholder='Your Comment Title'
                    onChangeText={value => this.setState({heading: value})}
                    value={this.state.heading}
                />
                <Input
                    placeholder="Your Comment"
                    multiline={true}
                    numberOfLines={3}
                    onChangeText={value => this.setState({body: value})}
                    value={this.state.body}
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
                    onPress={() => {
                        this.handleComment({classInfoId})
                        this.resetForm()
                    }}
                />
            </View>
        );
    }
    static navigationOptions = {
        title: "Classroom"
    }

    render(props) {
        const classId = this.props.navigation.getParam("classId");
        const classStuff = this.props.classInfo.classInfo.filter(classInfo => classInfo.id === +classId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.classId === +classId);   
        
        return(
            <ScrollView>
                <RenderVideo classStuff={classStuff} />
                <RenderComments comments={comments} />
                <View>{this.newComment(classStuff.id)}</View>
            </ScrollView>
        );
    }
}

const style = StyleSheet.create({

    title: {
        textAlign: "center",
        paddingVertical: 25,
        backgroundColor: "#faeddd"         
    },
    commentTitle: {
        textAlign: "center",
        marginBottom: 20
    },
    inputView: {
        marginVertical: 25
    },
    commentHeader: {
        fontWeight: "bold"
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Classroom);