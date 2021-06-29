import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { Text, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavoriteArticle } from "../redux/ActionCreators";

const mapStateToProps = state => {
    return{
        articles: state.articles,
        favoritesArticle: state.favoritesArticle
    };
};

const mapDispatchToProps = {
    postFavoriteArticle: articleId => (postFavoriteArticle(articleId))
}

function RenderArticle(props){
    const { article } = props;
    const paragraphs = article.text.map(p => {
        return <Text h4>{p}</Text>;
    });
    if(article){
        return(
            <View>
                <View>
                    <Text h2>{article.title}</Text>
                </View>
                <Icon
                    name={props.favorite ? "heart" : "heart-o"}
                    type="font-awesome"
                    color="red"
                    onPress={() => props.favorite ? console.log("Already Set to Favorite") : props.markFavorite()}
                />
                <View>
                    {paragraphs}
                </View>
            </View>

        );
    } else { return <View />}
}

class ArticleDetail extends Component {
    markFavorite(articleId) {
        this.props.postFavoriteArticle(articleId);
    }
    
    render(){
        const articleId = this.props.navigation.getParam("articleId");
        const article = this.props.articles.articles.filter(article => article.key === +articleId)[0];

        return(
            <ScrollView>
                <RenderArticle 
                    article={article} 
                    markFavorite={() => this.markFavorite(articleId)} 
                    favorite={this.props.favoritesArticle.includes(articleId)}
                />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);