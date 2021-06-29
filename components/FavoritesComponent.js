import React, { Component } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Text, ListItem, Button, Avatar } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { deleteFavoriteClass, deleteFavoriteArticle } from "../redux/ActionCreators";

const mapStateToProps = state => {
    return {
        articles: state.articles,
        classInfo: state.classInfo,
        favoritesClass: state.favoritesClass,
        favoritesArticle: state.favoritesArticle
    };
};

const mapDispatchToProps = {
    deleteFavoriteClass: classInfoId => deleteFavoriteClass(classInfoId),
    deleteFavoriteArticle: articleId => deleteFavoriteArticle(articleId)
};

class Favorites extends Component {

    static navigationOptions = {
        title: "My Favorites"
    }


    render() {
        const { navigate } = this.props.navigation;
        const renderFavoriteClasses = ({item}) => {
            return(
                <View>
                    <ListItem
                        onPress={() => navigate("ClassDetail", {classId: item.id})}
                        topDivider
                        bottomDivider
                    >
                        <Avatar source={{uri: baseUrl + item.picUrl}} rounded/>
                        <ListItem.Content>
                            <ListItem.Title>{item.title}</ListItem.Title>
                            <ListItem.Subtitle>{item.instructor}</ListItem.Subtitle> 
                        </ListItem.Content>
                        
                    </ListItem>
                    <Button
                        title="Remove Favorite"
                        type="standard"
                        color="red"
                        onPress={() => this.props.deleteFavoriteClass(item.id)}
                    />
                </View>
            );
        }

        const renderFavoriteArticles = ({item}) => {
            return(
                <View>
                    <ListItem
                       onPress={() => navigate("ArticleDetail", {articleId: item.key})}
                       topDivider
                       bottomDivider
                    >   
                        <Avatar source={{uri: baseUrl + item.pic}} rounded/>
                        <ListItem.Content>
                            <ListItem.Title>{item.title}</ListItem.Title>
                            <ListItem.Subtitle>{item.author}</ListItem.Subtitle>
                        </ListItem.Content>
                        
                    </ListItem>
                    <Button
                        title="Remove Favorite"
                        type="standard"
                        color="red"
                        onPress={() => this.props.deleteFavoriteArticle(item.key)}
                    />
                </View>
            );
        }
        return(
            
            <View>
                {console.log(this.props.articles.articles.key)}
                <Text h2>Favorite Classes</Text>
                <FlatList
                    data={this.props.classInfo.classInfo.filter(classInfo => this.props.favoritesClass.includes(classInfo.id))}
                    renderItem={renderFavoriteClasses}
                    keyExtractor={item => item.id.toString()}
                />
                <Text h2>Favorite Articles</Text>
                <FlatList
                    data={this.props.articles.articles.filter(article => this.props.favoritesArticle.includes(article.key))}
                    renderItem={renderFavoriteArticles}
                    keyExtractor={item => item.key.toString()}
                />
            </View>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);