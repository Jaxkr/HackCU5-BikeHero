const users = require('express').Router();
const db = require('../db');

users.get('/numbers/:id', (req, res) => {
    var r
    (async () => {
        const start = Date.now()
        db.pool.connect().then(async (client) => {
            try {   
                const q = await client.query('SELECT * FROM contacts WHERE id = $1', [req.params.id], (err, response) => {
                    if (err) throw err
                    r = response.rows[0]
                    res.send(response.rows[0])
                    console.log(response.rows[0])
                })
            } finally {
                const duration = Date.now() - start
                console.log("returned number for user with id "+req.params.id+" in "+duration+"ps")
                client.release()
              }
            }
        ).catch(e => console.log(e.stack))
        })

    ().catch(e => console.log(e.stack))
})

users.get('/:id', (req, res) => {
    var r
    (async () => {
        const start = Date.now()
        db.pool.connect().then(async (client) => {
            try {
                const q = await client.query('SELECT * FROM users WHERE id = $1', [req.params.id], (err, response) => {
                    if (err) throw err
                    r = response.rows[0]
                    res.send(r)
                })
              } finally {
                    const duration = Date.now() - start
                    console.log("returned user with id "+req.params.id+" in "+duration)
                    client.release()
              }
            }
        ).catch(e => console.log(e.stack))
        })
        ().catch(e => console.log(e.stack))
        console.log(r)
})


module.exports = users;