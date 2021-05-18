export default class Reservation {
    constructor(id, expiration_date, reservation_confirmed, reservation_number, customer_id) {
        this.id = id;
        this.expiration_date = expiration_date;
        this.reservation_confirmed = reservation_confirmed;
        this.reservation_number = reservation_number;
        this.customer_id = customer_id;
    }
}