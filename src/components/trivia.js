import React, { Component } from 'react';
import Answer from './answer';
import './trivia.css';
import {connect} from 'react-redux';
import axios from "axios";
import equal from 'fast-deep-equal'
import tests from './questions';

 class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAnsNum: 0,
      incorrectAnsNum: 0,
      questionNumber: 0,
      category: '',
      correct_answer: '',
      incorrect_answers: [],
      question: '',
      answers: [],
      questionOrigin: '',
      loading: true,
      isAnswersDisabled: false,
      showColors: false,
      currentScore: 0,
      testsDoneState: 0,
      ownQuestions: null
    };
    this.getQuestionData = this.getQuestionData.bind(this);
    this.decodeHTML = this.decodeHTML.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.disableQuestion = this.disableQuestion.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.gameOver = this.gameOver.bind(this);
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
        await axios.put("/api/auth/updatecoins", {params: {email, newCoins}}, config);
        console.log('I HAVE DONE IT YAY UPDATED')

        


      } catch (error) {
          console.log(error);
      }

    }

    updateScoreHandler(email, newCoins)
  }

  gameOver(coins) {
    // switch trivia and add game score to coins
    console.log("GAME IS OVER UPDATING MONGO")
    const email = localStorage.getItem('loggedEmail')
    this.props.isTriviaSwitch(false)
    this.props.dispatch({type: "ADD_VALUE", value:coins})
    //NOW I WANT TO UPDATE THE BD VALUE WITH THE VALUE FROM THE STORE
    console.log('value from the store', this.props.coins)

    this.updateScore(email, this.props.coins);
  }

  decodeHTML(html) {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  handleUpdateCoins() {

  }

  shuffleArray(a) {
    let newArray = a;
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
  
  handleScore(isCorrect, isGameOver) {
    console.log(this.state.category)
    // just adds newscore
    let newScore;
    switch(this.state.category) {
      case 'easy':
        newScore = 100;
        break;
      case 'hard':
        newScore = 200;
        break;
    }

    if (!isCorrect) {
      switch(this.state.category) {
        case 'easy':
          newScore = -100;
          break;
        case 'hard':
          newScore = -200;
          break;
      }
    }
    if (this.state.currentScore + newScore <= 0) {
      this.setState({
        currentScore: 0
      });
    } else {
      this.setState({
        currentScore: this.state.currentScore + newScore
      }, () => {
        // if gameover these points will go into coins
        if (isGameOver) {
          console.log('POINTS GOING INTO COINS')
          setTimeout(() => this.props.dispatch({type: "ADD_VALUE", value: this.state.currentScore}), 2500)
          // прибавить в базе данных количество монет на currentScore (игра закончилась)
          

          // прибавить в базе данных solvedTest +=1
          // if solvedTests = maxTests то написать что решены все тесты
        }
      }) ;
    }
  }

  getQuestionData() {
    console.log("current question number", this.state.questionNumber);
    const currentQuestion = this.state.ownQuestions.questions[this.state.questionNumber];
    console.log("currentQuestion: ", currentQuestion);
    const decodedQuestion = this.decodeHTML(currentQuestion.question);
    let incorrect_answers = currentQuestion.incorrect_answers;
    const correctAnswer = this.decodeHTML(currentQuestion.correct_answer);
    const questionOrigin = this.decodeHTML(currentQuestion.origin);
    if (!incorrect_answers.includes(correctAnswer)) {
      incorrect_answers.push(currentQuestion.correct_answer); }
    let answers = this.shuffleArray(incorrect_answers);
    this.setState(
      {
        questionOrigin: questionOrigin,
        category: currentQuestion.category,
        correct_answer: correctAnswer,
        incorrect_answers: currentQuestion.incorrect_answers,
        question: decodedQuestion,
        answers: answers,
        loading: false
      },
      () => {
        console.log(this.state)
        this.setState({
          isAnswersDisabled: false,
          showColors: false
        });
      }
    );
  }

  componentDidMount() {
    // используем это в качестве номера теста 
    console.log('trivia sees in store', this.props.testsDone);
    // это выше
    console.log('trivia gets from app ', this.props.doneTestsFromApp)
    this.setState({
      testsDoneState: this.props.testsDone
    })
    this.setState({
      ownQuestions: tests[this.props.testsDone]
    }, () => {
      console.log('own questions in TRIVIA', this.state.ownQuestions);
      this.getQuestionData();
    })
  }

  updateQuestion() {
    this.setState(
      {
        questionNumber: this.state.questionNumber + 1
      },
      () => {
        this.getQuestionData();
      }
    );
  }

  disableQuestion() {
    this.setState({
      isAnswersDisabled: true,
      showColors: true
    });
  }

  submitAnswer(data) {
    if (data === this.state.correct_answer) {
      this.setState({
        correctAnsNum: this.state.correctAnsNum + 1
      });
      if (this.state.questionNumber === 9) {
        // right answer. set isTrivia to false (overflow) gameover ALREADY ZERO
        this.disableQuestion();
        this.handleScore(true, true);
        setTimeout(() => this.gameOver(0), 3000);
      } else {
        // right answer. next question number (+1 state) and update question (no overflow)
        this.disableQuestion();
        this.handleScore(true, false);
        setTimeout(this.updateQuestion, 2000);
      }
    } else {
      this.setState({
        incorrectAnsNum: this.state.incorrectAnsNum + 1
      });
      if (this.state.questionNumber === 9) {
        // wrong answer + overflow. set isTrivia to false gameover
        this.handleScore(false, true);
        this.disableQuestion();
        setTimeout(() => this.gameOver(0), 3000);
      } else {
        // no overflow + wrong answer next question number (+1 state) and update question
        this.handleScore(false, false);
        this.disableQuestion();
        setTimeout(this.updateQuestion, 2500);
      }
    }
  }


  componentWillUnmount(){
    console.log('hey trivia is unmouting');
  }

  componentWillMount() {

    console.log('trivia sees', this.props.skippers);
    
    
  }

  handleUseSkipper() {
    console.log('used handleUseSkipper')
    this.submitAnswer(this.state.correct_answer);
    this.props.dispatch({type:"CHANGE_SKIPPER", value:this.props.skippers - 1})
    console.log('now skippers is ', this.props.skippers-1);
    const newSkippers = this.props.skippers-2;
    this.updateSkippers(localStorage.getItem('loggedEmail'), newSkippers);
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
        await axios.put("/api/auth/updateskippers", {params: {email, skippers: skippers+1}}, config);
        console.log('SKIPPERS UPDATED YAY')

        


      } catch (error) {
          console.log(error);
      }

    }

    updateScoreHandler(email, skippers)
  }

  render() {
    const {
      correct_answer,
      question,
      answers,
      loading
    } = this.state;

    const {loggedEmail} = this.props;

    if (loading) {
      return <h1>Загрузка!</h1>;
    } else {
      return (
        <div className='trivia-container'>

          <h3 className='question'>{question}</h3>
          <ul className='answers-list'>
            {answers.map(answer => {
              const answerDecoded = this.decodeHTML(answer);
              return (
                <Answer
                  showColors={this.state.showColors}
                  correctAnswer={correct_answer}
                  disabled={this.state.isAnswersDisabled}
                  value={answerDecoded}
                  submitAnswer={this.submitAnswer}
                />
              );
            })}
          </ul>
          <div className="question_origin">({this.state.questionOrigin})</div>

            {this.props.skippers ?           <button onClick= {() => this.handleUseSkipper()}>Подсказка</button> : <div></div>}


          <div className='game-info'>
            <h4 className='game-score'>


              <p>Игровые монеты {this.state.currentScore}</p>

              
            </h4>
            <div className='score-col'>
              <div className='answered'>{this.state.correctAnsNum}</div>
              <div className='remaining'>
                Осталось:&nbsp;
                {this.props.questionsNumber - this.state.questionNumber}
              </div>
              <div className='unanswered'>{this.state.incorrectAnsNum}</div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  skippers: state.items.skipper,
  coins: state.coins,
  hideUI: state.hideUI,
  coinsMore: state.coinsMore,
  testsDone: state.testsDone
})

export default connect(mapStateToProps)(Trivia);