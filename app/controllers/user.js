const pool = require('../../database/connection');

// 3- AñadirCuentas(userx)
// 5- Falta algo del sistema de notificaciones, para informarle cuando ha Sido invitado como colaborador(con sockets o algo asi) 
// 6- Añadir Guess(user-Enterprise)

// NOTE This method checks first if the user exists if is the case returned the user
// if the user not exist in the BD save the user and return him
let login = async(req, res) => {
    
    
    const body = req.body;
    const username = body.nickname;
    const sub = body.sub;
    

    // NOTE Verified if the user exist
    const exist_user = await pool.query(`SELECT * FROM users JOIN userprofile ON users.id_use = userprofile.users WHERE sub = '${sub}'`);
    if (exist_user.rows.length > 0) {
        res.status(200).json({
            ok: true,
            username: exist_user.rows[0].username,
            sub: exist_user.rows[0].sub,
            profile: exist_user.rows[0].profile
        })
    }else{
        //NOTE save the user
        await pool.query('BEGIN;');
        await pool.query(`INSERT INTO users (username, sub) VALUES ('${username}', '${sub}') RETURNING id_use;`,
            (err, rows, fields) => {
                if(err){
                    pool.query('ROLLBACK;');
                    res.status(200).json({ ok: false, message: 'Ocurrio un error al registrar el usuario', err });
                }else{
                    const id_user = rows.rows[0].id_use;
                    // FIXME How to know what is the default plan ?
                    pool.query(`INSERT INTO userprofile(status, date_usepro, users, profile) VALUES (true, current_date, ${id_user}, 1) RETURNING id_usepro;`,
                        (err, rows, fields) => {
                            if(err){
                                pool.query('ROLLBACK;');
                                res.status(200).json({ ok: false, message: 'Ocurrio un error al registrar el usuario-profile', err });
                            }else{
                                pool.query('COMMIT;');
                            }
                        });
                }
            });
        
            const saved_user = await pool.query(`SELECT * FROM users JOIN userprofile ON users.id_use = userprofile.users WHERE sub = '${sub}'`);
            
            res.status(200).json({
                ok: true,
                user: saved_user.rows
            })
    }
}

module.exports = {
    login
}