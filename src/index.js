import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Main from './main';
import axios from 'axios';

const callToController = async (email, newDoneTests) => {
    const config = {
      headers: {
          "Content-Type": "application/json"
      }
  }

  try {
    await axios.put('/api/auth/changedonetests', {params: {email, newDoneTests}}, config);
    console.log("YAY SET AXIOS DONETESTS ON EMAIL", email, "TO ", newDoneTests);
  } catch(error) {
    console.log(error);
  }
  }



const initialState = {
    hideUI: false,
    coins: 100,
    coinsMore: true,
    shopToggled: false,
    items: {
        skipper: 0,
        corrects: 0
    },
    testsDone: 0
};

function reducer(state = initialState, action) {
    let coinsMore = true
    switch(action.type) {
        case "CHANGE_TESTSDONE":
            console.log('REDUX: ', state.testsDone +1 )

        return {
            ...state,
            testsDone: state.testsDone + 1
        }

        case "CHANGE_COINS":
        return {
            ...state,
            coins: action.coinsValue
        }
        case 'INCREMENT':
            if (state.coins + 1 > 49) {
                coinsMore = true
            } else {
                coinsMore = false
            }
            return {
                ...state,
                coins: state.coins + 1,
                coinsMore: coinsMore
            }
        case "ADD_VALUE":
            if (state.coins + action.value > 49) {
                coinsMore = true
            } else {
                coinsMore = false
            }
            return {
                ...state,
                coins: state.coins + action.value,
                coinsMore: coinsMore
            }
        case "SWITCH_UI": {
            return {
                ...state,
                hideUI: !state.hideUI
            }
        }

        case "TOOGLE_SHOP":
            console.log('toggle shop')
            return {
                ...state,
                shopToggled: !state.shopToggled
            }

        case "CHANGE_SKIPPER":
            console.log('changing skipper to ', action.value)
            return {
                ...state,
                items: {skipper: action.value}
            }

        case "BUY_ITEM":
            if (action.item === 'skipper') {
                return {
                    ...state,
                    coins: state.coins -50,
                    items: {
                        corrects: state.items.corrects,
                        skipper: state.items.skipper + 1
                    }
                }

            } else if (action.item === 'correct') {
                return {
                    ...state,
                    coins: state.coins - 50,
                    items: {
                        skipper: state.items.skipper,
                        corrects: state.items.corrects + 1
                    }
                }
            }
            break;
        default: return state;
        }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());




ReactDOM.render(
<Provider store={store}>
<Main />
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
