const { castObject } = require("../models/User");

exports.create = async function(req, res) {
    const CRUDcreate = new CRUDoperations ({
        username: req.body.username,
        identifier: req.body.identifier,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    try{
        const savedCRUD = await CRUDcreate.savedCRUD();
        res.status(200);
        res.send(savedCRUD);
    } catch(err){
        res.status(400).send(err);
    }
}

exports.read = function(req, res) {
    CRUDoperations.find({}, function(err, fetch) {
        if (err) res.status(400).send(err);
        res.status(200).send(fetch);
    });
}

exports.update = async function (req, res) {
    let id = req.body._id;

    try{
        const CRUDupdate = await CRUDoperations.findByIdAndUpdate({_id: id},
        {$set:{
            identifier: 1969
            }
        },
        {
            useFindAndModify: false
        });
        res.status(200).send(CRUDupdate);
    }catch(err) {
        res.status(400).send(err);
    }
}

exports.delete = async function (req, res) {
    let id = req.body._id;
    try{
        const CRUDdel = await CRUDoperations.findByIdAndRemove(
            id, function(err, res) {
                if (err) {
                    res.status(400).send(err);
                    console.log(err)
                } else {
                    console.log("Removed User : ", res);
                }
            },
            {
                useFindAndModify: false
            })
    } catch(err) {
        res.status(400).send(err);
    }
}

exports.fileupload = function (req, res) {
    console.log("Inside file Upload!");
    console.log('single route');
    console.log('file:'+JSON.stringify(req.file.path));    

    let stream = fs.createReadStream(req.file.path)
    let csvData = [];
    let csvStream = fastcsv
        .parse()
        .on('error', error => console.error(error))
        .on("data", function(data) {
            dt = data[0].split(',')
            csvData.push({
                username: dt[0],
                identifier: dt[1],
                firstName: dt[2],
                lastName: dt[3]
            });
        })
        .on("end", async function() {
            csvData.shift();

            try{
                console.log("client:" + CRUDoperations);
                let CRUDinsert = await CRUDoperations.insertmany(
                    csvData
                )
                console.log("CRUD Insert Many" + CRUDinsert)
                res.status(200).send(CRUDinsert)
            } catch(err){
                console.log("db error:"+err);
                res.status(400).send(err);
            }
            console.log(JSON.stringify(csvData));
        });
        stream.pipe(csvStream);
}