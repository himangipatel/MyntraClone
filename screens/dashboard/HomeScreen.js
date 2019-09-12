import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Icon} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import Category from './Category';
import BankOffer from './BankOffer';
import NewArrivals from './NewArrivals';
import {
  men_category,
  women_category,
  kids_category,
  beauty_category,
  home_category,
  gadgets_category,
  rack_category,
} from '../utils/Assets';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';

import ImageOverlay from '../dashboard/ImageOverlay';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 120,
  },
});

export class HomeScreen extends Component {
  static navigationOptions = {
    title: <Text>Insider</Text>,
    headerLeft: (
      <Icon
        containerStyle={styles.icon}
        type="ionicon"
        name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
      />
    ),
    headerRight: (
      <View style={styles.iconContainer}>
        <Icon
          type="ionicon"
          name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
          color={'#000000'}
        />
        <Icon name={'bookmark-border'} />
        <Icon type="simple-line-icon" name={'handbag'} color={'#000000'} />
      </View>
    ),
  };

  render() {
    let viewpager = [];

    let imageList = [
      {
        imageURL:
          'https://images.pexels.com/photos/919436/pexels-photo-919436.jpeg?cs=srgb&dl=adolescent-beautiful-brunette-919436.jpg&fm=jpg',
        imageDesc:
          'If you do build a great experience, customers tell each other about that. Word of mouth is very powerful.',
      },
      {
        imageURL:
          'https://images.pexels.com/photos/1260305/pexels-photo-1260305.jpeg?cs=srgb&dl=apple-buy-buying-1260305.jpg&fm=jpg',
        imageDesc:
          'You should learn from your competitor, but never copy. Copy and you die.',
      },
      {
        imageURL:
          'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?cs=srgb&dl=classic-clothes-commerce-298863.jpg&fm=jpg',
        imageDesc:
          'It isn’t just that E-commerce depends on express mail; there’s a sense in which E-commerce is express mail. Right now, billions of dollars are being spent around the country on so-called “last-mile delivery systems.',
      },
      {
        imageURL:
          'https://images.pexels.com/photos/975250/pexels-photo-975250.jpeg?cs=srgb&dl=attractive-bags-beautiful-975250.jpg&fm=jpg',
        imageDesc:
          'Create content that teaches. You can’t give up. You need to be consistently awesome.',
      },
      {
        imageURL:
          'https://images.pexels.com/photos/1390534/pexels-photo-1390534.jpeg?cs=srgb&dl=adult-clothes-commerce-1390534.jpg&fm=jpg',
        imageDesc:
          'I don’t create companies for the sake of creating companies, but to get things done.',
      },
    ];

    for (let i = 0; i < imageList.length; i++) {
      viewpager.push(
        <View key={imageList[i].imageDesc.charAt(3)}>
          <ImageBackground
            source={{uri: imageList[i].imageURL}}
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ImageOverlay header="" paragraph={imageList[i].imageDesc} />
          </ImageBackground>
        </View>,
      );
    }

    return (
      <ScrollView styles={styles.container}>
        <ScrollView
          style={{marginTop: 10}}
          showsHorizontalScrollIndicator={false}
          horizontal={true}>
          <Category imageURL={men_category} title={'Men'.toUpperCase()} />
          <Category imageURL={women_category} title={'Women'.toUpperCase()} />
          <Category imageURL={kids_category} title={'Kids'.toUpperCase()} />
          <Category imageURL={beauty_category} title={'Beauty'.toUpperCase()} />
          <Category imageURL={home_category} title={'Home'.toUpperCase()} />
          <Category
            imageURL={gadgets_category}
            title={'Gadgets'.toUpperCase()}
          />
          <Category
            imageURL={rack_category}
            title={'Style Rack'.toUpperCase()}
          />
        </ScrollView>

        {/* <Image
          style={{
            height: 250,
            resizeMode: 'stretch',
            width: Math.round(Dimensions.get('window').width),
            marginTop: 10,
          }}
          source={require('../../assets/sale_banner.jpg')}
        /> */}

        <IndicatorViewPager
          style={{
            height: 250,
            resizeMode: 'stretch',
            width: Math.round(Dimensions.get('window').width),
            marginTop: 10,
          }}
          indicator={this._renderDotIndicator(imageList.length)}
          autoPlayEnable={true}>
          {viewpager}
        </IndicatorViewPager>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
          style={{backgroundColor: '#ffffff', marginTop: 10}}>
          <NewArrivals
            logo={require('../../assets/puma_logo.jpg')}
            imageURL={require('../../assets/new_arrives_women.jpg')}
            offer={'New Arrivals That Are Fit for a Queen!'}
          />

          <NewArrivals
            logo={require('../../assets/only_logo.jpg')}
            imageURL={require('../../assets/new_arrives_men.jpg')}
            offer={'Global Fashion That Has Crossed Borders!'}
          />

          <NewArrivals
            logo={require('../../assets/westside_logo.jpg')}
            imageURL={require('../../assets/new_arrives_kids.jpg')}
            offer={'Embrace Your Uniqueness With These Styles!'}
          />
        </ScrollView>
      </ScrollView>
    );
  }
  _renderDotIndicator(pages) {
    return <PagerDotIndicator pageCount={pages} />;
  }
}

export default HomeScreen;
