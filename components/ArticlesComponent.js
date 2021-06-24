import React, { Component } from "react";
import { ScrollView, FlatList } from "react-native";
import { ListItem, Text } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return{
        articles: state.articles
    };
};


class Articles extends Component {
    constructor(props){
        super(props);
        this.state ={
            expanded: false
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
                <ListItem
                    onPress={() => navigate("ArticleDetail", {articleId: item.id})}
                >   
                    <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                        <ListItem.Subtitle>{item.author}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        }

        return(
            <ScrollView>
                <Text h2>Current Articles</Text>
                <FlatList
                    data={this.props.articles.articles}
                    renderItem={RenderArticles}
                    keyExtractor={item => item.key.toString()}
                />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Articles);