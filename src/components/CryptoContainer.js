import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import FetchCoinData from './../Actions/FetchCoinData';
import CoinCard from './CoinCard';
import Spinner from 'react-native-loading-spinner-overlay';

class CryptoContainer extends Component {
  componentWillMount() {
    this.props.FetchCoinData();
  }
  renderCoinCards() {
    const {crypto} = this.props;
    console.log(crypto);
    return crypto.data.map((coin, index)=>(
      <CoinCard
        key={index}
        symbol={coin.symbol}
        coin_name={coin.name}
        price_usd={coin.price_usd}
        percent_change_24h={coin.percent_change_24h}
        percent_change_7d={coin.percent_change_7d}
      />)
    )
  }
  render() {
    const {crypto} = this.props;
    
    if(crypto.isFetching) {
      return (
        <View>
          <Spinner
            visible={crypto.isFetching}
            textContent={"Loading..."}
            textStyle={{color:'#253145'}}
            animation="fade"
          />
        </View>
      )
    }
  
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {this.renderCoinCards()}
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    crypto: state.crypto
  }
}

const styles = new StyleSheet.create({
  contentContainer: {
    paddingBottom: 100,
    paddingTop: 55
  }
});
export default connect(mapStateToProps, {FetchCoinData})(CryptoContainer)