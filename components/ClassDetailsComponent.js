import React, { Component } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { Card, Text, ListItem, Button } from "react-native-elements";
import CLASS_INFO from "../shared/ClassInfoData";



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
                    <Card.Image source={require('./assets/class1.jpg')} />   
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
            </ScrollView>
        );
    }
    return <Text>Error</Text>

}

class ClassDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classInfos: CLASS_INFO
        }
    }

    static navigationOptions = {
        title: "Class Detail"
    }


    render() {
        const classId = this.props.navigation.getParam("classId");
        const classStuff = this.state.classInfos.filter(classInfo => classInfo.id === +classId)[0];
        return(
            <View>
                <RenderClass classStuff={classStuff} />
            </View>

        );
    }
}

export default ClassDetail;