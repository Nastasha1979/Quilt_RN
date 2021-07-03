import React, { Component } from "react";
import { ScrollView, FlatList, StyleSheet, View} from "react-native";
import { ListItem, Text, Avatar } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { Quicksand_400Regular, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";

const mapStateToProps = state => {
    return{
        articles: state.articles
    };
};


class Articles extends Component {
    constructor(props){
        super(props);
        this.state ={
            expanded: false,
            fontsLoaded: {
                Quicksand_400Regular, 
                Quicksand_600SemiBold
            }
        }
        this.toggleExpanded = this.toggleExpanded.bind(this);
    }

    toggleExpanded() {
        this.setState({expanded: !this.state.expanded});
    }

    static navigationOptions = {
        title: "Articles"
    }

    render() {
        const { navigate } = this.props.navigation;
        const RenderArticles = ({item}) => {
            return( 
                <ListItem onPress={() => navigate("ArticleDetail", {articleId: item.key})} containerStyle={style.listItemStyle}>
                    <Avatar source={{uri: baseUrl + item.pic}} rounded/>  
                    <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                        <ListItem.Subtitle>{item.author}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color="black"/>  
                </ListItem>
                  

            );
        }

        return(
            <ScrollView style={style.wholeContainer}>
                <Text style={style.topTitle}>Current Articles</Text>
                <FlatList
                    data={this.props.articles.articles}
                    renderItem={RenderArticles}
                    keyExtractor={item => item.key.toString()}
                />
            </ScrollView>
        );
    }
}

const style = StyleSheet.create({
    wholeContainer: {
        backgroundColor: "#faeddd",
    },
    listItemStyle: {
        marginHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        marginVertical: 15
    },
    topTitle: {
        alignSelf: "center",
        justifyContent: "center",
        fontFamily: "Quicksand_600SemiBold",
        marginVertical: 10,
        fontSize: 30
    },
    articleTitle: {
        fontFamily: "Quicksand_600SemiBold",
    },
    articleAuthor: {
        fontFamily: "Quicksand_400Regular"
    }
});

export default connect(mapStateToProps)(Articles);