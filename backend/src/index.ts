import "dotenv/config";
import express from "express";
import cors from "cors";
import { APP_ORIGIN, FLASK_URL, NODE_ENV , PORT} from "./constants/env";
import errorHandler from "./middleware/errorHandler";
import { OK } from "./constants/http";
import apiRoutes from "./routes/api.route";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db";
import authRoutes from "./routes/auth.route";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: [APP_ORIGIN, FLASK_URL],
        credentials: true,
    })
)
app.use(cookieParser())


app.get("/", (req, res, next) => {
    res.status(OK).json({
        status: "healthy",
    });
});

// api routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// protected routes
// app.use('/user', authenticate, userRoutes);
// app.use('/sessions', authenticate, sessionRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT} in ${NODE_ENV} environment`);
    await connectToDatabase();
});
