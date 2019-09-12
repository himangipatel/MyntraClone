
import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
    createDrawerNavigator,
    createStackNavigator,
    createAppContainer, DrawerItems
} from 'react-navigation';
import { Container, Content, Icon, Header, Body } from 'native-base'
import HomeScreen from './HomeScreen';
import SignUp from '../authentication/SignUp';
import SharePlace from '../SharePlace/SharePlace';


const CustomDrawerContentComponent = (props) => (

    <Container>
        <Header style={styles.drawerHeader}>
            <Body>
                <Image
                    style={styles.drawerImage}
                    source={require('../../assets/shop1.jpeg')} />
            </Body>
        </Header>
        <Content>
            <DrawerItems {...props} />
        </Content>

    </Container>

);



class NavigationDrawerStructure extends Component {
    static navigationOptions = {
        header: null
    }

    toggleDrawer = () => {
        //Props to open/close the drawer
        this.props.navigationProps.openDrawer();
    };

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.toggleDrawer.bind(this)}>
                    {/*Donute Button Image */}
                    <Icon type="Entypo" name={"menu"} />
                    {/* <Image style={{ width: 25, height: 25 }}
                        source={require('../../assets/myntra_logo.png')} /> */}
                </TouchableOpacity>
            </View>
        );
    }
}

const HomeScreenStack = createStackNavigator({
        //All the screen from the Screen1 will be indexed here
        Home: {
            screen: HomeScreen,
            navigationOptions: ({ navigation }) => ({
                title: ('Insider'.toUpperCase()),
                headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
                headerStyle: {
                    backgroundColor: '#FFFFFF',

                },
                headerTitleStyle: {
                    fontFamily: "junegull",
                    fontSize: 15
                },
                headerTintColor: '#808080',
            }),
        },

    });

const SharePlaceScreenStack = createStackNavigator(
    {
        SharePlace: {
            screen: SharePlace,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
                headerStyle: {
                    backgroundColor: '#FFFFFF',
                },
                headerTintColor: '#000000',
            })
        }
    }
)


const DashBoardScreen = createDrawerNavigator({
    Home: HomeScreenStack,
    SharePlace: SharePlaceScreenStack,
},
    {
        initialRouteName: 'Home',
        drawerPosition: 'left',
        contentComponent: CustomDrawerContentComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        hideStatusBar: false,
        drawerBackgroundColor: 'rgba(255,255,255,.9)',
        // overlayColor: '#6b52ae',
        contentOptions: {
            activeTintColor: '#fff',
            activeBackgroundColor: '#6b52ae',
        },
        navigationOptions: {
            header: null
        }
    }

);



export default DashBoardScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerHeader: {
        height: 150,
        backgroundColor: 'white'
    },
    drawerImage: {
        height: 70,
        width: 70,
        borderRadius: 8
    }

})