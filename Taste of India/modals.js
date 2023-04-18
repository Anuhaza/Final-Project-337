const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  currentOrder: {
    items: [],
    total: Number,
    comment: String,
  },
});

const ItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
});

const OrderSchema = new mongoose.Schema({
  userId: String,
  username: String,
  items: [],
  total: Number,
  status: String,
  type: String,
  paid: Boolean,
  payment: {
    cardNo: Number,
    cvv: Number,
    exp: String,
  },
  comment: String,
  timestamp: Number,
  date: Date,
});

const ReservationSchema = new mongoose.Schema({
  userId: String,
  username: String,
  time: String,
  noOfPersons: Number,
  phone: String,
  date: Date,
  createdAt: Number,
});

const User = mongoose.model("user", UserSchema);
const Item = mongoose.model("item", ItemSchema);
const Order = mongoose.model("order", OrderSchema);
const Reservation = mongoose.model("reservation", ReservationSchema);

module.exports = { User, Item, Order, Reservation };
