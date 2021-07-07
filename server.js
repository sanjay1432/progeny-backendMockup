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

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log({ token });
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
              size: "123.0",
              density: 230,
            },
            {
              blockId: 2,
              estateblock: "102e",
              size: "123.0",
              density: 230,
            },
          ],
        },
      ],
      trialId: 1,
      trialCode: "001",
      trial: "PT01_001KPM02",
      trialremark:
        "Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
      area: "50.50",
      planteddate: "Dec-02",
      nofprogeny: 50,
      nofreplicate: 6,
      soiltype: "Mineral",
      nofplot: 300,
      nofplot_subblock: 5,
      nofsubblock: 10,
      isEditable: true,
      status: "active",
      design: "Alhpa Design",
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
              size: "123.0",
              density: 230,
            },
          ],
        },
      ],
      trialId: 2,
      trialCode: "002",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: “a” Cross DelixGha and “b” Cross DelixEko",
      area: "50.50",
      planteddate: "Dec-02",
      nofprogeny: 2,
      nofreplicate: 2,
      soiltype: "Mineral",
      nofplot: 4,
      isEditable: false,
      nofplot_subblock: 1,
      design: "Alhpa Design",
      nofsubblock: 2,
      status: "canceled",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
    {
      estate: [
        {
          id: 3,
          name: "ASG",
          replicate: 4,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: "123.0",
              density: 230,
            },
          ],
        },
        {
          id: 4,
          name: "KBA",
          replicate: 3,
          estateblocks: [
            {
              blockId: 1,
              estateblock: "102d",
              size: "123.0",
              density: 230,
            },
            {
              blockId: 2,
              estateblock: "102e",
              size: "123.0",
              density: 230,
            },
          ],
        },
      ],
      trialId: 3,
      trialCode: "003",
      trial: "PT01_001KPM02",
      trialremark:
        "Density Trial: 136, 143, 155 SPH with “a” Cross DelixGhaand “b” Cross DelixEko",
      area: "50.50",
      planteddate: "Dec-02",
      nofprogeny: 50,
      nofreplicate: 7,
      soiltype: "Mineral",
      nofplot: 350,
      isEditable: true,
      nofplot_subblock: 5,
      design: "Alhpa Design",
      nofsubblock: 3,
      status: "finished",
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
              size: "123.0",
              density: 230,
            },
          ],
        },
      ],
      trialId: 4,
      trialCode: "004",
      trial: "PT01_001KPM05",
      trialremark:
        "Density Trial: 136, 143, 155 SPH with “a” Cross DelixGha and “b” Cross DelixEko",
      area: "50.50",
      planteddate: "Feb-03",
      nofprogeny: 100,
      nofreplicate: 6,
      soiltype: "Mineral",
      nofplot: 1,
      nofplot_subblock: 4,
      nofsubblock: 2,
      isEditable: true,
      status: "finished",
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
              size: "123.0",
              density: 230,
            },
          ],
        },
      ],
      trialId: 5,
      trialCode: "005",
      trial: "PT02_002KPM03",
      trialremark: "Progeny Trial: “a” Cross DelixGha and “b” Cross DelixEko",
      area: "50.50",
      planteddate: "Dec-02",
      nofprogeny: 50,
      nofreplicate: 5,
      soiltype: "Mineral",
      nofplot: 250,
      nofplot_subblock: 10,
      nofsubblock: 5,
      isEditable: true,
      status: "canceled",
      design: "Alhpa Design",
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
              size: "123.0",
              density: 230,
            },
          ],
        },
      ],
      trialId: 6,
      trialCode: "006",
      trial: "PT01_001KPM02",
      trialremark:
        "Density Trial: 136, 143, 155 SPH with “a” Cross DelixGhaand “b” Cross DelixEko",
      area: "50.50",
      planteddate: "Dec-02",
      nofprogeny: 10,
      nofreplicate: 7,
      soiltype: "Mineral",
      nofplot: 250,
      nofplot_subblock: 5,
      nofsubblock: 3,
      isEditable: true,
      design: "Alhpa Design",
      status: "finished",
      createdBy: "acerasadmin",
      createdDate: "2020-04-28T07:19:30.646Z",
      updatedBy: "aceadmin",
      updatedDate: "2020-05-11T02:22:39.829Z",
    },
  ];
  return trials;
}

