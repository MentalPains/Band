import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Make sure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Set up the multer middleware
const upload = multer({ storage: storage });

app.post('/', upload.single('portrait'), (req, res, next) => {
  var obj = {
    name: req.body.name,
    year: req.body.year,
    instrument: req.body.instrument,
    leadership: req.body.leadership,
    portrait: {
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
      contentType: req.file.mimetype
    }
  }
  imgSchema.create(obj).then((item, err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});
// Combined route handler for creating a new member with optional image upload
router.post("/", upload.single('portrait'), async (req, res) => {
  let newDocument = {
    name: req.body.name,
    year: req.body.year,
    instrument: req.body.instrument,
    leadership: req.body.leadership,
  };

  // Add the image to the document if uploaded
  if (req.file) {
    newDocument.portrait = {
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype
    };
    // Optionally remove the file after saving to DB
    fs.unlinkSync(req.file.path);
  }

  let collection = await db.collection("members");
  let result = await collection.insertOne(newDocument);
  res.status(201).send(result);
});

// This section will help you get a list of all the members
router.get("/", async (req, res) => {
  let collection = await db.collection("members");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single member by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("members");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});
router.get("/portrait/:id", async (req, res) => {
  const collection = db.collection("members");
  const result = await collection.findOne({ _id: new ObjectId(req.params.id) });

  if (!result || !result.portrait) {
    return res.status(404).send('No portrait found.');
  }

  res.contentType(result.portrait.contentType);
  res.send(result.portrait.data);
});

router.patch("/:id", upload.single('portrait'), async (req, res) => {
  const updates = {
    $set: {
      name: req.body.name,
      year: req.body.year,
      instrument: req.body.instrument,
      leadership: req.body.leadership,
    },
  };

  if (req.file) {
    updates.$set.portrait = {
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype
    };
    fs.unlinkSync(req.file.path); // Remove the file after saving to DB
  }

  const collection = db.collection("members");
  const result = await collection.updateOne({ _id: new ObjectId(req.params.id) }, updates);

  res.status(200).send(result);
});

// This section will help you update a member by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      name: req.body.name,
      year: req.body.year,           // Change to year
      instrument: req.body.instrument,     // Change to instrument
      leadership: req.body.leadership,     // Change to leadership
    },
  };

  let collection = await db.collection("members");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200); // OK status for updates
});


// This section will help you delete a member
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("members");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});
router.patch("/delete-portrait/:id", async (req, res) => {
  const collection = db.collection("members");
  const result = await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $unset: { portrait: "" } });

  res.status(200).send(result);
});


export default router;


