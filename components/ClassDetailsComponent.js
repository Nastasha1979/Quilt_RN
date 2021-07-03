import React, { Component } from "react";
import { View, ScrollView, StyleSheet, Modal, Switch } from "react-native";
import { Text, Button, Tile, Icon, Input } from "react-native-elements";
import { postFavoriteClass } from "../redux/ActionCreators";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postSignUp } from "../redux/ActionCreators";

const mapStateToProps = state => {
    return{
        classInfo: state.classInfo,
        favoritesClass: state.favoritesClass,
        classList: state.classList
    };
};

const mapDispatchToProps = {
    postFavoriteClass: classInfoId => (postFavoriteClass(classInfoId)),
    postSignUp: (course, name, signUp, isEnabled) => (postSignUp(course, name, signUp, isEnabled)),
}



function RenderClass(props){

    const { classStuff } = props;


    if(classStuff){

        const DataTable= [
            ["Instructor", classStuff.instructor, ],
            ["Cost", classStuff.cost],
            ["Level", classStuff.level],
            ["Location", classStuff.location],
            ["Date", classStuff.date],
            ["Materials Provided", classStuff.materialsProvided.map(mP => {return(mP + " \n")})]
        ];

        

        return(
            <ScrollView>
                <Tile 
                    key={classStuff.id}
                    imageSrc={{uri: baseUrl + classStuff.picUrl}}
                    title={classStuff.title}
                    featured
                    titleStyle={style.tileTitle}
                />
                <View> 
                    <Icon
                        name={props.favorite ? "heart": "heart-o"}
                        type="font-awesome"
                        raised
                        reversed
                        onPress={() => props.favorite ? console.log("Already Set as a favorite") : props.markFavorite()}
                    /> 
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
                <View style={style.descriptionContainer}>
                    <Text style={style.descriptionHead}>What You'll Learn</Text>
                    <Text h5 style={style.descriptionText}>
                        {classStuff.description}
                    </Text>
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


    static navigationOptions = {
        title: "Class Detail"
    }

    markFavorite(classInfoId) {
        this.props.postFavoriteClass(classInfoId);
    }

    courseSignUp(course) {
        if(this.state.signUp === true){
            this.props.postSignUp(course, this.state.name, this.state.signUp, this.state.isEnabled);
        } else {
            console.log("The user didnt' sign up for the course.");
        }
    }

    render() {
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
                    onUnenroll={() => this.toggleSignUp()}
                />

                <Modal
                    transparent={false}
                    animationType={"fade"}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                    style={style.modal} 
                >
                    <View><Text h4>{`Sign up for ${classStuff.title}`}</Text></View>
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
                                this.courseSignUp(classStuff.title)
                                this.toggleModal()
                            
                            }}
                        />
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
    buttonView: {
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center"
    },
    button: {
        backgroundColor: "#faeddd",
        width: 125,
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
        padding: 16,
        
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
    descriptionContainer: {
        
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
        margin: 10,
        flexDirection: "row"
    },
    modalTitle: {
        fontSize: 18,
        alignItems: "center",
        justifyContent: "center"
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
        transform: [{scaleX: 1.0}, {scaleY: 1.3}],
        paddingLeft: 50
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetail);