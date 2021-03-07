import React, {Component} from 'react';
import Filter from './Filter';
import User from './User';
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

    let users = response.data

    users = users.sort(this.compareNames);
    users.forEach(user => user.check = false);
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

  check = x => {
    const users = this.state.users;
    const userIndex = users.findIndex(user => user.id === x[0])
    users[userIndex].check = x[1]
    
    users.forEach(user=>{(user.check === true) && console.log(user.id)})

    this.setState({users});
  }

  render () {
    return (
      <div>
        <Filter filter={this.filter}/>
        {this.state.filteredUsers.map((user, index) =>
          <User user={user} key={index}  check={this.check}/>
        )}
      </div>
    )
  }
}