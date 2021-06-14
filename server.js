const express = require("express");
const app = express();
const moment = require("moment");
const faker = require("faker");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const rbSummaryTableData = require("./data/rb-summary.json");
const powerSummaryTableData = require("./data/power-kpi-summary.json");
const rbComparisonData = require("./data/rb-comparison.json");
const summaryData = require("./data/summary.json");
const ciSelectedSata = require("./data/ci-get-selected-data.json");
const ciKpiDetail = require("./data/ci-get-kpi-details.json");
const kpiSummary = require("./data/kpi-summary.json");
const pareto = require("./data/pareto.json")
const selectedProcessLine = require("./data/selected-process-line.json")
const processLineTarget =require("./data/processline-target.json")
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
  "/api/v1/general/kpi/annotation",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      message: "New Annotation is added",
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.put(
  "/api/v1/general/kpi/annotation",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      message: "Annotation is modified",
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.post(
  "/api/v1/general/threshold-mngmt/update-kpi-bpi",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: "",
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.post(
  "/api/v1/general/threshold-mngmt/production-targets",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.post(
  "/api/v1/general/threshold-mngmt/process-line-targets",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [],
    };
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, message: "Custom message" }));
  }
);

app.post(
  "/api/v1/general/threshold-mngmt/delete-production-targets",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.put(
  "/api/v1/general/threshold-mngmt/production-targets",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.put(
  "/api/v1/general/threshold-mngmt/process-line-targets",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);
app.post(
  "/api/v1/general/threshold-mngmt/delete-process-line-targets",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.post(
  "/api/v1/general/threshold-mngmt/annual-config",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);
app.put(
  "/api/v1/general/threshold-mngmt/annual-config",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);
app.post(
  "/api/v1/general/threshold-mngmt/delete-annual-config",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/api/v1/general/threshold-mngmt/production-targets",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [
        {
          active: true,
          bu: {
            buId: 1,
            buTypeId: 1,
            buName: "Pulp",
            buCode: "PUK",
          },
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          isDefault: false,
          kpiId: 1,
          maximum: 4675,
          millId: 1,
          minimum: 0,
          productionThresholdId: "12",
          startDate: "2020-04-22",
          endDate: "2020-05-09",
          threshold: faker.random.number(5000),
          type: "ae",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          active: true,
          bu: {
            buId: 1,
            buTypeId: 1,
            buName: "Pulp",
            buCode: "PUK",
          },
          createdBy: "admin",
          createdDate: "2019-12-16T08:12:56.082Z",
          isDefault: true,
          kpiId: 1,
          maximum: 6500,
          millId: 1,
          minimum: 0,
          productionThresholdId: "7",
          startDate: "2019-01-01",
          endDate: "2040-12-31",
          threshold: 5825,
          type: "kp",
          updatedBy: "acerasadmin",
          updatedDate: "2020-06-04T03:10:51.693Z",
        },
        {
          active: true,
          bu: {
            buId: 1,
            buTypeId: 1,
            buName: "Pulp",
            buCode: "PUK",
          },
          createdBy: "admin",
          createdDate: "2019-10-18T04:01:04.246Z",
          isDefault: true,
          kpiId: 1,
          maximum: 9000,
          millId: 1,
          minimum: 0,
          productionThresholdId: "1",
          startDate: "2019-01-01",
          endDate: "2040-12-31",
          threshold: 7975,
          type: "default",
          updatedBy: "acerasadmin",
          updatedDate: "2020-06-04T03:11:13.787Z",
        },
        {
          active: true,
          bu: {
            buId: 1,
            buTypeId: 1,
            buName: "Pulp",
            buCode: "PUK",
          },
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:18:52.246Z",
          isDefault: false,
          kpiId: 1,
          maximum: 2400,
          millId: 1,
          minimum: 0,
          productionThresholdId: "11",
          startDate: "2020-04-22",
          endDate: "2020-05-09",
          threshold: 2125,
          type: "kp",
          updatedBy: "acerasadmin",
          updatedDate: "2020-06-04T04:05:25.455Z",
        },
        {
          active: true,
          bu: {
            buId: 1,
            buTypeId: 1,
            buName: "Pulp",
            buCode: "PUK",
          },
          createdBy: "acerasadmin",
          createdDate: "2020-06-12T01:06:55.408Z",
          isDefault: false,
          kpiId: 1,
          maximum: 2400,
          millId: 1,
          minimum: 0,
          productionThresholdId: "18",
          startDate: "2020-02-18",
          endDate: "2020-03-09",
          threshold: 2125,
          type: "kp",
          updatedBy: "acerasadmin",
          updatedDate: "2020-06-12T01:06:55.408Z",
        },
        {
          active: true,
          bu: {
            buId: 1,
            buTypeId: 1,
            buName: "Pulp",
            buCode: "PUK",
          },
          createdBy: "acerasadmin",
          createdDate: "2020-06-12T01:10:26.698Z",
          isDefault: false,
          kpiId: 1,
          maximum: 5250,
          millId: 1,
          minimum: 0,
          productionThresholdId: "19",
          startDate: "2020-02-18",
          endDate: "2020-03-09",
          threshold: 4675,
          type: "ae",
          updatedBy: "acerasadmin",
          updatedDate: "2020-06-12T01:10:26.698Z",
        },
        {
          active: true,
          bu: {
            buId: 1,
            buTypeId: 1,
            buName: "Pulp",
            buCode: "PUK",
          },
          createdBy: "admin",
          createdDate: "2019-12-16T08:12:56.082Z",
          isDefault: true,
          kpiId: 1,
          maximum: 2800,
          millId: 1,
          minimum: 0,
          productionThresholdId: "8",
          startDate: "2018-12-31",
          endDate: "2040-12-30",
          threshold: 2400,
          type: "ae",
          updatedBy: "acerasadmin",
          updatedDate: "2020-10-16T08:32:31.665Z",
        },
        {
          active: true,
          bu: {
            buId: 1,
            buTypeId: 1,
            buName: "Pulp",
            buCode: "PUK",
          },
          createdBy: "acerasadmin",
          createdDate: "2020-11-17T01:54:51.397Z",
          isDefault: false,
          kpiId: 1,
          maximum: 5300,
          millId: 1,
          minimum: 0,
          productionThresholdId: "21",
          startDate: "2020-11-14",
          endDate: "2020-11-25",
          threshold: 4800,
          type: "ae",
          updatedBy: "acerasadmin",
          updatedDate: "2020-11-30T01:50:11.492Z",
        },
        {
          active: true,
          bu: {
            buId: 1,
            buTypeId: 1,
            buName: "Pulp",
            buCode: "PUK",
          },
          createdBy: "acerasadmin",
          createdDate: "2020-11-17T01:53:52.078Z",
          isDefault: false,
          kpiId: 1,
          maximum: 2400,
          millId: 1,
          minimum: 0,
          productionThresholdId: "20",
          startDate: "2020-11-14",
          endDate: "2020-11-25",
          threshold: 2125,
          type: "kp",
          updatedBy: "acerasadmin",
          updatedDate: "2020-11-30T01:50:31.104Z",
        },
      ],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/api/v1/general/threshold-mngmt/process-line-targets",
  authenticateToken,
  function (req, res) {
    const result = processLineTarget;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/api/v1/general/threshold-mngmt/annual-config",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [
        {
          active: true,
          annualConfigurationId: "1",
          annualTarget: "2650000",
          bu: {
            buId: 1,
            buTypeId: 1,
            buName: "Pulp",
            buCode: "PUK",
          },
          createdBy: "admin",
          createdDate: "2019-10-21T12:32:08.888Z",
          isDefault: true,
          kpiId: 1,
          millId: 1,
          type: "default",
          updatedBy: "acerasadmin",
          updatedDate: "2019-12-02T02:00:32.770Z",
          workingDays: 350,
          year: 2019,
        },
        {
          active: true,
          annualConfigurationId: "6",
          annualTarget: "1000000",
          bu: {
            buId: 1,
            buTypeId: 1,
            buName: "Pulp",
            buCode: "PUK",
          },
          createdBy: "acerasadmin",
          createdDate: "2019-12-02T06:28:37.119Z",
          isDefault: false,
          kpiId: 1,
          millId: 1,
          type: "default",
          updatedBy: "acerasadmin",
          updatedDate: "2019-12-02T06:28:37.119Z",
          workingDays: 365,
          year: 2020,
        },
        {
          active: true,
          annualConfigurationId: "8",
          annualTarget: "970249",
          bu: {
            buId: 1,
            buTypeId: 1,
            buName: "Pulp",
            buCode: "PUK",
          },
          createdBy: "admin",
          createdDate: "2019-12-16T08:12:56.082Z",
          isDefault: true,
          kpiId: 1,
          millId: 1,
          type: "ae",
          updatedBy: "acerasadmin",
          updatedDate: "2020-05-08T03:56:17.541Z",
          workingDays: 350,
          year: 2019,
        },
        {
          active: true,
          annualConfigurationId: "7",
          annualTarget: "1785442",
          bu: {
            buId: 1,
            buTypeId: 1,
            buName: "Pulp",
            buCode: "PUK",
          },
          createdBy: "admin",
          createdDate: "2019-12-16T08:12:56.082Z",
          isDefault: true,
          kpiId: 1,
          millId: 1,
          type: "kp",
          updatedBy: "acerasadmin",
          updatedDate: "2020-05-08T03:56:38.667Z",
          workingDays: 350,
          year: 2019,
        },
      ],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/api/v1/general/mill-details/all-bu-mills",
  authenticateToken,
  function (req, res) {
    const result = [
      {
        bu_id: 1,
        mill_id: 1,
        mill_name: "Kerinci",
        mill_code: "KRC",
        country_id: 1,
        active: true,
      },
      {
        bu_id: 1,
        mill_id: 2,
        mill_name: "TPL Toba",
        mill_code: "TPL",
        country_id: 1,
        active: true,
      },
      {
        bu_id: 1,
        mill_id: 3,
        mill_name: "Rizhao",
        mill_code: "RZH",
        country_id: 2,
        active: true,
      },
      {
        bu_id: 1,
        mill_id: 5,
        mill_name: "Bahia",
        mill_code: "BSC",
        country_id: 3,
        active: true,
      },
      {
        bu_id: 4,
        mill_id: 1,
        mill_name: "Kerinci",
        mill_code: "KRC",
        country_id: 1,
        active: true,
      },
      {
        bu_id: 4,
        mill_id: 3,
        mill_name: "Rizhao",
        mill_code: "RZH",
        country_id: 2,
        active: true,
      },
    ];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.post("/api/v1/general/login/user-login", function (req, res) {
  const { username, password } = req.body;
  if (username === "aceadmin" && password === "aceadmin123") {
    let payload = { username: username };
    const token = jwt.sign(payload, "duong-test", { expiresIn: "30d" });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        // userId: "7",
        firstName: "Aceras",
        lastName: "Admin",
        email: "aceras@opex.com",
        // phone: "",
        username: "aceadmin",
        // address: "",
        // country: {
        //   active: true,
        //   countryCode: "IDN",
        //   countryId: 1,
        //   countryName: "Indonesia",
        //   createdBy: "admin",
        //   createdDate: "2019-04-25T03:11:59.208Z",
        //   updatedBy: "admin",
        //   updatedDate: "2019-04-25T03:11:59.208Z",
        // },
        // createdBy: "admin",
        // createdDate: "2019-06-30T16:00:00.000Z",
        // updatedBy: "aceadmin",
        // updatedDate: "2020-05-28T06:20:46.703Z",
        // department: null,
        // originMill: 1,
        // millRoles: [
        //   {
        //     millRoleId: "311",
        //     selectedMill: {
        //       active: true,
        //       millCode: "KRC",
        //       millId: 1,
        //       millName: "Kerinci",
        //       createdBy: "admin",
        //       createdDate: "2019-04-25T03:18:11.022Z",
        //       updatedBy: "admin",
        //       updatedDate: "2019-04-25T03:18:11.022Z",
        //       country: {
        //         countryId: 1,
        //         countryCode: "IDN",
        //         countryName: "Indonesia",
        //         createdBy: "admin",
        //         createdDate: "2019-04-25T03:11:59.208Z",
        //         updatedBy: "admin",
        //         updatedDate: "2019-04-25T03:11:59.208Z",
        //       },
        //     },
        //     selectedUserRole: {
        //       roleName: "Admin",
        //       showUserManagement: true,
        //       userRoleId: "1",
        //     },
        //   },
        //   {
        //     millRoleId: "312",
        //     selectedMill: {
        //       active: true,
        //       millCode: "KRC",
        //       millId: 1,
        //       millName: "Kerinci",
        //       createdBy: "admin",
        //       createdDate: "2019-04-25T03:18:11.022Z",
        //       updatedBy: "admin",
        //       updatedDate: "2019-04-25T03:18:11.022Z",
        //       country: {
        //         countryId: 1,
        //         countryCode: "IDN",
        //         countryName: "Indonesia",
        //         createdBy: "admin",
        //         createdDate: "2019-04-25T03:11:59.208Z",
        //         updatedBy: "admin",
        //         updatedDate: "2019-04-25T03:11:59.208Z",
        //       },
        //     },
        //     selectedUserRole: {
        //       roleName: "Admin",
        //       showUserManagement: true,
        //       userRoleId: "1",
        //     },
        //   },
        //   {
        //     millRoleId: "313",
        //     selectedMill: {
        //       active: true,
        //       millCode: "KRC",
        //       millId: 1,
        //       millName: "Kerinci",
        //       createdBy: "admin",
        //       createdDate: "2019-04-25T03:18:11.022Z",
        //       updatedBy: "admin",
        //       updatedDate: "2019-04-25T03:18:11.022Z",
        //       country: {
        //         countryId: 1,
        //         countryCode: "IDN",
        //         countryName: "Indonesia",
        //         createdBy: "admin",
        //         createdDate: "2019-04-25T03:11:59.208Z",
        //         updatedBy: "admin",
        //         updatedDate: "2019-04-25T03:11:59.208Z",
        //       },
        //     },
        //     selectedUserRole: {
        //       roleName: "Admin",
        //       showUserManagement: true,
        //       userRoleId: "1",
        //     },
        //   },
        //   {
        //     millRoleId: "314",
        //     selectedMill: {
        //       active: true,
        //       millCode: "KRC",
        //       millId: 1,
        //       millName: "Kerinci",
        //       createdBy: "admin",
        //       createdDate: "2019-04-25T03:18:11.022Z",
        //       updatedBy: "admin",
        //       updatedDate: "2019-04-25T03:18:11.022Z",
        //       country: {
        //         countryId: 1,
        //         countryCode: "IDN",
        //         countryName: "Indonesia",
        //         createdBy: "admin",
        //         createdDate: "2019-04-25T03:11:59.208Z",
        //         updatedBy: "admin",
        //         updatedDate: "2019-04-25T03:11:59.208Z",
        //       },
        //     },
        //     selectedUserRole: {
        //       roleName: "Admin",
        //       showUserManagement: true,
        //       userRoleId: "1",
        //     },
        //   },
        // ],
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
                roleCode: "BU01",
                millId: 1,
                buId: 4,
              },
              {
                roleCode: "C06",
                millId: 2,
                buId: 1,
              },
              {
                roleCode: "C01",
                millId: 3,
                buId: 1,
              },
              {
                roleCode: "C01",
                millId: 5,
                buId: 1,
              },
              {
                roleCode: "C05",
                millId: 1,
                buId: 1,
              },

              {
                roleCode: "LC01",
                millId: 2,
                buId: 1,
              },
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

app.post(
  "/api/v1/pulp/overview/production-gauge-chart",
  authenticateToken,
  function (req, res) {
    const result = {
      Kerinci: [
        testGaugeChart("Kerinci Production KP"),
        testGaugeChart("Kerinci Production AE"),
      ],
      Rizhao: [testGaugeChart("Rizhao Production KP")],
      "TPL Toba": [testGaugeChart("TPL Production DPsssss")],
      Bahia: [testGaugeChart("Bahia Production DP")],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/api/v1/pulp/overview/all-mills-latest-date",
  authenticateToken,
  function (req, res) {
    const result = {
      Kerinci: "20 Dec 2020",
      Rizhao: "20 Dec 2020",
      "TPL Toba": "20 Dec 2020",
      Bahia: moment(new Date())
        .add(faker.random.number(10), "days")
        .format("DD MMM YYYY")
        .toString(),
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/api/v1/pulp/overview/kpi-process-line-data",
  authenticateToken,
  function (req, res) {
    let date = [];
    let fl1 = [];
    let fl2 = [];
    let fl2ae = [];
    let fl3 = [];
    let pcd = [];
    for (let i = 0; i < 12; i++) {
      date.push(
        moment(new Date()).add(i, "days").format("DD MMM YYYY").toString()
      );
      fl1.push(faker.random.number());
      fl2.push(faker.random.number());
      fl2ae.push(faker.random.number());
      fl3.push(faker.random.number());
      pcd.push(faker.random.number());
    }
    const result = [
      {
        kpiId: 1,
        kpiName: "White Liquor",
        dataset: { date, data: { FL1: fl1, FL2: fl2, FL3: fl3, PCD: pcd } },
      },
      {
        kpiId: 2,
        kpiName: "NaOH - Total",
        dataset: { date, data: { FL1: fl1, FL2: fl2, FL3: fl3, PCD: pcd } },
      },
      {
        kpiId: 3,
        kpiName: "CIO2",
        dataset: { date, data: { FL1: fl1, FL2: fl2, FL3: fl3 } },
      },
    ];

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/api/v1/pulp/dashboard/production/yesterday-production-total",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    const type = req.query.type;
    let title = "Kerinci Production - KP";
    if (type === "ae") {
      title = "Kerinci Production - AE";
    }
    res.end(JSON.stringify(testGaugeChart(title)));
  }
);

app.get(
  "/api/v1/pulp/dashboard/production/ytd-target-process-line",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    let date = [];
    let dataActual = [];
    let dataTarget = [];
    let number = Math.floor(Math.random() * (800 - 100) + 100);
    for (let i = 0; i < 100; i++) {
      date.push(
        moment(new Date()).add(i, "days").format("DD MMM YYYY").toString()
      );
      dataActual.push(number + i);
      dataTarget.push(number + 10 + i);
    }
    res.end(
      JSON.stringify({
        annualTarget: Math.floor(
          Math.random() * (20000000 - 1000000) + 1000000
        ),
        date: date,
        data: {
          actual: dataActual,
          target: dataTarget,
        },
      })
    );
  }
);

//daily_kpi_pulp + daily_kpi_pulp_area
app.post(
  "/api/v1/pulp/dashboard/production/date-range/daily-kpi-pulp",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    let date = [];
    let fl1 = [];
    let fl2 = [];
    for (let i = 0; i < 20; i++) {
      date.push(
        moment(new Date()).add(i, "days").format("DD MMM YYYY").toString()
      );
      fl1.push(faker.random.number());
      fl2.push(faker.random.number());
    }
    res.end(
      JSON.stringify({
        date: date,
        data: {
          FL1: fl1,
          FL2: fl2,
        },
      })
    );
  }
);

//all_process_lines + all_process_lines_target
app.post(
  "/api/v1/pulp/dashboard/production/all-process-lines",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify([
        {
          name: "FL1",
          min: 0,
          max: 2400,
          value: faker.random.number(2200),
          threshold: 2150,
        },
        {
          name: "FL2",
          min: 0,
          max: 4000,
          value: 3508.774,
          threshold: 3700,
        },
        {
          name: "FL2-AE",
          min: 0,
          max: 3000,
          value: 0,
          threshold: 0,
        },
        {
          name: "FL3",
          min: 0,
          max: 2500,
          value: 2124,
          threshold: 2125,
        },
        {
          name: "PD1",
          min: 0,
          max: 3000,
          value: 0,
          threshold: 0,
        },
        {
          name: "PD2",
          min: 0,
          max: 2500,
          value: 2124,
          threshold: 2125,
        },
      ])
    );
  }
);

app.post(
  "/api/v1/pulp/dashboard/production/date-range/selected-process-lines",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    const type = req.body.type;
    if (type === "table") {
      const columns = [
        { id: "date", label: "Date", minWidth: 170 },
        { id: "FL1", label: "FL1", minWidth: 170 },
        { id: "FL2", label: "FL2", minWidth: 170 },
        { id: "FL2-AE", label: "FL2-AE", minWidth: 170 },
        { id: "FL3", label: "FL3", minWidth: 170 },
        { id: "PCD", label: "PCD", minWidth: 170 },
        { id: "PD1", label: "PD1", minWidth: 170 },
        { id: "PD2", label: "PD2", minWidth: 170 },
      ];

      const rows = [];
      for (let i = 0; i < 35; i++) {
        const date = moment(new Date())
          .add(i * -1, "days")
          .format("DD MMM YYYY")
          .toString();
        const fl1 = {
          target: faker.random.float(),
          value: faker.random.float(),
        };
        const fl2 = {
          target: faker.random.float(),
          value: faker.random.float(),
        };
        const fl2ae = {
          target: faker.random.float(),
          value: faker.random.float(),
        };
        const fl3 = {
          target: faker.random.float(),
          value: faker.random.float(),
        };
        const pcd = {
          target: faker.random.float(),
          value: faker.random.float(),
        };
        const pd1 = {
          target: faker.random.float(),
          value: faker.random.float(),
        };
        const pd2 = {
          target: faker.random.float(),
          value: faker.random.float(),
        };
        rows.push({
          date,
          FL1: fl1,
          FL2: fl2,
          FL3: fl3,
          "FL2-AE": fl2ae,
          PCD: pcd,
          PD1: pd1,
          PD2: pd2,
        });
      }
      const result = {
        rows,
        columns,
      };
      res.end(
        JSON.stringify(selectedProcessLine)
      );
    } else {
      let date = [];
      let fl1 = [];
      let fl2 = [];
      let fl2ae = [];
      let fl3 = [];
      let pcd = [];
      let pd1 = [];
      let pd2 = [];
      for (let i = 0; i < 30; i++) {
        date.push(
          moment(new Date()).add(i, "days").format("DD MMM YYYY").toString()
        );
        fl1.push(faker.random.number());
        fl2.push(faker.random.number());
        fl2ae.push(faker.random.number());
        fl3.push(faker.random.number());
        pcd.push(faker.random.number());
        pd1.push(faker.random.number());
        pd2.push(faker.random.number());
      }
      res.end(
        JSON.stringify({
          dates: date,
          data: {
            FL1: fl1,
            FL2: fl2,
            "FL2-AE": fl1,
            FL3: fl2,
            PCD: pcd,
            PD1: pd1,
            pd2,
          },
        })
      );
    }
  }
);

app.get(
  "/api/v1/general/mill-details/latest-date",
  authenticateToken,
  function (req, res) {
    setTimeout(() => {
      res.writeHead(200, { "Content-Type": "application/json" });

      res.end(
        JSON.stringify({
          datetime: moment(new Date()).add(-130, "days").format("DD MMM YYYY"),
        })
      );
    }, 1000);
  }
);

app.get(
  "/api/v1/general/mill-details/all-process-lines",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    const { buId, millId } = req.query;
    const fl1 = {
      processLineId: 1,
      processLineCode: "FL1",
      processLineName: "FL1-AE",
      legendColor: "#D2207F",
      groupBy: "FL",
    };
    const fl2 = {
      processLineId: 2,
      processLineCode: "FL2",
      processLineName: "FL2-KP",
      legendColor: "#F9E147",
      groupBy: "FL",
    };
    const fl2ae = {
      processLineId: 17,
      processLineCode: "FL2-AE",
      processLineName: "FL2-AE",
      legendColor: "#32943E",
      groupBy: "FL",
    };
    const fl3 = {
      processLineId: 3,
      processLineCode: "FL3",
      processLineName: "FL3-KP",
      legendColor: "#2E72FB",
      groupBy: "FL",
    };
    const pcd = {
      processLineId: 4,
      processLineCode: "PCD",
      processLineName: "PCD",
      legendColor: "#660000",
      groupBy: "FL",
    };
    const pd1 = {
      processLineId: 5,
      processLineCode: "PD1",
      processLineName: "PD1",
      legendColor: "#4C0594",
      groupBy: "PD",
    };
    const pd2 = {
      processLineId: 6,
      processLineCode: "PD2",
      processLineName: "PD2",
      legendColor: "#5FE3A1",
      groupBy: "PD",
    };
    const pd3 = {
      processLineId: 7,
      processLineCode: "PD3",
      processLineName: "PD3",
      legendColor: "#22C3EC",
      groupBy: "PD",
    };
    const pd4 = {
      processLineId: 8,
      processLineCode: "PD4",
      processLineName: "PD4",
      legendColor: "#FF9999",
      groupBy: "PD",
    };
    const result = [];
    switch (Number.parseInt(millId)) {
      case 1:
        result.push(fl1);
        result.push(fl2);
        result.push(fl2ae);
        result.push(fl3);
        result.push(pcd);
        result.push(pd3);
        result.push(pd4);
        break;
      case 2:
        result.push(fl1);
        result.push(fl2);
        result.push(fl3);
        result.push(pcd);
        break;
      case 3:
        result.push(fl1);
        result.push(pcd);
        result.push(pd1);
        break;
      case 4:
        result.push(pcd);
        result.push(pd1);
        result.push(pd2);
        break;
      case 5:
        result.push(pcd);
        result.push(pd3);
        result.push(pd4);
        break;
      default:
        break;
    }
    res.end(JSON.stringify(result));
  }
);
app.post(
  "/api/v1/pulp/continuous-improvement/get-selected-data",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(ciSelectedSata));
  }
);

app.post(
  "/api/v1/pulp/continuous-improvement/get-kpi-details",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(ciKpiDetail));
  }
);

