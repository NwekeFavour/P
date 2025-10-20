const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// In-memory stores (replace with DB in production)
const users = new Map();
const tokens = new Map();

module.exports = {
  // User helpers
  async getUserByEmail(email) {
    for (const u of users.values()) {
      if (u.email === email) return u;
    }
    return null;
  },
  async saveUser(user) {
    users.set(user.id, user);
    return user;
  },

  // OAuth2 model methods (minimal subset to support password grant and bearer tokens)
  async getClient(clientId, clientSecret) {
    // Accept any client for this minimal example
    return {
      id: clientId || 'default-client',
      grants: ['password'],
      redirectUris: []
    };
  },

  async saveToken(token, client, user) {
    const record = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      client: { id: client.id },
      user: { id: user.id, email: user.email }
    };
    tokens.set(token.accessToken, record);
    return record;
  },

  async getAccessToken(accessToken) {
    return tokens.get(accessToken) || null;
  },

  async revokeToken(token) {
    if (tokens.has(token.accessToken)) {
      tokens.delete(token.accessToken);
      return true;
    }
    return false;
  },

  async getUser(username, password) {
    // username is email here
    const user = await this.getUserByEmail(username);
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return null;
    return user;
  },

  // bearer token auth - attach user to request
  async verifyScope(token, scope) {
    return true;
  },

  // Helper for manual token creation used by /auth/login
  async generateAccessToken(userId) {
    const accessToken = uuidv4();
    const expiresIn = 60 * 60; // 1 hour
    const expiresAt = new Date(Date.now() + expiresIn * 1000);
    const user = users.get(userId);
    const record = {
      accessToken,
      accessTokenExpiresAt: expiresAt,
      client: { id: 'manual' },
      user: { id: user.id, email: user.email }
    };
    tokens.set(accessToken, record);
    return { accessToken, expiresIn };
  }
};
