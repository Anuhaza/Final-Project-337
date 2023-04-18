const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");

const { User, Item, Order, Reservation } = require("./modals");

const PORT = 5000;
const DB_URL = "mongodb://127.0.0.1:27017/foi";

function getCurrentDate() {
  const d = new Date();
  return `${`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`}`;
}

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    secret: "SECRET KEY",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: DB_URL,
      autoRemove: "native",
      ttl: 14 * 24 * 60 * 60,
    }),
  })
);

app.get("/", (req, res) => {
  res.render("index", { isAuth: req.session.isAuth });
});

app.get("/menu", (req, res) => {
  res.render("menu", { isAuth: req.session.isAuth });
});

app.get("/reservation", (req, res) => {
  res.render("reservation", { isAuth: req.session.isAuth });
});

app.get("/login", (req, res) => {
  if (req.session.isAuth || req.session.userId) {
    return res.redirect("/");
  }
  res.render("login", { isAuth: req.session.isAuth });
});

app.get("/faq", (req, res) => {
  res.render("faq", { isAuth: req.session.isAuth });
});

app.get("/orderHistory", (req, res) => {
  res.render("orderHistory", { isAuth: req.session.isAuth });
});

app.get("/payment", async (req, res) => {
  const user = await User.findById(req.session.userId);
  if (user && user.currentOrder?.items?.length > 0) {
    res.render("payment", {
      isAuth: req.session.isAuth,
      currentOrder: user.userOrder,
    });
  } else {
    res.send("Error 404");
  }
});

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      res.json({ ok: false, message: "User already exists with that email" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      req.session.isAuth = true;
      req.session.email = user.email;
      req.session.userId = user._id;
      res.json({ ok: true, message: "Account created" });
    }
  } catch (error) {
    res.json({ ok: false, message: "Something went wrong!" });
  }
});

app.post("/api/login", async (req, res) => {
  const data = req.body;

  const user = await User.findOne({ email: data.email });
  if (!user)
    return res.json({
      ok: false,
      message: `No User Exists with that email`,
    });

  const isCorrectPassword = await bcrypt.compare(data.password, user.password);
  if (!isCorrectPassword) {
    return res.json({ message: `Invalid Credentials`, ok: false });
  }
  req.session.isAuth = true;
  req.session.email = user.email;
  req.session.userId = user._id;

  return res.json({ ok: true });
});

app.post("/api/me", async (req, res) => {
  if (req.session.isAuth) {
    const user = await User.findById(req.session.userId);
    const { name, email, _id } = user;
    return res.send({
      message: `Already Logged In`,
      data: { name, email, userId: _id },
      ok: true,
    });
  } else {
    res.json({ ok: false, message: "Not logged in" });
  }
});

app.get("/api/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
  return res.json({ ok: true });
});

app.post("/api/currentOrder", async (req, res) => {
  const order = req.body;
  const user = await User.findById(req.session.userId);
  if (user) {
    user.currentOrder = order;
    const newOrder = new Order({
      items: order.items,
      total: order.total,
      comment: order.comment,
      userId: user._id,
      username: user.username,
      status: "delivered",
      type: "delivery",
      paid: true,
      timestamp: new Date().getTime(),
      date: getCurrentDate(),
    });
    await user.save();
    newOrder.save();
    res.json({ ok: true });
  } else {
    res.json({ ok: false, message: "someting went wrong" });
  }
});

app.get("/api/ordersHistory", async (req, res) => {
  const userId = req.session.userId;
  if (req.session.isAuth && userId) {
    const orders = await Order.find({ userId }).sort("-timestamp").exec();
    res.json({ ok: true, data: orders });
  } else {
    res.json({ ok: false, message: "Invalid request" });
  }
});

//Add app.get for reservation
app.post("/api/reservation", async (req, res) => {
  const reservation = req.body;
  const user = await User.findById(req.session.userId);
  if (user) {
    const newReservation = new Reservation({
      userId: user._id,
      username: user.username,
      time: reservation.time,
      noOfPersons: reservation.noOfPersons,
      phone: reservation.phone,
      date: reservation.date,
    });
    await newReservation.save();
    res.json({ ok: true });
  } else {
    res.json({ ok: false, message: "Something went wrong" });
  }
});


mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log("Error", err));

app.listen(5000, () => console.log(`app running on http://localhost:${PORT}/`));
