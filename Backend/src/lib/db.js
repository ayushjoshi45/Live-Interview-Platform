import mongoose from 'mongoose';
import ENV from './env.js';

export const connectDb= async()=>{
    try {
        await mongoose.connect(ENV.DATABASE_URI);
        console.log("✅ Connected to database successfully");
    } catch (error) {
        console.log("❌ Error connecting to database",error);
    }
}