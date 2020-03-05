import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import camelcase from 'camelcase-keys';

/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */

const server = express();
const error = { error: true };

/* -----------------------------------
 *
 * Middleware
 *
 * -------------------------------- */

server.use(express.static(path.join(__dirname, 'public')));

/* -----------------------------------
 *
 * JSON
 *
 * -------------------------------- */

function getJSON(fileType: string) {
   const result = fs
      .readFileSync(`./assets/${fileType}.stub.json`)
      .toString('utf8');

   return camelcase(JSON.parse(result), { deep: true });
}

/* -----------------------------------
 *
 * Routes
 *
 * -------------------------------- */

server.get('/offers/:type', async (req: Request, res: Response) => {
   const {
      params: { type: fileType },
   } = req;

   let json: object;

   if (!req.header('X-ApiKey')) {
      res.status(400).send(error);

      return;
   }

   try {
      json = getJSON(fileType);
   } catch (err) {
      res.status(404).send(error);

      return;
   }

   res.type('json').send(json);
});

/* -----------------------------------
 *
 * Listen
 *
 * -------------------------------- */

server.listen(6060, () => console.log('Listening @ localhost:6060'));
