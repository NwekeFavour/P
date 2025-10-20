const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const OAuth2Server = require('oauth2-server');
const { v4: uuidv4 } = require('uuid');
const model = require('./model');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.oauth = new OAuth2Server({ model });

// Registration endpoint
app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const user = await model.getUserByEmail(email);
    if (user) return res.status(409).json({ error: 'user exists' });
    const hashed = await bcrypt.hash(password, 10);
    const newUser = { id: uuidv4(), email, password: hashed };
    await model.saveUser(newUser);
    return res.status(201).json({ id: newUser.id, email: newUser.email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal' });
  }
});

// Login endpoint
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const user = await model.getUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });

    // Create a token
    const token = await model.generateAccessToken(user.id);
    return res.json({ access_token: token.accessToken, token_type: 'bearer', expires_in: token.expiresIn });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal' });
  }
});



const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Auth server listening on ${port}`));