app.post(
  "/api/v1/general/kpi-category/kpis",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    const result = [
      {
        kpiId: 11,
        kpiName: "White Liquor",
        kpiOrder: 201,
        unit: "m3/ADt",
        kpiTypeId: 8,
        active: true,
        betterPerformance: -1,
        kpiNameWithUnit: "White Liquor (m3/ADt)",
      },
      {
        kpiId: 12,
        kpiName: "White Liquor",
        kpiOrder: 202,
        unit: "tAA/ADt",
        kpiTypeId: 8,
        active: true,
        betterPerformance: -1,
        kpiNameWithUnit: "White Liquor (tAA/ADt)",
      },
      {
        kpiId: 81,
        kpiName: "White Liquor ODL",
        kpiOrder: 203,
        unit: "m3/ADt",
        kpiTypeId: 2,
        active: true,
        betterPerformance: -1,
        kpiNameWithUnit: "White Liquor ODL (m3/ADt)",
      },
      {
        kpiId: 82,
        kpiName: "White Liquor ODL",
        kpiOrder: 204,
        unit: "tAA/ADt",
        kpiTypeId: 2,
        active: true,
        betterPerformance: 99,
        kpiNameWithUnit: "White Liquor ODL (tAA/ADt)",
      },
      {
        kpiId: 2,
        kpiName: "CIO2",
        kpiOrder: 205,
        unit: "kg/ADt",
        kpiTypeId: 2,
        active: true,
        betterPerformance: -1,
        kpiNameWithUnit: "CIO2 (kg/ADt)",
      },
      {
        kpiId: 5,
        kpiName: "H2O2",
        kpiOrder: 206,
        unit: "kg/ADt",
        kpiTypeId: 4,
        active: true,
        betterPerformance: -1,
        kpiNameWithUnit: "H2O2 (kg/ADt)",
      },
      {
        kpiId: 3,
        kpiName: "Total Active CI",
        kpiOrder: 207,
        unit: "kg/ADt",
        kpiTypeId: 2,
        active: true,
        betterPerformance: -1,
        kpiNameWithUnit: "Total Active CI (kg/ADt)",
      },
      {
        kpiId: 8,
        kpiName: "NaOH - Total",
        kpiOrder: 208,
        unit: "kg/ADt",
        kpiTypeId: 5,
        active: true,
        betterPerformance: -1,
        kpiNameWithUnit: "NaOH - Total (kg/ADt)",
      },
      {
        kpiId: 4,
        kpiName: "Defoamer",
        kpiOrder: 209,
        unit: "kg/ADt",
        kpiTypeId: 3,
        active: true,
        betterPerformance: -1,
        kpiNameWithUnit: "Defoamer (kg/ADt)",
      },
      {
        kpiId: 9,
        kpiName: "Oxygen",
        kpiOrder: 210,
        unit: "kg/ADt",
        kpiTypeId: 6,
        active: true,
        betterPerformance: -1,
        kpiNameWithUnit: "Oxygen (kg/ADt)",
      },
      {
        kpiId: 10,
        kpiName: "Sulfuric Acid (H2SO4)",
        kpiOrder: 211,
        unit: "kg/ADt",
        kpiTypeId: 7,
        active: true,
        betterPerformance: -1,
        kpiNameWithUnit: "Sulfuric Acid (H2SO4) (kg/ADt)",
      },
    ];
    res.end(JSON.stringify(result));
  }
);

