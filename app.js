const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT || 3000;
const Store = require('./api/models/store');
const { response } = require('express');
const GoogleMapsService = require('./api/services/googleMapsService');
const googleMaps = new GoogleMapsService();
require('dotenv').config();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

connect = () => {
    let connectString = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ctt0p.mongodb.net/<dbname>?retryWrites=true&w=majority`
    return mongoose.connect(connectString,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    ).then(
        () => { console.log('Successfully connected!'); },
        err => { console.log(err); }
    );
}

connect();

app.use(express.json({ limit: '20mb' }));

app.post('/api/stores/', (req, res) => {
    let stores = req.body;
    // console.log(stores);
    let dbStores = [];
    for (let store of stores) {
        let dbStore = {
            storeName: store.name,
            phoneNumber: store.phoneNumber,
            address: store.address,
            openStatusText: store.openStatusText,
            addressLines: store.addressLines,
            location: {
                type: 'Point',
                coordinates: [store.coordinates.longitude, store.coordinates.latitude]
            }
        };
        dbStores.push(dbStore);
    }
    console.log(dbStores);
    // res.send("Stores saved")
    Store.create(dbStores, (err, stores) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(stores);
        }
    })
})

app.delete('/api/stores/', (req, res) => {
    Store.deleteMany({}, (err) => {
        res.status(200).send(err);
    });
})

app.get('/api/stores/', (req, res) => {
    const zipCode = req.query.zip_code;
    googleMaps.getCoordinates(zipCode)
        .then((coordinates) => {
            Store.find({
                location: {
                    $near: {
                        $maxDistance: 3218,
                        $geometry: {
                            type: "Point",
                            coordinates: coordinates
                        }
                    }
                }
            }, (err, stores) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send(stores);
                }
            })
        })
})


app.listen(port, () => {
    console.log(`Google Maps app listening at http://localhost:${port}`)
})