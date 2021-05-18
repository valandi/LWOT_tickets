import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Reservations from '../reservations/reservations';
import Main from '../main/main';
import {createReservation, getPerformances, getReservations} from '../../service/TicketGuruClient';
import Seatpick from '../seatpick/seatpick';
import Shows from '../shows/shows';

export default class UserHome extends Main {
  
  constructor(props) {
    super(props);
    this.state = {
      reservations: [], 
      performances: [],
      showReservations: true,
      showShows: false,
      showIdForSeatPicker: 1,
      venueIdForSeatPicker: 1
    }
    this.getUserReservations = this.getUserReservations.bind(this);
    this.updateShowAndVenue = this.updateShowAndVenue.bind(this);
  }

  async componentDidMount() {
    await this.getUserReservations();
    await this.getAllPerformances();
  }

  async getUserReservations() {
      // Get client reservations
      const allReservations = await getReservations(this.props.userId).then(res => {return res;});
      this.setState({reservations: allReservations});
      return allReservations;
  }

  async createUserReservation(performanceId) {
    const reservationId = await createReservation(
      performanceId,
      this.state.userId,
      0,
      1
    ).then(res => {return res;});
  }

  async getAllPerformances() {
    let performances = await getPerformances().then(res => {return res;});
    this.setState({performances: performances});
    return performances;
  }

  updateShowAndVenue(venueId, showId) {
    this.setState({
      venueIdForSeatPicker: venueId,
      showIdForSeatPicker: showId
    });
    this.render();
  }

  toggleReservations() {
    this.setState({
      showReservations: true,
      showShows: false
    })
  }

  toggleShows() {
    this.setState({
      showReservations: false,
      showShows: true
    })
  }

  render() {
    return (
      <div>
          <div className={'heroContent'}>
            <Container maxWidth="lg">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Welcome, {this.props.firstName}
              </Typography>
              <div className='heroButtons'>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button onClick={() => this.toggleReservations()} variant="contained" color="primary">
                      My Reservations
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={() => this.toggleShows()} variant="contained" color="primary">
                      Book a reservation
                    </Button>
                  </Grid>
                </Grid>
                
              </div>
            </Container>
          </div>
        {this.state.showReservations ?         
          <Reservations 
          firstName={this.props.firstName} 
          lastName={this.props.lastName}
          userId={this.props.userId}
          email={this.props.email}
          reservations={this.state.reservations}
          /> :
          <div>
          <Shows
          firstName={this.props.firstName} 
          lastName={this.props.lastName}
          userId={this.props.userId}
          email={this.props.email}
          performances={this.state.performances}
          updateShowAndVenue={this.updateShowAndVenue}
        />
        <Seatpick
          venueId={this.state.venueIdForSeatPicker}
          performances={this.state.performances}
          showId={this.state.showIdForSeatPicker}
          userId={this.props.userId}/>
        </div>
        }


      </div>
    );
  }

}
