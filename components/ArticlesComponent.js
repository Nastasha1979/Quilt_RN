import React, { Component } from "react";
import { ScrollView, FlatList, StyleSheet, View } from "react-native";
import { ListItem, Text } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Quicksand_400Regular, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";

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
                <ListItem onPress={() => navigate("ArticleDetail", {articleId: item.key})}>  
                    <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                        <ListItem.Subtitle>{item.author}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color="black"/>  
                </ListItem>
                  

            );
        }

        return(
            <ScrollView>
                <Text h2 style={style.topTitle}>Current Articles</Text>
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

    },
    topTitle: {
        alignSelf: "center",
        justifyContent: "center",
        fontFamily: "Quicksand_600SemiBold"
    },
    articleTitle: {

    },
    articleAuthor: {

    }
});

export default connect(mapStateToProps)(Articles);