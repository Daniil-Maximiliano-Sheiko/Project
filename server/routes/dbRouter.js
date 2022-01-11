const router = require("express").Router();
const mongodb = require('mongodb');
const db = require("./db.js");
router.post("/add", (req, res) => {
    console.log(req.body);

    const client = db();
    client.connect(err => {
        if (err) {
            console.log(err)
        } else {
            const table = client.db("Item");
            const col = table.collection("Products");
            col.insertOne(req.body, err => {
                if (err) {
                    console.log(err);
                } else {
                    res.send({msg: "done"});
                }
                client.close();
            });
        }
    });
});

router.get("/laptop", (req, res) => {
    const client = db();
    client.connect(err => {
        if (err) {
            res.send({"msg": "Error connection"});
            client.close();
        } else {
            const table = client.db("Item");
            const col = table.collection("Products");
            col.find({"type": "ноутбуки"}).toArray((error, data) => {
                if (error) {
                    console.log(error);
                }
                console.log(data);
                res.send({"data": data});
                client.close();
            });
        }
    });
});

router.get("/del/:id", (req, res) => {
    const client = db();
    client.connect((err) => {
        if (err) {
            res.send({"msg": "Error connection"});
            client.close();
        } else {
            const col = client.db("Item").collection("Products");
            console.log(req.params);
            col.deleteOne({"_id": new mongodb.ObjectId(req.params.id)}, (delErr, result) => {
                if (delErr) {
                    client.close();
                    res.send({"msg": "Все плохо"});
                } else {
                    console.log(result);
                    client.close();
                    res.send({"msg": "ok"});
                }
            });
        }
    });
});

module.exports = router;