app.post(
  "/api/v1/pulp/dashboard/consumption/kpi-process-line-data",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    let date = [];
    let fl1 = [];
    let fl2 = [];
    let fl2ae = [];
    let fl3 = [];
    let pcd = [];
    for (let i = 0; i < 30; i++) {
      date.push(
        moment(new Date()).add(i, "days").format("DD MMM YYYY").toString()
      );
      fl1.push(faker.random.number());
      fl2.push(faker.random.number());
      fl2ae.push(faker.random.number());
      fl3.push(faker.random.number());
      pcd.push(faker.random.number());
    }
    const result = {
      kpiId: "14",
      kpiName: faker.address.streetName(),
      kpiUnit: "t/ADt",
      processLines: [
        {
          processLineId: 1,
          processLineCode: "FL1",
          processLineName: "FL1-AE",
          legendColor: "#D2207F",
          groupBy: "FL",
          monthlyAvgValue: faker.random.number(900),
          monthlyAvgDirection: "up",
          monthlyAvgColor: "red",
          todayColor: "green",
          threshold: faker.random.number(900),
          todayDiff: faker.random.number(900),
          todayPercentageDiff: faker.random.number(900),
          todayMsr: faker.random.number(900),
          monthlyDiff: faker.random.number(900),
          monthlyPercentageDiff: faker.random.number(900),
          todayValue: faker.random.number(900),
          todayDirection: "down",
        },
        {
          processLineId: 2,
          processLineCode: "FL2",
          processLineName: "FL2-KP",
          legendColor: "#F9E147",
          threshold: faker.random.number(900),
          todayDiff: faker.random.number(900),
          todayPercentageDiff: faker.random.number(900),
          todayMsr: faker.random.number(900),
          monthlyDiff: faker.random.number(900),
          monthlyPercentageDiff: faker.random.number(900),
          groupBy: "FL",
          monthlyAvgValue: faker.random.number(900),
          monthlyAvgDirection: "down",
          monthlyAvgColor: "red",
          todayColor: "green",
          todayValue: faker.random.number(900),
          todayDirection: "down",
        },
        {
          processLineId: 17,
          processLineCode: "FL2-AE",
          processLineName: "FL2-AE",
          legendColor: "#32943E",
          threshold: faker.random.number(900),
          todayDiff: faker.random.number(900),
          todayPercentageDiff: faker.random.number(900),
          todayMsr: faker.random.number(900),
          monthlyDiff: faker.random.number(900),
          monthlyPercentageDiff: faker.random.number(900),
          groupBy: "FL",
          monthlyAvgValue: faker.random.number(900),
          monthlyAvgDirection: "up",
          monthlyAvgColor: "red",
          todayColor: "red",
          todayValue: faker.random.number(900),
          todayDirection: "up",
        },
        {
          processLineId: 3,
          processLineCode: "FL3",
          processLineName: "FL3-KP",
          legendColor: "#2E72FB",
          threshold: faker.random.number(900),
          todayDiff: faker.random.number(900),
          todayPercentageDiff: faker.random.number(900),
          todayMsr: faker.random.number(900),
          monthlyDiff: faker.random.number(900),
          monthlyPercentageDiff: faker.random.number(900),
          groupBy: "FL",
          monthlyAvgValue: faker.random.number(900),
          monthlyAvgDirection: "down",
          monthlyAvgColor: "green",
          todayColor: "green",
          todayValue: faker.random.number(900),
          todayDirection: "up",
        },
        {
          processLineId: 4,
          processLineCode: "PCD",
          processLineName: "PCD",
          legendColor: "#660000",
          threshold: faker.random.number(900),
          todayDiff: faker.random.number(900),
          todayPercentageDiff: faker.random.number(900),
          todayMsr: faker.random.number(900),
          monthlyDiff: faker.random.number(900),
          monthlyPercentageDiff: faker.random.number(900),
          groupBy: "FL",
          monthlyAvgValue: faker.random.number(900),
          monthlyAvgDirection: "down",
          monthlyAvgColor: "green",
          todayColor: "red",
          todayValue: faker.random.number(900),
          todayDirection: "up",
        },
      ],
      chart: {
        date: date,
        data: {
          FL1: fl1,
          FL2: fl2,
          "FL2-AE": fl1,
          FL3: fl2,
          PCD: pcd,
        },
      },
      annotationDates: ["2021-02-27", "2021-02-28", "2021-02-29"],
    };

    res.end(JSON.stringify(result));
  }
);

app.post(
  "/api/v1/pulp/dashboard/summary",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(summaryData));
  }
);

app.get(
  "/api/v1/pulp/dashboard/summary/kpiCategories",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    const result = kpiSummary;
    res.end(JSON.stringify(result));
  }
);

