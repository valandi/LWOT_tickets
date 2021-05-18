import React, { Component, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Audiotrack from '@material-ui/icons/Audiotrack';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Main from '../main/main';

export default class Login extends Main {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  handleStateChange(userId, firstName, lastName, email, address) {
    this.props.handleUserStateChange(
      userId, 
      firstName,
      lastName, 
      email, 
      address
    );
}

  handleSubmit(event) {
    event.preventDefault();

    // Does customer exist?
    var user = this.state.users.filter(cus => 
      cus.email == this.state.userEmail
    );

    if (user.length == 1) {
      let currentUser = user[0];
      this.handleStateChange(
        currentUser.id,
        currentUser.first_name,
        currentUser.last_name,
        currentUser.email,
        currentUser.address
      );
    } else {
      alert("Sorry, that email does not exist. Please register!");
    }
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          <form className="form" onSubmit={this.handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={this.state.userEmail}
              onChange={(e) => this.setState({userEmail: e.target.value})}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Register with Ticket Guru"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
