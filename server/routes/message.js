

users.get('/:id', (req, res) => {
    const accountSid = 'AC616c4fbf90f38d02fe0c13280a0413f3';
    const authToken = '415181d9b2beebf1bebc85c9dff3bda7';
    const client = require('twilio')(accountSid, authToken);
    var n
    (async () => {
        const start = Date.now()
        db.pool.connect().then(async (client) => {
            try {  
                const q = await client.query('SELECT * FROM contacts WHERE id = $1', [req.params.id], (err, response) => {
                    if (err) throw err
                    n = response.rows[0].number
                    res.send(JSON.stringify(response.rows[0].number))
                    console.log(response.rows[0])
                })
            } finally {
                const duration = Date.now() - start
                console.log("trying to send message to "+ n + " ps")
                client.release()
            }
        }
    ).catch(e => console.log(e.stack))
    }) 
      ().catch(e => console.log(e.stack))
  })