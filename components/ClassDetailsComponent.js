import React, { Component, useState } from "react";
import { View, FlatList, ScrollView, StyleSheet } from "react-native";
import { Text, ListItem, Button, Tile } from "react-native-elements";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = state => {
    return{
        classInfo: state.classInfo
    };
};


function RenderClass({classStuff, navigate}){
    const [button, toggleButton] = useState(true);

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
                <View style={style.tableContainer}>
                    <Table style={style.outerTable} borderStyle={{borderWidth: 1, borderColor: "black"}}>
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
                <Button
                    title="Sign Up"
                    type="solid"
                    buttonStyle={style.button}
                    titleStyle={style.buttonTitle}
                />
                <Button
                    title="Go To Class"
                    type="solid"
                    buttonStyle={style.button}
                    titleStyle={style.buttonTitle}
                    onPress={() => navigate("Classroom", {classId: classStuff.id })}
                />
            </ScrollView>
        );
    }
    return <Text>Error</Text>

}

class ClassDetail extends Component {

    static navigationOptions = {
        title: "Class Detail"
    }


    render() {
        const classId = this.props.navigation.getParam("classId");
        const classStuff = this.props.classInfo.classInfo.filter(classInfo => classInfo.id === +classId)[0];
        const { navigate } = this.props.navigation;
        return(
            <View style={style.wholeView}>
                <RenderClass classStuff={classStuff} navigate={navigate}/>
            </View>

        );
    }
}


const style = StyleSheet.create({
    wholeView: {
        flex: 1
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
        padding: 16
    },
    outerContainer: {
        borderWidth: 2,
        borderColor: "#c8e1ff"
    },
    tableWrapper: {

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
    }

})

export default connect(mapStateToProps)(ClassDetail);