import React, { Component, useState } from "react";
import { ScrollView, View, StyleSheet  } from "react-native";
import { Text, Icon, Button } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavoriteArticle } from "../redux/ActionCreators";
import { Quicksand_400Regular, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";

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
    const [textSize, toggleSize] = useState(false);
    
    const paragraphs = article.text.map(p => {
        return <View style={style.paragraphContainer} key={article.text.length++}><Text style={textSize ? style.paragraphTextBigger : style.paragraphText }>{p}</Text></View>;
    });
    if(article){
        return(
            <View>
                <View style={style.headingContainer}>
                    <Text style={style.articleTitle}>{article.title}</Text>
                    <Text style={style.author}>{article.author}</Text>
                </View>
                <View style={style.optionsContainer}>
                    <Icon
                        name={props.favorite ? "heart" : "heart-o"}
                        type="font-awesome"
                        color="red"
                        onPress={() => props.favorite ? console.log("Already Set to Favorite") : props.markFavorite()}
                    />
                    <Button 
                        title={textSize ? "Make Text Smaller" : "Make Text Bigger"}
                        type="clear"
                        onPress={() => toggleSize(!textSize)}
                        containerStyle={style.textSizeButtonContainer}
                    />
                </View>
                <View >
                    {paragraphs}
                </View>
            </View>

        );
    } else { return <View />}
}

class ArticleDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            fontsLoaded: {
                Quicksand_400Regular, 
                Quicksand_600SemiBold
            }
        }
    }

    markFavorite(articleId) {
        this.props.postFavoriteArticle(articleId);
    }

    static navigationOptions =({navigation}) => {
        return {
            title: navigation.getParam("articleTitle")
        };
    }
    
    render(){
        const articleId = this.props.navigation.getParam("articleId");
        const article = this.props.articles.articles.filter(article => article.key === +articleId)[0];

        return(
            <ScrollView style={style.container}>
                <RenderArticle 
                    article={article} 
                    markFavorite={() => this.markFavorite(articleId)} 
                    favorite={this.props.favoritesArticle.includes(articleId)}
                />
            </ScrollView>
        );
    }
}

const style = StyleSheet.create({
    container: {

    },
    articleTitle: {
        fontFamily: "Quicksand_600SemiBold",
        fontSize: 30
    },
    author: {
        fontFamily: "Quicksand_400Regular",
        fontSize: 18
    },
    headingContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10
        
    },
    optionsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    textSizeButtonContainer: {
        marginLeft: 50
    },
    paragraphContainer: {
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        backgroundColor: "#faeddd"
    },
    paragraphText: {
        fontSize: 20,
        margin: 5,
        padding: 10
        
    },
    paragraphTextBigger: {
        fontSize: 36,
        margin: 5,
        padding: 10
        
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);