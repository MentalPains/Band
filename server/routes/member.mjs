import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the members
router.get("/", async (req, res) => {
  let collection = await db.collection("members");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single member by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("members");
  let query = { _id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.status(404).send("Not found");
  else res.status(200).send(result);
});

// This section will help you create a new member, including the image as a Base64 string
router.post("/", async (req, res) => {
  let newDocument = {
    name: req.body.name,
    year: req.body.year,
    instrument: req.body.instrument,
    leadership: req.body.leadership,
    portrait: req.body.portrait, // Add this line to handle the image
  };
  let collection = await db.collection("members");
  let result = await collection.insertOne(newDocument);
  res.status(201).send(result); // Use 201 for created
});

// This section will help you update a member by id, including updating the image
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      name: req.body.name,
      year: req.body.year,
      instrument: req.body.instrument,
      leadership: req.body.leadership,
      portrait: req.body.portrait, // Add this line to update the image
    },
  };

  let collection = await db.collection("members");
  let result = await collection.updateOne(query, updates);
  res.status(200).send(result); // OK status for updates
});

// This section will help you delete a member
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("members");
  let result = await collection.deleteOne(query);
  
  res.status(200).send(result);
});

export default router;
