import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom'
import Login from '../login/login';
import Register from '../register/register';
import UserHome from '../userHome/userHome';
import Main from '../main/main';
import Reservations from '../reservations/reservations'
import './home.css';


export default class Home extends Main {

  constructor(props) {
    super(props);
    this.handleUserStateChange = this.handleUserStateChange.bind(this);
  }

  handleUserStateChange = (userId, firstName, lastName, email, address) => {
    this.updateUser(
      userId,
      firstName,
      lastName,
      email,
      address
    );
  }

  render() {
    const userNotLoggedIn = this.state.userId == 0;
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          {userNotLoggedIn ? 
          <React.Fragment>
          <div className='heroContent'>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Welcome to Ticket Guru! Please login.
              </Typography>
              <BrowserRouter>
                  <div className='heroButtons'>
                    <Grid container spacing={2} justify="center">
                        <Grid item>
                            <Button variant="contained" color="primary">
                                <Link to="/login">Login </Link>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary">
                                <Link to="/register">Register </Link>
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <hr></hr>
                <Switch>
                    <Route path="/login">
                        <Login handleUserStateChange={this.handleUserStateChange} />
                    </Route>
                    <Route path="/register">
                        <Register handleUserStateChange={this.handleUserStateChange}/>
                    </Route>
                </Switch>
              </BrowserRouter>
            </Container>
          </div>
          </React.Fragment>
          
        :  <React.Fragment>
        <div className='heroContent'>
          <Container maxWidth="lg">
            <UserHome 
              firstName={this.state.userFirstName} 
              lastName={this.state.userLastName}
              userId={this.state.userId}
              email={this.state.userEmail}
            />
          </Container>
        </div>
        </React.Fragment>
        
      }
        </main>
      </React.Fragment>
    );
  }
}