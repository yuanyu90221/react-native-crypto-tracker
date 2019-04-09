import {combineReducers} from 'redux';
import CryptoReducer from './CryptoReducer.js'

export default combineReducers({
  crypto: CryptoReducer
});