//CI
app.post("/api/ci/getKPI", authenticateToken, function (req, res) {
  let periods = req.body.periods;
  const result = [
    {
      kpi: {
        id: 1,
        kpiId: 11,
        active: null,
        createdBy: null,
        createdDate: null,
        kpiName: faker.address.streetName(),
        kpiUnit: "m3/ADt",
        updatedBy: null,
        updatedDate: null,
        kpiTypeId: 8,
        kpiProcessLines: ["FL1", "FL2", "FL2-AE", "FL3"],
        betterPerformance: null,
        yAxisScaleMax: 10,
        delta: 0.6719147206543616,
      },
      summaryDataSet: [
        {
          label: null,
          dateRange: {
            startDate: moment(periods[0][0]).format("YYYY-MM-DD").toString(),
            endDate: moment(periods[0][1]).format("YYYY-MM-DD").toString(),
          },
          count: 121,
          min: 0.0008200675,
          max: 6,
          avg: 2.3589197237900827,
          total: 285.4292865786,
          dailyStdDeviation: 1.3959687685261084,
          weeklyStdDeviation: 1.2997447567969285,
          delta: 5.9991799325,
        },
        {
          label: null,
          dateRange: {
            startDate: moment(periods[1][0]).format("YYYY-MM-DD").toString(),
            endDate: moment(periods[1][1]).format("YYYY-MM-DD").toString(),
          },
          count: 91,
          min: 0.0007136688,
          max: 4.186297,
          avg: 2.5725140118032965,
          total: 234.0987750741,
          dailyStdDeviation: 1.260247634590556,
          weeklyStdDeviation: 1.134490598052305,
          delta: 4.1855833312,
        },
        {
          label: null,
          dateRange: {
            startDate: periods[2]
              ? moment(periods[2][0]).format("YYYY-MM-DD").toString()
              : "2020-07-01",
            endDate: periods[2]
              ? moment(periods[2][1]).format("YYYY-MM-DD").toString()
              : "2020-09-30",
          },
          count: 99,
          min: 0.978227,
          max: 3.470253,
          avg: 3.0308344444444444,
          total: 300.05261,
          dailyStdDeviation: 0.2716966032115815,
          weeklyStdDeviation: 0.10503856828970334,
          delta: 2.492026,
        },
        {
          label: null,
          dateRange: {
            startDate: periods[3]
              ? moment(periods[3][0]).format("YYYY-MM-DD").toString()
              : "2020-10-01",
            endDate: periods[3]
              ? moment(periods[3][1]).format("YYYY-MM-DD").toString()
              : "2020-12-31",
          },
          count: 90,
          min: 0.868227,
          max: 3.660253,
          avg: 2.9208344444444444,
          total: 298.05261,
          dailyStdDeviation: 0.2716966032115815,
          weeklyStdDeviation: 0.10503856828970334,
          delta: 2.792026,
        },
        {
          label: "Delta",
          dateRange: null,
          count: null,
          min: null,
          max: null,
          avg: null,
          total: null,
          dailyStdDeviation: null,
          weeklyStdDeviation: null,
          delta: 0.6719147206543616,
        },
      ],
    },
    {
      kpi: {
        id: 2,
        kpiId: 5,
        active: null,
        createdBy: null,
        createdDate: null,
        kpiName: "H2O2",
        kpiUnit: "kg/ADt",
        updatedBy: null,
        updatedDate: null,
        kpiTypeId: 4,
        kpiProcessLines: ["FL1", "FL2", "FL2-AE", "FL3"],
        betterPerformance: null,
        yAxisScaleMax: 10,
        delta: 0.35757507307692293,
      },
      summaryDataSet: [
        {
          label: null,
          dateRange: {
            startDate: moment(periods[0][0]).format("YYYY-MM-DD").toString(),
            endDate: moment(periods[0][1]).format("YYYY-MM-DD").toString(),
          },
          count: 92,
          min: 1.06019,
          max: 7.78958,
          avg: 4.963197163043478,
          total: 456.614139,
          dailyStdDeviation: 0.9760733974720419,
          weeklyStdDeviation: 0.6818755271009632,
          delta: 6.72939,
        },
        {
          label: null,
          dateRange: {
            startDate: moment(periods[1][0]).format("YYYY-MM-DD").toString(),
            endDate: moment(periods[1][1]).format("YYYY-MM-DD").toString(),
          },
          count: 104,
          min: 1.09726,
          max: 7.070718,
          avg: 5.037338798076923,
          total: 523.883235,
          dailyStdDeviation: 0.7390954429505286,
          weeklyStdDeviation: 0.469120116336723,
          delta: 5.973458000000001,
        },
        {
          label: null,
          dateRange: {
            startDate: periods[2]
              ? moment(periods[2][0]).format("YYYY-MM-DD").toString()
              : "2020-07-01",
            endDate: periods[2]
              ? moment(periods[2][1]).format("YYYY-MM-DD").toString()
              : "2020-09-30",
          },
          count: 68,
          min: 0.3812723,
          max: 5.837273,
          avg: 4.679763725,
          total: 318.2239333,
          dailyStdDeviation: 0.6601618970320701,
          weeklyStdDeviation: 0.36794245290853705,
          delta: 5.4560007,
        },
        {
          label: null,
          dateRange: {
            startDate: periods[3]
              ? moment(periods[3][0]).format("YYYY-MM-DD").toString()
              : "2020-10-01",
            endDate: periods[3]
              ? moment(periods[3][1]).format("YYYY-MM-DD").toString()
              : "2020-12-31",
          },
          count: 78,
          min: 0.4912723,
          max: 6.147273,
          avg: 4.789763725,
          total: 320.2239333,
          dailyStdDeviation: 0.6601618970320701,
          weeklyStdDeviation: 0.36794245290853705,
          delta: 5.6560007,
        },
        {
          label: "Delta",
          dateRange: null,
          count: null,
          min: null,
          max: null,
          avg: null,
          total: null,
          dailyStdDeviation: null,
          weeklyStdDeviation: null,
          delta: 0.35757507307692293,
        },
      ],
    },
  ];
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

app.post("/api/ci/getKPIDetail", authenticateToken, function (req, res) {
  let date = [];
  let lc_event = [];
  let boxplot_event = [
    [
      850,
      740,
      900,
      1070,
      930,
      850,
      950,
      980,
      980,
      880,
      1000,
      980,
      930,
      650,
      760,
      810,
      1000,
      1000,
      960,
      960,
    ],
    [
      960,
      940,
      960,
      940,
      880,
      800,
      850,
      880,
      900,
      840,
      830,
      790,
      810,
      880,
      880,
      830,
      800,
      790,
      760,
      800,
    ],
    [
      890,
      810,
      810,
      820,
      800,
      770,
      760,
      740,
      750,
      760,
      910,
      920,
      890,
      860,
      880,
      720,
      840,
      850,
      850,
      780,
    ],
    [
      890,
      840,
      780,
      810,
      760,
      810,
      790,
      810,
      820,
      850,
      870,
      870,
      810,
      740,
      810,
      940,
      950,
      800,
      810,
      870,
    ],
  ];
  let periods = req.body.param.Periods;

  for (let i = 0; i < 20; i++) {
    date.push(
      moment(new Date()).add(i, "days").format("DD MMM YYYY").toString()
    );
    lc_event.push(faker.random.number());
  }

  const result = [];
  for (let i = 0; i < periods.length; i++) {
    result.push({
      dateRange: {
        startDate: moment(periods[i][0]).format("YYYY-MM-DD").toString(),
        endDate: moment(periods[i][1]).format("YYYY-MM-DD").toString(),
      },
      data: {
        max: faker.random.number(100),
        min: faker.random.number(100),
        average: faker.random.number(100),
        total: faker.random.number(300),
        dailyStdDeviation: "0." + faker.random.number({ min: 11, max: 99 }),
        weeklyStdDeviation: "0." + faker.random.number({ min: 11, max: 99 }),
        lineChartData: {
          date,
          data: {
            lc_event,
          },
        },
        boxplotChartData: boxplot_event,
      },
    });
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

app.post("/api/ci/project/getall", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  const result = [
    {
      id: 1,
      dateRange: {
        startDate: moment(new Date())
          .add(faker.random.number({ min: 0, max: 10 }), "days")
          .format("YYYY-MM-DD")
          .toString(),
        endDate: moment(new Date())
          .add(faker.random.number({ min: 30, max: 90 }), "days")
          .format("YYYY-MM-DD")
          .toString(),
      },
      projectTypeName: "Kaizen",
      projectTypeId: 8,
      projectInitiative:
        "Reduce White Liquor FL2 from 3.646 M3/adt to 3.33 M3/adt",
      projectLeader: faker.name.findName(),
      projectCoLeader: faker.name.findName(),
      kpiName: "White Liquor",
      kpiId: faker.random.number(20),
      processLine: "FL2",
      processLineId: faker.random.number(10),
      baseline: faker.random.float(5),
      budget: faker.random.float(5),
      target: faker.random.float(5),
      link: "\\servershared_server",
      active: true,
    },
    {
      id: 2,
      dateRange: {
        startDate: moment(new Date())
          .add(faker.random.number({ min: 0, max: 10 }), "days")
          .format("YYYY-MM-DD")
          .toString(),
        endDate: moment(new Date())
          .add(faker.random.number({ min: 30, max: 90 }), "days")
          .format("YYYY-MM-DD")
          .toString(),
      },
      projectTypeName: "Kaizen",
      projectTypeId: 8,
      projectInitiative: "Reduce CLO2 FL2 from 17.778 Kg/adt to 16.5 Kg/adt",
      projectLeader: faker.name.findName(),
      projectCoLeader: faker.name.findName(),
      kpiName: "CLO2",
      kpiId: faker.random.number(20),
      processLine: "FL2",
      processLineId: faker.random.number(10),
      baseline: faker.random.float(5),
      budget: faker.random.float(5),
      target: faker.random.float(5),
      link: "\\servershared_server",
      active: true,
    },
  ];
  res.end(JSON.stringify(result));
});

app.post("/api/ci/project/types", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  const result = [
    {
      id: 1,
      projectTypeName: "Kaizen",
      projectTypeId: 8,
      active: true,
    },
    {
      id: 2,
      projectTypeName: "Kabal",
      projectTypeId: 10,
      active: true,
    },
  ];
  res.end(JSON.stringify(result));
});
//END CI

//Benchmark
app.post("/api/benchmark/getKPI", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  let date = [];

  const millOpts = [
    {
      millId: 1,
      millName: "BHA",
    },
    {
      millId: 2,
      millName: "KRC",
    },
    {
      millId: 3,
      millName: "RZH",
    },
    {
      millId: 4,
      millName: "TPL",
    },
  ];

  let krc_fl1 = [];
  let krc_fl2 = [];
  let krc_fl2_ae = [];
  let krc_fl3 = [];
  let krc_wa = [];

  let tpl_fl1 = [];

  let rzh_pl11 = [];
  let rzh_pl12 = [];

  let bha_ln1 = [];
  let bha_ln2 = [];

  for (let i = 0; i < 12; i++) {
    date.push(
      moment(new Date())
        .add(i + 1, "month")
        .format("MMM YYYY")
        .toString()
    );
    krc_fl1.push(faker.random.number({ min: 1, max: 10 }));
    krc_fl2.push(faker.random.number({ min: 1, max: 10 }));
    krc_fl2_ae.push(faker.random.number({ min: 1, max: 10 }));
    krc_fl3.push(faker.random.number({ min: 1, max: 10 }));
    krc_wa.push(faker.random.number({ min: 1, max: 10 }));

    tpl_fl1.push(faker.random.number({ min: 1, max: 10 }));

    rzh_pl11.push(faker.random.number({ min: 1, max: 10 }));
    rzh_pl12.push(faker.random.number({ min: 1, max: 10 }));

    bha_ln1.push(faker.random.number({ min: 1, max: 10 }));
    bha_ln2.push(faker.random.number({ min: 1, max: 10 }));
  }
  const result = {
    kpiId: 5,
    kpiName: "H2O2",
    kpiUnit: "kg/ADt",
    mills: [
      {
        millId: 1,
        millCode: "KRC",
        millName: "Kerinci",
        legendColor: "#A4A1FB",
      },
      {
        millId: 2,
        millCode: "TPL",
        millName: "TPL Toba",
        legendColor: "#E0E347",
      },
      {
        millId: 3,
        millCode: "RZH",
        millName: "Rizhao",
        legendColor: "#5FE3A1",
      },
      {
        millId: 5,
        millCode: "BSC",
        millName: "Bahia",
        legendColor: "#56D9FE",
      },
    ],
    min: {
      label: ["KRC-FL2-AE", "RZH-WA"],
      value: 0,
    },
    max: {
      label: ["BSC-LN1"],
      value: 12.09,
    },
    chart: {
      date: [
        "Jan 2020",
        "Feb 2020",
        "Mar 2020",
        "Apr 2020",
        "May 2020",
        "Jun 2020",
        "Jul 2020",
        "Aug 2020",
        "Sep 2020",
        "Oct 2020",
        "Nov 2020",
        "Dec 2020",
      ],
      data: {
        "KRC-FL1": [
          0.9393442977419355,
          1.3500327551724138,
          1.7478812774193544,
          1.3006134699999998,
          0.8064205966451611,
          0.7733756700000002,
          1.1974804129032257,
          1.0742041612903224,
          1.2454147800000004,
          0.9230100419354839,
          1.0309079153333334,
          1.1306348524999998,
        ],
        "KRC-FL2": [
          4.820290935483872,
          2.377189931034483,
          3.9191927419354844,
          3.8917212333333335,
          3.5708481935483873,
          5.073121266666667,
          4.652956967741935,
          4.797090741935482,
          4.584922843333333,
          5.017936387096775,
          1.5810396333333334,
          0.34854190405,
        ],
        "KRC-FL2-AE": [
          0,
          0.7583433333333334,
          0.7999690571428572,
          1.0456676875000002,
          1.0369256500000001,
          0,
          0,
          0,
          0,
          0,
          0.0017874115,
          1.2341815,
        ],
        "KRC-FL3": [
          4.72956441935484,
          4.868477448275862,
          4.808243387096773,
          4.775041833333333,
          4.60035777419355,
          4.829098966666664,
          4.696027290322581,
          4.657011193548386,
          3.509680933333333,
          5.271663322580645,
          4.636224666666667,
          4.8616048125,
        ],
        "KRC-WA": [
          4.748130870967743,
          4.005330413793104,
          4.488372612903227,
          5.045530866666667,
          4.894186161290323,
          5.0891218,
          4.642364774193547,
          4.614174290322581,
          4.721487533333333,
          5.106818129032259,
          4.490401142857143,
          2.4418386874999998,
        ],
        "TPL-FL1": [
          0.7296782538903229,
          0.9488549296551722,
          0.4013711018387096,
          0.35407744399999996,
          1.2560692322580644,
          0.5558951986666667,
          0.37930638709677417,
          0.6354966912903225,
          0.4970069046666666,
          0.7168274496774196,
          0.24708449999999998,
          0.33948641187499995,
        ],
        "RZH-PL11": [
          4.714897329658003,
          2.0464793352990216,
          2.8599307279495783,
          2.5935957724670975,
          3.1678616847679266,
          2.0468406690771275,
          2.8220664402584963,
          2.8456606017274964,
          1.9424728685260289,
          3.524549431660268,
          3.249869253102936,
          3.722370621590885,
        ],
        "RZH-PL12": [
          2.3685375518024907,
          3.2643073223688517,
          4.966742418941151,
          3.2176594381277024,
          2.139784486130939,
          1.9599711054563889,
          2.0433940310768803,
          1.757196154329312,
          2.7372928632742393,
          2.5315442529401366,
          2.428495465406705,
          2.5422602807406367,
        ],
        "RZH-WA": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "BSC-LN1": [
          5.056656258064516,
          6.282307862068967,
          12.088675129032257,
          8.668678258133333,
          6.442896322580645,
          6.608007133333334,
          7.0250179677419355,
          5.956874999999998,
          6.283629533333333,
          6.230866516129031,
          5.2709470000000005,
          4.5472486000000005,
        ],
        "BSC-LN2": [
          5.48053093548387,
          4.406930620689654,
          9.490006806451612,
          5.0033128,
          4.888591193548387,
          4.782940766666666,
          5.536171612903225,
          5.8244641290322585,
          5.9626917,
          5.0445714838709685,
          3.9840098999999984,
          3.7727582733333334,
        ],
      },
    },
  };

  res.end(JSON.stringify(result));
});
//END Benchmark

//LostCook

app.get(
  "/api/lostcook/fiberlineProduct",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    let categories = [];
    for (let i = 0; i < Math.floor(Math.random() * (4 - 2) + 2); i++) {
      let categoryName = faker.name.findName();
      let cards = [];
      for (let i = 0; i < Math.floor(Math.random() * (4 - 0) + 2); i++) {
        let card = {
          title: "Target Cook",
          subTitle: "(6AM-2PM)",
          estimateTarget: faker.random.number(30),
          value: faker.random.number(500),
          desc: "Number of cook",
          color: "red",
          warning: "There is the message!!!",
        };
        cards.push(card);
      }
      let category = {
        categoryName,
        cards,
      };
      categories.push(category);
    }
    const result = {
      fiberlineName: faker.name.findName(),
      categories,
    };
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/api/lostcook/lostcookEventDetails",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    const result = [
      {
        lc_id: 2020020236,
        fiberline: "FL2",
        area: "Chip",
        responsibility: "Process",
        equipment: ["411HS1401", "411PC1307"],
        problem: "Motor burnt/fault",
        startDate: "22 Dec 2020",
        lostcook: 2,
        status: "Open",
        shift: "Afternoon",
        internalAndExternal: "External",
        lc_explanation:
          "Dig. #8, #11, #3, #10 delay chip filling due to 322 C038 plug up, suddenly flow chip from chip pile increase to 726 t/h.",
        lc_root_cause:
          "Chute conveyor 322C038 TO 341C470 plug up because the chips flow is high",
        lc_action: "Un plug chute and monitor that flow is always stable",
        lc_next_action: "Modification of chute 322C038 (Waiting FL2 Shutdown)",
        lc_pic: "Syahruddin (Proses) , Rudi Prawiska (Mech)",
        lc_due_date: "9998-12-31T16:00:00.000Z",
        lc_remark: "Wait FL2 SD",
        qmnum: ["1", "2", "3", "4", "5"],
      },
      {
        lc_id: 2020030136,
        fiberline: "FL3",
        internalAndExternal: "External",
        area: "Dig",
        startDate: "10 Dec 2020",
        responsibility: "Process",
        equipment: ["411HS1401"],
        problem: "Dig chute plug up",
        lostcook: faker.random.number(500),
        status: "Completed",
        shift: "Morning",
        lc_explanation:
          "Less production FL #3 due to reduce rate due to lower extraction plug up.",
        lc_root_cause: "Upper extraction plug up due to scaling",
        lc_action: "Reduce Digester production rate to 2110 ADT/day",
        lc_next_action:
          "1. Cleaning strainer on next SD Aug-20, 2. Trial chemical antiscale",
        lc_pic: "NA",
        lc_due_date: "9998-12-31T16:00:00.000Z",
        lc_remark: "NA",
        qmnum: ["1", "2", "33", "44", "55"],
      },
    ];
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/api/lostcook/lostcookCumulativeChart",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    let date = [];
    let fl1 = [];
    let fl2 = [];
    for (let i = 0; i < 20; i++) {
      date.push(
        moment(new Date()).add(i, "days").format("DD MMM YYYY").toString()
      );
      fl1.push(faker.random.number());
      fl2.push(faker.random.number());
    }
    const result = {
      date,
      data: {
        FL1: fl1,
        FL2: fl2,
      },
    };
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/api/lostcook/FiberlineLossWithADT",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    const result = [
      {
        fiberlineName: "FL#1",
        desc: "Lostcook 1",
        lost: faker.random.number(30),
        value: faker.random.number(500),
        adt: faker.random.number(30),
        displayAdt: true,
      },
      {
        fiberlineName: "FL#2",
        desc: "Lostcook 2",
        lost: faker.random.number(30),
        value: faker.random.number(500),
        adt: faker.random.number(30),
        displayAdt: true,
      },
      {
        fiberlineName: "FL#3",
        desc: "Lostcook 3",
        lost: faker.random.number(30),
        value: faker.random.number(500),
        adt: faker.random.number(30),
        displayAdt: false,
      },
    ];
    res.end(JSON.stringify(result));
  }
);
app.get(
  "/api/lostcook/openMaintenanceOrderMO",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        order_number: faker.finance.account(9),
        order_type: "MO01",
        notification_number: "000011262604",
        functional_location: "803-2007-FL2-WL2-POO-422E007-A-E007     ",
        description: "BD2611 Bearing Roll Press Damaged422E007",
        priority: "2",
        system_status: "TECO CNF  GMPS MACM PRC  SETC           ",
        system_status_desc: [
          "TECO - Technically completed",
          "GMPS - Goods movement posted",
          "MACM - Material committed",
          "SETC - Settlement rule created",
          "TECO - Technically completed",
          "GMPS - Goods movement posted",
          "MACM - Material committed",
          "SETC - Settlement rule created",
        ],
        user_status: "APPR COMP                               ",
        user_status_desc: ["APPR - Approved", "COMP - Completed"],
        order_create_date: "26 Nov 2018",
        last_change_date: "27 Mar 2019",
        actual_start_date: "27 Nov 2018",
        actual_startDate: "N/A",
        confirmed_order_finish_date: "27 Mar 2019",
        confirmed_order_finish_time: "16:38:25",
      })
    );
  }
);

