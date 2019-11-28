'use strict';
const mysql             = require('mysql')

const connectionPool = mysql.createPool({
    connectionLimit: 1000,
    host: '127.0.0.1',
    port: 3306,
    user: 'Alex',
    password: 'Mortadelo97',
    database: 'RecruitedApp'
});

connectionPool.getConnection((err,conn)=>{
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }

    if(conn){
        conn.release();
    }

    return;
})

module.exports = connectionPool;