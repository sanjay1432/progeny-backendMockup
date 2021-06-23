const express = require("express");
const app = express();
const moment = require("moment");
const faker = require("faker");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, refreshToken"
  );
  next();
});

app.get("/opex/login", (req, res) => {
  const username = "duong";
  let payload = { username: username };
  setTimeout(() => {
    const token = jwt.sign(payload, "duong-test-sso-key", { expiresIn: "10s" });
    res.redirect(
      `http://localhost:3000/dmp/#/login?username=${username}&token=${token}`
    );
  }, 1000);
});

app.get("/sso/opex/login", (req, res) => {
  const username = "duong";
  let payload = { username: username };
  const token = jwt.sign(payload, "duong-test-sso-key", { expiresIn: "10s" });
  res.redirect(
    `http://localhost:5000/#/login?username=${username}&token=${token}`
  );
});

function authenticateTokenSSO(req, res, next) {
  // Gather the jwt access token from the request header
  const token = req.body["ssoToken"];
  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, "duong-test-sso-key", (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(401);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log({token})
  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, "duong-test", (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(401);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

app.post("/api/v1/general/login/user-login", function (req, res) {
  const { username, password } = req.body;
  if (username === "aceadmin" && password === "aceadmin123") {
    let payload = { username: username };
    const token = jwt.sign(payload, "duong-test", { expiresIn: "30d" });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        firstName: "Aceras",
        lastName: "Admin",
        email: "aceras@opex.com",
        username: "aceadmin",
        token: token,
      })
    );
  } else {
    return res.status(400).send({
      ErrorMessage: "User not found",
    });
  }
});

