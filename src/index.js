import dotenv from "dotenv";
import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = createApp();
const PORT = process.env.PORT || 8080;

const bootstrap = async () => {
	await connectDB();

	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

bootstrap().catch((error) => {
	console.error("Failed to start server", error.message);
	process.exit(1);
});