app.get(
  "/api/lostcook/openMaintenanceOrderNO",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        notification_number: faker.finance.account(9),
        notification_type: "N1",
        order_number: faker.finance.account(9),
        functional_location: "803-2007-FL2-WL2-POO-422E007-A-E007     ",
        description: "BD2611 Bearing Roll Press Damaged422E007",
        priority: "N/A",
        system_status: "NOCO ORAS                               ",
        system_status_desc: [
          "NOCO - Notification completed",
          "ORAS - Order assigned",
        ],
        user_status: "N/A",
        user_status_desc: "",
        notification_create_date: "26 Nov 2018",
        notification_create_time: "20:31:29",
        last_change_date: "26 Nov 2018",
        last_change_time: "18:48:10",
        start_of_malfunction_date: "26 Nov 2018",
        start_of_malfunction_time: "20:31:29",
        end_of_malfunction_date: "27 Mar 2019",
        end_of_malfunction_time: "00:00:00",
      })
    );
  }
);
app.get(
  "/api/lostcook/openMaintenanceLcItem",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    const result = {
      root_cause: faker.random.words(),
      action:
        "To continuity pair cable spare at Junction Box 413DJB005 and connected to pair cable no 15",
      next_action:
        "To pulling new multicore cable from 413DJB005 and Rack Room",
      pic: "Masmur T",
      due_date: "2020-11-25T16:00:00.000Z",
      remark:
        "Pulling multicore cable from 413DJB005 and Rack Room Done on 1 Dec 2020, witing opportunity/shutdown to connect multicore at Junction Box and Rack room.",
    };
    res.end(JSON.stringify(result));
  }
);

app.get("/api/lostcook/top5", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  const result = {
    startDate: "20 Oct 2020",
    endDate: "13 Dec 2020",
    dataSet: [
      {
        index: 2020010275,
        date: "14-AUG-2020",
        lostcook: 9,
        loss: 2,
        adt: 19,
        fiberlineId: 1,
        fiberlineName: "FL1",
        area: "Dig",
        responsibility: "Instrument",
        equipment: "411PV0807",
        problem: "Control valve damage",
        lc_explanation:
          "Dig #8 delay CF due to charring issue since 411PV0807 shaft cut off and retard the neutralisation sequence",
        lc_root_cause:
          "Pressure in Dig 8 can not release in neutralization due to degassing line was plug up and make valve over torque",
        lc_action: "To change control valve complete set",
        lc_next_action: "NA",
        lc_pic: "Rika AP",
        lc_due_date: "9998-12-31T16:00:00.000Z",
        lc_remark: "This loss cook should not be to instrument",
      },
      {
        index: 2020010261,
        date: "06-AUG-2020",
        fiberlineId: 2,
        fiberlineName: "FL2",
        lostcook: 9,
        loss: 2,
        adt: 19,
        area: "RPE",
        responsibility: "RPE",
        equipment: "RB#5",
        problem: "Power restriction",
        lc_explanation:
          "Bleaching load shedding and Washing stop both lines due to HDT andunbleach tower level high because ofRB #5 was trip previously, PD #1 & PD #2 start up after power release",
        lc_root_cause: "NA",
        lc_action: "NA",
        lc_next_action: "NA",
        lc_pic: "NA",
        lc_due_date: "9998-12-31T16:00:00.000Z",
        lc_remark: "NA",
      },
      {
        index: 2020020241,
        date: "04-AUG-2020",
        lostcook: 8,
        loss: 2,
        adt: 19,
        fiberlineId: 3,
        fiberlineName: "FL3",
        area: "Dig",
        responsibility: "Mechanical",
        equipment: "412P028",
        problem: "Others",
        lc_explanation:
          "hot liquor filling Digester #1, #3, #5, #7 due to 412 P028 shaft cut off",
        lc_root_cause: "NA",
        lc_action: "NA",
        lc_next_action: "NA",
        lc_pic: "NA",
        lc_due_date: "9998-12-31T16:00:00.000Z",
        lc_remark: "NA",
      },
      {
        index: 2020020259,
        date: "31-AUG-2020",
        fiberlineId: 4,
        fiberlineName: "PCD",
        lostcook: 5,
        loss: 2,
        adt: 19,
        area: "Wash",
        responsibility: "Mechanical",
        equipment: "422P039",
        problem: "Bearing broken",
        lc_explanation:
          "Washing stop press #5 for replace stock pump 422 P039 due to pump bearing broken",
        lc_root_cause: "Bearing defect due to contaminate with liquor",
        lc_action: "Replace bearing unit",
        lc_next_action: "NA",
        lc_pic: "Heriyanto",
        lc_due_date: "2020-08-30T16:00:00.000Z",
        lc_remark: "Done",
      },
      {
        index: 2020020244,
        date: "12-AUG-2020",
        fiberlineId: 1,
        fiberlineName: "FL1",
        lostcook: 5,
        loss: 2,
        adt: 19,
        area: "Wash",
        responsibility: "Mechanical",
        equipment: "422E014",
        problem: "Bearing broken",
        lc_explanation:
          "and FL #2 due to Knotting system stop one line due to change bearing 422 E014 due to bearing defect",
        lc_root_cause:
          "Bearing defect and Gearbox hard to dismantle due to high temperature area",
        lc_action:
          "1. Replace basket screen, 2. Replace bearing unit, 3. Replace gearbox",
        lc_next_action:
          "1. Regular inspection unit KFA, 2. Maintain gearbox spare availability for KFA, 3. Prepare bearing unit spare assembly",
        lc_pic: "Heriyanto",
        lc_due_date: "9998-12-31T16:00:00.000Z",
        lc_remark: "NA",
      },
    ],
  };
  res.end(JSON.stringify(result));
});

