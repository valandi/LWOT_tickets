import React, {  } from 'react';
import { getAllUsers, getVenues, getUpcomingShows } from '../../service/TicketGuruClient';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          shows: [],
          venues: [],
          users: [],
          seats: [],
          userId: 0,
          userEmail: '',
          userFirstName: '',
          userLastName: '',
          userAddress: '',
          reservations: []
        }
        this.handleStateChange = this.handleStateChange.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    updateUser(userId, firstName, lastName, email, address) {
        this.setState({
            userId: userId,
            userFirstName: firstName,
            userLastName: lastName,
            userEmail: email,
            userAddress: address
        });
    }

    handleStateChange(userId, firstName, lastName, email, address) {
        this.setState({
            userId: userId,
            userFirstName: firstName,
            userLastName: lastName,
            userEmail: email,
            userAddress: address
        });
    }

    getVenueNameById(venue_id) {
        return this.state.venues.filter(venue => venue.id === venue_id)[0];
    }

    async getShows() {
        const allShows = await getUpcomingShows().then(res => {return res});
        this.setState({shows: allShows});
        return allShows;
    }

    /**
    async getVenues() {
        const allVenues = await getVenues().then(res => {return res});
        this.setState({venues: allVenues});
        return allVenues;
    }
    */

    async getUsersMap() {
        const users = await getAllUsers().then(res => {return res});
        this.setState({users: users})
        return users;
    }


    async componentDidMount() {
        await this.getShows();
        //await this.getVenues();
        await this.getUsersMap();
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <h1> Main Page2 </h1>
        )
    }
}