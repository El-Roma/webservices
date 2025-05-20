/**
 * Configuration globale pour Jest
 * Ce fichier est chargé avant tous les tests via le jest.config.js
 */

// Charger dotenv pour les variables d'environnement
require('dotenv').config();

// Définir NODE_ENV pour le mode test
process.env.NODE_ENV = 'test';

// Charger les utilitaires avec les mocks
require('./utils/user.utils');
require('./utils/db.utils');

// Afficher un message de confirmation
console.log('Jest global setup loaded - Mocks are enabled'); 