import React, { Component } from "react";
import { View, ScrollView, StyleSheet, Modal, Switch, Share, Alert, ToastAndroid } from "react-native";
import { Text, Button, Tile, Icon, Input } from "react-native-elements";
import { postFavoriteClass, postSignUp, searchSignUp } from "../redux/ActionCreators";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";

const mapStateToProps = state => {
    return{
        classInfo: state.classInfo,
        favoritesClass: state.favoritesClass,
        classList: state.classList
    };
};

const mapDispatchToProps = {
    postFavoriteClass: classInfoId => (postFavoriteClass(classInfoId)),
    postSignUp: (course, name, signUp, courseId) => (postSignUp(course, name, signUp, courseId)),
    searchSignUp: (classInfo) => (searchSignUp(classInfo))
}



function RenderClass(props){

    const { classStuff } = props;

    if(props.isLoading){
        return <Loading />
    }

    if(classStuff){

        const DataTable= [
            ["Cost", classStuff.cost],
            ["Level", classStuff.level],
            ["Location", classStuff.location],
            ["Materials Provided", classStuff.materialsProvided.map(mP => {return("-" + mP + " \n")})]
        ];

        const shareClass = (title, description, instructor, url, cost, id) => {
            Share.share({
                title,
                message: `Hey Check out this class! \n\n${title}: \n\nInstructor: ${instructor} \n\nDescription: ${description} \n\nCost: ${cost}. \n\n It's hosted by Needle & Thread. Sign Up Here: ${baseUrl + "classInfo/" + id}`,
                url
            },
            {
                dialogTitle: "Share " + title
            });
        };

        return(
            <ScrollView>
                <Tile 
                    key={classStuff.id}
                    imageSrc={{uri: baseUrl + classStuff.picUrl}}
                    title={classStuff.title}
                    featured
                    titleStyle={style.tileTitle}
                />
                <View style={style.iconView}> 
                    <Icon
                        name={props.favorite ? "heart": "heart-o"}
                        type="font-awesome"
                        raised
                        reversed
                        onPress={() => props.favorite ? console.log("Already Set as a favorite") : props.markFavorite()}
                    />
                    <Icon
                        name="share"
                        type="font-aweosome" 
                        raised
                        reversed
                        onPress={() => shareClass(classStuff.title, classStuff.description, classStuff.instructor, classStuff.picUrl, classStuff.cost, classStuff.id)}
                    />
                </View>
                <View style={style.descriptionContainer}>
                    <Text style={style.details}>Your Instructor: {classStuff.instructor}</Text>
                    <Text style={style.details}>When: {classStuff.date}</Text>
                    <Text style={style.descriptionHead}>What You'll Learn</Text>
                    <Text h5 style={style.descriptionText}>
                        {classStuff.description}
                    </Text>
                </View>
                <View style={style.tableContainer}>
                    <Table style={style.outerTable} borderStyle={style.borderStyle}>
                        <TableWrapper style={style.tableWrapper}>
                            <Rows
                                data={DataTable}
                                style={style.rowData}
                                textStyle={style.textStyle}
                            />
                        </TableWrapper>   
                    </Table>
                </View> 
                {!props.signUp &&
                    <Button
                        title="Sign Up"
                        type="solid"
                        buttonStyle={style.button}
                        titleStyle={style.buttonTitle}
                        onPress={() => {props.onShowModal()}}
                    />
                }
                {props.signUp &&
                    <View style={style.buttonView}>
                        <Button
                            title="Go To Class"
                            type="solid"
                            buttonStyle={style.button}
                            titleStyle={style.buttonTitle}
                            onPress={() => props.navigate("Classroom", {classId: classStuff.id })}
                        />
                        <Button
                            title="Unenroll"
                            type="solid"
                            buttonStyle={style.button}
                            titleStyle={style.buttonTitle}
                            onPress={() => props.onUnenroll()}
                        />
                    </View> 
                }
            </ScrollView>
        );
    }
    return <Text>Error</Text>

}

class ClassDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            signUp: false,
            name: "",
            isEnabled: false
        }
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    
    toggleSignUp() {
        this.setState({signUp: !this.state.signUp});  
    }

    unenroll(classInfo) {
        this.props.searchSignUp(classInfo);
        (Platform.OS === "ios")
                ? Alert.alert(`You have been unenrolled from the course.`)
                : ToastAndroid.show(`You have been unenrolled from the course`, ToastAndroid.LONG);
        this.toggleSignUp();
    }

    static navigationOptions = {
        title: "Class Detail"
    }

    markFavorite(classInfoId) {
        this.props.postFavoriteClass(classInfoId);
    }

    courseSignUp(course, courseId) {
        if(this.state.signUp === true){
            this.props.postSignUp(course, this.state.name, this.state.signUp, courseId );
            (Platform.OS === "ios")
                ? Alert.alert(`You have signed up for ${course}.`)
                : ToastAndroid.show(`You have signed up for ${course}`, ToastAndroid.SHORT)
        } else {
            console.log("The user didnt' sign up for the course.");
        }
    }

    render() {
        if(this.props.classInfo.isLoading){
            return <Loading />
        }
        const classId = this.props.navigation.getParam("classId");
        const classStuff = this.props.classInfo.classInfo.filter(classInfo => classInfo.id === +classId)[0];
        const { navigate } = this.props.navigation;
        const toggleSwitch = () => {this.setState({isEnabled: !this.state.isEnabled});}
        return(
            <View style={style.wholeView}>
                <RenderClass 
                    classStuff={classStuff} 
                    navigate={navigate} 
                    markFavorite={() => this.markFavorite(classId)} 
                    favorite={this.props.favoritesClass.includes(classId)}
                    onShowModal={() => this.toggleModal()}
                    signUp={this.state.signUp}
                    onUnenroll={() => this.unenroll(this.props.classInfo.classInfo)}
                    isLoading={this.props.classInfo.isLoading}
                />

                <Modal
                    transparent={false}
                    animationType={"fade"}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                    
                >
                    <View style={style.modal}>
                        <View style={style.modalTitleView}>
                            <Text style={style.modalTitle}>{`Sign up for ${classStuff.title}`}</Text>
                            <Text style={style.modalSubtitle}>{`Instructor: ${classStuff.instructor}`}</Text>
                            <Text style={style.modalSubtitle}>{`${classStuff.date}`}</Text>
                        </View>
                        <View>
                            <Input
                                    placeholder="User Name"
                                    leftIcon={
                                        <Icon   
                                            name="user-o"
                                            type="font-awesome"
                                        />
                                    } 
                                    onChangeText={value => this.setState({name: value})}
                                    value={this.state.name}
                                    containerStyle={style.modalInput}
                            />
                        </View>
                        <View style={style.modal}>
                            <Text style={style.modalTitle}>Sign Up?</Text>
                            
                                <Switch 
                                trackColor={{false: "red", true: "green"}}
                                onValueChange={() => {
                                        toggleSwitch
                                        this.toggleSignUp()
                                    }}
                                    value={this.state.signUp}
                                    style={style.switch}
                                />
                        </View>
                        <View style={style.modalButtons}>
                            <Button
                                    title="Cancel"
                                    type="outline"
                                    color="gray"
                                    onPress={() => this.toggleModal()}
                                />
                                <Button
                                    title="Submit"
                                    type="solid"
                                    color="blue"
                                    onPress={() => {
                                        this.courseSignUp(classStuff.title, classStuff.id)
                                        this.toggleModal()
                                    
                                    }}
                                />
                        </View>
                   </View>
                </Modal>
            </View>

        );
    }
}


const style = StyleSheet.create({
    wholeView: {
        flex: 1
    },
    iconView: {
        flexDirection: "row",
        justifyContent: "center"
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center"
    },
    button: {
        backgroundColor: "#faeddd",
        width: 130,
        justifyContent: "center",
        alignSelf: "center",
        margin: 10
    },
    buttonTitle: {
        color: "black"
    },  
    tileTitle: {
        color: "black",
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#fff",
        borderRadius: 5
    },
    tableContainer: {
        flex: 1,
        padding: 14,
        
    },
    outerContainer: {
        borderWidth: 2,
        borderColor: "#c8e1ff",
    },
    outerTable: {
        
    },
    borderStyle: {
        borderWidth: 1, 
        borderColor: "black"
    },
    rowData: {
        justifyContent: "center"
    },
    textStyle: {
        fontSize: 18,
        textAlign: "left",
        textAlignVertical: "center",
        // fontWeight: "bold",
        paddingLeft: 5
    }, 
    details: {
        fontSize: 15,
        margin: 10,
        fontWeight: "700"
    },
    descriptionText: {
        textAlign: "center",
        fontSize: 18,
        margin: 15
    },
    descriptionHead: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 5
    },
    modal: {
        padding: 10,
        flex: 1,
        backgroundColor: "#faeddd"
    },
    modalTitleView: {
        alignItems: "center",
        justifyContent: "center"
    },
    modalTitle: {
        fontSize: 24,
        marginVertical: 30,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    },
    modalSubtitle: {
        fontSize: 16,
        paddingBottom: 20
    },  
    modalInput: {
        paddingTop: 30
    },
    modalButtons: {
        flexDirection: "row",
        width: "30%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 25
    },
    switch: {
        alignSelf: "center",
        justifyContent: "center",
        transform: [{ scaleX: 2 }, { scaleY: 2 }]
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetail);