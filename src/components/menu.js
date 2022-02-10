import React, { Component } from 'react';
import './menu.css';
import { categories } from '../categoryList';
import {connect} from 'react-redux';
import Odometer from 'react-odometerjs';
import axios from 'axios';

class menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRulesToggled: false,
      isCategoriesToggled: false, 
      categoryName: 'Основа',
      fullName: '',
      username: '',
      email: '',
      password: ''
    };
    this.toggleRules = this.toggleRules.bind(this);
    this.toggleCategories = this.toggleCategories.bind(this);
    this.toggleShop = this.toggleShop.bind(this);
    this.changeFullName = this.changeFullName.bind(this)
    this.changeUsername = this.changeUsername.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }


  onSubmit(event) {
    event.preventDefault()

    const registered = {
      fullName: this.state.fullName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    axios.post('http://localhost:4000/app/signup', registered).then(response => console.log(response.data))

    this.setState({
      fullName: '',
      username: '',
      email: '',
      password: ''
    })
  }

  changeFullName(event) {
    this.setState({
      fullName: event.target.value
    })
  }

  changeUsername(event) {
    this.setState({
      username: event.target.value
    })
  }
  changeEmail(event) {
    this.setState({
      email: event.target.value
    })
  }

  changePassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  toggleRules() {
    this.setState({
      isRulesToggled: !this.state.isRulesToggled,
      isCategoriesToggled: false
    });
  }

  toggleCategories() {
    this.setState({
      isCategoriesToggled: !this.state.isCategoriesToggled,
      isRulesToggled: false
    });
  }

  setCategoryName(categoryName) {
    this.setState({
      categoryName: categoryName
    });
  }

  toggleShop() {
    this.props.dispatch({type: "TOOGLE_SHOP"})
  }

  render() {
    const {isCategoriesToggled, categoryName } = this.state;
    return (
      <div className='main-menu-container'>
                    <h1 className='title'>Econbattles</h1>
                    <h3 className='subtitle'>Одержите победу над экономикой!</h3>
        <div>
          
        </div>
        {!this.props.shopToggled ? <div>
          {!isCategoriesToggled ? (
          <div className='header'>

          </div>
        ) : (
          <div className='categories-container'>
                    <div className='category'>


          {!isCategoriesToggled ?           <div className="coins-container">
              <div className="coins">
              <i className="fas fa-coins"></i> {this.props.coins}
              </div>
              <div className="shop">
                Магазин
              </div>
            </div> : null}


        </div>

          </div>
        )}

        </div> : null}

        


        {


        }
        {!isCategoriesToggled ?         <div className='category'>


              { !isCategoriesToggled ?           <div className="coins-container">
              <div className="coins">
              <i className="fas fa-coins"></i> 
              <Odometer value={this.props.coins} format="(.ddd),dd" />

              </div>
              {!this.props.hideUI ?               <div className="shop">
                
                <button className='switchTriviaButton' onClick={this.toggleShop}>       <i className="fas fa-shopping-cart"></i>
                Магазин</button>
            
              </div> : null}


            </div> : null}


        </div> : null}

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hideUI: state.hideUI,
  coins: state.coins,
  shopToggled: state.shopToggled
})

export default connect(mapStateToProps)(menu);