const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const admin = require("firebase-admin");
const User = require("./models/User"); 
const { firebaseAuthMiddleware } = require("./middleware/authMiddleware");

dotenv.config({ path: path.join(__dirname, ".env") });

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = require("./config/firebaseServiceAccount.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Connect to MongoDB
connectDB();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Apply CORS Middleware
app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST"], credentials: true }));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", firebaseAuthMiddleware, eventRoutes);

// Fetch All Users from MongoDB
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// WebSocket Connection Handling (Without Attendee Tracking)
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Received message:", data);
    socket.emit("reply", "Message received by server");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Serve Static React Frontend
app.use(express.static(path.join(__dirname, "frontend/assessment")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/assessment", "index.html"));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