app.get("/api/lostcook/areaList", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  const result = [
    { value: "Bleach", label: "Bleach" },
    { value: "Chemical", label: "Chemical" },
    { value: "Chip", label: "Chip" },
    { value: "Dig", label: "Dig" },
    { value: "Planned Shut", label: "Planned Shut" },
    { value: "Pulp Dryer", label: "Pulp Dryer" },
    { value: "RKE", label: "RKE" },
    { value: "RPE", label: "RPE" },
    { value: "Wash", label: "Wash" },
  ];
  res.end(JSON.stringify(result));
});

app.get("/api/lostcook/sapStatus", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  const result = [
    {
      label: "ADVS - Advance shipment occurred",
      value: "1",
    },
    {
      label: "BLTC - Block technical completion",
      value: "2",
    },
    {
      label: "BUDG - Budgeted",
      value: "3",
    },
    {
      label: "CANC - Capacity avail.not checked",
      value: "4",
    },
    {
      label: "CCOK - Credit limit check successful",
      value: "5",
    },
    {
      label: "CLSD - Closed",
      value: "6",
    },
    {
      label: "CNF - Confirmed",
      value: "7",
    },
    {
      label: "CNOK - Credit limit check invalid",
      value: "8",
    },
    {
      label: "COCE - Completion Certified",
      value: "9",
    },
    {
      label: "CPCE - Completion Partially Certified",
      value: "10",
    },
    {
      label: "CRTD - Created",
      value: "11",
    },
    {
      label: "CSER - Error in cost calculation",
      value: "12",
    },
    {
      label: "DISB - Distributed to MES",
      value: "13",
    },
    {
      label: "DLFL - Deletion Flag",
      value: "14",
    },
    {
      label: "DLT - Deletion indicator",
      value: "15",
    },
    {
      label: "DLV - Delivered",
      value: "16",
    },
    {
      label: "ESTC - Estimated costs",
      value: "17",
    },
    {
      label: "EXEC - Released for execution",
      value: "18",
    },
    {
      label: "FMAI - FM account assignmt incomplete",
      value: "19",
    },
    {
      label: "GMCO - Goods movement in coll. order",
      value: "20",
    },
    {
      label: "GMPS - Goods movement posted",
      value: "21",
    },
    {
      label: "ILAS - Inspection lot assigned",
      value: "22",
    },
    {
      label: "INVD - Invoiced",
      value: "23",
    },
    {
      label: "ISBD - Insufficient budgeting",
      value: "24",
    },
    {
      label: "LKD - Locked",
      value: "25",
    },
    {
      label: "LRRA - List of Relev. Risks Available",
      value: "26",
    },
    {
      label: "MACM - Material committed",
      value: "27",
    },
    {
      label: "MANC - Mat.availability not checked",
      value: "28",
    },
    {
      label: "MEBS - MEB-Controlled",
      value: "29",
    },
    {
      label: "MOBI - Data on Mobile Device",
      value: "30",
    },
    {
      label: "MSPT - Material shortage",
      value: "31",
    },
    {
      label: "NCMP - Not completed",
      value: "32",
    },
    {
      label: "NMAT - No material components",
      value: "33",
    },
    {
      label: "NTUP - Dates are not updated",
      value: "34",
    },
    {
      label: "ORSP - Open reservations posted",
      value: "35",
    },
    {
      label: "PAGE - Paging occurs",
      value: "36",
    },
    {
      label: "PCNF - Partially confirmed",
      value: "37",
    },
    {
      label: "PDLV - Partially delivered",
      value: "38",
    },
    {
      label: "PPRT - Part printed",
      value: "39",
    },
    {
      label: "PRC - Pre-costed",
      value: "40",
    },
    {
      label: "PRT - Printed",
      value: "41",
    },
    {
      label: "PTBL - partially billed",
      value: "42",
    },
    {
      label: "QUAC - Quotation accepted",
      value: "43",
    },
    {
      label: "QUCR - Quotation created",
      value: "44",
    },
    {
      label: "REL - Released",
      value: "45",
    },
    {
      label: "RELR - Release rejected",
      value: "46",
    },
    {
      label: "RESA - Results analysis carried out",
      value: "47",
    },
    {
      label: "RET - Return",
      value: "48",
    },
    {
      label: "SETC - Settlement rule created",
      value: "49",
    },
    {
      label: "TECO - Technically completed",
      value: "50",
    },
    {
      label: "TPA - Transfer prices for agreements",
      value: "51",
    },
    {
      label: "VAL - Valuated",
      value: "52",
    },
    {
      label: "WCM - Work Clearance Management",
      value: "53",
    },
    {
      label: "WOCO - Work completed",
      value: "54",
    },
  ];
  res.end(JSON.stringify(result));
});

app.get("/api/lostcook/shiftList", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  const result = [
    { value: 1, label: "Morning" },
    { value: 2, label: "Afternoon" },
    { value: 3, label: "Evening" },
  ];
  res.end(JSON.stringify(result));
});
app.get("/api/lostcook/statusList", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  const result = [
    { value: 1, label: "Open" },
    { value: 2, label: "Close" },
    { value: 3, label: "In-Progress" },
  ];
  res.end(JSON.stringify(result));
});

app.get("/api/lostcook/equipmentList", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  const result = [
    { equipment_name: "411HS1401", equipment_id: 1 },
    { equipment_name: "411PC1307", equipment_id: 2 },
    { equipment_name: "421E004.1", equipment_id: 3 },
  ];
  res.end(JSON.stringify(result));
});

app.get(
  "/api/lostcook/externalAndInternal",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    const result = [
      {
        label: "Internal",
        value: "internal",
      },
      {
        label: "External",
        value: "external",
      },
    ];
    res.end(JSON.stringify(result));
  }
);

app.get("/api/lostcook/fiberlineList", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  const result = [
    {
      label: "All",
      value: "all",
      editable: false,
    },
    {
      label: "FL1",
      value: 1,
      editable: true,
    },
    {
      label: "FL2",
      value: 2,
      editable: true,
    },
    {
      label: "FL3",
      value: 3,
      editable: true,
    },
    {
      label: "PCD",
      value: 4,
      editable: true,
    },
  ];
  res.end(JSON.stringify(result));
});
app.get("/api/lostcook/problemList", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  const result = [
    { value: 1, label: "Motor burnt/fault" },
    { value: 2, label: "Control valve stuck" },
    { value: 3, label: "Gear box damage" },
    { value: 4, label: "Dig chute plug up" },
  ];
  res.end(JSON.stringify(result));
});
app.get(
  "/api/lostcook/openMaintenanceOrder",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });

    const result = [];
    for (let i = 0; i < 20; i++) {
      result.push({
        lc_id: faker.finance.account(9),
        fiberlineName: "FL1",
        date: new Date(),
        area: faker.random.word(),
        responsibility: faker.random.word(),
        equipment: faker.random.word(),
        problem: faker.random.word(),
        explanation: faker.random.word(),
        mo_number: faker.finance.account(9),
        mo_date: faker.random.word(),
      });
    }
    res.end(
      JSON.stringify({
        startDate: "20 Oct 2020",
        endDate: "20 Dec 2020",
        dataSet: result,
      })
    );
  }
);
app.get(
  "/api/lostcook/responsibilityList",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    const result = [
      { value: "Chemical", label: "Chemical" },
      { value: "Civil", label: "Civil" },
      { value: "DCS", label: "DCS" },
      { value: "Electrical", label: "Electrical" },
      { value: "Engineering", label: "Engineering" },
      { value: "Hydraulic", label: "Hydraulic" },
      { value: "Instrument", label: "Instrument" },
      { value: "Maintenance WY", label: "Maintenance WY" },
      { value: "Mechanical", label: "Mechanical" },
      { value: "Planned Shut", label: "Planned Shut" },
      { value: "PLC", label: "PLC" },
      { value: "PLC & Instrument Sp", label: "PLC & Instrument Sp" },
      { value: "Process", label: "Process" },
      { value: "Process WY", label: "Process WY" },
      { value: "Project", label: "Project" },
      { value: "Pulp Dryer", label: "Pulp Dryer" },
      { value: "RKE", label: "RKE" },
      { value: "RPE", label: "RPE" },
    ];
    res.end(JSON.stringify(result));
  }
);

app.post("/api/lostcook/histogramData", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  let date = [];
  let lc_event = [];
  let lc_total = [];
  for (let i = 0; i < 20; i++) {
    date.push(moment(new Date()).add(i, "month").format("MMM YYYY").toString());
    lc_event.push(faker.random.number());
    lc_total.push(faker.random.number());
  }
  const result = {
    date,
    data: {
      lc_event,
      lc_total,
    },
  };
  res.end(JSON.stringify(result));
});
app.post(
  "/api/lostcook/lcAnalysisPieChart",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    let result = [
      {
        name: "Project",
        value: faker.random.number(100),
        id: "project",
      },
      {
        name: "Mechanical",
        value: "633.00",
        id: "mechanical",
      },
      {
        name: "RKE",
        value: "6.00",
        id: "rke",
      },
      {
        name: "RKE",
        value: faker.random.number(100),
        id: "plc",
      },
      {
        name: "Process WY",
        value: "41.00",
        id: "processWY",
      },
      {
        name: "Instrument",
        value: "322.00",
        id: "instrument",
      },
      {
        name: "Maintenance WY",
        value: "312.00",
        id: "maintenanceWY",
      },
      {
        name: "Hydraulic",
        value: "3.00",
        id: "hydraulic",
      },
      {
        name: "DCS",
        value: "22.00",
        id: "dcs",
      },
      {
        name: "Engineering",
        value: "21.00",
        id: "engineering",
      },
      {
        name: "Electrical",
        value: "207.00",
        id: "electrical",
      },
      {
        name: "Civil",
        value: "178.00",
        id: "civil",
      },
      {
        name: "Chemical",
        value: "16.00",
        id: "chemical",
      },
      {
        name: "Pulp Dryer",
        value: "144.00",
        id: "pulpDryer",
      },
      {
        name: "RPE",
        value: "1402.00",
        id: "rpe",
      },
      {
        name: "PLC & Instrument Sp",
        value: "14.00",
        id: "plcInstrumentSp",
      },
      {
        name: "Process",
        value: "1057.00",
        id: "process",
      },
    ];
    if (req.query.chartType === "area") {
      result = [
        {
          name: "Project",
          value: "60.00",
          id: "project",
        },
        {
          name: "RKE",
          value: "6.00",
          id: "rke",
        },
        {
          name: "Wash",
          value: "436.00",
          id: "wash",
        },
        {
          name: "Chip",
          value: "390.00",
          id: "whip",
        },
        {
          name: "Bleach",
          value: "215.00",
          id: "bleach",
        },
        {
          name: "Digester",
          value: "1834.00",
          id: "dig",
        },
        {
          name: "Chemical",
          value: "16.00",
          id: "chemical",
        },
        {
          name: "Pulp Dryer",
          value: "144.00",
          id: "pulpDryer",
        },
        {
          name: "RPE",
          value: "1402.00",
          id: "rpe",
        },
      ];
    }

    res.end(JSON.stringify(result));
  }
);

