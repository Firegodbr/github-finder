import React, {useState , Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User'
import axios from 'axios';

import GithubState from './context/github/GithubState'

import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  /* async componentDidMount(){
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users: res.data, loading: false});
  } */

  //Search github users
  
  //Clear users from the state
  const clearUsers = () => {setUsers([]); setLoading(false);}
  // clearUsers = () => {this.setState({users: [], loading: false})}
  
  //Set Alert
  const showAlert = (message, type) => {
    setAlert({ message, type});
    setTimeout(() => setAlert(null), 5000)
  }

  //Get a single user
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUser(res.data);
    setLoading(false);
  }

  //Get user repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setRepos(res.data);
    setLoading(false);
  }

    return (
      <GithubState>
        <Router> 
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert alert={alert}/>
              <Switch>
                <Route exact path="/" render={props => (
                  <Fragment>
                    <Search 
                      clearUsers={clearUsers} 
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                      />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/user/:login' render={props =>(
                  <User {...props} getUser={getUser} user={user} getUserRepos={getUserRepos} repos={repos} loading={loading}/>
                )}/>
              </Switch>
            </div>
          </div>
        </Router>
      </GithubState>
    );
  }


export default App;
