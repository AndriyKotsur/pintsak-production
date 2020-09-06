const express = require('express');
const router = express.Router();
const { uuid } = require('uuidv4');
const bcrypt = require('bcryptjs');
const { uploadImages, uploadFile, removeFolder} = require('../middleware/upload');
const { parseBearer, prepareToken } = require('../middleware/token');
const pool = require('../db');

// login admin
router.post('/', async (req,res) => {
  try {
    const { email, password } = req.body;
    const admin = await pool.query(
      'SELECT * FROM admin WHERE email = $1',
      [email]
    );
    const isMatch = await bcrypt.compare(password, admin.rows[0].password);
    if (!isMatch) {
      res.status(400).json(
        { message: 'Invalid credentials' }
      );
    } else {
      const token = prepareToken(
        { id: admin.rows[0].uid },
        req.headers
      );
      res.status(200).json(
        { token }
      );
    }
  } catch (err) {
    console.error(err.message);
    res.status(401).json(
      { message: 'Login error' }
    );
}
});

// register admin
router.post('/register', async (req,res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newAdmin = await pool.query(
      'INSERT INTO admin (uid, email, password) VALUES ($1, $2, $3) RETURNING *',
      [uuid(), email, hash]
    );
    const token = prepareToken(
      { id: newAdmin.rows[0].uid },
      req.headers
    );
    res.status(201).json(
      { token }
    );
  } catch (err) {
    console.error(err.message);
    res.status(400).json(
      { message: 'Bad request' }
    );
  }
});

// check token
router.get('/check-token', (req,res) => {
  try {
    const decoded = parseBearer(req.headers.authorization, req.headers);
    res.status(200).json(
      { id: decoded.id }
    );
  } catch (err) {
    console.error(err.message);
    res.status(401).json(
      { message: 'Token expired' }
    );
  }
});

// get all
router.get('/tiles', async (req, res) => {
  try {
    const allTiles = await pool.query(
      'SELECT * FROM tile'
    );
    res.status(200).json(allTiles.rows);
  } catch (err) {
    console.error(err.message);
    res.status(404).json(
      { message: 'Not found' }
    );
  }
});

