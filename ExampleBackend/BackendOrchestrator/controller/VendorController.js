'use strict';

const VendorModel = require('../model/VendorModel')
const db = require('../util/db')

exports.getVendors = function(req,res){
    const vendor = new VendorModel(db);

    vendor.getVendors().then(
        success=>{
            res.json(success);
        },err=>{
            res.status(500).send(err);
        }
    )
}