app.post(
  "/api/lostcook/lcAnalysisDataTable",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    let result = [];
    let textArray = [
      "Project",
      "Mechanical",
      "RKE",
      "Project",
      "RPE",
      "Bleach",
      "Wash",
      "Project",
      "Electrical",
      "Maintenance WY",
      "Pulp Dryer",
      "Hydraulic",
      "DCS",
      "Engineering",
      "Civil",
      "Pulp Dryer",
      "Instrument",
      "Bearing broken",
      "Shaft broken",
      "PLC & Instrument Sp",
      "Process",
    ];
    for (let i = 0; i < 20; i++) {
      let randomNumber = Math.floor(Math.random() * textArray.length);
      result.push({
        lc_id: 2017010001,
        date: moment(new Date())
          .add(i + 10, "days")
          .format("DD MMM YYYY")
          .toString(),
        fiberlineName: "FL1",
        area: textArray[randomNumber],
        responsibility: textArray[randomNumber + 1] || textArray[randomNumber],
        equipment: faker.name.findName(),
        problem: faker.name.findName(),
        lostcook: faker.random.number(50),
        lc_explanation: faker.company.catchPhrase(),
        lc_root_cause: faker.company.companyName(),
        lc_action: faker.commerce.productDescription(),
        lc_next_action: "NA",
        lc_pic: faker.name.findName(),
        lc_due_date: "9998-12-31T16:00:00.000Z",
        lc_remark: "NA",
        qmnum: ["111", "222", "333", "444", "555"],
        aufnr:
          "000006034827; 000006034827; 000006040513; 000006040513; 000006043786; 000006043786",
      });
    }
    res.end(JSON.stringify(result));
  }
);
app.post("/api/lostcook/paretoChart", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  let lc_total = [];
  let lc_percentage = [];
  const randomNumber = Math.floor(Math.random() * (10000 - 20) + 20);
  const randomFloat = Math.floor(Math.random() * (80 - 20) + 20);
  for (let i = 0; i < 36; i++) {
    lc_total.push(randomNumber - i);
    lc_percentage.push(randomFloat + i);
  }
  let result = {
    chartTitle: "Test",
    data: {
      lc_percentage,
      lc_total,
    },
    lc_problem: [
      "Power restriction",
      "Scaling",
      "Others",
      "Conveyors",
      "Control valve stuck",
      "HDT full",
      "Gasket damage",
      "Motor burnt",
      "Strainer damage (Process)",
      "Brick lining damage",
      "Wire mesh damage",
      "Project Job",
      "HE blocked",
      "Module failure",
      "Gear box damage",
      "RPE (Others)",
      "Vacuum shoe problem",
      "V-belt cut off",
      "FRP pipe broken",
      "Power Restriction",
      "Failure operation",
      "Pipe leakage",
      "Long Cooking cycle (AE)",
      "Transition ",
      "Trial",
      "Bearing broken",
      "Shaft broken",
      "Dig chute plug up",
      "Long Cooking cycle",
      "Coupling damage",
      "Bad chip quality",
      "Control valve damage",
      "Conveyor plug up",
      "Chip reclaimers",
      "Equipment plug up",
      "Mech. seal broken/damage",
    ],
  };
  res.end(
    JSON.stringify(pareto)
  );
});

app.post(
  "/api/lostcook/lcSearchResultTable",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    let result = [];
    let textArray = [
      "Project",
      "Mechanical",
      "RKE",
      "Project",
      "RPE",
      "Bleach",
      "Wash",
      "Project",
      "Electrical",
      "Maintenance WY",
      "Pulp Dryer",
      "Hydraulic",
      "DCS",
      "Engineering",
      "Civil",
      "Pulp Dryer",
      "Instrument",
      "Bearing broken",
      "Shaft broken",
      "PLC & Instrument Sp",
      "Process",
    ];
    for (let i = 0; i < 20; i++) {
      let randomNumber = Math.floor(Math.random() * textArray.length);
      result.push({
        lc_id: 2017010001,
        date: moment(new Date())
          .add(i, "days")
          .format("DD MMM YYYY")
          .toString(),
        fiberlineName: "FL1",
        area: textArray[randomNumber],
        responsibility: textArray[randomNumber + 1] || textArray[randomNumber],
        equipment: faker.name.findName(),
        problem: faker.name.findName(),
        lostcook: faker.random.number(50),
        lc_explanation: faker.company.catchPhrase(),
        lc_root_cause: faker.company.companyName(),
        lc_action: faker.commerce.productDescription(),
        lc_next_action: "NA",
        lc_pic: faker.name.findName(),
        lc_due_date: "9998-12-31T16:00:00.000Z",
        lc_remark: "NA",
        qmnum: ["111", "12", "13", "14", "15"],
        aufnr:
          "000006034827; 000006034827; 000006040513; 000006040513; 000006043786; 000006043786",
      });
    }
    res.end(JSON.stringify(result));
  }
);

app.post("/api/lostcook/histogram", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  let result = {};
  if (req.query.chartType === "area") {
    result = {
      lc_histogram: ["Chip", "RPE", "Wash", "Planned Shut", "Dig"],
      data: {
        lc_total: [
          faker.random.number(200),
          faker.random.number(200),
          faker.random.number(200),
          faker.random.number(200),
          faker.random.number(200),
        ],
      },
    };
  } else {
    result = {
      lc_histogram: [
        "Maintenance WY",
        "PLC",
        "RPE",
        "Electrical",
        "Mechanical",
        "Instrument",
        "Process",
        "Planned Shut",
      ],
      data: {
        lc_total: [
          faker.random.number(200),
          faker.random.number(200),
          faker.random.number(200),
          faker.random.number(200),
          faker.random.number(200),
          faker.random.number(200),
          faker.random.number(200),
          faker.random.number(200),
        ],
      },
    };
  }
  res.end(JSON.stringify(result));
});

app.post("/api/lostcook/timeSeries", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  let date = [];
  let lc_event = [];
  let lc_total = [];
  for (let i = 0; i < 20; i++) {
    date.push(
      moment(new Date()).add(i, "days").format("DD MMM YYYY").toString()
    );
    lc_event.push(faker.random.number());
    lc_total.push(faker.random.number());
  }
  const result = {
    date,
    data: {
      lc_event,
      lc_total,
    },
  };
  res.end(JSON.stringify(result));
});
app.post(
  "/api/lostcook/saveTargetCookAndProductConfig",
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

app.post(
  "/api/lostcook/addNewEquipment",
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
app.post("/api/lostcook/addNewProblem", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      success: true,
      message: "Successful",
    })
  );
});

app.get("/api/lostcook/getLossLimit", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({ min: -164, max: -1, message: "There is the message" })
  );
});

app.get(
  "/api/lostcook/getTargetCookAndProductConfig",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    let result = [];
    for (let i = 0; i <= 4; i++) {
      switch (i) {
        case 0:
          let f1 = {
            fiberlineName: "FL#1",
            fiberlineId: 1,
            productTypes: [
              {
                label: "AE",
                productId: 1,
              },
              {
                label: "KP",
                productId: 2,
              },
            ],
            products: [
              {
                id: 1,
                productName: "AE",
                productId: 1,
                targetCook: faker.random.number(5000),
                startDate: "2020-01-15",
                endDate: "2020-11-28",
                adt: 42.5578,
              },
              {
                id: 2,
                productName: "KP",
                productId: 2,
                targetCook: faker.random.number(5000),
                startDate: "2020-01-15",
                endDate: "2020-11-28",
                adt: 42.5,
              },
            ],
          };
          result.push(f1);
          break;
        case 1:
          let f2 = {
            fiberlineName: "FL#2",
            fiberlineId: 2,
            productTypes: [
              {
                label: "AE",
                productId: 1,
              },
              {
                label: "KP",
                productId: 2,
              },
            ],
            products: [
              {
                id: 3,
                productName: "AE",
                productId: 1,
                targetCook: faker.random.number(5000),
                startDate: "2020-01-15",
                endDate: "2020-11-28",
                adt: 42.5,
              },
              {
                id: 4,
                productName: "KP",
                productId: 2,
                targetCook: faker.random.number(5000),
                startDate: "2020-01-15",
                endDate: "2020-11-28",
                adt: 42.5,
              },
              {
                id: 5,
                productName: "AE",
                productId: 1,
                targetCook: faker.random.number(5000),
                startDate: "2020-01-15",
                endDate: "2020-11-28",
                adt: 42.5,
              },
            ],
          };
          result.push(f2);
          break;
        case 2:
          let f3 = {
            fiberlineName: "FL#3",
            fiberlineId: 3,
            productTypes: [
              {
                label: "APulp Cooked",
                productId: 3,
              },
              {
                label: "APulp Washed",
                productId: 4,
              },
              {
                label: "APulp Bleached",
                productId: 5,
              },
            ],
            products: [
              {
                id: 6,
                productName: "Pulp Cooked",
                productId: 3,
                targetCook: 220,
                startDate: "2020-01-15",
                endDate: "2020-11-28",
              },
              {
                id: 7,
                productName: "Pulp Washed",
                productId: 4,
                targetCook: faker.random.number(5000),
                startDate: "2020-01-15",
                endDate: "2020-11-28",
              },
              {
                id: 8,
                productName: "Pulp Bleached",
                productId: 5,
                targetCook: faker.random.number(5000),
                startDate: "2020-01-15",
                endDate: "2020-11-28",
              },
            ],
          };
          result.push(f3);
          break;
        case 3:
          let pcd = {
            fiberlineName: "PCD",
            fiberlineId: 4,
            productTypes: [
              {
                label: "APulp Cooked",
                productId: 3,
              },
              {
                label: "APulp Washed",
                productId: 4,
              },
              {
                label: "APulp Bleached",
                productId: 5,
              },
            ],
            products: [
              {
                productName: "Pulp Cooked",
                productId: 3,
                targetCook: faker.random.number(5000),
                startDate: "2020-01-15",
                endDate: "2020-11-28",
              },
              {
                productName: "Pulp Washed",
                productId: 4,
                targetCook: faker.random.number(5000),
                startDate: "2020-01-15",
                endDate: "2020-11-28",
              },
              {
                productName: "Pulp Bleached",
                productId: 5,
                targetCook: faker.random.number(5000),
                startDate: "2020-01-15",
                endDate: "2020-11-28",
              },
            ],
          };
          result.push(pcd);
          break;
        default:
          break;
      }
    }
    res.end(
      JSON.stringify({
        selectedYear: req.query.selectedYear,
        config: result,
      })
    );
  }
);
app.get(
  "/api/lostcook/getSummaryCookConfig",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    let result = [];
    for (let i = 0; i <= 4; i++) {
      switch (i) {
        case 0:
          let f1 = {
            fiberlineName: "FL#1",
            fiberlineId: 1,
            headers: [
              {
                name: "Product",
                index: "productName",
              },
              {
                name: "Target Cook",
                index: "targetCook",
              },
              {
                name: "Cook Today",
                index: "cookToday",
              },
              {
                name: "Lostcook Today",
                index: "lostcookToday",
              },
              {
                name: "Morning Shift",
                index: "morningShift",
              },
              {
                name: "Afternoon Shift",
                index: "afternoonShift",
              },
              {
                name: "Night Shift",
                index: "nightShift",
              },
            ],
            products: [
              {
                id: 1,
                productName: "AE",
                productId: 1,
                targetCook: faker.random.number(),
                cookToday: faker.random.number(),
                lostcookToday: faker.random.number(),
                morningShift: faker.random.number(),
                afternoonShift: faker.random.number(),
                nightShift: faker.random.number(),
              },
            ],
          };
          result.push(f1);
          break;
        case 1:
          let f2 = {
            fiberlineName: "FL#2",
            fiberlineId: 2,
            headers: [
              {
                name: "Product",
                index: "productName",
              },
              {
                name: "Target Cook",
                index: "targetCook",
              },
              {
                name: "Cook Today",
                index: "cookToday",
              },
              {
                name: "Lostcook Today",
                index: "lostcookToday",
              },
              {
                name: "Morning Shift",
                index: "morningShift",
              },
              {
                name: "Afternoon Shift",
                index: "afternoonShift",
              },
              {
                name: "Night Shift",
                index: "nightShift",
              },
            ],
            products: [
              {
                id: 2,
                productName: "AE",
                productId: 1,
                targetCook: faker.random.number(),
                cookToday: faker.random.number(),
                lostcookToday: faker.random.number(),
                morningShift: faker.random.number(),
                afternoonShift: faker.random.number(),
                nightShift: faker.random.number(),
              },
            ],
          };
          result.push(f2);
          break;
        case 2:
          let f3 = {
            fiberlineName: "FL#3",
            fiberlineId: 3,
            headers: [
              {
                name: "Product",
                index: "productName",
              },
              {
                name: "Target Cook(Adt)",
                index: "targetCook",
              },
              {
                name: "Production Today(Adt)",
                index: "productionToday",
              },
              {
                name: "Lost Production Today(Adt)",
                index: "lostProductionToday",
              },
            ],
            products: [
              {
                id: 3,
                productName: "Pulp Cooked",
                productId: 3,
                targetCook: faker.random.number(),
                productionToday: faker.random.number(),
                lostProductionToday: faker.random.number(),
              },
              {
                id: 4,
                productName: "Pulp Washed",
                productId: 4,
                targetCook: faker.random.number(),
                productionToday: faker.random.number(),
                lostProductionToday: faker.random.number(),
              },
              {
                id: 5,
                productName: "Pulp Bleached",
                productId: 5,
                targetCook: faker.random.number(),
                productionToday: faker.random.number(),
                lostProductionToday: faker.random.number(),
              },
            ],
          };
          result.push(f3);
          break;
        case 3:
          let pcd = {
            fiberlineName: "PCD",
            fiberlineId: 4,
            headers: [
              {
                name: "Product",
                index: "productName",
              },
              {
                name: "Target Cook(Adt)",
                index: "targetCook",
              },
              {
                name: "Production Today(Adt)",
                index: "productionToday",
              },
              {
                name: "Lost Production Today(Adt)",
                index: "lostProductionToday",
              },
            ],
            products: [
              {
                id: 6,
                productName: "Pulp Cooked",
                productId: 3,
                targetCook: faker.random.number(),
                productionToday: faker.random.number(),
                lostProductionToday: faker.random.number(),
              },
              {
                id: 7,
                productName: "Pulp Washed",
                productId: 4,
                targetCook: faker.random.number(),
                productionToday: faker.random.number(),
                lostProductionToday: faker.random.number(),
              },
              {
                id: 8,
                productName: "Pulp Bleached",
                productId: 5,
                targetCook: faker.random.number(),
                productionToday: faker.random.number(),
                lostProductionToday: faker.random.number(),
              },
            ],
          };
          result.push(pcd);
          break;
        default:
          break;
      }
    }
    res.end(
      JSON.stringify({
        selectedDate: req.query.selectedDate,
        config: result,
      })
    );
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
app.post(
  "/api/lostcook/addNewLostcookItem",
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
app.post(
  "/api/lostcook/editLostcookItem",
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

app.post(
  "/api/lostcook/deleteLostcookItem",
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
app.get("/api/lostcook/getEditHistory", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify([
      {
        index: faker.random.uuid(),
        activities: faker.random.words(),
        by: "nguyen_duong",
        dateTime: new Date(),
      },
      {
        index: faker.random.uuid(),
        activities: faker.random.words(),
        by: "khanh_vy",
        dateTime: new Date(),
      },
      {
        index: faker.random.uuid(),
        activities: faker.random.words(),
        by: "any_any",
        dateTime: new Date(),
      },
    ])
  );
});
app.get("/api/lostcook/getLatestDate", authenticateToken, function (req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      latestDate: "2020-12-31",
    })
  );
});

