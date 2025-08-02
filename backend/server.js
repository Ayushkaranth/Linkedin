// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";

// import authRoutes from "./routes/auth.route.js";
// import userRoutes from "./routes/user.route.js";
// import postRoutes from "./routes/post.route.js";
// import notificationRoutes from "./routes/notification.route.js";
// import connectionRoutes from "./routes/connection.route.js";

// import { connectDB } from "./lib/db.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

// if (process.env.NODE_ENV !== "production") {
// 	app.use(
// 		cors({
// 			origin: "http://localhost:5173",
// 			credentials: true,
// 		})
// 	);
// }

// app.use(express.json({ limit: "5mb" })); // parse JSON request bodies
// app.use(cookieParser());

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/posts", postRoutes);
// app.use("/api/v1/notifications", notificationRoutes);
// app.use("/api/v1/connections", connectionRoutes);

// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

// app.listen(PORT, () => {
// 	console.log(`Server running on port ${PORT}`);
// 	connectDB();
// });


import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// ✅ Force HTTPS redirect middleware (ONLY on Render)
app.use((req, res, next) => {
	if (req.headers["x-forwarded-proto"] !== "https") {
		return res.redirect(`https://${req.headers.host}${req.url}`);
	}
	next();
});

// CORS setup
if (process.env.NODE_ENV !== "production") {
	app.use(
		cors({
			origin: "http://localhost:5173",
			credentials: true,
		})
	);
}

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Start server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	connectDB();
});