// get one type
router.get('/type/:id', async (req,res) => {
  try {
    const { id } = req.params;
    const type = await pool.query(
      'SELECT * FROM tile_type WHERE type_uid = $1',
      [id]
    );
    res.status(200).json(type.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(404).json(
      { message: 'Not found' }
    );
  }
});

// add tile type
router.post('/type/add', async (req, res) => {
  try {
    parseBearer(req.headers.authorization, req.headers);
    const { title, title_url } = req.body;
    const newType = await pool.query(
      'INSERT INTO tile_type (type_uid, title, title_url) VALUES ($1, $2, $3) RETURNING *',
      [uuid(), title, title_url]
    );
    res.status(201).json(newType);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(
      { message: 'Bad request' }
    );
  }
});

// add tile
router.post('/tile/add', uploadImages, async (req, res) => {
  try {
    parseBearer(req.headers.authorization, req.headers);
    const { title, title_url, type, weight_per_meter, pieces_per_meter, color_price, width, height, thickness } = req.body;

    const images = [];
    for (let i = 0; i < req.files.length; i++) {
      images.push('http://localhost:5000' + (req.files[i].destination).slice(1) + '/' + req.files[i].filename);
    };

    const tileType = await pool.query(
      'SELECT * FROM tile_type WHERE title = $1',
      [type]
    );

    const newTile = await pool.query(
      'INSERT INTO tile (tile_uid, type_uid, title, images, type_tile, weight_per_meter, pieces_per_meter, color_price, width, height, thickness, title_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [uuid(), tileType.rows[0].type_uid, title, images, type, weight_per_meter, pieces_per_meter, JSON.parse(color_price), width, height, thickness, title_url]
    );
    res.status(201).json(newTile.rows);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(
      { message: 'Bad request' }
    );
  }
});

// update  type
router.put('/type/:id', async (req, res) => {
  try {
    parseBearer(req.headers.authorization, req.headers);
    const { id } = req.params;
    const { title, title_url } = req.body;
    await pool.query(
      'UPDATE tile_type SET title = $1, title_url = $2 WHERE type_uid = $3',
      [title, title_url, id]
    );
    res.status(200).json(
      { message: 'Updated' }
    );
  } catch (err) {
    console.error(err.message);
    res.status(400).json(
      { message: 'Bad request' }
    );
  }
});

// update tile
router.put('/tile/:id', async (req, res) => {
  try {
    parseBearer(req.headers.authorization, req.headers);
    const { id } = req.params;

    const tile = await pool.query(
      'SELECT * FROM tile WHERE tile_uid = $1',
      [id]
    );
    const type = await pool.query(
      'SELECT * FROM tile_type WHERE type_uid = $1',
      [tile.rows[0].type_uid]
    );

    removeFolder(`./public/images/${type.rows[0].title_url}/${tile.rows[0].title_url}`);

    uploadImages( req, res, async (err) => {
      if (err) {
        throw err;
      }
      const { title, title_url, type, weight_per_meter, pieces_per_meter, color_price, width, height, thickness } = req.body;

      const images = [];
      for (let i = 0; i < req.files.length; i++) {
        images.push('http://localhost:5000' + (req.files[i].destination).slice(1) + '/' + req.files[i].filename);
      };

      const tileType = await pool.query(
        'SELECT * FROM tile_type WHERE title = $1',
        [type]
      );
      await pool.query(
        'UPDATE tile SET type_uid = $1, title = $2, images = $3, title_url = $4, weight_per_meter = $5, pieces_per_meter = $6, color_price = $7, width = $8, height = $9, thickness = $10, type_tile = $11 WHERE tile_uid = $12',
        [tileType.rows[0].type_uid, title, images, title_url, weight_per_meter, pieces_per_meter, JSON.parse(color_price), width, height, thickness, type, id]
      );
      res.status(200).json(
        { message: 'Updated' }
      );
    })
  } catch (err) {
    console.error(err.message);
    res.status(400).json(
      { message: 'Bad request' }
    );
  }
});

// delete tile type
router.delete('/type/:id', async (req,res) => {
  try {
    parseBearer(req.headers.authorization, req.headers);
    const { id } = req.params;
    const type = await pool.query(
      'SELECT * FROM tile_type WHERE type_uid = $1',
      [id]
    );
    await pool.query(
      'DELETE FROM tile_type WHERE type_uid = $1',
      [id]
    );
    removeFolder(`./public/images/${type.rows[0].title_url}`);
    res.status(200).json(
      { message: 'Deleted' }
    );
  } catch (err) {
    console.error(err.message);
    res.status(400).json(
      { message: 'Bad request' }
    );
  }
});

// delete tile
router.delete('/tile/:id', async (req,res) => {
  try {
    parseBearer(req.headers.authorization, req.headers);
    const { id } = req.params;
    const tile = await pool.query(
      'SELECT * FROM tile WHERE tile_uid = $1',
      [id]
    );
    const type = await pool.query(
      'SELECT * FROM tile_type WHERE type_uid = $1',
      [tile.rows[0].type_uid]
    );
    await pool.query(
      'DELETE FROM tile WHERE tile_uid = $1',
      [id]
    );
    removeFolder(`./public/images/${type.rows[0].title_url}/${tile.rows[0].title_url}`);
    res.status(200).json(
      { message: 'Deleted' }
    );
  } catch (err) {
    console.error(err);
    res.status(400).json(
      { message: 'Bad request' }
    );
  }
});

// change catalogue
router.patch('/catalogue', async (req,res) => {
  try {
    parseBearer(req.headers.authorization, req.headers);

    removeFolder('./public/docs');

    uploadFile( req, res, async (err) => {
      if (err) {
        throw err;
      }
      res.status(200).json(
        { message: 'Changed' }
      );
  });
  } catch (err) {
    console.error(err.message);
    res.status(400).json(
      { message: 'Bad request' }
    );
  }
});

module.exports = router;