import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Category from "./Category"
import BankOffer from "./BankOffer";
import NewArrivals from "./NewArrivals";
import { men_category, women_category, kids_category, beauty_category, home_category, gadgets_category, rack_category } from "../utils/Strings";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    paddingLeft: 10
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  }
});

export class HomeScreen extends Component {
  static navigationOptions = {
    title: (
      <Text>Insider</Text>
    ),
    headerLeft: (
      <Icon
        containerStyle={styles.icon}
        type="ionicon"
        name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
      />
    ),
    headerRight: (
      <View style={styles.iconContainer}>
        <Icon type="ionicon" name={Platform.OS === "ios" ? "ios-search" : "md-search"} color={'#000000'} />
        <Icon name={"bookmark-border"} />
        <Icon type="simple-line-icon" name={"handbag"} color={'#000000'} />
      </View>
    )
  };


  render() {
    return (
      <ScrollView styles={styles.container}>
        <ScrollView
          style={{ marginTop: 10 }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}>

          <Category
            imageURL={men_category}
            title={'Men'.toUpperCase()} />
          <Category
            imageURL={women_category}
            title={'Women'.toUpperCase()} />
          <Category
            imageURL={kids_category}
            title={'Kids'.toUpperCase()} />
          <Category
            imageURL={beauty_category}
            title={'Beauty'.toUpperCase()} />
          <Category
            imageURL={home_category}
            title={'Home'.toUpperCase()} />
          <Category
            imageURL={gadgets_category}
            title={'Gadgets'.toUpperCase()} />
          <Category
            imageURL={rack_category}
            title={'Style Rack'.toUpperCase()} />
        </ScrollView>

        <Image
          style={{ height: 250, resizeMode: 'stretch', width: Math.round(Dimensions.get('window').width), marginTop: 10 }}
          source={require('../../assets/sale_banner.jpg')} />

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <BankOffer
            imageURL={require('../../assets/hdfc_logo.jpg')}
            discount={'10% Instant Discount on HDFC Debit and Credit cards'}
          />
          <BankOffer
            imageURL={require('../../assets/kotak_logo.png')}
            discount={'10% Cashback on Kotak Debit and Credit cards'}
          />
        </ScrollView>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ backgroundColor: '#ffffff', marginTop: 10 }}>

          <NewArrivals
            logo={require('../../assets/puma_logo.jpg')}
            imageURL={require('../../assets/new_arrives_women.jpg')}
            offer={'New Arrivals That Are Fit for a Queen!'} />

          <NewArrivals
            logo={require('../../assets/only_logo.jpg')}
            imageURL={require('../../assets/new_arrives_men.jpg')}
            offer={'Global Fashion That Has Crossed Borders!'} />

          <NewArrivals
            logo={require('../../assets/westside_logo.jpg')}
            imageURL={require('../../assets/new_arrives_kids.jpg')}
            offer={'Embrace Your Uniqueness With These Styles!'} />

        </ScrollView>

      </ScrollView>
    );
  }
}

export default HomeScreen;