const { Pool } = require('pg');
require('dotenv').config();

// Définir NODE_ENV pour utiliser les mocks
process.env.NODE_ENV = 'test';

let pool = null;

/**
 * Récupère une instance du pool de connexion à la base de données.
 * @returns {Pool} Un pool de connexion à la base de données.
 */
const getPool = () => {
    // En mode test, renvoyer un mock
    console.log('Using mock database pool');
    return {
        query: async (sqlQuery, params) => {
            console.log(`Mock DB Query: ${sqlQuery}`);
            console.log(`Params: ${params}`);
            
            // Simuler des données pour différentes requêtes
            if (sqlQuery.includes('SELECT * FROM reservations')) {
                return {
                    rows: [
                        {
                            id: params[0],
                            user_id: '1',
                            room_id: '1',
                            start_time: new Date().toISOString(),
                            end_time: new Date().toISOString(),
                            created_at: new Date().toISOString(),
                        },
                    ],
                };
            } else if (sqlQuery.includes('SELECT * FROM notifications')) {
                return {
                    rows: [
                        {
                            id: '1',
                            user_id: '1',
                            reservation_id: params[0],
                            message: 'Notification de réservation',
                            created_at: new Date().toISOString(),
                        },
                    ],
                };
            } else {
                return { rows: [] };
            }
        },
    };
};

/**
 * Ferme le pool de connexion à la base de données.
 */
const closePool = async () => {
    console.log('Mock pool connection closed');
};

module.exports = {
    getPool,
    closePool,
};