import express from 'express';
import ENV from './lib/env.js';
import path from 'path';
import { connectDb } from './lib/db.js';
const app = express();
const __dirname = path.resolve();


app.get("/health", (req, res) => {
    res.status(200).json({ message: "This is the response from backend" });
})

app.get("/books", (req, res) => {
    res.status(200).json({ message: "This is the response from backend for books" });
})
app.get("/book", (req, res) => {
    res.status(200).json({ message: "This is the response from backend for book" });
})

if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
    })
}

const startServer = async () => {
    try {
        await connectDb();
        app.listen(ENV.PORT, () => {
            console.log(`Server Running on port ${ENV.PORT}`);
        })
    } catch (error) {
        console.log("❌ Error starting server", error);
    }
}

startServer();