const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let storeSchema = new Schema({
    storeName: String,
    phoneNumber: String,
    address: {},
    openStatusText: String,
    addressLines: Array,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

storeSchema.index({ location: '2dsphere' }, { sparse: true });

module.exports = mongoose.model('Store', storeSchema);