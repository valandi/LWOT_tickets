import React, {  } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Main from '../main/main';
import UserHome from '../userHome/userHome';
import Seat from '../../models/seat';
import { confirmReservation } from '../../service/TicketGuruClient';

export default class Reservation extends Main {

    constructor(props) {
        super(props);
    }

    async confirmThisReservation(reservationId) {
        await confirmReservation(reservationId);
    }

    render() {
        return (
          <TableContainer component={Paper}>
          <h1> Reservations </h1>
            <Table className="table" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Reservation Number</TableCell>
                  <TableCell align="left">Expiration Date</TableCell>
                  <TableCell align="left">Reservation Confirmed?</TableCell>
                  <TableCell align="left">Confirm Reservation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
            {this.props.reservations.map((reservation) => {
              return (
              <TableRow key={reservation.id}>
                <TableCell align="left">{reservation.reservation_number}</TableCell>
                <TableCell align="left">{reservation.expiration_date}</TableCell>
                <TableCell align="left">{reservation.reservation_confirmed}</TableCell>
                <TableCell align="left">
                  {reservation.reservation_confirmed == "false" ? 
                  <Button 
                    variant="contained"
                    onClick={() => {this.confirmThisReservation(reservation.reservation_number)}}
                  >
                    Confirm
                  </Button> : <></>}
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
            </Table>
          </TableContainer>
        )
    }
  }