import React, { Component } from "react";
import { FlatList, View, StyleSheet, ScrollView } from "react-native";
import { Text, ListItem, Button, Avatar } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { deleteFavoriteClass, deleteFavoriteArticle } from "../redux/ActionCreators";
import { Quicksand_400Regular, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";

const mapStateToProps = state => {
    return {
        articles: state.articles,
        classInfo: state.classInfo,
        carousel: state.carousel,
        favoritesClass: state.favoritesClass,
        favoritesArticle: state.favoritesArticle
    };
};

const mapDispatchToProps = {
    deleteFavoriteClass: classInfoId => deleteFavoriteClass(classInfoId),
    deleteFavoriteArticle: articleId => deleteFavoriteArticle(articleId),
};

class Favorites extends Component {
    constructor(props){
        super(props);
        this.state ={
            fontsLoaded: {
                Quicksand_400Regular, 
                Quicksand_600SemiBold
            }
        }
    }

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
                        containerStyle={style.listItemStyle}
                    >
                        <Avatar source={{uri: baseUrl + item.picUrl}} rounded/>
                        <ListItem.Content>
                            <ListItem.Title style={style.listItemTitle}>{item.title}</ListItem.Title>
                            <ListItem.Subtitle style={style.listItemSubtitle}>{item.instructor}</ListItem.Subtitle> 
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
                       containerStyle={style.listItemStyle}
                    >   
                        <Avatar source={{uri: baseUrl + item.pic}} rounded/>
                        <ListItem.Content>
                            <ListItem.Title style={style.listItemTitle}>{item.title}</ListItem.Title>
                            <ListItem.Subtitle style={style.listItemSubtitle}>{item.author}</ListItem.Subtitle>
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
            
            <ScrollView style={style.container}>
                <Text style={style.favoriteTitle}>Favorite Classes</Text>
                <FlatList
                    data={this.props.classInfo.classInfo.filter(classInfo => this.props.favoritesClass.includes(classInfo.id))}
                    renderItem={renderFavoriteClasses}
                    keyExtractor={item => item.id.toString()}
                />
                <Text style={style.favoriteTitle}>Favorite Articles</Text>
                <FlatList
                    data={this.props.articles.articles.filter(article => this.props.favoritesArticle.includes(article.key))}
                    renderItem={renderFavoriteArticles}
                    keyExtractor={item => item.key.toString()}
                />
            </ScrollView>

        );
    }
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#faeddd"
    },
    favoriteTitle: {
        fontFamily: "Quicksand_600SemiBold",
        alignSelf: "center",
        justifyContent: "center",
        fontSize: 30,
        textDecorationLine: "underline",
        marginVertical: 10
    },
    listItemStyle: {
        marginHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1
    },
    listItemTitle: {
        fontFamily: "Quicksand_600SemiBold"
    },
    listITemSubtitle: {
        fontFamily: "Quicksand_400Regular"
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);