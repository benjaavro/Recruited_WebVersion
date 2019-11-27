'use strict';

const PurchaseOrderModel = require('../model/PurchaseOrderModel')
const db = require('../util/db')

exports.createPurchaseOrderHead = function(req,res){
    const purchaseOrder = new PurchaseOrderModel(db);
    const item = req.body;

    console.log(req);
    

    if(!item){
        res.status(400).send({error:true,message:"Please provide an item to create"});
    }
    else{
        purchaseOrder.createPurchaseOrderHead(item,function(err,rest){
            if(err){
                console.log("There was an error: ");
                console.log(err);

                res.status(500).send(err);
            }
            else{
                res.json(rest);
            }
        })
    }
}

exports.createPurchaseOrderDetail = function(req,res){
    const purchaseOrder = new PurchaseOrderModel(db);
    const item = req.body;

    if(!item){
        res.status(400).send({error:true,message:"Please provide an item to create"});
    }else{
        purchaseOrder.createPurchaseOrderDetail([item],function(err,rest){
            if(err){
                console.log("There was an error: ");
                console.log(err);

                res.status(500).send(err);
            }else{
                res.json(rest);
            }
        })
    }
}

exports.getUnauthorizedPurchaseOrders = function(req,res){
    const purchaseOrder = new PurchaseOrderModel(db);

    purchaseOrder.getUnAuthorizedPurchaseOrders().then(
        success=>{            
            res.json(success);
        },err=>{
            res.status(500).send(err);
        }
    )
}

exports.getPurchaseOrderByNumber = function(req,res){
    const purchaseOrder = new PurchaseOrderModel(db);
    const purchaseOrderId = req.params.purchaseOrderId;

    purchaseOrder.getPurchaseOrderForNumber(purchaseOrderId).then(
        success=>{
            console.log(success);
            res.json(success);
        },err=>{
            console.log(err);
            res.status(500).send(err);
        }
    )
}

exports.authorizePurchaseOrder = function(req,res){
    const purchaseOrder = new PurchaseOrderModel(db);
    const purchaseOrderId = req.params.id;
    
    purchaseOrder.authorizePurchaseOrder(purchaseOrderId).then(
        success=>{
            console.log(success);
            res.json(success);
        },err=>{
            console.log(err);
            res.status(500).send(err);
        }
    )
}