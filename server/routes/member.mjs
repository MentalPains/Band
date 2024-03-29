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

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new member.
router.post("/", async (req, res) => {
  let newDocument = {
    name: req.body.name,
    year: req.body.year,           // Change to year
    instrument: req.body.instrument,     // Change to instrument they play
    leadership: req.body.leadership,     // Change to leadership position
  };
  let collection = await db.collection("members");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(201); // Use 201 for created
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

export default router;


