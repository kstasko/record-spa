import express from 'express';
import cors from 'cors';
require('dotenv').config()

export default async () => {
    const server = express();
    server.use(cors());
    server.use(express.json());

    server.all('/', async (req, res) => {
        try {
            console.log('hello', req.body)
            res.sendStatus(204);
        } catch(err) {
            console.log('Error', err);
            res.status(500).send('Something went wrong :(')
        }
        
    })

    return server;
}

