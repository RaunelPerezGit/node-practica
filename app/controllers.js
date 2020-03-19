const pool = require('../database/connection');

function index(req, res){
    res.render('index');
};

async function chat(req,res){
    const response = await pool.query('select * from usuario');
    res.status(200).json(response.rows);
    //res.render('chat');
}

module.exports = {index, chat}