import React, {Component} from 'react';
import axios from 'axios';

export default class App extends Component {
  state = {
    users: []
  }

  async componentDidMount () {
    const response = await axios.get('https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json',
    {headers: {"Access-Control-Allow-Origin": "*"}})
    this.setState({users: response.data})
  }

  render () {
    return (
      <div>
        {this.state.users.map((user, index) => <div key={index}>{user.first_name} </div>)}
      </div>
    )
  }
}