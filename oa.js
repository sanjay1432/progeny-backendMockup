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

app.get("/opex/login", (req, res) => {
  const username = "duong";
  let payload = { username: username };
  setTimeout(() => {
    const token = jwt.sign(payload, "duong-test-sso-key", { expiresIn: "10s" });
    res.redirect(
      `http://localhost:3001/oa/#/login?username=${username}&token=${token}`
    );
  }, 1000);
});

app.post(
  "/api/v1/general/login/sso-login",
  authenticateTokenSSO,
  function (req, res) {
    if (req.user && req.user.username) {
      const { username } = req.user;
      console.log(username);
      let payload = { username: username };
      const token = jwt.sign(payload, "duong-test", { expiresIn: "30d" });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          response: {
            userId: "7d563e8b-fcd8-4443-acb5-2b5369af743e",
            firstName: "Nguyen Huu",
            lastName: "Duong",
            email: "nguyen_duong@globalnet.lcl",
            username: "nguyen_duong",
            country: {
              active: true,
              countryCode: "IDN",
              countryId: "1",
              countryName: "Indonesia",
            },
            roles: [
              {
                roleCode: "ADMIN",
              },
              {
                roleCode: "NORMAL",
              }
            ],
            millRoles: [
              {
                buName: "Pulp",
                buCode: "PUK",
                selectedMill: {
                  active: true,
                  millCode: "KRC",
                  millId: "1",
                  millName: "Kerinci",
                  country: {
                    countryId: "1",
                    countryCode: "IDN",
                    countryName: "Indonesia",
                  },
                },
                selectedUserRole: {
                  roleName: "Admin",
                  showUserManagement: true,
                  userRoleId: "1",
                },
              },
              {
                buName: "Pulp",
                buCode: "PUK",
                selectedMill: {
                  active: true,
                  millCode: "RZH",
                  millId: "3",
                  millName: "Rizhao",
                  country: {
                    countryId: "2",
                    countryCode: "CHN",
                    countryName: "China",
                  },
                },
                selectedUserRole: {
                  roleName: "Admin",
                  showUserManagement: true,
                  userRoleId: "1",
                },
              },
              {
                buName: "POWER",
                buCode: "POW",
                selectedMill: {
                  active: true,
                  millCode: "KRC",
                  millId: "1",
                  millName: "Kerinci",
                  country: {
                    countryId: "1",
                    countryCode: "IDN",
                    countryName: "Indonesia",
                  },
                },
                selectedUserRole: {
                  roleName: "Admin",
                  showUserManagement: true,
                  userRoleId: "1",
                },
              },
              {
                buName: "POWER",
                buCode: "POW",
                selectedMill: {
                  active: true,
                  millCode: "RZH",
                  millId: "3",
                  millName: "Rizhao",
                  country: {
                    countryId: "2",
                    countryCode: "CHN",
                    countryName: "China",
                  },
                },
                selectedUserRole: {
                  roleName: "Admin",
                  showUserManagement: true,
                  userRoleId: "1",
                },
              },
            ],
            modulesList: [],
            department: null,
            pulpOriginMill: "1",
            powerOriginMill: "1",
            token: token,
            refresh_token: "TEST-REFRESH-TOKEN",
            hasPowerBU: true,
            hasPulpBU: true,
          },
        })
      );
    }
  }
);


function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, "duong-test", (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(401);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

app.post(
  "/api/v1/general/kpi/annotation-dates",
  authenticateToken,
  function (req, res) {
    const result = {
      annotationDates: ["2021-02-27", "2021-02-28", "2021-02-29"],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/api/v1/general/kpi/annotation",
  authenticateToken,
  function (req, res) {
    const result = [
      {
        annotationId: "67",
        annotationDate: "2020-12-30",
        userId: "Aceras",
        processLines: "FL1-AE",
        description: "Testing",
        action: "my action",
      },
      {
        annotationId: "68",
        annotationDate: "2020-12-30",
        userId: "Aceras",
        processLines: "FL1-AE",
        description: "Testing2",
        action: "my action 1",
      },
    ];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);
app.post(
  "/api/lostcook/saveSummaryCookConfig",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        message: "Successful",
      })
    );
  }
);

//End Loskcook

var server = app.listen(8001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Node.js API app listening at http://%s:%s", host, port);
});
