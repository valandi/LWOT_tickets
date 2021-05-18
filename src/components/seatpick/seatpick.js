import React, {  } from 'react';
import Button from '@material-ui/core/Button';
import Main from '../main/main';
import Seat from '../../models/seat';
import { getLevels, createReservation, getPerformances } from '../../service/TicketGuruClient';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";

export default class Seatpick extends Main {

    constructor(props) {
        super(props);
        this.setState({
            levels: [],
            totalLevels: 0,
            performances: [],
            performanceDates: [],
            seatsPerRow: 0,
            dateToBuy: "",
            levelToBuy: 0,
            seatsToBuy: 0,
        })
    }

    async componentDidMount() {
        this.setState(
            {
                seats: await this.getVenueSeats(this.props.venueId),
                performances: await this.getPerformances(this.props.showId).then(res => {return res;}),
                levels: await getLevels().then(res => {return res})
            }
        );

        let performanceDates = [];
        let totalLevels = this.state.levels.length;
        this.state.performances.forEach(perf => {
            performanceDates.push(perf.show_time);
        })
        this.setState(
            {
                performanceDates: performanceDates,
                totalLevels: totalLevels
            }
        )
    }

    async confirmReservation(levelId, numSeats) {
        await createReservation(this.props.performanceId, this.props.userId, levelId, numSeats)
        alert("Confirming reservation for: ");
    }

    async generateReserveButton(levelId, seatNumber) {
        let reserveButton = 
        <Button 
            key={seatNumber}
            levelId={levelId} 
            onClick={() => {this.confirmReservation(levelId, 1)}}
            variant="contained">
            Reserve
        </Button>
        return reserveButton;
    }

    async getPerformances(showId) {
        let performances = await getPerformances().then(res => {return res;});
        let filteredPerformances = performances.filter(perf => perf.show_id == showId);
        return filteredPerformances;
    }

    async getVenueSeats(venue_id) {
        // Get the levels for each venue
        const venueLevels = await getLevels().then(res => {return res});

        this.setState({
            totalLevels: venueLevels.length
        });

        const venueSeats = [];
        let seatNumber = 1;
        venueLevels
            .filter(level => level.venueId === venue_id)
            .forEach(level => {
                
                this.setState({
                    seatsPerRow: level.seatsPerRow
                });
                
                for(let row = 0; row < level.numRows; row++) {
                    for(let seat = 0; seat < level.seatsPerRow; seat++) {
                        venueSeats.push(new Seat(
                            seatNumber,
                            row,
                            seatNumber,
                            level.id,
                            0,
                            0
                        ));
                        seatNumber++;
                    }
                }
                
            });

        // Update venueSeats to include all of the seats in the venue so that they can be listed later
        return venueSeats;
    }

    renderPerformanceDates() {
        return (
            <FormGroup>
            <FormLabel>Performance Date</FormLabel>
            <FormControl variant="outlined" fullWidth>
            <Select>
                {
                    this.state.performanceDates.map(date => (
                         <MenuItem value={date}>{date}</MenuItem>
                    ))
                }
            </Select>
            </FormControl>
          </FormGroup>
        )
    }

    renderLevels() {
        let levels = [];
        for(let i = 1; i <= this.state.totalLevels; i++) {
            levels.push(i);
        }

        return (
            <FormGroup>
            <FormLabel>Levels</FormLabel>
            <FormControl variant="outlined" fullWidth>
            <Select>
            {
                levels.map(level => (
                     <MenuItem value={level}>{level}</MenuItem>
                ))
            }
            </Select>
            </FormControl>
          </FormGroup>
        )
    }

    renderSeats() {
        let possibleSeatsSelection = [];
        for(let i = 1; i <= this.state.seatsPerRow; i++) {
            possibleSeatsSelection.push(i);
        }
        return (
            <FormGroup>
            <FormLabel>Seats</FormLabel>
            <FormControl variant="outlined" fullWidth>
            <Select>
            {
                possibleSeatsSelection.map(seats => (
                    <MenuItem value={seats}>{seats}</MenuItem>
                ))
            }
            </Select>
            </FormControl>
          </FormGroup>
        )
    }

     render() {
        return (
            <div>
            <h1> Seat Picker </h1>
            {this.state.performanceDates && this.renderPerformanceDates()}
            {this.state.levels && this.renderLevels()}
            {this.state.seatsPerRow && this.renderSeats()}
          <Button variant="contained" color="primary">Reserve Seats</Button>
          </div>);
    }
  }