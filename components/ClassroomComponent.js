import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView, StyleSheet, Modal} from "react-native";
import { Text, ListItem, Input, Button, Icon, Avatar } from "react-native-elements";
import YoutubePlayer from 'react-native-youtube-iframe';
import {baseUrl} from "../shared/baseUrl";
import { postComment } from "../redux/ActionCreators";
import * as MailComposer from "expo-mail-composer";
import { Quicksand_400Regular, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";

const mapStateToProps = state => {
    return{
        classInfo: state.classInfo,
        comments: state.comments,
        classList: state.classList
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
            <Text style={style.commentTitle}>Comments</Text>
            {commentList}
        </View>
    );   
    
    }

    function RenderClassMates(props){
        const { classMates } = props;
        const classM = classMates.map(classMate => {
            return(
                <ListItem 
                    key={classMate.id}
                    topDivider
                    bottomDivider    
                >
                    <ListItem.Content>
                        <ListItem.Title style={style.commentHeader}>{classMate.name}</ListItem.Title>
                    </ListItem.Content>
                    <Icon
                        name="envelope-square"
                        type="font-awesome-5"
                        onPress={() => props.onEmail()}
                    />
                </ListItem>
            );
        });

        return(
            <View>
                {classM}
            </View>
        );
    }

class Classroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing:  false,
            header: "",
            body: "",
            showModal: false,
            fontsLoaded: {
                Quicksand_400Regular,
                Quicksand_600SemiBold
            }
        }
    }

    togglePlaying() {
        this.setState({playing: !this.state.playing});
    }
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
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

    emailClass(classTitle) {
        MailComposer.composeAsync({
            recipients: ["nastasha.leach@outlook.com"],
            subject: `A Note from your ${classTitle} classmate`,
            body: "Note for class mate"
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
        const classMates = this.props.classList.classList.filter(classmate => classmate.courseId === +classId);
        
        return(
            <ScrollView>
                <RenderVideo classStuff={classStuff} />
                <RenderComments comments={comments} />
                <View>{this.newComment(classId)}</View>
                <View>
                    <Button
                        title="Classmates"
                        onPress={() => this.toggleModal()}
                        buttonStyle={style.modalButton}
                    />
                </View>
                <Modal
                    visible={this.state.showModal}
                    transparent={false}
                    animationType={"slide"}
                >
                    <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}} style={style.modalView}>
                        <View>
                            <Text style={style.modalTitle}>{classStuff.title}</Text>
                            <Text style={style.modalSubtitle}>Your Class Mates</Text>
                        </View>
                        <View>
                            <RenderClassMates 
                                classMates={classMates}
                                onEmail={() => this.emailClass(classStuff.title)} />
                        </View>

                        <Button
                            title="Close"
                            onPress={() => this.toggleModal()}
                            buttonStyle={style.modalButton}
                            containerStyle={style.buttonContainer}
                        />

                    </ScrollView>
                </Modal> 
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
    },
    modalView: {
        backgroundColor: "#faeddd"
    },
    modalTitle: {
        textAlign: "center",
        fontSize: 36,
        marginVertical: 20,
        fontFamily: "Quicksand_600SemiBold"
    },
    modalSubtitle: {
        textAlign: "center",
        fontSize: 24,
        fontFamily: "Quicksand_400Regular"
    },
    modalButton: {
        width: 120,
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: 10
    },
    buttonContainer: {
        width: 120,
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: 10
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Classroom);