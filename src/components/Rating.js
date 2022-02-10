import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import './Rating.css';


class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    
    getAllUsers() {

        const getUsers = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            try {
                const {data} = await axios.get('/api/auth/getall', config);
                this.setState({
                    data: data.data
                }, () => console.log('state: ', this.state.data))
            } catch(error) {
                console.log(error);
            }
        } 

        getUsers();

    }

    render() {

        return (<div className='rating-main'>
            <h1>Рейтинг игроков</h1>
            <button onClick={() => this.getAllUsers()}>Show Rating</button>
            {this.state.data ?             <ul>


                { 
                    this.state.data.map((value) => <li>{value.username} : {value.coins} coins</li>)}


            </ul> : null}


        <button className='switchTriviaButton'>
        <Link to='/'>Назад</Link>
        </button>
    </div>
)
    }

}

export default Rating;