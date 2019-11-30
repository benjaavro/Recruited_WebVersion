'use strict'

import { resolve } from "path";

class TransportModel{
    constructor(db){
        this.db = db;
    }

    saveTransportReport(transportReport){
        const sql = `INSERT INTO transportreport (transportId,sellerUPPKey,
            buyerUPPKey,destination,originRanch,vehicleBrand,vehicleModel,
            driverName,licenceId,numberPlate,movilizationDictamen,departureDate,
            arrivalDate)
            VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?);`

        const params = [transportReport.transportId,
            transportReport.sellerUPPKey,
            transportReport.buyerUPPKey,
            transportReport.destination,
            transportReport.originRanch,
            transportReport.vehicleBrand,
            transportReport.vehicleModel,
            transportReport.driverName,
            transportReport.licenceId,
            transportReport.numberPlate,
            transportReport.movilizationDictamen,
            transportReport.departureDate,
            transportReport.arrivalDate];
        
        return new Promise((resolve,reject)=>{
            
        })
    }

    saveTransportAnimals(transportedAnimals){

    }
}