import express from 'express';
import dotenv from 'dotenv';

dotenv.config({quiet:true});

const ENV={
    PORT:process.env.PORT,
    DATABASE_URI:process.env.DATABASE_URI,
    NODE_ENV:process.env.NODE_ENV,
}

export default ENV;