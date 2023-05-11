const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const homeRouter = require("./routes/home");
// const { supabase } = require("util/supabase");
const { supabase } = require("./util/supabase");
const port = 3000;
// // const mongoConnect = require('./util/database')
// var jsonParser = bodyParser.json()

app.use(cookieParser());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// app.use("/", homeRouter);
// app.use('/',authRouter)
// app.get('/userbase', (req, res) => {
//     res.render('userbase')
// })

app.get("/", (req, res) => {
  res.render("signup");
});

// app.set("/userbase", homeRouter);

app.get("/userbase", async (req, res) => {
  const fetchData = async () => {
    const { data, error } = await supabase.from("all_details").select();

    if (error) {
      console.log(error);
      return [];
    } else {
      console.log(data);
      return data;
    }
  };

  const data = await fetchData();
  //   console.log(data);
  //   res.json(data);
  res.render("home", { data });
});

app.use(authRouter);

// app.get('/set-cookies', (req, res) => {
//     res.cookie('newUser', false, { httpOnly: true })
//     res.cookie('userIsActive', false, { httpOnly: true })

//     res.send('you got  the cookie')
// })

// app.get('/read-cookies', (req, res) => {
//     const cookies = req.cookies
//     console.log(cookies)
//     res.json(cookies)
// })

// mongoose
//   .connect(
//     "mongodb+srv://yashladekar:oZrtpcup413Ul2yd@cluster0.2lpkxw3.mongodb.net/?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then((result) => {
//     app.listen(port, () => {
//       console.log(`http://localhost:${port}`);
//     });
//   })
//   .catch((err) => [console.log(err)]);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
