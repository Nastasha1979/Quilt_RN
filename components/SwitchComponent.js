import React, { Component } from "react";
import { View } from "react-native";
import Home from "./HomeComponent";
import Classes from "./ClassesComponent";
import Articles from "./ArticlesComponent";
import Inspiration from "./InspirationComponent";
import Newsletter from "./NewsletterComponent";
import About from "./AboutComponent";
import Constants from "expo-constants";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { nodeName } from "min-document";

const AboutNavigator = createStackNavigator (
    {
        About: { screen: About }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#faeddd"
            },
            headerTitleStyle: {
                color: "#000000"
            }
        }
    }
);

const NewsletterNavigator = createStackNavigator (
    {
        Newsletter: { screen: Newsletter }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#faeddd"
            },
            headerTitleStyle: {
                color: "#000000"
            }
        }
    }
);

const InspirationNavigator = createStackNavigator (
    {
        Inspiration: { screen: Inspiration }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#faeddd"
            },
            headerTitleStyle: {
                color: "#000000"
            }
        }
    }
);

const ArticlesNavigator = createStackNavigator (
    {
        Articles: { screen: Articles }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#faeddd"
            },
            headerTitleStyle: {
                color: "#000000"
            }
        }
    }
);

const ClassesNavigator = createStackNavigator (
    {
        Directory: { screen: Classes }    
    },
    {
        defaultNavigationOptions: {
            headerTitleAlign: {
                textAlign: "center"
            },
            headerStyle: {
                backgroundColor: "#faeddd"
            },
            headerTitleStyle: {
                color: "#000000",
                alignSelf: 'center',
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

const SwitchNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Classes: { screen: ClassesNavigator},
        Inspiration: { screen: InspirationNavigator },
        Articles: { screen: ArticlesNavigator},
        Newsletter: { screen: NewsletterNavigator },
        "About Us": { screen: AboutNavigator }
    },
    {
        drawerBackgroundColor: "#fff",    
    }
    
);

const AppNavigator = createAppContainer(SwitchNavigator);

class Switch extends Component {

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

export default Switch;