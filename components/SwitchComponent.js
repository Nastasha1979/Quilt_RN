import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import Home from "./HomeComponent";
import Classes from "./ClassesComponent";
import Articles from "./ArticlesComponent";
import Inspiration from "./InspirationComponent";
import Newsletter from "./NewsletterComponent";
import About from "./AboutComponent";
import ClassDetail from "./ClassDetailsComponent";
import Classroom from "./ClassroomComponent";
import InspireDetail from "./InspireDetailComponent";
import ArticleDetail from "./ArticleDetailComponent";
import Favorites from "./FavoritesComponent";
import SignIn from "./SignInComponent";
import Frequently from "./FrequentlyComponent";
import Constants from "expo-constants";
import SafeAreaView from "react-native-safe-area-view";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { connect } from "react-redux";
import { fetchClasses, fetchComments, fetchClassInfo, fetchArticles, fetchCarousel, fetchQuestions, fetchClassList } from "../redux/ActionCreators";
import { Girassol_400Regular } from "@expo-google-fonts/girassol";
import { Quicksand_400Regular, Quicksand_600SemiBold } from "@expo-google-fonts/quicksand";




const mapDispatchToProps = {
    fetchClasses, 
    fetchComments, 
    fetchClassInfo, 
    fetchArticles, 
    fetchCarousel,
    fetchQuestions,
    fetchClassList
};

const FrequentlyNavigator = createStackNavigator (
    {
        Frequently: { screen: Frequently }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#faeddd"
            },
            headerTitleStyle: {
                color: "#000000",
                fontWeight: "bold"
            }
        }
    }
);

const SignInNavigator = createStackNavigator (
    {
        SignIn: { screen: SignIn }
    },
    {
        defaultNavigationOptions: ({
            headerShown: false
        })
    }
);

const FavoritesNavigator = createStackNavigator (
    {
        Favorites: { screen: Favorites }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#faeddd"
            },
            headerTitleStyle: {
                color: "#000000",
                fontWeight: "bold",
                paddingLeft: 125
            }
        }
    }
);

const AboutNavigator = createStackNavigator (
    {
        About: { screen: About }
    },
    {
        defaultNavigationOptions: {
            headerShown: false
            
        }
    }
);

const NewsletterNavigator = createStackNavigator (
    {
        Newsletter: { screen: Newsletter }
    },
    {
        defaultNavigationOptions: {
            headerShown: false
        }
    }
);

const InspirationNavigator = createStackNavigator (
    {
        Inspiration: { screen: Inspiration },
        InspireDetail: { screen: InspireDetail}
    },
    {
        initialRouteName: "Inspiration",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#faeddd"
            },
            headerTitleStyle: {
                color: "#000000",
                fontWeight: "bold",
                paddingLeft: 125
            }
        }
    }
);

const ArticlesNavigator = createStackNavigator (
    {
        Articles: { screen: Articles },
        ArticleDetail: { screen : ArticleDetail }
    },
    {
        initialRouteName: "Articles",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#faeddd"
            },
            headerTitleStyle: {
                color: "#000000",
                fontWeight: "bold"
            }
        }
    }
);

const ClassesNavigator = createStackNavigator (
    {
        Classes: { screen: Classes },
        ClassDetail: { screen: ClassDetail }, 
        Classroom: { screen: Classroom }   
    },
    {
        initialRouteName: "Classes",
        defaultNavigationOptions: {
            headerTitleAlign: {
                textAlign: "center",
                alignSelf: "center",
                justifyContent: "center"
            },
            headerStyle: {
                backgroundColor: "#faeddd"
            },
            headerTitleStyle: {
                color: "#000000",

                fontWeight: "bold",  
            }   
        }
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        defaultNavigationOptions: {
            headerShown: false    
        }  
    }
    
);

const CustomDrawerHeader = props => (
    <ScrollView>
        <SafeAreaView
            forceInset={{top: "always", horizontal: "never"}}
        >
            <View>
                <View style={{flex: 2}}>
                    <Text style={style.drawerHeaderText}>Needle & Thread</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const SwitchNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator, 
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name="home"
                        type="font-awesome-5"
                        size={20}
                        color={tintColor}
                    />
                )
            } 
        },
        Classes: { screen: ClassesNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name="chalkboard"
                        type="font-awesome-5"
                        size={20}
                        color={tintColor}
                    />
                )
            }
        },
        Inspiration: { screen: InspirationNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name="images"
                        type="font-awesome-5"
                        size={20}
                        color={tintColor}
                    />
                )
            }
        },
        Articles: { screen: ArticlesNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name="newspaper"
                        type="font-awesome-5"
                        size={20}
                        color={tintColor}
                    />
                )
            }
        },
        Newsletter: { screen: NewsletterNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name="envelope-open-text"
                        type="font-awesome-5"
                        size={20}
                        color={tintColor}
                    />
                )
            }
        },
        Favorites: { screen: FavoritesNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name="heart"
                        type="font-awesome-5"
                        size={20}
                        color={tintColor}
                    />
                )
            }
        },
        About: { screen: AboutNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name="at"
                        type="font-awesome-5"
                        size={20}
                        color={tintColor}
                    />
                )
            }
        },
        "Sign In": { screen: SignInNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name="sign-in-alt"
                        type="font-awesome-5"
                        size={20}
                        color={tintColor}
                    />
                )
            }
        },
        FAQ: { screen: FrequentlyNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name="question"
                        type="font-awesome-5"
                        size={20}
                        color={tintColor}
                    />
                )
            }
        },
        
    },
    {
        drawerBackgroundColor: "#faeddd",
        contentComponent: CustomDrawerHeader
    }
    
);

const AppNavigator = createAppContainer(SwitchNavigator);

class Switch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Girassol_400Regular,
            Quicksand_400Regular,
            Quicksand_600SemiBold
        };
    }

    
    componentDidMount() {
        this.props.fetchClasses();
        this.props.fetchClassInfo();
        this.props.fetchArticles();
        this.props.fetchCarousel();
        this.props.fetchComments();
        this.props.fetchQuestions();
        this.props.fetchClassList();
    }
    render() {
        return(
            <View 
                style={{
                    flex: 1,
                    textAlign: "center",
                    paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight
                }}
            >
                <AppNavigator />
            </View>
        );
    }
}

const style = StyleSheet.create({
    drawerHeaderText: {
        fontFamily: "Girassol_400Regular",
        fontSize: 36,
        marginHorizontal: 10,
        marginVertical: 35
    }
});

export default connect(null, mapDispatchToProps)(Switch);