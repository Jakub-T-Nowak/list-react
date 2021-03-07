import React, {Component} from 'react';
import Filter from './Filter';
import axios from 'axios';

export default class App extends Component {
  state = {
    users: [],
    filteredUsers: []
  }

  async componentDidMount () {
    const response = await axios.get('https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json',
      {headers: {"Access-Control-Allow-Origin": "*"}}
    );
    const users = response.data.sort(this.compareNames);
    this.setState({users, filteredUsers: users})
  }

  compareNames = (a, b) => {
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

  filter = filterx => {
    var users = this.state.users
    users = users.filter(user =>
      user.last_name.toLowerCase().includes(filterx.toLowerCase()) || user.first_name.toLowerCase().includes(filterx.toLowerCase())
    )
    this.setState({filteredUsers: users});
  }

  render () {
    return (
      <div>
        <Filter filter={this.filter}/>
        {this.state.filteredUsers.map((user, index) => <div key={index}>{user.last_name} </div>)}
      </div>
    )
  }
}