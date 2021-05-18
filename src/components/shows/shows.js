import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Main from '../main/main';

export default class Shows extends Main {

  constructor(props) {
    super(props);
    this.setState({
      venue: 1,
      showId: 1
    });
    this.updateSeatPicker = this.updateSeatPicker.bind(this);
  }

  updateSeatPicker = (venueId, showId) => {
    this.props.updateShowAndVenue(venueId, showId);
  }

  getPerformancesForShowId= (showId) => {
    let performances = this.props.performances.filter(perf => perf.show_id == showId);
    return performances;
  }

  createReservationButton(showId) {
    let reservationButton = <Button variant="contained"> Reserve </Button>
  }

  render() {
      return (
        <TableContainer component={Paper}>
        <h1> Shows </h1>
          <Table className="table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Shows</TableCell>
                <TableCell align="left">Show ID</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Artist</TableCell>
                <TableCell align="left">Venue</TableCell>
                <TableCell align="left">Reserve Ticket</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
          {this.state.shows.map((show) => {
            return (
            <TableRow key={show.name}>
              <TableCell component="th" scope="row">
                {show.name}
              </TableCell>
              <TableCell align="left">{show.id}</TableCell>
              <TableCell align="left">{show.description}</TableCell>
              <TableCell align="left">{show.name}</TableCell>
              <TableCell align="left">{show.venue_id}</TableCell>
              <TableCell align="left">
                <Button onClick={() => {this.updateSeatPicker(show.venue_id, show.id)}} variant="contained">
                  Reserve
                </Button>
              </TableCell>
            </TableRow>
          )})}
        </TableBody>
          </Table>
        </TableContainer>
      )
  }
}
