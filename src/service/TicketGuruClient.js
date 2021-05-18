import axios from "axios";
import Show from '../models/show'
import Venue from "../models/venue";
import Level from "../models/level";
import Customer from "../models/customer";
import Reservation from "../models/reservation";
import Performance from "../models/performance";

// Set Axios defaults
const API_URL = "http://ec2-54-159-33-6.compute-1.amazonaws.com:5005/ticket-guru/api/"
axios.defaults.baseURL = API_URL;

export const getAllUsers = async() => {
    const usersList = [];
    await axios
        .get('/customers')
        .then(response => {
            response.data.forEach(element => {
                usersList.push(new Customer(
                    element.id,
                    element.address,
                    element.email,
                    element.firstName,
                    element.lastName
                ));
            });
            
        });
    return usersList;
}

export const getUpcomingShows = async() => {
    const allShows = [];
    await axios
        .get('/shows')
        .then(response => {
            response.data.forEach(element => {
                allShows.push(
                    new Show(
                        element.id, 
                        element.description,
                        element.name,
                        element.venueId)
                    )
            })
        });
    return allShows;
}

export const getUserById = async(customerId) => {
    return await axios
        .get(`/customers/${customerId}`)
}

export const getVenues = async() => {
    const allVenues = [];
    await axios
        .get(`/venues`)
        .then(response => {
            response.data.forEach(venue => {
                allVenues.push(
                    new Venue(
                        venue.id, 
                        venue.address,
                        venue.description,
                        venue.name,
                        [],
                        []
                    )
                )
            })
        });
    return allVenues;
}

export const getLevels = async() => {
    const levels = [];
    await axios
        .get(`/levels`)
        .then(response => {
            response.data.forEach(level => {
                levels.push(
                    new Level(
                        level.id, 
                        level.name, 
                        level.numRows, 
                        level.seatsPerRow, 
                        level.price, 
                        level.venueId
                    )
                )
            })
        });
    return levels;
}

export const getReservations = async(userId) => {
    const reservations = [];
    await axios
        .get(`/customers/${userId}/reservations`)
        .then(response => {
            response.data.forEach(reservation => {
                let confirmed = 
                reservations.push(
                    new Reservation(
                        reservation.id,
                        reservation.expirationDate,
                        reservation.reservationConfirmed ? "true" : "false",
                        reservation.id,
                        userId
                    )
                )
            })
        });

    return reservations;
}

export const getVenueById = async(venueId) => {
    return await axios  
        .get(`/venues/${venueId}`)
}

export const createCustomer = async(firstName, lastName, email, address) => {
    const newCustomerRequest = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "address": address
    }
    const headers = {
        'Content-Type': 'application/json'
    }

    let customerId = 0;
    await axios
        .post('/customers', newCustomerRequest, {
            headers: headers
        })
        .then(res => {
            customerId = res.data.id;
        })
        .catch((error) => console.log( error) );


    return customerId;
}

export const createReservation = async(performanceId, customerId, levelId, numSeats) => {
    const reservationRequest = {
        "performanceId": performanceId,
        "customer": {
            "id": customerId
        },
        "seatRequests": [
            {
                "level": {"id": levelId},
                "numSeats": numSeats
            }
        ]
    }

    let reservationId = 0;
    await axios
        .post('/reservations', reservationRequest)
        .then(res => {
            reservationId = res.id
        });
    return reservationId;
}

export const getPerformances = async() => {
    const performances = [];

    await axios
            .get(`/performances`)
            .then(response => {
                response.data.forEach(performance => {
                        performances.push(new Performance(
                            performance.id,
                            performance.showTime,
                            performance.showId
                        ))
                })
            });
    return performances;
}

export const confirmReservation = async(reservationId) => {
    await axios.put(`/reservations/${reservationId}/confirm`)
}