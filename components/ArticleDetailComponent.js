import React, { Component } from "react";
import { View , Text } from "react-native";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = state => {
    return{
        articles: state.articles
    };
};

class ArticleDetail extends Component {

    render(){
        const articleId = this.props.navigation.getParam("articleId");
        const article = this.props.articles.articles.filter(article => article.key === +articleId)[0];
        return(
            <View>
                <Text>{article.title}</Text>
            </View>
        );
    }
}

export default connect(mapStateToProps)(ArticleDetail);