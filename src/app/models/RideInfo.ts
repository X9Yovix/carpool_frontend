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
  carAvailableSeats: number;
  driverImageUrl: string;
  
  
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
    carSeats: number,
    carAvailableSeats: number,
    driverImageUrl: string
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
    this.carAvailableSeats = carAvailableSeats;
    this.driverImageUrl = driverImageUrl;
  }
}

