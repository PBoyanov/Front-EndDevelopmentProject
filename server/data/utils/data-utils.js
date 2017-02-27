/* globals module */
'use strict';

module.exports = {
    update(model) {
        return new Promise((resolve, reject) => {
            model.save(err => {
                if (err) {
                    return reject(err);
                }

                return resolve(model);
            });
        });
    },
    save(model) {
        return new Promise((resolve, reject) => {
            model.save(err => {
                if (err) {
                    return reject(err);
                }

                return resolve(model);
            });
        });
    },
    getAll(model) {
        return new Promise((resolve, reject) => {
                model.find({}, (err, records) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(records);
                });
            });
    },
    getAllByStatus(model, status) {
        return new Promise((resolve, reject) => {
                model.find({ status: status }, (err, records) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(records);
                });
            });
    },
    getOneById(model, id) {
        return new Promise((resolve, reject) => {
                model.findOne({ _id: id }, (err, singleRecord) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(singleRecord);
                });
            });
    }

};