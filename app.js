const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const homeRouter = require("./routes/home");
// const { supabase } = require("util/supabase");
const { supabase } = require("./util/supabase");
const port = 3000;
const mongoConnect = require('./util/database')
var jsonParser = bodyParser.json()

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");



app.get("/", (req, res) => {
  res.render("signup");
});



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
  //need to change the 

  // res.render('userbase',{data})
  res.render("home", { data });
});

app.use(authRouter);



mongoose
  .connect(
    "mongodb+srv://yashladekar:oZrtpcup413Ul2yd@cluster0.2lpkxw3.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }  
  )
  .then((result) => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => [console.log(err)]);

// app.listen(port, () => {
//   console.log(`http://localhost:${port}`);
// });
