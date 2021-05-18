import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Main from '../main/main';
import { createCustomer } from '../../service/TicketGuruClient';

export default class Register extends Main {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    // Check to see if email already exists
    var user = this.state.users.filter(cus => 
      cus.email == this.state.userEmail
    );

    if (user.length > 0) {
      alert("Sorry, there's already a user with that email. Please try another email.")
    } else {
      // Create new customer
      const customerId = await createCustomer(
        this.state.userFirstName,
        this.state.userLastName,
        this.state.userEmail,
        this.state.userAddress
      ).then(res => {
        return res;
      });

      this.handleStateChange(
        customerId,
        this.state.userFirstName, 
        this.state.userLastName, 
        this.state.userEmail, 
        this.state.userAddress);
    }
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className="form" onSubmit={this.handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
              autoComplete="First Name"
              value={this.state.userFirstName}
              onChange={(e) => this.setState({userFirstName: e.target.value})}
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="Last Name"
            name="last_name"
            autoComplete="Last Name"
            value={this.state.userLastName}
            onChange={(e) => this.setState({userLastName: e.target.value})}
          />
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Address"
              label="Address"
              name="address"
              autoComplete="address"
              value={this.state.userAddress}
              onChange={(e) => this.setState({userAddress: e.target.value})}
            />
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Register
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}