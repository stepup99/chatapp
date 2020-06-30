const express = require('express');
const router = express.Router();

const users = require('../schema/schema.js').users;
try {

    router.get('/', async (req, res) => {
        users.find().then(item => {
            res.json(item);
        });
    });

    router.get('/:id', (req, res) => {
        let id = req.params.id;
        users.find({ _id: id }, function (err, data) {
            if (err) {
                res.send(err)
                return;
            }
            res.send(data);
        });
    });

    router.put('/updateuserstatus/:id/:status/:socketid', (req, res) => {
        const id = req.params.id;
        const status = req.params.status;
        let socketidVal = "";

        if (req.params.socketid !== "" || req.params.socketid !== null) {
            socketidVal = req.params.socketid;
        }
        users.findByIdAndUpdate({ _id: id }, { $set: { status: status, socketid: socketidVal } }, { new: true }).then((item) => {
            res.json(item);
        });
    });



    router.post('/', (req, res) => {
        const user = new users({
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            mobile: req.body.mobile
        });

        user.save().then(item => {
            res.json(item);
        });
    });


    //         job.on(`enqueue`, function () {
    //             console.log(`Job Submitted in the Queue. with job id is ${job.id}`);
    //             console.log('object is ');
    //             console.log(job.type);
    //             console.log(job.data);
    //         });



    //     });
    // });

} catch (error) {
    console.log(error);
}



module.exports = router;