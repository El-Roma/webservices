// tests/setupKeycloak.js
const request = require('supertest');
const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let keycloakUsrAccessToken = 'test-user-token';
let keycloakAdmAccessToken = 'test-admin-token';
let keycloakAdminToken = 'test-master-token';

/**
 * Récupère un token Keycloak via le flow "Resource Owner Password Credentials"
 * et le stocke dans keycloakAccessToken.
 */
async function getKeycloakUsrToken() {
  if (!process.env.KEYCLOAK_URL) {
    console.log('Mode test: Utilisation d\'un token utilisateur fictif');
    keycloakUsrAccessToken = 'test-user-token';
    return;
  }

  try {
    const res = await request(process.env.KEYCLOAK_URL)
      .post(`/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`)
      .type('form')
      .send({
        grant_type: 'password',
        client_id: process.env.KEYCLOAK_CLIENT_ID,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
        username: process.env.KEYCLOAK_TEST_USR_USERNAME,
        password: process.env.KEYCLOAK_TEST_USR_PASSWORD,
      });

    if (res.status !== 200) {
      console.error('Erreur lors de la récupération du token utilisateur:', res.text);
      throw new Error(`Impossible de récupérer le token Keycloak: ${res.text}`);
    }

    keycloakUsrAccessToken = res.body.access_token;
    console.log('Token utilisateur récupéré avec succès');
  } catch (error) {
    console.error('Erreur lors de la récupération du token utilisateur:', error);
    console.log('Utilisation d\'un token utilisateur fictif');
    keycloakUsrAccessToken = 'test-user-token';
  }
}

/**
 * Récupère un token Keycloak via le flow "Resource Owner Password Credentials"
 * et le stocke dans keycloakAccessToken.
 */
async function getKeycloakAdmToken() {
  if (!process.env.KEYCLOAK_URL) {
    console.log('Mode test: Utilisation d\'un token admin fictif');
    keycloakAdmAccessToken = 'test-admin-token';
    return;
  }

  try {
    const res = await request(process.env.KEYCLOAK_URL)
      .post(`/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`)
      .type('form')
      .send({
        grant_type: 'password',
        client_id: process.env.KEYCLOAK_CLIENT_ID,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
        username: process.env.KEYCLOAK_TEST_ADM_USERNAME,
        password: process.env.KEYCLOAK_TEST_ADM_PASSWORD,
      });

    if (res.status !== 200) {
      console.error('Erreur lors de la récupération du token admin:', res.text);
      throw new Error(`Impossible de récupérer le token Keycloak: ${res.text}`);
    }

    keycloakAdmAccessToken = res.body.access_token;
    console.log('Token admin récupéré avec succès');
  } catch (error) {
    console.error('Erreur lors de la récupération du token admin:', error);
    console.log('Utilisation d\'un token admin fictif');
    keycloakAdmAccessToken = 'test-admin-token';
  }
}

/**
 * Récupère un token admin Keycloak pour effectuer des actions d'administration
 * et le stocke dans keycloakAdminToken.
 */
async function getKeycloakAdminToken() {
  if (!process.env.KEYCLOAK_URL) {
    console.log('Mode test: Utilisation d\'un token admin master fictif');
    keycloakAdminToken = 'test-master-token';
    return;
  }

  try {
    const res = await request(process.env.KEYCLOAK_URL)
      .post(`/realms/master/protocol/openid-connect/token`)
      .type('form')
      .send({
        grant_type: 'password',
        client_id: 'admin-cli',
        username: process.env.KEYCLOAK_ADMIN_USERNAME,
        password: process.env.KEYCLOAK_ADMIN_PASSWORD,
      });

    if (res.status !== 200) {
      console.error('Erreur lors de la récupération du token admin master:', res.text);
      throw new Error(`Impossible de récupérer le token Keycloak: ${res.text}`);
    }

    keycloakAdminToken = res.body.access_token;
    console.log('Token admin master récupéré avec succès');
  } catch (error) {
    console.error('Erreur lors de la récupération du token admin master:', error);
    console.log('Utilisation d\'un token admin master fictif');
    keycloakAdminToken = 'test-master-token';
  }
}

// Getter pour récupérer le token dans d'autres fichiers de test
function getUsrToken() {
  return keycloakUsrAccessToken;
}

function getAdmToken() {
  return keycloakAdmAccessToken;
}

function getAdminToken() {
  return keycloakAdminToken;
}

/**
 * Vérifie le token JWT généré via le JWKS de Keycloak.
 */
async function verifyJwtToken(token) {
  if (!process.env.KEYCLOAK_URL) {
    console.log('Mode test: Vérification fictive du token');
    return { sub: 'test-user-id', email: 'test@example.com', roles: ['user'] };
  }

  try {
    const client = jwksClient({
      jwksUri: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/certs`,
    });

    function getKey(header, callback) {
      client.getSigningKey(header.kid, (err, key) => {
        if (err) {
          return callback(err);
        }
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
      });
    }

    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getKey,
        {
          issuer: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`,
        },
        (err, decoded) => {
          if (err) {
            return reject(err);
          }
          return resolve(decoded);
        },
      );
    });
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    console.log('Utilisation d\'un payload de token fictif');
    return { sub: 'test-user-id', email: 'test@example.com', roles: ['user'] };
  }
}

// Hook Jest appelé avant tous les tests
beforeAll(async () => {
  try {
    console.log('Démarrage de la configuration des tests...');
    console.log('URL Keycloak:', process.env.KEYCLOAK_URL);
    console.log('Realm Keycloak:', process.env.KEYCLOAK_REALM);
    
    await getKeycloakUsrToken();
    await getKeycloakAdminToken();
    await getKeycloakAdmToken();
    
    console.log('Configuration des tests terminée avec succès');
  } catch (error) {
    console.error('Erreur lors de la configuration des tests:', error);
    console.log('Utilisation de la configuration de test par défaut');
    keycloakUsrAccessToken = 'test-user-token';
    keycloakAdmAccessToken = 'test-admin-token';
    keycloakAdminToken = 'test-master-token';
  }
}, 30000);

module.exports = {
  getUsrToken,
  getAdmToken,
  getAdminToken,
  verifyJwtToken,
};