function pad(s) {
  while (s.length < 3) s = "0" + s;
  return s;
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

app.get("/admin/estate", authenticateToken, function (req, res) {
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
            size: "123.0",
            density: 230,
          },
          {
            blockId: 2,
            estateblock: "102a",
            size: "123.0",
            density: 420,
          },
          {
            blockId: 3,
            estateblock: "102e",
            size: "123.0",
            density: 360,
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
            size: "123.0",
            density: 230,
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
            size: "123.0",
            density: 230,
          },
          {
            blockId: 2,
            estateblock: "102e",
            size: "123.0",
            density: 230,
          },
          {
            blockId: 3,
            estateblock: "102f",
            size: "123.0",
            density: 230,
          },
          {
            blockId: 4,
            estateblock: "102g",
            size: "123.0",
            density: 230,
          },
          {
            blockId: 5,
            estateblock: "102h",
            size: "123.0",
            density: 230,
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
            size: "123.0",
            density: 230,
          },
          {
            blockId: 2,
            estateblock: "102e",
            size: "123.0",
            density: 230,
          },
          {
            blockId: 3,
            estateblock: "102f",
            size: "123.0",
            density: 230,
          },
          {
            blockId: 4,
            estateblock: "102g",
            size: "123.0",
            density: 230,
          },
          {
            blockId: 5,
            estateblock: "102h",
            size: "123.0",
            density: 230,
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
            size: "123.0",
            density: 230,
          },
          {
            blockId: 2,
            estateblock: "102e",
            size: "123.0",
            density: 230,
          },
          {
            blockId: 3,
            estateblock: "102f",
            size: "123.0",
            density: 230,
          },
          {
            blockId: 4,
            estateblock: "102g",
            size: "123.0",
            density: 230,
          },
          {
            blockId: 5,
            estateblock: "102h",
            size: "123.0",
            density: 230,
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
            size: "123.0",
            density: 230,
          },
          {
            blockId: 2,
            estateblock: "102e",
            size: "123.0",
            density: 230,
          },
          {
            blockId: 3,
            estateblock: "102f",
            size: "123.0",
            density: 230,
          },
          {
            blockId: 4,
            estateblock: "102g",
            size: "123.0",
            density: 230,
          },
          {
            blockId: 5,
            estateblock: "102h",
            size: "123.0",
            density: 230,
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
            size: "123.0",
            density: 230,
          },
          {
            blockId: 2,
            estateblock: "102e",
            size: "123.0",
            density: 230,
          },
          {
            blockId: 3,
            estateblock: "102f",
            size: "123.0",
            density: 230,
          },
          {
            blockId: 4,
            estateblock: "102g",
            size: "123.0",
            density: 230,
          },
          {
            blockId: 5,
            estateblock: "102h",
            size: "123.0",
            density: 230,
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
      data: [
        {
          plotId:1,
          estate:"KLS",
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
          fp:"C 27,36",
          mp:"C 27,2489",
          noofPalm:16,
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KPP",
          trialCode:"001", 
          replicate:6, 
          estateblock:"102e",
          design:"Alpha Design",
          density:136,
          plot:"Plot 2",
          subblock:5,
          progenyCode: "D001",
          progeny:"Ce 1.1",
          ortet:"C9212.57",
          fp:"C 27,36",
          mp:"C 27,2489",
          noofPalm:16,
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          plotId:2,
          estate:"KLS",
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
          fp:"C 27,36",
          mp:"C 27,2489",
          noofPalm:16,
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          estate:"KBP",
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
          fp:"C 27,36",
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
          fp:"C 27,36",
          mp:"C 27,2489",
          noofPalm:"16",
          createdBy: "acerasadmin",
          createdDate: "2020-04-28T07:19:30.646Z",
          updatedBy: "aceadmin",
          updatedDate: "2020-05-11T02:22:39.829Z",
        },
        {
          plotId:4,
          estate:"KLS",
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
          fp:"C 27,36",
          mp:"C 27,2489",
          noofPalm:16,
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
  "/admin/plot/qrcode/:plotId",
  authenticateToken,
  function(req, res) {
    const plotId = parseInt(req.params.plotId);

    const originalData = [
      {
        trialId: 1,
        plotId: 1,
        trialCode: "001",
        estateblock:"102aaa",
        plot:"Plot 1",
        palmno:"1",
        palmname:"Palm1",
      },
      {
        trialId: 2,
        plotId: 1,
        trialCode: "002",
        plot:"Plot 2",
        estateblock:"102bbb",
        palmno:"2",
        palmname:"Palm2",
      },
      {
        trialId: 3,
        plotId: 1,
        trialCode: "003",
        estateblock:"102ccc",
        plot:"Plot 3",
        palmno:"3",
        palmname:"Palm3",
      },
      {
        trialId: 4,
        plotId: 1,
        trialCode: "004",
        estateblock:"102ddd",
        plot:"Plot 4",
        palmno:"4",
        palmname:"Palm4",
      },
      {
        trialId: 5,
        plotId: 1,
        trialCode: "005",
        estateblock:"102eee",
        plot:"Plot 5",
        palmno:"5",
        palmname:"Palm5",
      }
    ];

    const result = originalData.filter(data => data.plotId === plotId)

    res.writeHead(200, { "Content-Type" : "application/json" });
    res.end(JSON.stringify(result));
  }
);

app.get(
  "/admin/plot/PalmInformation",
  authenticateToken,
  function (req, res) {
    const result = [
        {
          trialCode:"001", 
          estate: "KLS",
          replicate:6, 
          estateblock:"102e",
          plot:"Plot 1",
          palmno: 1,
          
        },
        {
          trialCode:"001", 
          estate: "KGP",
          replicate:2, 
          estateblock:"102e",
          plot:"Plot 2",
          palmno: 2,
        },
        {
          trialCode:"001", 
          estate: "KOP",
          replicate:3, 
          estateblock:"102e",
          plot:"Plot 3",
          palmno: 3,
        },
        {
          trialCode:"001", 
          estate: "KOP",
          replicate:6, 
          estateblock:"102e",
          plot:"Plot 3",
          palmno: 4,
        },
        {
          trialCode:"002", 
          estate: "KGL",
          replicate:4, 
          estateblock:"102e",
          plot:"Plot 4",
          palmno: 5,
        },
        {
          trialCode:"003", 
          estate: "KGG",
          replicate:5, 
          estateblock:"102e",
          plot:"Plot 5",
          palmno: 6,
        },
      ]
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
    const result = {
      success: true,
      data: [
        {
          palmId:1,
          estate:"KLS",
          trialCode:"001", 
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
          palmId:2,
          estate:"KEQ",
          trialCode:"002", 
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
          palmId:3,
          estate:"FLZ",
          trialCode:"003", 
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
          palmId:4,
          estate:"HFS",
          trialCode:"004", 
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

app.put("/admin/update-palm", authenticateToken, function (req, res) {
  const result = {
    success: true,
    data: null,
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

app.get("/admin/palm", authenticateToken, function (req, res) {
  const result = {
    success: true,
    data: [
      {
        palmId: 1,
        estate: "KLS",
        trialCode: "001",
        replicate: 6,
        estateblock: "102e",
        design: "Alpha Design",
        density: 136,
        plot: "Plot 1",
        palmno: 1,
        palmname: "Palm1",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        palmId: 2,
        estate: "KEQ",
        trialCode: "002",
        replicate: 6,
        estateblock: "102e",
        design: "Alpha Design",
        density: 136,
        plot: "Plot 2",
        palmno: 2,
        palmname: "Palm2",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        palmId: 3,
        estate: "FLZ",
        trialCode: "003",
        replicate: 6,
        estateblock: "102e",
        design: "Alpha Design",
        density: 136,
        plot: "Plot 3",
        palmno: 3,
        palmname: "Palm3",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        palmId: 4,
        estate: "HFS",
        trialCode: "004",
        replicate: 6,
        estateblock: "102e",
        design: "Alpha Design",
        density: 136,
        plot: "Plot 4",
        palmno: 4,
        palmname: "Palm4",
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
      progenyCode: `D${pad("" + i)}`,
      popvar: "Dura111",
      origin: "Chemera (100% Ce)",
      progenyremark: "Ce 1",
      progeny: "Ce 1.1",
      generation: "Gen 1",
      ortet: "C9212.57",
      fp: "C 27.36",
      fpFam: "C 27",
      fpVar: "D",
      mp: "C 27, 2489",
      mpFam: "C 27",
      mpVar: "A",
      cross: "C 27,36 x C 27, 2489",
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

app.put("/admin/update-progeny", authenticateToken, function (req, res) {
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
            soiltype: "Minerals",
          },
          {
            id: 2,
            assigned: true,
            estateblock: "102a",
            soiltype: "Alluvial",
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
            soiltype: "Minerals",
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
            soiltype: "Minerals",
          },
        ],
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        estateId: 3,
        estate: "KNS",

        estateblocks: [
          {
            id: 1,
            assigned: true,
            estateblock: "102d",
            soiltype: "Minerals",
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
            soiltype: "Minerals",
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
            soiltype: "Alluvial",
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
            soiltype: "Minerals",
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
            soiltype: "Minerals",
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
            soiltype: "Alluvial",
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
            soiltype: "Minerals",
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
            soiltype: "Minerals",
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
            soiltype: "Alluvial",
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
            soiltype: "Minerals",
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
            soiltype: "Minerals",
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
            soiltype: "Alluvial",
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
            soiltype: "Minerals",
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
            soiltype: "Minerals",
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
            soiltype: "Alluvial",
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
            soiltype: "Minerals",
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
            soiltype: "Minerals",
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
            soiltype: "Alluvial",
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

app.put(
  "/admin/estate/map-estate-blocks",
  authenticateToken,
  function (req, res) {
    const { estate, blocks } = req.body;
    if (!estate || blocks.length === 0)
      return res.status(500).send("There is something wrong!");
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
//USER BLOCK

app.get("/admin/userlist", authenticateToken, function (req, res) {
  const result = {
    success: true,
    data: [
      {
        userId: "001",
        username: "Ali",
        position: "Mandore",
        status: "active",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        userId: "002",
        username: "Aqeel",
        position: "Mandore",
        status: "active",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        userId: "003",
        username: "Dexter",
        position: "Recorder",
        status: "active",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        userId: "004",
        username: "Jack",
        position: "Recorder",
        status: "active",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        userId: "005",
        username: "Maxwell",
        position: "Recorder",
        status: "active",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        userId: "006",
        username: "Ahmed",
        position: "Assistant",
        status: "active",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        userId: "007",
        username: "Amir",
        position: "Assistant",
        status: "active",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        userId: "008",
        username: "Joe",
        position: "Mandore",
        status: "active",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        userId: "009",
        username: "Smith",
        position: "Recorder",
        status: "active",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        userId: "010",
        username: "Tim",
        position: "Mandore",
        status: "active",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        userId: "011",
        username: "Jhon",
        position: "Mandore",
        status: "active",
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

app.get(
  "/admin/estateAssignment",
  //authenticateToken,
  function (req, res) {
    const result = {
      success: true,
      data: [
        {
          estate: "KLS",
          estatefullname: "KLS",
          noTrialOnHere: 2,
          assignedUser: 20,
        },
        {
          estate: "KPM",
          estatefullname: "KPM",
          noTrialOnHere: 5,
          assignedUser: 20,
        },
        {
          estate: "ASG",
          estatefullname: "ASG",
          noTrialOnHere: 6,
          assignedUser: 20,
        },
      ],
    };
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(result));
  }
);

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
          estate: [
            {
              name: "KLM"
            },
            {
              name: "KLS"
            }
          ]
        },
        {
          userId: "002",
          username: "Aqeel",
          position: "Mandore",
          estate: [
            {
              name: "KKK"
            }
          ]
        },
        {
          userId: "003",
          username: "Dexter",
          position: "Recorder",
          estate: [
            {
              name: "KBM"
            }
          ]
        },
      ],
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  }
);
app.post("/admin/create-user", authenticateToken, function (req, res) {
  const { userId, username, position } = req.body;
  const result = {
    success: true,
    data: { userId, username, position },
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

app.put("/admin/update-user", authenticateToken, function (req, res) {
  const { userId, username, position, status } = req.body;
  const result = {
    success: true,
    data: { userId, username, position, status },
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

app.put("/admin/assign-user-to-estate", authenticateToken, function (req, res) {
  const { estate, userId } = req.body;
  const result = {
    success: true,
    data: { estate, userId },
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

app.put("/admin/assign-estate-to-user", authenticateToken, function (req, res) {
  const { username, estate } = req.body;
  const result = {
    success: true,
    data: { username, estate },
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

app.get("/admin/user-position", authenticateToken, function (req, res) {
  const result = {
    success: true,
    data: [
      {
        position: "Mandore",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        position: "Recorder",
        createdBy: "acerasadmin",
        createdDate: "2020-04-28T07:19:30.646Z",
        updatedBy: "aceadmin",
        updatedDate: "2020-05-11T02:22:39.829Z",
      },
      {
        position: "Assistant",
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

app.put("/admin/update-trial", authenticateToken, function (req, res) {
  const result = {
    success: true,
    data: null,
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

app.put("/admin/trial/replicate", authenticateToken, function (req, res) {
  const result = {
    success: true,
    data: null,
  };
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result));
});

app.get(
  "/admin/trial/replicates/:trialid",
  authenticateToken,
  function (req, res) {
    const trialId = parseInt(req.params.trialid);
    console.log({ trialId });
    const trials = getTrials();

    const trial = trials.find((t) => t.trialId === trialId);
    console.log(trial);
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
                  { id: "1", name: "102e" },
                  { id: "2", name: "102f" },
                ]
              : [{ id: "1", name: "102e" }],
          density: "123",
          design: "Alhpa Design",
          soiltype: "Mineral",
        };
        replicates.push(rep);
      }
    }

    trial["replicates"] = replicates;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(trial));
  }
);

app.get(
  "/admin/trial/:trialCode",
  authenticateToken,
  function (req, res) {
    const trialCode = req.params.trialCode;
    console.log({ trialCode });
    const trials = getTrials();

    const trial = trials.find((t) => t.trialCode === trialCode);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(trial));
  }
);
//PLOT
app.get(
  "/admin/trial/replicates/plots/:trialid",
  authenticateToken,
  function (req, res) {
    const trialId = parseInt(req.params.trialid);
    const estate = req.params.estate;
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
        design: "Alhpa Design",
      };
      trialPlots.push(plot);
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(trialPlots));
  }
);

app.post(
  "/admin/trial/replicates/plots/:trialid",
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
  "/admin/attach-progeny/:trialid",
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
