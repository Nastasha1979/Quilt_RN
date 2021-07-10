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
    postComment: (classId, header, body) => (postComment(classId, header, body))
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
            header: "",
            body: ""
        }
    }

    togglePlaying() {
        this.setState({playing: !this.state.playing});
    }

    handleComment(classId) {
        this.props.postComment(classId, this.state.header, this.state.body);
        console.log(classId, this.state.header, this.state.body);
    }

    resetForm() {
        this.setState({
            header: "",
            body: ""
        });
    }

    newComment = (classId) => {
        return(
            <View style={style.inputView}>
                <Input
                    placeholder='Your Comment Title'
                    onChangeText={value => this.setState({header: value})}
                    value={this.state.header}
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
                        this.handleComment(classId)
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
                <View>{this.newComment(classId)}</View>
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