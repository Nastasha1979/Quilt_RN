import React, { Component } from "react";
import { ScrollView, View, FlatList } from "react-native";
import { Text, ListItem } from "react-native-elements";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { connect } from "react-redux"; 
import Loading from "./LoadingComponent";

const mapStateToProps = state => {
    return {
        frequently: state.frequently
    };
};

class Frequently extends Component {
    constructor(props){
        super(props);
    }

    render() {

        const RenderFrequently = ({item}) => {
            return(
                <ListItem >  
                    <ListItem.Content>
                        <ListItem.Title>{item.question}</ListItem.Title>
                        <ListItem.Subtitle>{item.answer}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color="black"/>  
                </ListItem>
            );
        }

        return(
            <ScrollView>
                <Text>Frequently Asked Questions</Text>
                <FlatList
                    data={this.props.frequently.frequently}
                    renderItem={RenderFrequently}
                    keyExtractor={item => item.id.toString()}
                />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Frequently);