app.get(
  "/api/v1/power/dashboard/rb-summary",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(rbSummaryTableData));
  }
);
app.get(
  "/api/v1/power/dashboard/power-kpi-summary",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(powerSummaryTableData));
  }
);
app.post(
  "/api/v1/power/dashboard/rb-comparison",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(rbComparisonData));
  }
);

app.get(
  "/api/v1/spc/dashboard/logs/processes",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify([
        {
          id: faker.random.uuid(),
          name: faker.random.words(),
        },
        {
          id: faker.random.uuid(),
          name: faker.random.words(),
        },
        {
          id: faker.random.uuid(),
          name: faker.random.words(),
        },
      ])
    );
  }
);
app.get(
  "/api/v1/spc/dashboard/logs/process-lines",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify([
        {
          id: faker.random.uuid(),
          name: faker.random.words(),
        },
        {
          id: faker.random.uuid(),
          name: faker.random.words(),
        },
        {
          id: faker.random.uuid(),
          name: faker.random.words(),
        },
      ])
    );
  }
);

app.get(
  "/api/v1/spc/dashboard/logs/kpis",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify([
        {
          kpiId: faker.random.uuid(),
          kpiName: faker.random.words(),
          pitag: faker.random.uuid(),
        },
        {
          kpiId: faker.random.uuid(),
          kpiName: faker.random.words(),
          pitag: faker.random.uuid(),
        },
        {
          kpiId: faker.random.uuid(),
          kpiName: faker.random.words(),
          pitag: faker.random.uuid(),
        },
      ])
    );
  }
);
app.post(
  "/api/v1/spc/dashboard/logs/kpis/patterns",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    const result=[]
    for(let i=1;i<30;i++){
      result.push({
        date: `${i} Mar 2020`,
        data: {
          p1: faker.random.number(),
          p2: faker.random.number(),
          p3: faker.random.number(),
          p4: faker.random.number(),
          p5: faker.random.number(),
          p6: faker.random.number(),
          p7: faker.random.number(),
          p8: faker.random.number(),
        },
      })
    }
    res.end(
      JSON.stringify(result)
    );
  }
);

app.post(
  "/api/v1/spc/dashboard/logs/kpis/kpi-events-selected-date",
  authenticateToken,
  function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        endTime: moment(new Date()).format(),
        events: [
          {
            pattern: "P1",
            eventId: faker.random.uuid(),
            startTime: "09:00",
            endTime: "09:10",
          },
          {
            pattern: "P1",
            eventId: faker.random.uuid(),
            startTime: "09:30",
            endTime: "09:50",
          },
          {
            pattern: "P3",
            eventId: faker.random.uuid(),
            startTime: "09:20",
            endTime: "10:00",
          },
          {
            pattern: "P4",
            eventId: faker.random.uuid(),
            startTime: "09:00",
            endTime: "11:00",
          },
        ],
        pieChart: [
          {
            pattern: "P1",
            eventId: faker.random.uuid(),
            occurrence: faker.random.number(),
            duration: "02:50",
          },
          {
            pattern: "P2",
            eventId: faker.random.uuid(),
            occurrence: faker.random.number(),
            duration: "01:10",
          },
          {
            pattern: "P3",
            eventId: faker.random.uuid(),
            occurrence: faker.random.number(),
            duration: "01:00",
          },
          {
            pattern: "P4",
            eventId: faker.random.uuid(),
            occurrence: faker.random.number(),
            duration: "02:00",
          },
          {
            pattern: "P5",
            eventId: faker.random.uuid(),
            occurrence: faker.random.number(),
            duration: "03:10",
          },
          {
            pattern: "P6",
            eventId: faker.random.uuid(),
            occurrence: faker.random.number(),
            duration: "01:20",
          },
          {
            pattern: "P7",
            eventId: faker.random.uuid(),
            occurrence: faker.random.number(),
            duration: "01:20",
          },
          {
            pattern: "P8",
            eventId: faker.random.uuid(),
            occurrence: faker.random.number(),
            duration: "01:20",
          },
        ],
        lineChart: {
          kpiStats: {
            mean: 350,
            ucl: 500,
            lcl: 400,
            u2sigma: 100,
            u1sigma: 300,
            l2sigma: 250,
            l1sigma: 200,
          },
          time: ["09:00", "09:10", "09:20", "09:30", "09:50", "10:00", "11:00"],
          value: [600, 234, 109, 89, 78, 221, 320],
        },
      })
    );
  }
);

app.post(
  "/api/v1/spc/dashboard/logs/correlation-analytics",
  authenticateToken,
  function (req, res) {
    
    const xAxis = ["kpi 0", "kpi 1", "kpi 2", "kpi 3"]
    const yAxis = ["kpi 0", "kpi 1", "kpi 2", "kpi 3"]
    const data = []
    for(let i=0;i<xAxis.length; i++){
      for (let j = 0; j < yAxis.length; j++) {
        data.push([j,i,faker.random.number(20)])
      }
    }
    const kpis= []
    for(let i=0;i<20; i++){
      kpis.push({
        kpiId: faker.random.uuid(),
        kpiName: faker.random.word(),
        pitag: faker.random.uuid(),
        pearson: faker.random.number(10),
        spearman: faker.random.number(10),
        uniformity: faker.random.number(10),
      })
    }
    const heatmap = {
      xAxis,
      yAxis,
      data 
  }
    res.writeHead(200, { "Content-Type": "application/json" });
    if(req.body.type ==="table"){
      res.end(
        JSON.stringify({
          startTime: moment(new Date()).format(),
          endTime: moment(new Date()).format(),
          kpis
        })
      );
    }else{
      res.end(
        JSON.stringify({
          startTime: moment(new Date()).format(),
          endTime: moment(new Date()).format(),
          heatmap,
        })
      );
    }
    
  }
);

app.post(
  "/api/v1/spc/dashboard/logs/correlation-analytics/scatter-plot",
  authenticateToken,
  function (req, res) {
    const scatter = []
    for(let i=0;i<10; i++){
      scatter.push([faker.random.number(100), faker.random.number(50)])
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify(scatter)
    );
  }
);

//End Loskcook

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
          status:"active",
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
          nofplot:250,
          nofplot_subblock:10,
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
          nofprogeny:10,
          nofreplicate:7,
          soiltype:"Mineral",
          nofplot:250,
          nofplot_subblock:5,
          nofsubblock:3,
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
          trialid:"001", 
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
          trialid:"001", 
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
          trialid:"001", 
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
          estate:"KLS",
          trialid:"001", 
          replicate:6, 
          estateblock:"102e",
          design:"Alpha Design",
          density:136,
          plot:"Plot 1",
          palmno:2,
          palmname:"Palm2",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001", 
          replicate:6, 
          estateblock:"102e",
          design:"Alpha Design",
          density:136,
          plot:"Plot 1",
          palmno:3,
          palmname:"Palm3",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KLS",
          trialid:"001", 
          replicate:6, 
          estateblock:"102e",
          design:"Alpha Design",
          density:136,
          plot:"Plot 1",
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

app.get(
  "/admin/progeny",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [
        {
          progenyId:"D001",
          popvar:"Dura",
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
          mpVar: "D",
          cross:"C 27,36 x C 27, 2489",
          crossType:"DXD Sibling",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          progenyId:"D002",
          popvar:"Dura",
          origin:"Chemera (100% Ce)",
          progenyremark:"Ce 1",
          progeny:"Ce 1.1",
          generation:"Gen 1",
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
          progenyId:"D003",
          popvar:"Dura",
          origin:"Chemera (100% Ce)",
          progenyremark:"Ce 1",
          progeny:"Ce 1.1",
          generation:"Gen 1",
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
          popvar:"Dura",
          origin:"Chemera (100% Ce)",
          progenyremark:"Ce 1",
          progeny:"Ce 1.1",
          generation:"Gen 1",
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
            assigned: false,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            assigned: true,
            estateblock:"102a",
            soiltype:"Alluvial"
          },
          {
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
            assigned: true,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            assigned: false,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
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
            assigned: true,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            assigned: true,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            assigned: true,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            assigned: false,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
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
            assigned: true,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            assigned: false,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            assigned: false,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            assigned: false,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
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
            assigned: true,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            assigned: true,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            assigned: true,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            assigned: true,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
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
            assigned: true,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            assigned: false,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            assigned: false,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            assigned: false,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
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
            assigned: true,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            assigned: false,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            assigned: false,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            assigned: false,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
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
            assigned: true,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            assigned: true,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            assigned: true,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            assigned: true,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
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
            assigned: false,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            assigned: false,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            assigned: false,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            assigned: false,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
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
            assigned: false,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            assigned: false,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            assigned: false,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            assigned: false,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
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
            assigned: false,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            assigned: false,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            assigned: false,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            assigned: false,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
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
            assigned: false,
            estateblock:"102d",
            soiltype:"Minerals"
          },
          {
            assigned: false,
            estateblock:"102e",
            soiltype:"Inland"
          },
          {
            assigned: false,
            estateblock:"102f",
            soiltype:"Minerals"
          },
          {
            assigned: false,
            estateblock:"102g",
            soiltype:"Inland"
          },
          {
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
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          userId:"002",
          username:"Aqeel",
          position:"Mandore",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          userId:"003",
          username:"Dexter",
          position:"Recorder",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          userId:"004",
          username:"Jack",
          position:"Recorder",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          userId:"005",
          username:"Maxwell",
          position:"Recorder",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        }, {
          userId:"006",
          username:"Ahmed",
          position:"Assistant",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          userId:"007",
          username:"Amir",
          position:"Assistant",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          userId:"008",
          username:"Joe",
          position:"Mandore",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          userId:"009",
          username:"Smith",
          position:"Recorder",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          userId:"010",
          username:"Tim",
          position:"Mandore",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          userId:"011",
          username:"Jhon",
          position:"Mandore",
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
app.delete(
  "/admin/user",
  authenticateToken,
  function (req, res) {
    const {userId} =  req.body
    const result = {
      success: true,
      data: {userId},
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
