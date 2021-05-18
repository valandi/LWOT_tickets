export default class Seat {
    constructor(id, row, seat_number, level_id, performance_id, reservation_id) {
        this.id = id;
        this.row = row;
        this.seat_number = seat_number;
        this.level_id = level_id;
        this.performance_id = performance_id;
        this.reservation_id = reservation_id;
    }
}