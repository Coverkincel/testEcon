import React, { Component, useDebugValue } from 'react';
import Trivia from './components/trivia';
import Menu from './components/menu';
import './App.css';
import {connect} from 'react-redux';
import tests from './components/questions.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      questions: undefined,
      isTrivia: false,
      isTriviaMenu: true,
      category: 0,
      questionsNumber: 10,
      receviedCoinsValue: 50,
      questionsNew: tests[0].questions,
      isButtonDisabled: false,
      doneTests: 0
    };
    this.isTriviaSwitch = this.isTriviaSwitch.bind(this);
    this.apiCall = this.apiCall.bind(this);
    this.applyCategory = this.applyCategory.bind(this);
    this.switchTriviaMenu = this.switchTriviaMenu.bind(this);
    this.increment = this.increment.bind(this);
    this.addValue = this.addValue.bind(this);
    this.toggleShop = this.toggleShop.bind(this);
    this.buyItem = this.buyItem.bind(this)
    this.getUserData = this.getUserData.bind(this);
  }

// old

handleChangeDoneTests(email, newDoneTests) {

  console.log('APP JS changing done tests on email to ', email, newDoneTests);

  const callToController = async (email, newDoneTests) => {
    const config = {
      headers: {
          "Content-Type": "application/json"
      }
  }

  try {
    await axios.put('api/auth/changedonetests', {params: {email, newDoneTests}}, config);
    console.log("YAY SET AXIOS DONETESTS ON EMAIL", email, "TO ", newDoneTests);
  } catch(error) {
    console.log(error);
  }
  }

  callToController(email,newDoneTests);

}

getDoneTestsOnStart(email, needIncrement) {
  console.log('getDoneTestsOnStart', email);

  const bazaGetDoneTests = async(email, needIncrement) => {

  const config = {
    headers: {
        "Content-Type": "application/json"
    }
}

try {
  const {data} = await axios.get("api/auth/getUser", {params: {
    email
}}, config);

console.log('i have received info ', data.data);
console.log(`done tests on email ${email}: ${data.data.doneTests}`)
this.setState({doneTests: data.data.doneTests}, () => {
  if (needIncrement) {
    this.handleChangeDoneTests(email, this.state.doneTests+1);
    this.props.dispatch({type: "CHANGE_TESTSDONE"})
  }
})


} catch(error) {
  console.log(error);
}
  }

  bazaGetDoneTests(email, needIncrement)
} 

getUserData(receivedEmail) {
  const getUserHandler = async (email) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const {data} = await axios.get("api/auth/getUser", {params: {
            email
        }}, config);

        console.log('got data ', data.data)
        console.log('receivedCoinsValue inside the data', data.data.coins) 
        console.log('receivedSkipperValue inside the data', data.data.skippers) 
        this.setState({
          receivedSkipperValue: data.data.skippers,
          receviedCoinsValue: data.data.coins
        }, () => {
          this.props.dispatch({type: "CHANGE_COINS", coinsValue: this.state.receviedCoinsValue})
          this.props.dispatch({type: "CHANGE_SKIPPER", value:this.state.receivedSkipperValue})
        })
    } catch (error) {
        console.log(error);
    }
}

getUserHandler(receivedEmail);

}

  apiCall(URL) {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          questions: data.results,
          error: false
        });
      })
      .catch(
        error => console.error(error),
        () => {
          this.setState({
            error: true
          });
        }
      );
  }

  

  componentWillMount() {
    this.getDoneTestsOnStart(localStorage.getItem('loggedEmail'));
    this.getUserData(localStorage.getItem("loggedEmail"));
    this.props.dispatch({type: "CHANGE_SKIPPER", value: this.state.receivedSkipperValue});
    this.apiCall(
      `https://opentdb.com/api.php?amount=${this.state.questionsNumber}`
    );
    console.log("unshuffled quesitions " );
    console.log(this.state.questionsNew)

    //this.setState({
    //  questionsNew:    tests[this.props.doneTests].questions
    //})

  }


// включает тест

  isTriviaSwitch(isStarted) {
    isStarted ? this.props.dispatch({type: "ADD_VALUE", value: -50}) : console.log('passed')
    this.props.dispatch({type: "SWITCH_UI"})
    this.setState(
      {
        isTrivia: !this.state.isTrivia
      },
      () => {
        if (this.state.category !== 1 && this.state.category !== 0) {
          this.apiCall(
            `https://opentdb.com/api.php?amount=${this.state.questionsNumber}&category=` +
              this.state.category
          );
        } else {
          this.apiCall(
            `https://opentdb.com/api.php?amount=${this.state.questionsNumber}`
          );
        }
      }
    );
  }

  
  applyCategory(category) {
    this.switchTriviaMenu();
    this.setState({
      isTrivia: false,
      category: category
    });
    if (category === 1) {
      this.apiCall(
        `https://opentdb.com/api.php?amount=${this.state.questionsNumber}`
      );
    } else {
      this.apiCall(
        `https://opentdb.com/api.php?amount=15&category=${category}`
      );
    }
  }

  switchTriviaMenu() {
    this.setState({
  isTriviaMenu: !this.state.isTriviaMenu
    });
  }

  increment = () => {
    this.props.dispatch({type: "INCREMENT"})
  }

  addValue = (value) => {
    this.props.dispatch({type: "ADD_VALUE", value: value})
  }

  toggleShop() {
    this.props.dispatch({type: "TOOGLE_SHOP"})
  }

  buyItem(item) {
    let del;
    if (item === 'skipper') {
      del = 300
      this.props.dispatch({type: "BUY_ITEM", item: 'skipper'})
    } else if (item === 'correct') {
      del = 400
      this.props.dispatch({type: "BUY_ITEM", item: 'correct'})
    }
    this.setState({
      isButtonDisabled: true
    })
    this.updateScore(localStorage.getItem('loggedEmail'), this.props.coins - del);
    console.log('buy item skippers', this.props.skippers);
    this.updateSkippers(localStorage.getItem('loggedEmail'), this.props.skippers)
  }

  updateSkippers(email, skippers) {
    console.log(`assigning ${skippers+1} to ${email}`)

    const updateScoreHandler = async (email, skippers) => {

      const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    console.log(`trying to assign ${skippers+1} to ${email}`)
      try {
        await axios.put("api/auth/updateskippers", {params: {email, skippers: skippers+1}}, config);
        console.log('SKIPPERS UPDATED YAY')

       


      } catch (error) {
          console.log(error);
      }

    }

    updateScoreHandler(email, skippers)
  }

  componentDidUpdate() {
    console.log('app has been updated')
  }

  updateScore(email, newCoins) {
    console.log(`assigning ${newCoins} to ${email}`)

    const updateScoreHandler = async (email, newCoins) => {

      const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    console.log(`trying to assign ${newCoins} to ${email}`)
      try {
        await axios.put("api/auth/updatecoins", {params: {email, newCoins}}, config);
        console.log('I HAVE DONE IT YAY UPDATED')

        


      } catch (error) {
          console.log(error);
      }

    }

    updateScoreHandler(email, newCoins)
  }



  render() {
    
    if (this.props.skippers) {
      const disableButtonEffect = true
    } else {
      const disableButtonEffect = false
    }
    const loggedEmail = localStorage.getItem("loggedEmail");
    const { isTrivia, questions, isTriviaMenu } = this.state;
    if (!questions) {
      return <div>ЗАГРУЗКА</div>;
    } else {
      return (
          <div className='app'> 

        <div className='main-container'>
          <div className='inner-container'>
           
            <div className="game">
              <p>Вы вошли через почту {loggedEmail}</p>



        {/* 
            <button onClick={this.increment}>+</button>
          <button onClick = {() => this.addValue(10)}>REDUX ADD 10</button>
          <br/>

            coinsmore : {this.props.coinsMore ? "true" : 'flase'}
            REDUX HIDEUI: {this.props.hideUI ? "true" : "false"} <br/>
            REDUX COINS: {this.props.coins}
*/}

            <Menu
              applyCategory={this.applyCategory}
              triviaSwitch={this.switchTriviaMenu}
            />
    {!this.props.shopToggled ?             <div>
            {isTriviaMenu ? (
              <div className='trivia-menu'>
                
                {!isTrivia ? 
                <div>        

                  {(this.state.doneTests > 4) ? <div> Все тесты выполнены. Поздравляем!</div> : <div><button className='button' onClick={() => {this.isTriviaSwitch(this.props.coinsMore)
                    this.getDoneTestsOnStart(localStorage.getItem('loggedEmail'),true);
                    }
                    
                    }>
                  {' '}
                  {isTrivia ? (
                    <i className='fas fa-undo-alt'></i>
                  ) : (
                    <i className='far fa-play-circle'></i>
                  )}
                  {isTrivia ? null : 
                  <div> 
                    
                    <div>СТАРТ 
                      {this.props.coinsMore ? <p style={{display: "inline"}}>-50  <i className="fas fa-coins"></i></p> : null}
                       </div>
                    </div>

                    

  
                  
                  }
                </button> </div>}

                     
                <button className='switchTriviaButton' id='rating'>
                  <Link to='/rating'>Рейтинг игроков</Link>
                </button>
                </div>     
                
 : null} 
                
                 
                {this.state.isTrivia ? (
                  <Trivia
                  doneTestsFromApp={this.state.doneTests}
                  loggedEmail={this.loggedEmail}
                    questions={this.state.questionsNew}
                    isTriviaSwitch={this.isTriviaSwitch}
                    questionsNumber={this.state.questionsNumber}
                  />
                ) : (
                  null
                )}
              </div>

            ) : null}
                        </div> : 
                        <div className="shop-component">
                          <p>Пропускаторы: {this.props.skippers} (макс. 1)</p>
                          <ul className="shop-items"> 
                            <li className='shop-item'>

                              {(this.props.skippers) ?  "Вы купили все пропускаторы, возвращайтесь позже!" : <button onClick={() => this.buyItem('skipper')} className='switchTriviaButton' disabled={this.disableButtonEffect ? true : false}>
                              Пропускатор -50 <i className="fas fa-coins"></i>
                              </button> }
                              

                              </li>
                              <li className='shop-item' lo>
                              <button onClick={this.toggleShop} className='switchTriviaButton'>
                              НАЗАД
                              </button>
                              </li>
                          </ul>
                        </div>
                        }

          </div>
          </div>
        </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  corrects: state.items.corrects,
  skippers: state.items.skipper,
  coins: state.coins,
  hideUI: state.hideUI,
  coinsMore: state.coinsMore,
  shopToggled: state.shopToggled
})

export default connect(mapStateToProps)(App);