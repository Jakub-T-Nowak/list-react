import React, {Component} from 'react';
import axios from 'axios';

export default class App extends Component {
  state = {
    users: []
  }

  async componentDidMount () {
    const response = await axios.get('https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json',
      {headers: {"Access-Control-Allow-Origin": "*"}}
    );
    const users = response.data.sort(this.sortx);

    this.setState({users})
  }

  sortx = (a, b) => {
    var nameA = a.last_name.toUpperCase();
    var nameB = b.last_name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }

  render () {
    return (
      <div>
        {this.state.users.map((user, index) => <div key={index}>{user.last_name} </div>)}
      </div>
    )
  }
}