import express from "express";
import cors from "cors";
import members from "./routes/member.mjs";

const app = express();
const PORT = process.env.PORT || 5050;

// Configure express to accept large payloads
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true, parameterLimit: 500000 }));

app.use(cors());

// Setup routes
app.use("/member", members);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
