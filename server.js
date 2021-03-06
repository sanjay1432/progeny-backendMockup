const express = require("express");
const app = express();
const moment = require("moment");
var cors = require('cors');
const faker = require("faker");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//const keycloak = require('./keycloak-config.js').initKeycloak()
//app.use(keycloak.middleware());

const session = require('express-session');
const Keycloak = require('keycloak-connect');

var keycloakConfig = {
  "realm": "ProgenyLocal",
  "auth-server-url":"http://localhost:8080/auth/",
  "ssl-required":"none",
  "resource":"node-microservice",
  "realmPublicKey":"",
  "bearer-only": true
};

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'your_secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

var keycloak = new Keycloak({ store: memoryStore}, keycloakConfig);

app.use(keycloak.middleware());


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
// Enable CORS support
app.use(cors());
function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // if there isn't any token

  // jwt.verify(token, "duong-test", (err, user) => {
  //   console.log(err);
  //   if (err) return res.sendStatus(401);
  // req.user = user;
  next(); // pass the execution off to whatever request the client intended
  // });
}

function getTrials() {
  const trials = [
    {
      estate: [
        {
          id: 1,
          name: "KLS",
          replicate: 6,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
            {
              blockId: 2,
              estateblock: "102e",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 1,
      type: 'DD',
      trialCode: "001",
      trial: "PT01_001KPM02",
      trialremark:
        "Density Trial: 136, 143, 155 SPH with ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-11-01"),
      nofprogeny: 50,
      nofreplicate: 6,
      soiltype: "1",
      nofplot: 300,
      nofplot_subblock: 5,
      nofsubblock: 10,
      isEditable: "true",
      status: "Active",
      design: "Alpha Design",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 2,
      type: 'PT',
      trialCode: "002",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-10-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "false",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 3,
          name: "KSG",
          replicate: 4,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
        {
          id: 4,
          name: "KLS",
          replicate: 3,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
            {
              blockId: 2,
              estateblock: "102e",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 3,
      type: 'PT',
      trialCode: "003",
      trial: "PT01_001KPM02",
      trialremark:
        "Density Trial: 136, 143, 155 SPH with ???a??? Cross DelixGhaand ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 50,
      nofreplicate: 7,
      soiltype: "1",
      nofplot: 350,
      isEditable: "true",
      nofplot_subblock: 5,
      design: "Alpha Design",
      nofsubblock: 3,
      status: "Finished",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 6,
          name: "KLS",
          replicate: 6,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 4,
      type: 'PT',
      trialCode: "004",
      trial: "PT01_001KPM05",
      trialremark:
        "Density Trial: 136, 143, 155 SPH with ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 100,
      nofreplicate: 6,
      soiltype: "1",
      nofplot: 1,
      nofplot_subblock: 4,
      nofsubblock: 2,
      isEditable: "true",
      status: "Closed",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 7,
          name: "KPM",
          replicate: 5,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 5,
      type: 'PT',
      trialCode: "005",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 50,
      nofreplicate: 5,
      soiltype: "1",
      nofplot: 250,
      nofplot_subblock: 10,
      nofsubblock: 5,
      isEditable: "true",
      status: "Canceled",
      design: "Alpha Design",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 8,
          name: "KNS",
          replicate: 7,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 6,
      type: 'PT',
      trialCode: "006",
      trial: "PT01_001KPM02",
      trialremark:
        "Density Trial: 136, 143, 155 SPH with ???a??? Cross DelixGhaand ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 10,
      nofreplicate: 7,
      soiltype: "1",
      nofplot: 250,
      nofplot_subblock: 5,
      nofsubblock: 3,
      isEditable: "true",
      design: "Alpha Design",
      status: "Pending",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 2,
          name: "KPM",
          replicate: 2,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: 28,
              density: 230,
            },
          ],
        },
      ],
      trialId: 7,
      type: 'PT',
      trialCode: "007",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: ???a??? Cross DelixGha and ???b??? Cross DelixEko",
      area: 50.50,
      planteddate: new Date("2002-12-01"),
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "1",
      nofplot: 4,
      isEditable: "true",
      nofplot_subblock: 1,
      design: "Alpha Design",
      nofsubblock: 2,
      status: "Canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
  ];
  return trials;
}

function getPlots() {
  return  [
    {
      plotId:1,
      estate:"KLS",
      trial: "PT01_001KPM02",
      trialId: 1,
      trialCode:"001", 
      replicate:6, 
      estateblock:"102e",
      design:"Alpha Design",
      density:136,
      plot:"Plot 1",
      subblock:5,
      progenyCode: "D001",
      progeny:"Ce 1.1",
      ortet:"C9212.57",
      fp:"C 27.36",
      mp:"C 27,2489",
      noofPalm:16,
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate:"KPP",
      trialId: 1,
      trial: "PT01_001KPM02",
      trialCode:"001", 
      replicate:6, 
      estateblock:"102e",
      design:"Alpha Design",
      density:136,
      plot:"Plot 2",
      plotId:2,
      subblock:5,
      progenyCode: "D001",
      progeny:"Ce 1.1",
      ortet:"C9212.57",
      fp:"C 27.36",
      mp:"C 27,2489",
      noofPalm:16,
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      plotId:3,
      estate:"KLS",
      trialId: 2,
      trial: "PT02_002KPM03",
      trialCode:"002", 
      replicate:6, 
      estateblock:"102e",
      design:"Alpha Design",
      density:136,
      plot:"Plot 2",
      subblock:4,
      progenyCode: "D002",
      progeny:"Ce 1.1",
      ortet:"C9212.57",
      fp:"C 27.36",
      mp:"C 27,2489",
      noofPalm:16,
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      plotId:4,
      estate:"KBP",
      trialId: 2,
      trial: "PT02_002KPM03",
      trialCode:"002", 
      replicate:6, 
      estateblock:"102e",
      design:"Alpha Design",
      density:136,
      plot:"Plot 2",
      subblock:4,
      progenyCode: "D002",
      progeny:"Ce 1.1",
      ortet:"C9212.57",
      fp:"C 27.36",
      mp:"C 27,2489",
      noofPalm:16,
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      plotId:5,
      estate:"KLS",
      trialId: 3,
      trial: "PT02_002KPM03",
      trialCode:"019", 
      replicate:6, 
      estateblock:"102e",
      design:"Alpha Design",
      density:136,
      plot:"Plot 3",
      subblock:6,
      progenyCode: "D003",
      progeny:"Ce 1.1",
      ortet:"C9212.57",
      fp:"C 27.36",
      mp:"C 27,2489",
      noofPalm:"16",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      plotId:6,
      estate:"KLS",
      trialId: 4,
      trial: "PT02_002KPM03",
      trialCode:"020", 
      replicate:6, 
      estateblock:"102e",
      design:"Alpha Design",
      density:136,
      plot:"Plot 4",
      subblock:3,
      progenyCode: "D004",
      progeny:"Ce 1.1",
      ortet:"C9212.57",
      fp:"C 27.36",
      mp:"C 27,2489",
      noofPalm:16,
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    }
  ]
}

function pad(s) {
  while (s.length < 3) s = "0" + s;
  return s;
}

app.get("/account/login", function (req, res) {
  const token = jwt.sign({ username: req.query.username }, "duong-test", {
    expiresIn: "30d",
  });
  const result = {
    response: {
      userID: 1,
      username: req.query.username,
      password:req.query.password,
      firstName:"Aceras",
      lastName:"Admin",
      email:"aceresource@progeny.com",
      token:token
    },
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

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

// app.get("/admin/estate", authenticateToken, function (req, res) {
//   const result = {
//     success: true,
//     data: [
//       {
//         estateId: 1,
//         estate: "KLS",
//         estatefullname: "Kebuan Lokasi Satu",
//         noofestateblock: 3,
//         nooftrails: 3,
//         estateblocks: [
//           {
//             blockId: 1,
//             estateblock: "102d",
//             size: 28,
//             density: 230,
//             soiltype: "1",
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 2,
//             estateblock: "102a",
//             size: 28,
//             density: 420,
//             soiltype: "2",
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 3,
//             estateblock: "102e",
//             size: 28,
//             density: 360,
//             soiltype: "3",
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//         ],
//         createdBy: "acerasadmin",
//         createdDate: "2020-04-28T07:19:30.646Z",
//         updatedBy: "aceadmin",
//         updatedDate: "2020-05-11T02:22:39.829Z",
//       },
//       {
//         estateId: 2,
//         estate: "KSG",
//         estatefullname: "Kebuan Lokasi Dua",
//         noofestateblock: 1,
//         nooftrails: 2,
//         estateblocks: [
//           {
//             blockId: 1,
//             estateblock: "102d",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//         ],
//         createdBy: "acerasadmin",
//         createdDate: "2020-04-28T07:19:30.646Z",
//         updatedBy: "aceadmin",
//         updatedDate: "2020-05-11T02:22:39.829Z",
//       },
//       {
//         estateId: 3,
//         estate: "KBL",
//         estatefullname: "Kebuan Lokasi Tiga",
//         noofestateblock: 4,
//         nooftrails: 7,
//         estateblocks: [
//           {
//             blockId: 1,
//             estateblock: "102d",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 2,
//             estateblock: "102e",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 3,
//             estateblock: "102f",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 4,
//             estateblock: "102g",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 5,
//             estateblock: "102h",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//         ],
//         createdBy: "acerasadmin",
//         createdDate: "2020-04-28T07:19:30.646Z",
//         updatedBy: "aceadmin",
//         updatedDate: "2020-05-11T02:22:39.829Z",
//       },
//       {
//         estateId: 4,
//         estate: "KEL",
//         estatefullname: "Kebuan Lokasi Lima",
//         noofestateblock: 2,
//         nooftrails: 6,
//         estateblocks: [
//           {
//             blockId: 1,
//             estateblock: "102d",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 2,
//             estateblock: "102e",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 3,
//             estateblock: "102f",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 4,
//             estateblock: "102g",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 5,
//             estateblock: "102h",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//         ],
//         createdBy: "acerasadmin",
//         createdDate: "2020-04-28T07:19:30.646Z",
//         updatedBy: "aceadmin",
//         updatedDate: "2020-05-11T02:22:39.829Z",
//       },
//       {
//         estateId: 5,
//         estate: "KFL",
//         estatefullname: "Kebuan Lokasi Enam",
//         noofestateblock: 6,
//         nooftrails: 6,
//         estateblocks: [
//           {
//             blockId: 1,
//             estateblock: "102d",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 2,
//             estateblock: "102e",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 3,
//             estateblock: "102f",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 4,
//             estateblock: "102g",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 5,
//             estateblock: "102h",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//         ],
//         createdBy: "acerasadmin",
//         createdDate: "2020-04-28T07:19:30.646Z",
//         updatedBy: "aceadmin",
//         updatedDate: "2020-05-11T02:22:39.829Z",
//       },
//       {
//         estateId: 6,
//         estate: "KGQ",
//         estatefullname: "Kebuan Lokasi Lapan",
//         noofestateblock: 1,
//         nooftrails: 4,
//         estateblocks: [
//           {
//             blockId: 1,
//             estateblock: "102d",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 2,
//             estateblock: "102e",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 3,
//             estateblock: "102f",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 4,
//             estateblock: "102g",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 5,
//             estateblock: "102h",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//         ],
//         createdBy: "acerasadmin",
//         createdDate: "2020-04-28T07:19:30.646Z",
//         updatedBy: "aceadmin",
//         updatedDate: "2020-05-11T02:22:39.829Z",
//       },
//       {
//         estateId: 7,
//         estate: "KQS",
//         estatefullname: "Kebuan Lokasi Sembilan",
//         noofestateblock: 1,
//         nooftrails: 6,
//         estateblocks: [
//           {
//             blockId: 1,
//             estateblock: "102d",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 2,
//             estateblock: "102e",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 3,
//             estateblock: "102f",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 4,
//             estateblock: "102g",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//           {
//             blockId: 5,
//             estateblock: "102h",
//             size: 28,
//             density: 230,
//             trialId: 1,
//             trialCode: "001",
//             trial: "PT01_001KPM02",
//           },
//         ],
//         createdBy: "acerasadmin",
//         createdDate: "2020-04-28T07:19:30.646Z",
//         updatedBy: "aceadmin",
//         updatedDate: "2020-05-11T02:22:39.829Z",
//       },
//     ],
//   };
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(JSON.stringify(result));
// });

app.get("/admin/estate", keycloak.protect('Administrator'), function (req, res) {
  const result = {
    success: true,
    data: [
      {
        estateId: 1,
        estate: "KLS",
        estatefullname: "Kebuan Lokasi Satu",
        noofestateblock: 3,
        nooftrails: 3,
        estateblocks: [
          {
            blockId: 1,
            estateblock: "102d",
            size: 28,
            density: 230,
            soiltype: "1",
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 2,
            estateblock: "102a",
            size: 28,
            density: 420,
            soiltype: "2",
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 3,
            estateblock: "102e",
            size: 28,
            density: 360,
            soiltype: "3",
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
        ],
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estateId: 2,
        estate: "KSG",
        estatefullname: "Kebuan Lokasi Dua",
        noofestateblock: 1,
        nooftrails: 2,
        estateblocks: [
          {
            blockId: 1,
            estateblock: "102d",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
        ],
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estateId: 3,
        estate: "KBL",
        estatefullname: "Kebuan Lokasi Tiga",
        noofestateblock: 4,
        nooftrails: 7,
        estateblocks: [
          {
            blockId: 1,
            estateblock: "102d",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 2,
            estateblock: "102e",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 3,
            estateblock: "102f",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 4,
            estateblock: "102g",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 5,
            estateblock: "102h",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
        ],
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estateId: 4,
        estate: "KEL",
        estatefullname: "Kebuan Lokasi Lima",
        noofestateblock: 2,
        nooftrails: 6,
        estateblocks: [
          {
            blockId: 1,
            estateblock: "102d",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 2,
            estateblock: "102e",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 3,
            estateblock: "102f",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 4,
            estateblock: "102g",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 5,
            estateblock: "102h",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
        ],
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estateId: 5,
        estate: "KFL",
        estatefullname: "Kebuan Lokasi Enam",
        noofestateblock: 6,
        nooftrails: 6,
        estateblocks: [
          {
            blockId: 1,
            estateblock: "102d",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 2,
            estateblock: "102e",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 3,
            estateblock: "102f",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 4,
            estateblock: "102g",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 5,
            estateblock: "102h",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
        ],
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estateId: 6,
        estate: "KGQ",
        estatefullname: "Kebuan Lokasi Lapan",
        noofestateblock: 1,
        nooftrails: 4,
        estateblocks: [
          {
            blockId: 1,
            estateblock: "102d",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 2,
            estateblock: "102e",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 3,
            estateblock: "102f",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 4,
            estateblock: "102g",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 5,
            estateblock: "102h",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
        ],
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estateId: 7,
        estate: "KQS",
        estatefullname: "Kebuan Lokasi Sembilan",
        noofestateblock: 1,
        nooftrails: 6,
        estateblocks: [
          {
            blockId: 1,
            estateblock: "102d",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 2,
            estateblock: "102e",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 3,
            estateblock: "102f",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 4,
            estateblock: "102g",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
          {
            blockId: 5,
            estateblock: "102h",
            size: 28,
            density: 230,
            trialId: 1,
            trialCode: "001",
            trial: "PT01_001KPM02",
          },
        ],
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
    ],
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

app.get("/admin/trial", authenticateToken, function (req, res) {
  const trials = getTrials();

  if(req.query.trialCode){
    const trial = trials.filter((t) => t.trialCode ===  '001');
    
      const result = {
      success: true,
      data: trial,
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
  trials.forEach(trial => {
    const replicates = [];
    for (let e = 0; e < trial.estate.length; e++) {
      for (let i = 1; i <= trial.estate[e].replicate; i++) {
        const rep = {
          replicate: i,
          replicateId: i,
          estate: trial.estate[e].name,
          estateblocks:
            trial.trialId === 2 && [1, 3].includes(i)
              ? [
                  { id: "1", name: "102e", density: 123,soiltype: "1"},
                  { id: "2", name: "102f", density: 124,soiltype: "2"},
                ]
              : [{ id: "1", name: "102e", density: 123,soiltype: "1" }]
        };
        replicates.push(rep);
      }
    }

    trial["replicates"] = replicates;
   });
  const result = {
    success: true,
    data: trials,
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

app.get(
  "/admin/plot",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: getPlots(),
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/admin/plot/qrcode",
  authenticateToken,
  function(req, res) {
    const plotId = parseInt(req.query.plotId);
    const plots =  getPlots();
    const {trialCode, trialId, trial, estateblock, plot } =  plots.find((p)=>p.plotId === plotId)

    const foundplot = {
      trialCode, trialId, trial, estateblock, plot, plotId 
    }
    const palms = [];

    for (let i = 0; i<10; i++){
      palms.push({
        palmId: i+1,
        palmno: i+1
      })
    }

    foundplot['palms'] = palms;
    foundplot['estateblockId'] = 1;
    foundplot['estateId'] = 1;
    // const originalData = [
    //   {
    //     trialId: 1,
    //     plotId: 1,
    //     estateblockId: 1,
    //     palmId: 1,
    //     trialCode: "001",
        
    //     estateblock:"102aaa",
    //     plot:"Plot 1",
    //     palmno:"1",
    //     palmname:"Palm1",
    //   },
    //   {
    //     trialId: 2,
    //     plotId: 1,
    //     estateblockId: 2,
    //     palmId: 2,
    //     trialCode: "002",
    //     plot:"Plot 2",
    //     estateblock:"102bbb",
    //     palmno:"2",
    //     palmname:"Palm2",
    //   },
    //   {
    //     trialId: 3,
    //     plotId: 1,
    //     estateblockId: 3,
    //     palmId: 3,
    //     trialCode: "003",
    //     estateblock:"102ccc",
    //     plot:"Plot 3",
    //     palmno:"3",
    //     palmname:"Palm3",
    //   },
    //   {
    //     trialId: 4,
    //     plotId: 1,
    //     estateblockId: 4,
    //     palmId: 4,
    //     trialCode: "004",
    //     estateblock:"102ddd",
    //     plot:"Plot 4",
    //     palmno:"4",
    //     palmname:"Palm4",
    //   },
    //   {
    //     trialId: 5,
    //     plotId: 1,
    //     estateblockId: 5,
    //     palmId: 5,
    //     trialCode: "005",
    //     estateblock:"102eee",
    //     plot:"Plot 5",
    //     palmno:"5",
    //     palmname:"Palm5",
    //   }
    // ];
    
    // const result = originalData.filter(data => data.plotId === plotId)
    const result = {
      success: true,
      data: [foundplot],
    };
    res.writeHead(200, { "Content-Type" : "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/admin/trial-types",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [
        {
          trialId:1, 
          trialType: "DD"      
        },
        {
          trialId:2, 
          trialType: "PT"      
        },
        {
          trialId:3, 
          trialType: "TP"      
        },
        {
          trialId:4, 
          trialType: "PC"      
        }
      ]
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/admin/plot/PalmInformation",
  authenticateToken,
  function (req, res) {

    const trialId = parseInt(req.query.trialId);
    const trials =  getTrials()
    const findTrial =  trials.find((trial) => trial.trialId === trialId)
    const plots = findTrial.nofreplicate * findTrial.nofprogeny;
    const plotsPalms = []
    let plotCount = 0
    let palmCount = 0
    let repCount = 1
    let repGap  = plots/findTrial.nofreplicate
    let repGapCount  = 0
    for (let i = 1; i <= plots; i++) {
      plotCount++;
      for (let j = 1; j <= 16; j++) {
        palmCount++
        repGapCount++
        if(repGapCount > repGap){
          repCount++;
          repGapCount = 0;
        }
        const palm =  {
          trialCode:findTrial.trialCode, 
          trialId:findTrial.trialId, 
          estate: findTrial.estate[0].name,
          replicate:repCount, 
          estateblock:"102e",
          plot:`Plot ${plotCount}`,
          plotId: plotCount,
          palmno: `Palm ${palmCount}`,
          palmId: palmCount      
        }
        plotsPalms.push(palm)          
      }

    }
    // const result = [
    //     {
    //       trialCode:"001", 
    //       estate: "KLS",
    //       replicate:6, 
    //       estateblock:"102e",
    //       plot:"Plot 1",
    //       palmno: 1,
    //       palmId: 1,
          
    //     },
    //     {
    //       trialCode:"001", 
    //       estate: "KGP",
    //       replicate:2, 
    //       estateblock:"102e",
    //       plot:"Plot 2",
    //       palmno: 2,
    //       palmId: 2,
    //     },
    //     {
    //       trialCode:"001", 
    //       estate: "KOP",
    //       replicate:3, 
    //       estateblock:"102e",
    //       plot:"Plot 3",
    //       palmno: 3,
    //       palmId: 3,
    //     },
    //     {
    //       trialCode:"001", 
    //       estate: "KOP",
    //       replicate:6, 
    //       estateblock:"102e",
    //       plot:"Plot 3",
    //       palmno: 4,
    //       palmId: 4,
    //     },
    //     {
    //       trialCode:"002", 
    //       estate: "KGL",
    //       replicate:4, 
    //       estateblock:"102e",
    //       plot:"Plot 4",
    //       palmno: 5,
    //       palmId: 5,
    //     },
    //     {
    //       trialCode:"003", 
    //       estate: "KGG",
    //       replicate:5, 
    //       estateblock:"102e",
    //       plot:"Plot 5",
    //       palmno: 6,
    //       palmId: 6,
    //     },
    //   ]

    const result = {
      success: true,
      data: plotsPalms,
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);
app.post(
  "/admin/update-plot",
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

app.post(
  "/admin/plot/editPalmInformation",
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
    const trialId = parseInt(req.query.trialId);
    const estateId = parseInt(req.query.estateId);
    console.log('CALL FROM CLIENT', {trialId, estateId})
    let  trials  = getTrials();
    let foundTrials = [];
    if(trialId) {
      foundTrials =  trials.filter((trial) => trial.trialId === trialId)
    } else {
      foundTrials = trials
    }
    const TrialplotsPalms = []
    foundTrials.forEach(trial => {
      const plots = trial.nofreplicate * trial.nofprogeny;
      let plotCount = 0
      let palmCount = 0
      let repCount = 1
      let repGap  = plots/trial.nofreplicate
      let repGapCount  = 0
      for (let i = 1; i <= plots; i++) {
        plotCount++;
        for (let j = 1; j <= 16; j++) {
          palmCount++
          repGapCount++
          if(repGapCount > repGap){
            repCount++;
            repGapCount = 0;
          }
          const palm =   {
            palmId:palmCount,
            estate:trial.estate[0].name,
            trialCode:trial.trialCode, 
            trialId:trial.trialId, 
            replicate:repCount, 
            replicateno:repCount,
            estateblock:"102e",
            design:"Alpha Design",
            density:136,
            plot:`Plot ${plotCount}`,
            plotId: plotCount,
            palmno: `Palm ${palmCount}`,
            createdBy: "acerasadmin",
            createdDate: "2020-04-28T07:19:30.646Z",
            updatedBy: "aceadmin",
            updatedDate: "2020-05-11T02:22:39.829Z",
          }
          TrialplotsPalms.push(palm)          
        }
  
      }
    });
    const result = {
      success: true,
      data:TrialplotsPalms
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.post("/admin/update-palm", authenticateToken, function (req, res) {
  const result = {
    success: true,
    data: null,
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
})

app.post("/admin/update-palm", authenticateToken, function (req, res) {
  const result = {
    success: true,
    data: null,
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

app.get("/admin/progeny", authenticateToken, function (req, res) {
  const progenies = [];

  for (let i = 1; i <= 26; i++) {
    const pro = {
      progenyId: i,
      progenyCode: i === 1? 'undefined': `D${pad("" + i)}`,
      popvar: "Dura111",
      origin: "Chemera (100% Ce)",
      progenyremark: "Ce 1",
      progeny: `Ce ${i}.1`,
      generation: i === 2? `Gen 29` : `Gen ${i}`,
      ortet: "C9212.57",
      fp: "C 27.36",
      fpFam: "C 27",
      fpVar: "D",
      mp: "C 27.2489",
      mpFam: "C 27",
      mpVar: "A",
      cross: "C 27.36 x C 27.2489",
      crossType: "DXD Sibling",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    };
    progenies.push(pro);
  }
  const result = {
    success: true,
    data: progenies,
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

app.post("/admin/create-progeny", authenticateToken, function (req, res) {
  const result = {
    success: true,
    data: null,
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});
app.post("/admin/delete-progeny", authenticateToken, function (req, res) {
  const result = {
    success: true,
    data: null,
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});
app.post("/admin/update-progeny", authenticateToken, function (req, res) {
  const result = {
    success: true,
    data: null,
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

app.get("/admin/estate/estate-blocks", authenticateToken, function (req, res) {
  const result = {
    success: true,
    data: [
      {
        estateId: 1,
        estate: "KLS",

        estateblocks: [
          {
            id: 1,
            assigned: false,
            estateblock: "102d",
            soiltype: "Alluvial",
          },
          {
            id: 2,
            assigned: true,
            estateblock: "102a",
            soiltype: "Deep Peat",
          },
          {
            id: 3,
            assigned: true,
            estateblock: "102e",
            soiltype: "Inland",
          },
        ],
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estateId: 2,
        estate: "KSG",

        estateblocks: [
          {
            id: 1,
            assigned: true,
            estateblock: "102d",
            soiltype: "Alluvial",
          },
          {
            id: 2,
            assigned: false,
            estateblock: "102e",
            soiltype: "Inland",
          },
          {
            id: 3,
            assigned: false,
            estateblock: "102f",
            soiltype: "Peat",
          },
        ],
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estateId: 3,
        estate: "KBL",

        estateblocks: [
          {
            id: 1,
            assigned: true,
            estateblock: "102d",
            soiltype: "Alluvial",
          },
          {
            id: 2,
            assigned: true,
            estateblock: "102e",
            soiltype: "Inland",
          },
          {
            id: 3,
            assigned: true,
            estateblock: "102f",
            soiltype: "Peat",
          },
          {
            id: 4,
            assigned: false,
            estateblock: "102g",
            soiltype: "Mineral",
          },
          {
            id: 5,
            assigned: false,
            estateblock: "102h",
            soiltype: "Shallow Peat",
          },
        ],
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estateId: 4,
        estate: "KCL",

        estateblocks: [
          {
            id: 1,
            assigned: true,
            estateblock: "102d",
            soiltype: "Alluvial",
          },
          {
            id: 2,
            assigned: false,
            estateblock: "102e",
            soiltype: "Inland",
          },
          {
            id: 3,
            assigned: false,
            estateblock: "102f",
            soiltype: "Peat",
          },
          {
            id: 4,
            assigned: false,
            estateblock: "102g",
            soiltype: "Inland",
          },
          {
            id: 5,
            assigned: true,
            estateblock: "102h",
            soiltype: "Inland",
          },
        ],
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estateId: 5,
        estate: "KPM",

        estateblocks: [
          {
            id: 1,
            assigned: true,
            estateblock: "102d",
            soiltype: "Alluvial",
          },
          {
            id: 2,
            assigned: true,
            estateblock: "102e",
            soiltype: "Inland",
          },
          {
            id: 3,
            assigned: true,
            estateblock: "102f",
            soiltype: "Peat",
          },
          {
            id: 4,
            assigned: true,
            estateblock: "102g",
            soiltype: "Inland",
          },
          {
            id: 5,
            assigned: true,
            estateblock: "102h",
            soiltype: "Inland",
          },
        ],
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estateId: 6,
        estate: "KBA",

        estateblocks: [
          {
            id: 1,
            assigned: true,
            estateblock: "102d",
            soiltype: "Alluvial",
          },
          {
            id: 2,
            assigned: false,
            estateblock: "102e",
            soiltype: "Inland",
          },
          {
            id: 3,
            assigned: false,
            estateblock: "102f",
            soiltype: "Peat",
          },
          {
            id: 4,
            assigned: false,
            estateblock: "102g",
            soiltype: "Inland",
          },
          {
            id: 5,
            assigned: false,
            estateblock: "102h",
            soiltype: "Inland",
          },
        ],
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estateId: 7,
        estate: "ASG",

        estateblocks: [
          {
            id: 1,
            assigned: true,
            estateblock: "102d",
            soiltype: "Alluvial",
          },
          {
            id: 2,
            assigned: false,
            estateblock: "102e",
            soiltype: "Inland",
          },
          {
            id: 3,
            assigned: false,
            estateblock: "102f",
            soiltype: "Peat",
          },
          {
            id: 4,
            assigned: false,
            estateblock: "102g",
            soiltype: "Inland",
          },
          {
            id: 5,
            assigned: false,
            estateblock: "102h",
            soiltype: "Inland",
          },
        ],
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estateId: 8,
        estate: "KPM",

        estateblocks: [
          {
            id: 1,
            assigned: true,
            estateblock: "102d",
            soiltype: "Alluvial",
          },
          {
            id: 2,
            assigned: true,
            estateblock: "102e",
            soiltype: "Inland",
          },
          {
            id: 3,
            assigned: true,
            estateblock: "102f",
            soiltype: "Peat",
          },
          {
            id: 4,
            assigned: true,
            estateblock: "102g",
            soiltype: "Inland",
          },
          {
            id: 5,
            assigned: false,
            estateblock: "102h",
            soiltype: "Inland",
          },
        ],
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
    ],
    updatedDate: "2021-05-11T02:22:39.829Z",
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

app.post(
  "/admin/estate/map-estate-blocks",
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
  "/admin/estate/map-multiple-estate-blocks",
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

app.get("/admin/design", authenticateToken, function (req, res) {
  const result = {
    success: true,
    data: [
      {
        designId: 1,
        design: "Alpha Design",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        designId: 2,
        design: "RCBD",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        designId: 3,
        design: "identified plot",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
    ],
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

//TRIAL
app.post("/admin/create-trial", authenticateToken, function (req, res) {
  const result = {
    success: true,
    data: null,
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

app.post("/admin/update-trial", authenticateToken, function (req, res) {
  const result = {
    success: true,
    data: null,
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

app.post("/admin/trial/replicate", authenticateToken, function (req, res) {
  const result = {
    success: true,
    data: null,
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

app.get(
  "/admin/trial",
  authenticateToken,
  function (req, res) {
    const trials = getTrials();
    console.log(req.query.trialCode)
    const {trialCode, trialId, estate} = trials.find((t) => t.trialCode ===  req.query.trialCode);
    
      const result = {
      success: true,
      data: {trialCode, trialId, estate},
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);
//PLOT
app.get(
  "/admin/trial/replicates/plots",
  authenticateToken,
  function (req, res) {
    const trialId = parseInt(req.query.trialId);
    // const estate = req.params.estate;
    const trials = getTrials();

    const trial = trials.find((t) => t.trialId === trialId);
    const trialPlots = [];
    const plots = trial.nofreplicate * trial.nofprogeny;
    let count = 0;
    let repcount = 0;
    let replicatecount = 1;
    let subblockCount = 1;
    for (let i = 1; i <= plots; i++) {
      count++;
      repcount++;
      if (count > trial.nofplot_subblock) {
        count = 0;
        subblockCount++;
      }
      console.log(repcount, trial.nofplot / trial.nofreplicate);
      if (repcount > trial.nofplot / trial.nofreplicate) {
        repcount = 0;
        replicatecount++;
      }
      const plot = {
        replicate: replicatecount,
        replicateId:replicatecount,
        plotName: `Plot ${i}`,
        plotId: i,
        subblock: subblockCount,
        estateblocks:
          replicatecount === 2
            ? [
                { id: 1, name: "102e" },
                { id: 2, name: "102f" },
              ]
            : [{ id: 1, name: "102e" }],
        design: "Alpha Design",
      };
      if(i < 3){
        plot['progenyId'] = i
        plot['nPalm'] = 16
      }
      trialPlots.push(plot);
    }
    const result = {
      success: true,
      data: trialPlots,
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.post(
  "/admin/trial/replicates/plots",
  authenticateToken,
  function (req, res) {
    const trialId =  req.query.trialId
    const result = {
      success: true,
      data: {trialId},
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.post(
  "/admin/attach-progeny",
  authenticateToken,
  function (req, res) {
    const trialId =  req.query.trialId
    const result = {
      success: true,
      data: [{
        nofprogenyAttached: 100,   
        isComplete: true
      }],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);
app.post(
  "/admin/update-trial-state",
  authenticateToken,
  function (req, res) {
     const trialId =  req.query.trialId
    const result = {
      success: true,
      data: {trialId}
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

//Statistician Part
app.get(
  "/admin/yearlyverification",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [{}]
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
)

app.get(
  "/admin/verifyforms",
  authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [
        {
          trialId: 1,
          trialCode: "001",
          trial: "PT01_001KPM02",
          form: "Form 13",
          uploadedDate: "07/05/2021",
          uploadedBy: "Eko",
          recordDate: "04/05/2021",
          recordedBy: "Eko"
        },
        {
          trialId: 1,
          trialCode: "001",
          trial: "PT01_001KPM02",
          form: "Form 13",
          uploadedDate: "07/05/2021",
          uploadedBy: "Eko",
          recordDate: "04/05/2021",
          recordedBy: "Eko"
        },
        {
          trialId: 1,
          trialCode: "001",
          trial: "PT01_001KPM02",
          form: "Form 13",
          uploadedDate: "07/05/2021",
          uploadedBy: "Eko",
          recordDate: "04/05/2021",
          recordedBy: "Eko"
        },
        {
          trialId: 1,
          trialCode: "001",
          trial: "PT01_001KPM02",
          form: "Form 13",
          uploadedDate: "07/05/2021",
          uploadedBy: "Eko",
          recordDate: "04/05/2021",
          recordedBy: "Eko"
        },
        {
          trialId: 1,
          trialCode: "001",
          trial: "PT01_001KPM02",
          form: "Form 13",
          uploadedDate: "07/05/2021",
          uploadedBy: "Eko",
          recordDate: "04/05/2021",
          recordedBy: "Eko"
        },
        {
          trialId: 1,
          trialCode: "001",
          trial: "PT01_001KPM02",
          form: "Form 13",
          uploadedDate: "07/05/2021",
          uploadedBy: "Eko",
          recordDate: "04/05/2021",
          recordedBy: "Eko"
        },
        {
          trialId: 1,
          trialCode: "001",
          trial: "PT01_001KPM02",
          form: "Form 13",
          uploadedDate: "07/05/2021",
          uploadedBy: "Eko",
          recordDate: "04/05/2021",
          recordedBy: "Eko"
        },
        {
          trialId: 1,
          trialCode: "001",
          trial: "PT01_001KPM02",
          form: "Form 13",
          uploadedDate: "07/05/2021",
          uploadedBy: "Eko",
          recordDate: "04/05/2021",
          recordedBy: "Eko"
        },
        {
          trialId: 1,
          trialCode: "001",
          trial: "PT01_001KPM02",
          form: "Form 13",
          uploadedDate: "07/05/2021",
          uploadedBy: "Eko",
          recordDate: "04/05/2021",
          recordedBy: "Eko"
        },
        {
          trialId: 1,
          trialCode: "001",
          trial: "PT01_001KPM02",
          form: "Form 13",
          uploadedDate: "07/05/2021",
          uploadedBy: "Eko",
          recordDate: "04/05/2021",
          recordedBy: "Eko"
        },
        {
          trialId: 1,
          trialCode: "001",
          trial: "PT01_001KPM02",
          form: "Form 13",
          uploadedDate: "07/05/2021",
          uploadedBy: "Eko",
          recordDate: "04/05/2021",
          recordedBy: "Eko"
        },
        {
          trialId: 1,
          trialCode: "001",
          trial: "PT01_001KPM02",
          form: "Form 13",
          uploadedDate: "07/05/2021",
          uploadedBy: "Eko",
          recordDate: "04/05/2021",
          recordedBy: "Eko"
        },
        {
          trialId: 1,
          trialCode: "001",
          trial: "PT01_001KPM02",
          form: "Form 13",
          uploadedDate: "07/05/2021",
          uploadedBy: "Eko",
          recordDate: "04/05/2021",
          recordedBy: "Eko"
        },
        {
          trialId: 1,
          trialCode: "002",
          trial: "PT01_001KPM02",
          form: "Form 13",
          uploadedDate: "07/05/2021",
          uploadedBy: "Eko",
          recordDate: "04/05/2021",
          recordedBy: "Eko"
        },
        {
          trialId: 1,
          trialCode: "001",
          trial: "PT01_001KPM02",
          form: "Form 13",
          uploadedDate: "07/05/2021",
          uploadedBy: "Eko",
          recordDate: "04/05/2021",
          recordedBy: "Eko"
        },
      ]
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
)
app.get('/download', function(req, res){
  res.download('Hello.txt');
  res.status(200)
});

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Node.js API app listening at http://%s:%s", host, port);
});
