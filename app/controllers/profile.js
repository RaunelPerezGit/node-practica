const pool = require('../../database/connection');

let insertProfile = async(req, res)=>{
    const body = req.body;
    const exist_plan = await pool.query(`select * from profile where name_pro = '${body.name}'`);
    if (exist_plan.rows.length > 0) {
        //res.status(200).json(exist_plan.rows);
        res.status(200).json({ ok: false, message: 'El nombre del perfil ya se encuentra ocupado' });
    } else {
        
        await pool.query(`insert into profile ( name_pro, description, visible ,date_prof) values('${body.name}','${body.description}','${body.visible}', current_date) RETURNING id_prof;`, function (err, rows, fields) {
            if (err) {
                pool.query('ROLLBACK;');
                res.status(200).json({ ok: false, message: 'Ocurrio un error al registrar el perfil' });
            } else {
                var id_profile = rows.rows[0].id_prof;
                
                pool.query(`insert into priceplan(status, date_propla,profile serial not null, plan) values(true, ${id_plan},${id_price}) RETURNING id_pripla;`, function (err, rows, fields) {
                    if (err) {
                        pool.query('ROLLBACK;');
                        res.status(200).json({ ok: false, message: 'Ocurrio un error al registrar el precio-plan', err });
                    } else {
                        pool.query('COMMIT;');
                        res.status(200).json({ok: true, id: rows.rows[0].id_pripla});
                    }
                });
            }
        });
    }
       
}