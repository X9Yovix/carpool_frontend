export class RideInfo {
  id: number;
  departureLocation: string;
  destinationLocation: string;
  departureDate: Date;
  status: string;
  price: number;
  carId: number;
  carBrand: string;
  carModel: string;
  carColor: string;
  carSeats: number;

  constructor(
    id: number,
    departureLocation: string,
    destinationLocation: string,
    departureDate: Date,
    status: string,
    price: number,
    carId: number,
    carBrand: string,
    carModel: string,
    carColor: string,
    carSeats: number
  ) {
    this.id = id;
    this.departureLocation = departureLocation;
    this.destinationLocation = destinationLocation;
    this.departureDate = departureDate;
    this.status = status;
    this.price = price;
    this.carId = carId;
    this.carBrand = carBrand;
    this.carModel = carModel;
    this.carColor = carColor;
    this.carSeats = carSeats;
  }
}

