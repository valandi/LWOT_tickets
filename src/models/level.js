export default class Level {
    constructor(id, name, numRows, seatsPerRow, price, venueId) {
        this.id = id;
        this.name = name;
        this.numRows = numRows;
        this.seatsPerRow = seatsPerRow;
        this.price = price;
        this.venueId = venueId;
    }
}