app.get("/api/v1/general/login/refresh", function (req, res) {
  const token = jwt.sign({ username: "sssss" }, "duong-test", {
    expiresIn: "30d",
  });
  const result = {
    response: {
      access_token: token,
      expires_in: 120,
      refresh_expires_in: 1800,
      refresh_token: "refresh-meeeee",
      token_type: "bearer",
      "not-before-policy": 0,
      session_state: "71eb8a6b-e67b-4a0e-88f9-80c01aadf43e",
      scope: "email profile",
    },
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});


//PROGENY


app.get(
  "/admin/estate",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [
        {
          estate:"KLS",
          estatefullname:"Kebuan Lokasi Satu",
          noofestateblock:3,
          nooftrails:3,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102a",
            size:"123.0",
            density:420
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:360
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KSG",
          estatefullname:"Kebuan Lokasi Dua",
          noofestateblock:1,
          nooftrails:2,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KBL",
          estatefullname:"Kebuan Lokasi Tiga",
          noofestateblock:4,
          nooftrails:7,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102f",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102g",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102h",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KCL",
          estatefullname:"Kebuan Lokasi Empat",
          noofestateblock:9,
          nooftrails:1,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102f",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102g",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102h",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KEL",
          estatefullname:"Kebuan Lokasi Lima",
          noofestateblock:2,
          nooftrails:6,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102f",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102g",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102h",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KFL",
          estatefullname:"Kebuan Lokasi Enam",
          noofestateblock:6,
          nooftrails:6,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102f",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102g",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102h",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KGQ",
          estatefullname:"Kebuan Lokasi Lapan",
          noofestateblock:1,
          nooftrails:4,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102f",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102g",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102h",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KQS",
          estatefullname:"Kebuan Lokasi Sembilan",
          noofestateblock:1,
          nooftrails:6,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102f",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102g",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102h",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLG",
          estatefullname:"Kebuan Lokasi Sepuluh",
          noofestateblock:1,
          nooftrails:4,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102f",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102g",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102h",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KVG",
          estatefullname:"Kebuan Lokasi Sebelas",
          noofestateblock:6,
          nooftrails:2,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102f",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102g",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102h",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KZA",
          estatefullname:"Kebuan Lokasi Dua Belas",
          noofestateblock:2,
          nooftrails:4,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102f",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102g",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102h",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KJV",
          estatefullname:"Kebuan Lokasi Tiga Belas",
          noofestateblock:7,
          nooftrails:1,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102f",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102g",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102h",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KJV",
          estatefullname:"Kebuan Lokasi Empat Belas",
          noofestateblock:8,
          nooftrails:5,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102f",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102g",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102h",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLA",
          estatefullname:"Kebuan Lokasi Lima Belas",
          noofestateblock:5,
          nooftrails:3,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102f",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102g",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102h",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLZ",
          estatefullname:"Kebuan Lokasi Enam Belas",
          noofestateblock:5,
          nooftrails:3,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102f",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102g",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102h",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KPQ",
          estatefullname:"Kebuan Tujuh Belas",
          noofestateblock:4,
          nooftrails:1,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102f",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102g",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102h",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KMB",
          estatefullname:"Kebuan Lokasi Lapan Belas",
          noofestateblock:1,
          nooftrails:1,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102f",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102g",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102h",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KZQ",
          estatefullname:"Kebuan Lokasi Sembilan Belas",
          noofestateblock:2,
          nooftrails:3,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102f",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102g",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102h",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KZF",
          estatefullname:"Kebuan Dua Buluh",
          noofestateblock:1,
          nooftrails:5,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102f",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102g",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102h",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KAM",
          estatefullname:"Kebuan Lokasi Dua Puluh Satu",
          noofestateblock:5,
          nooftrails:5,
          estateblocks: [
          {
            estateblock:"102d",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102e",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102f",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102g",
            size:"123.0",
            density:230
          },
          {
            estateblock:"102h",
            size:"123.0",
            density:230
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        }
      ],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/admin/trial",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM02",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Dec-02",
          nofprogeny:50,
          nofreplicate:6,
          soiltype:"Mineral",
          nofplot:300,
          nofplot_subblock:10,
          nofsubblock:10,
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"002",  
          trial:"PT01_001KPM78",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Jan-01",
          nofprogeny:1,
          nofreplicate:6,
          soiltype:"Mineral",
          nofplot:3,
          nofplot_subblock:2,
          nofsubblock:5,
          status: "canceled",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM02",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Dec-02",
          nofprogeny:50,
          nofreplicate:6,
          soiltype:"Mineral",
          nofplot:300,
          nofplot_subblock:10,
          nofsubblock:10,
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM78",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Jan-01",
          nofprogeny:1,
          nofreplicate:6,
          soiltype:"Mineral",
          nofplot:3,
          nofplot_subblock:2,
          nofsubblock:5,
          status: "canceled",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM02",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Dec-02",
          nofprogeny:50,
          nofreplicate:6,
          soiltype:"Mineral",
          nofplot:300,
          nofplot_subblock:10,
          nofsubblock:10,
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM78",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Jan-01",
          nofprogeny:1,
          nofreplicate:6,
          soiltype:"Mineral",
          nofplot:3,
          nofplot_subblock:2,
          nofsubblock:5,
          status: "canceled",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM02",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Dec-02",
          nofprogeny:50,
          nofreplicate:6,
          soiltype:"Mineral",
          nofplot:300,
          nofplot_subblock:10,
          nofsubblock:10,
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM78",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Jan-01",
          nofprogeny:1,
          nofreplicate:6,
          soiltype:"Mineral",
          nofplot:3,
          nofplot_subblock:2,
          nofsubblock:5,
          status: "canceled",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM02",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Dec-02",
          nofprogeny:50,
          nofreplicate:6,
          soiltype:"Mineral",
          nofplot:300,
          nofplot_subblock:10,
          nofsubblock:10,
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM78",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Jan-01",
          nofprogeny:1,
          nofreplicate:6,
          soiltype:"Mineral",
          nofplot:3,
          nofplot_subblock:2,
          nofsubblock:5,
          status: "canceled",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM02",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Dec-02",
          nofprogeny:50,
          nofreplicate:6,
          soiltype:"Mineral",
          nofplot:300,
          nofplot_subblock:10,
          nofsubblock:10,
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM78",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Jan-01",
          nofprogeny:1,
          nofreplicate:6,
          soiltype:"Mineral",
          nofplot:3,
          nofplot_subblock:2,
          nofsubblock:5,
          status: "canceled",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM02",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Dec-02",
          nofprogeny:50,
          nofreplicate:6,
          soiltype:"Mineral",
          nofplot:300,
          nofplot_subblock:10,
          nofsubblock:10,
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM78",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Jan-01",
          nofprogeny:1,
          nofreplicate:6,
          soiltype:"Mineral",
          nofplot:3,
          nofplot_subblock:2,
          nofsubblock:5,
          status: "canceled",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM02",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Dec-02",
          nofprogeny:50,
          nofreplicate:6,
          soiltype:"Mineral",
          nofplot:300,
          nofplot_subblock:10,
          nofsubblock:10,
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001",  
          trial:"PT01_001KPM78",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Jan-01",
          nofprogeny:1,
          nofreplicate:6,
          soiltype:"Mineral",
          nofplot:3,
          nofplot_subblock:2,
          nofsubblock:5,
          status: "canceled",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"017",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"017",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"017",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"017",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"017",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"017",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"017",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"017",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"017",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"017",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"017",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"017",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"017",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"017",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"017",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"017",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"020",  
          trial:"PT01_001KPM05",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Feb-03",
          nofprogeny:100,
          nofreplicate:600,
          soiltype:"Mineral",
          nofplot:1,
          nofplot_subblock:4,
          nofsubblock:2,
          status: "finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KPM",
          trialid:"018",  
          trial:"PT02_002KPM03",
          trialremark:"Progeny Trial: “a” Cross DelixGha and “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Dec-02",
          nofprogeny:50,
          nofreplicate:5,
          soiltype:"Mineral",
          nofplot:250,
          nofplot_subblock:10,
          nofsubblock:5,
          status:"canceled",
          design: "Alhpa Design",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"ASG",
          trialid:"020",  
          trial:"PT01_001KPM02",
          trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGhaand “b” Cross DelixEko",
          area: "50.50",
          planteddate:"Dec-02",
          nofprogeny:10,
          nofreplicate:7,
          soiltype:"Mineral",
          nofplot:250,
          nofplot_subblock:5,
          nofsubblock:3,
          design: "Alhpa Design",
          status:"finished",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        }
      ],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/admin/plot",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [
        {
          estate:"KLS",
          trialid:"001", 
          replicate:6, 
          estateblock:"102e",
          design:"Alpha Design",
          density:136,
          plot:"Plot 1",
          subblock:5,
          progenyId: "D001",
          progeny:"Ce 1.1",
          ortet:"C9212.57",
          fp:"C 27,36",
          mp:"C 27,2489",
          noofPalm:"16",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"002", 
          replicate:6, 
          estateblock:"102e",
          design:"Alpha Design",
          density:136,
          plot:"Plot 2",
          subblock:4,
          progenyId: "D002",
          progeny:"Ce 1.1",
          ortet:"C9212.57",
          fp:"C 27,36",
          mp:"C 27,2489",
          noofPalm:"16",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"019", 
          replicate:6, 
          estateblock:"102e",
          design:"Alpha Design",
          density:136,
          plot:"Plot 3",
          subblock:6,
          progenyId: "D003",
          progeny:"Ce 1.1",
          ortet:"C9212.57",
          fp:"C 27,36",
          mp:"C 27,2489",
          noofPalm:"16",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"020", 
          replicate:6, 
          estateblock:"102e",
          design:"Alpha Design",
          density:136,
          plot:"Plot 4",
          subblock:3,
          progenyId: "D004",
          progeny:"Ce 1.1",
          ortet:"C9212.57",
          fp:"C 27,36",
          mp:"C 27,2489",
          noofPalm:"16",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        }
      ],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/admin/plot/qrcode/:trialid",
  //authenticateToken,
  function(req, res) {
    const trialId = req.params.trialid;
    const trialReq = [
      {
        estate:"KLS",
        trialid:"001",  
        trial:"PT01_001KPM02",
        trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
        area: "50.50",
        planteddate:"Dec-02",
        nofprogeny:50,
        nofreplicate:6,
        soiltype:"Mineral",
        nofplot:300,
        nofplot_subblock:10,
        nofsubblock:10,
        status: "active",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estate:"KLS",
        trialid:"002",  
        trial:"PT01_001KPM02",
        trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
        area: "50.50",
        planteddate:"Dec-02",
        nofprogeny:50,
        nofreplicate:6,
        soiltype:"Mineral",
        nofplot:300,
        nofplot_subblock:10,
        nofsubblock:10,
        status: "active",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      }
    ];
    const plotReq  = [
      {
        estate:"KLS",
        trialid:"001", 
        replicate:6, 
        estateblock:"102e",
        design:"Alpha Design",
        density:136,
        plot:"Plot 1",
        subblock:5,
        progenyId: "D001",
        progeny:"Ce 1.1",
        ortet:"C9212.57",
        fp:"C 27,36",
        mp:"C 27,2489",
        noofPalm:"16",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estate:"KPM",
        trialid:"002", 
        replicate:6, 
        estateblock:"102e",
        design:"Alpha Design",
        density:136,
        plot:"Plot 2",
        subblock:4,
        progenyId: "D002",
        progeny:"Ce 1.1",
        ortet:"C9212.57",
        fp:"C 27,36",
        mp:"C 27,2489",
        noofPalm:"16",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      }
    ]; 
    const palm = [
      {
        plot:"Plot 1",
        palmno:1,
        palmname:"Palm1",
      },
      {
        plot:"Plot 1",
        palmno:2,
        palmname:"Palm2",
      },
      {
        plot:"Plot 1",
        palmno:3,
        palmname:"Palm3",
      },
      {
        plot:"Plot 1",
        palmno:4,
        palmname:"Palm4",
      },
      {
        plot:"Plot 1",
        palmno:5,
        palmname:"Palm5",
      },
      {
        plot:"Plot 1",
        palmno:6,
        palmname:"Palm6",
      },
      {
        plot:"Plot 2",
        palmno:4,
        palmname:"Palm4",
      },
      {
        plot:"Plot 2",
        palmno:5,
        palmname:"Palm5",
      },
      {
        plot:"Plot 2",
        palmno:6,
        palmname:"Palm6",
      }
    ];

    const meetTrial = trialReq.find(trial => trial.trialid === trialId)
    const meetPlot  = plotReq.find(plot => plot.trialid === meetTrial.trialid)
    const result = palm.filter(palm => palm.plot === meetPlot.plot)
    
    res.writeHead(200, { "Content-Type" : "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.put(
  "/admin/plot",
  authenticateToken,
  function (req, res) {
    
    const result = {
      success: true,
      data: null,
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/admin/palm",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [
        {
          estate:"KLS",
          trialid:"001", 
          replicate:6, 
          estateblock:"102e",
          design:"Alpha Design",
          density:136,
          plot:"Plot 1",
          palmno:1,
          palmname:"Palm1",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KEQ",
          trialid:"002", 
          replicate:6, 
          estateblock:"102e",
          design:"Alpha Design",
          density:136,
          plot:"Plot 2",
          palmno:2,
          palmname:"Palm2",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"FLZ",
          trialid:"003", 
          replicate:6, 
          estateblock:"102e",
          design:"Alpha Design",
          density:136,
          plot:"Plot 3",
          palmno:3,
          palmname:"Palm3",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"HFS",
          trialid:"004", 
          replicate:6, 
          estateblock:"102e",
          design:"Alpha Design",
          density:136,
          plot:"Plot 4",
          palmno:4,
          palmname:"Palm4",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        }
      ],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.put(
  "/admin/palm",
  authenticateToken,
  function (req, res) {
    
    const result = {
      success: true,
      data: null,
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/admin/progeny",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [
        {
          progenyId:"D001",
          popvar:"Dura111",
          origin:"Chemera (100% Ce)",
          progenyremark:"Ce 1",
          progeny:"Ce 1.1",
          generation:"Gen 1",
          ortet:null,
          fp:"C 27.36",
          fpFam:"C 27",
          fpVar:"D",
          mp:"C 27, 2489",
          mpFam:"C 27",
          mpVar: "A",
          cross:"C 27,36 x C 27, 2489",
          crossType:"DXD Sibling",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          progenyId:"D002",
          popvar:"Dura222",
          origin:"Chemera (100% Ce)",
          progenyremark:"Ce 1",
          progeny:"Ce 1.1",
          generation:"Gen 2",
          ortet:"C 9212.57",
          fp:"C 27.36",
          fpFam:"C 27",
          fpVar:"D",
          mp:"C 27, 2489",
          mpFam:"C 27",
          mpVar: "B",
          cross:"C 27,36 x C 27, 2489",
          crossType:"DXD Sibling",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          progenyId:"D003",
          popvar:"Dura333",
          origin:"Chemera (100% Ce)",
          progenyremark:"Ce 1",
          progeny:"Ce 1.1",
          generation:"Gen 3",
          ortet:"C 9212.57",
          fp:"C 27.36",
          fpFam:"C 27",
          fpVar:"D",
          mp:"C 27, 2489",
          mpFam:"C 27",
          mpVar: "D",
          cross:"C 27,36 x C 27, 2489",
          crossType:"DXD Sibling",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          progenyId:"D004",
          popvar:"Dura444",
          origin:"Chemera (100% Ce)",
          progenyremark:"Ce 1",
          progeny:"Ce 1.1",
          generation:"Gen 3",
          ortet:"C 9212.57",
          fp:"C 27.36",
          fpFam:"C 27",
          fpVar:"D",
          mp:"C 27, 2489",
          mpFam:"C 27",
          mpVar: "D",
          cross:"C 27,36 x C 27, 2489",
          crossType:"DXD Sibling",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        }
      ],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.post(
  "/admin/progeny",
  authenticateToken,
  function (req, res) {
    
    const result = {
      success: true,
      data: null,
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.put(
  "/admin/progeny",
  authenticateToken,
  function (req, res) {
    
    const result = {
      success: true,
      data: null,
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/admin/estate/estate-blocks",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [
        {
          estate:"KLS",
          
          estateblocks: [
          {
            id:"1",
            assigned: false,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            id:"2",
            assigned: true,
            estateblock:"102a",
            soiltype:"Alluvial"
          },
          {
            id:"3",
            assigned: true,
            estateblock:"102e",
            soiltype:"Inland"
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KSG",
         
          estateblocks: [
          {
            id:"1",
            assigned: true,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            id:"2",
            assigned: false,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            id:"3",
            assigned: false,
            estateblock:"102f",
            soiltype:"Minerals"
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KBL",
        
          estateblocks: [
          {
            id:"1",
            assigned: true,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            id:"2",
            assigned: true,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            id:"3",
            assigned: true,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            id:"4",
            assigned: false,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
            id:"5",
            assigned: false,
            estateblock:"102h",
            soiltype:"Alluvial"
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KCL",
        
          estateblocks: [
          {
            id:"1",
            assigned: true,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            id:"2",
            assigned: false,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            id:"3",
            assigned: false,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            id:"4",
            assigned: false,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
            id:"5",
            assigned: true,
            estateblock:"102h",
            soiltype:"Alluvial"
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KEL",
         
          estateblocks: [
          {
            id:"1",
            assigned: true,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            id:"2",
            assigned: true,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            id:"3",
            assigned: true,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            id:"4",
            assigned: true,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
            id:"5",
            assigned: true,
            estateblock:"102h",
            soiltype:"Alluvial"
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KFL",
        
          estateblocks: [
          {
            id:"1",
            assigned: true,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            id:"2",
            assigned: false,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            id:"3",
            assigned: false,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            id:"4",
            assigned: false,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
            id:"5",
            assigned: false,
            estateblock:"102h",
            soiltype:"Alluvial"
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KGQ",
         
          estateblocks: [
          {
            id:"1",
            assigned: true,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            id:"2",
            assigned: false,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            id:"3",
            assigned: false,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            id:"4",
            assigned: false,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
            id:"5",
            assigned: false,
            estateblock:"102h",
            soiltype:"Alluvial"
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KQS",
       
          estateblocks: [
          {
            id:"1",
            assigned: true,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            id:"2",
            assigned: true,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            id:"3",
            assigned: true,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            id:"4",
            assigned: true,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
            id:"5",
            assigned: false,
            estateblock:"102h",
            soiltype:"Alluvial"
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLG",
         
          estateblocks: [
          {
            id:"1",
            assigned: false,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            id:"2",
            assigned: false,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            id:"3",
            assigned: false,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            id:"4",
            assigned: false,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
            id:"5",
            assigned: false,
            estateblock:"102h",
            soiltype:"Alluvial"
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KVG",
        
          estateblocks: [
          {
            id:"1",
            assigned: false,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            id:"2",
            assigned: false,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            id:"3",
            assigned: false,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            id:"4",
            assigned: false,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
            id:"5",
            assigned: false,
            estateblock:"102h",
            soiltype:"Alluvial"
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KZA",
      
          estateblocks: [
          {
            id:"1",
            assigned: false,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            id:"2",
            assigned: false,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            id:"3",
            assigned: false,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            id:"4",
            assigned: false,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
            id:"5",
            assigned: false,
            estateblock:"102h",
            soiltype:"Alluvial"
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KAM",
          estateblocks: [
          {
            id:"1",
            assigned: false,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            id:"2",
            assigned: false,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            id:"3",
            assigned: false,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            id:"4",
            assigned: false,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
            id:"5",
            assigned: false,
            estateblock:"102h",
            soiltype:"Alluvial"
          }],
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        }
      ],
      updatedDate:"2021-05-11T02:22:39.829Z"
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.put(
  "/admin/estate/map-estate-blocks",
  authenticateToken,
  function (req, res) {
    const { estate, blocks } = req.body;
    if(!estate || blocks.length === 0) return res.status(500).send("There is something wrong!")
    const result = {
      success: true,
      data: [],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/admin/design",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [
        {
          design:"Alpha Design",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          design:"RCBD",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          design:"identified plot",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        }
      ],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);
//USER BLOCK

app.get(
  "/admin/userlist",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [
        {
          userId:"001",
          username:"Ali",
          position:"Mandore",
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          userId:"002",
          username:"Aqeel",
          position:"Mandore",
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          userId:"003",
          username:"Dexter",
          position:"Recorder",
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          userId:"004",
          username:"Jack",
          position:"Recorder",
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          userId:"005",
          username:"Maxwell",
          position:"Recorder",
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        }, {
          userId:"006",
          username:"Ahmed",
          position:"Assistant",
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          userId:"007",
          username:"Amir",
          position:"Assistant",
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          userId:"008",
          username:"Joe",
          position:"Mandore",
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          userId:"009",
          username:"Smith",
          position:"Recorder",
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          userId:"010",
          username:"Tim",
          position:"Mandore",
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          userId:"011",
          username:"Jhon",
          position:"Mandore",
          status: "active",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        }
      ],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/admin/estateAssignment",
  //authenticateToken,
  function(req, res) {
    const result = {
      success: true,
      data: [
        {
          estate: "KLS",
          estatefullname: "KLS",
          noTrialOnHere: 2,
          assignedUser: 20
        },
        {
          estate: "KPM",
          estatefullname: "KPM",
          noTrialOnHere: 5,
          assignedUser: 20
        },
        {
          estate: "ASG",
          estatefullname: "ASG",
          noTrialOnHere: 6,
          assignedUser: 20
        }
      ],
    };
    res.writeHead(200, {"content-type" : "application/json"});
    res.end(JSON.stringify(result));
  }
)

app.get(
  "/admin/userAssignment",
  //authenticationToken,
  function (req, res) {
    const result = {
      success: true,
      data: [
        {
          userId: "001",
          username: "Ali",
          position: "Mandore",
          // estate: [
          //   {
          //     estate: "KLM"
          //   },
          //   {
          //     estate: "KLS"
          //   }
          // ]
        },
        {
          userId: "002",
          username: "Aqeel",
          position: "Mandore",
          // estate: [
          //   {
          //     estate: "KKK"
          //   }
          // ]
        },
        {
          userId: "003",
          username: "Dexter",
          position: "Recorder",
          // estate: [
          //   {
          //     estate: "KBM"
          //   }
          // ]
        }
      ],
    };
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(result));
  }
)
app.post(
  "/admin/user",
  authenticateToken,
  function (req, res) {
    const {userId, username, position} =  req.body
    const result = {
      success: true,
      data: {userId, username, position},
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.put(
  "/admin/user",
  authenticateToken,
  function (req, res) {
    const {userId, username, position, status} =  req.body
    const result = {
      success: true,
      data: {userId, username, position, status},
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.put(
  "/admin/assign-user-to-estate",
  authenticateToken,
  function (req, res) {
    const {estate, userId} =  req.body
    const result = {
      success: true,
      data: {estate, userId},
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.put(
  "/admin/assign-estate-to-user",
  authenticateToken,
  function (req, res) {
    const {username, estate} =  req.body
    const result = {
      success: true,
      data: {username, estate},
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/admin/user-position",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [
        {
          position:"Mandore",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          position:"Recorder",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          position:"Assistant",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        }
      ],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);


//TRIAL
app.post(
  "/admin/trial",
  authenticateToken,
  function (req, res) {
    
    const result = {
      success: true,
      data: null,
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.put(
  "/admin/trial",
  authenticateToken,
  function (req, res) {
    
    const result = {
      success: true,
      data: null,
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/admin/trial/replicates/:trialid",
  authenticateToken,
  function (req, res) {
    const trialId =  req.params.trialid;
    const trials = [
      {
        estate:"KLS",
        trialid:"001",  
        trial:"PT01_001KPM02",
        trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
        area: "50.50",
        planteddate:"Dec-02",
        nofprogeny:50,
        nofreplicate:6,
        soiltype:"Mineral",
        nofplot:300,
        nofplot_subblock:5,
        nofsubblock:10,
        status:"active",
        design: "Alhpa Design",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estate:"KPM",
        trialid:"002",  
        trial:"PT02_002KPM03",
        trialremark:"Progeny Trial: “a” Cross DelixGha and “b” Cross DelixEko",
        area: "50.50",
        planteddate:"Dec-02",
        nofprogeny:50,
        nofreplicate:5,
        soiltype:"Mineral",
        nofplot:5,
        nofplot_subblock:10,
        design: "Alhpa Design",
        nofsubblock:5,
        status:"canceled",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estate:"ASG",
        trialid:"003",  
        trial:"PT01_001KPM02",
        trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGhaand “b” Cross DelixEko",
        area: "50.50",
        planteddate:"Dec-02",
        nofprogeny:50,
        nofreplicate:7,
        soiltype:"Mineral",
        nofplot:10,
        nofplot_subblock:5,
        design: "Alhpa Design",
        nofsubblock:3,
        status:"finished",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      }
    ];
  
    const trial =  trials.find((t)=> t.trialid === trialId)
    console.log("backend trial",trial)
    const replicates = []
    for(let i = 1; i<= trial.nofreplicate; i++){
         const rep = {
          replicate: i,
          estate: trial.estate,
          estateblock:"102e",
          density: "123",
          design:"Alhpa Design",
          soiltype:"Mineral"
         }
         replicates.push(rep)
    }
    trial["replicates"] =  replicates
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(trial));
  }
);


//PLOT
app.get(
  "/admin/trial/replicates/plots/:trialid",
  authenticateToken,
  function (req, res) {
    const trialId =  req.params.trialid;
    const estate =  req.params.estate;
    const trials = [
      {
        estate:"KLS",
        trialid:"001",  
        trial:"PT01_001KPM02",
        trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
        area: "50.50",
        planteddate:"Dec-02",
        nofprogeny:50,
        nofreplicate:6,
        soiltype:"Mineral",
        nofplot:300,
        nofplot_subblock:5,
        nofsubblock:10,
        status:"active",
        design: "Alhpa Design",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estate:"KPM",
        trialid:"002",  
        trial:"PT02_002KPM03",
        trialremark:"Progeny Trial: “a” Cross DelixGha and “b” Cross DelixEko",
        area: "50.50",
        planteddate:"Dec-02",
        nofprogeny:2,
        nofreplicate:2,
        soiltype:"Mineral",
        nofplot:4,
        nofplot_subblock:1,
        design: "Alhpa Design",
        nofsubblock:2,
        status:"canceled",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estate:"ASG",
        trialid:"003",  
        trial:"PT01_001KPM02",
        trialremark:"Density Trial: 136, 143, 155 SPH with “a” Cross DelixGhaand “b” Cross DelixEko",
        area: "50.50",
        planteddate:"Dec-02",
        nofprogeny:50,
        nofreplicate:7,
        soiltype:"Mineral",
        nofplot:10,
        nofplot_subblock:5,
        design: "Alhpa Design",
        nofsubblock:3,
        status:"finished",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      }
    ];
  
    const trial =  trials.find((t)=> t.trialid === trialId)
    const trialPlots = []
    const plots =  trial.nofreplicate*trial.nofprogeny
    let count = 0
    let subblockCount = 1
    for(let i = 1; i<= plots; i++){
        count++;    
        if(count > trial.nofplot_subblock){
          count = 0
          subblockCount++
        }
         const plot = {
          plot: i,
          subblock:subblockCount,
          estateblock:"102e",
          design:"Alhpa Design",
         }
         trialPlots.push(plot)
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(trialPlots));
  }
);

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Node.js API app listening at http://%s:%s", host, port);
});

function testGaugeChart(name) {
  return {
    name,
    threshold: 4500,
    min: 0,
    max: Math.floor(Math.random() * (6500 - 5600) + 5600),
    minValue: 0,
    maxValue: Math.floor(Math.random() * (6500 - 5600) + 5600),
    value: Math.floor(Math.random() * (5500 - 5000) + 5000),
  };
}
