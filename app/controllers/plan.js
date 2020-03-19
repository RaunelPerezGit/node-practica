const pool = require('../../database/connection');

async function selectPlan(req, res) {
    const response = await pool.query('select name_plan, quantity, period_plan, price.price from plan join priceplan on plan.id_plan=priceplan.plan join price on priceplan.price=price.id_price where status=true');
    res.status(200).json(response.rows);
    //res.render('chat');
}



let insertPricePlan = async(req, res) => {
    const body = req.body;
    const exist_plan = await pool.query(`select * from plan where name_plan = '${body.name}'`);
    if (exist_plan.rows.length > 0) {
        //res.status(200).json(exist_plan.rows);
        res.status(200).json({ ok: false, message: 'El nombre del plan ya se encuentra ocupado' });
    } else {
        await pool.query('BEGIN;');
        await pool.query(`insert into plan (name_plan, quantity, period_plan, date_plan) values('${body.name}',${body.quantity},'${body.period}',current_date) RETURNING id_plan`, function (err, rows, fields) {
            if (err) {
                pool.query('ROLLBACK;');
                res.status(200).json({ ok: false, message: 'Ocurrio un error al registrar el plan' });
            }else{
                var id_plan = rows.rows[0].id_plan;
                pool.query(`insert into price (price, date_price) values('${body.price}', current_date) RETURNING id_price;`, function (err, rows, fields) {
                    if (err) {
                        pool.query('ROLLBACK;');
                        res.status(200).json({ ok: false, message: 'Ocurrio un error al registrar el precio' });
                    } else {
                        var id_price = rows.rows[0].id_price;
                        console.log(`insert into priceplan(status, plan, price) values(true, ${id_plan},${id_price});`);
                        pool.query(`insert into priceplan(status, plan, price) values(true, ${id_plan},${id_price}) RETURNING id_pripla;`, function (err, rows, fields) {
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
        });

    }
}

let deletePlan = async(req, res)=>{
    const body = req.body;
    await pool.query(`update priceplan set status=false where id_pripla=${body.id_pripla}RETURNING id_pripla;`,function (err, rows, fields) {
        if (err) {
            res.status(200).json({ ok: false, message: 'Ocurrio un error al intentar eliminar este campo' });
        } else {
            res.status(200).json({ok: true, id: rows.rows[0].id_pripla, message: 'Fué eliminado con éxito'});   
        }
    });
        
}



module.exports = {
    selectPlan,
    insertPricePlan,
    deletePlan
}