const admin = require("firebase-admin");

const firebaseAuthMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; //  Attach user info
    next();
  } catch (error) {
    console.error("Firebase Token Verification Error:", error);
    res.status(401).json({ error: "Not authorized, invalid token" });
  }
};

module.exports = { firebaseAuthMiddleware }; 
