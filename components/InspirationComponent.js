import React, { Component } from "react";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";
import { View, Text, ScrollView, FlatList } from "react-native";
import { Tile, ListItem } from "react-native-elements";


const mapStateToProps = state => {
    return{
        carousel: state.carousel,
    };
};

class Inspiration extends Component {
    
    static navigationOptions = {
        title: "Inspiration"
    }

    

    render() {
        const { navigate } = this.props.navigation;

        const renderTiles = ({item}) => {
                return(
                    <Tile
                        imageSrc={{ uri: baseUrl + item.src}}
                        featured
                        title={item.header}
                        caption={item.caption}
                        onPress={() => navigate("InspireDetail", { 
                            pictureId: item.key 
                        })}
                    />
    
                );
        };

        return(
            <ScrollView>
                <FlatList
                    data={this.props.carousel.carousel}
                    renderItem={renderTiles}
                    keyExtractor={item => item.key.toString()}
                />

            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Inspiration);