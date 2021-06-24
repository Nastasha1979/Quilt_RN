import React, { Component } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { Card, Text, ListItem, Button } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = state => {
    return{
        classInfo: state.classInfo
    };
};


function RenderClass({classStuff}){
    
    if(classStuff){
        const materials = ({item}) => {
            return <ListItem><Text h5>{item}</Text></ListItem>;           
        }

        return(
            <ScrollView>
                <Card 
                    key={classStuff.id}
                >
                    <Card.Title>{classStuff.title}</Card.Title>
                    <Card.Image source={{uri: baseUrl + classStuff.picUrl}} />   
                </Card>
                <View>
                    <Text h4>
                        Instructor: {classStuff.instructor}
                    </Text>
                    <Text h4>
                        Cost: {classStuff.cost}
                    </Text>
                    <Text h4>
                        Level: {classStuff.level}
                    </Text>
                    <Text h4>
                        Location: {classStuff.location}
                    </Text>
                    <Text h4>
                        Date: {classStuff.date}
                    </Text>
                    <Text h4>
                        Materials Provided:
                    </Text>
                    <View>
                        <FlatList
                            data={classStuff.materialsProvided}
                            renderItem={materials}
                            keyExtractor={item => item.indexOf().toString()}
                        /> 
                    </View>
                    <Text h3>
                        {classStuff.description}
                    </Text>
                </View>
                <Button
                    title="Sign Up"
                    type="solid"
                />
                <Button
                    title="Go To Class"
                    type="solid"
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
        return(
            <View>
                <RenderClass classStuff={classStuff} />
            </View>

        );
    }
}

export default connect(mapStateToProps)(ClassDetail);