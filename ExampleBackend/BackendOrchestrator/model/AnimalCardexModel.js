const ItemLot = require('../model/ItemLotModel')
const ItemCardex = require('../model/ItemCardexModel')

class AnimalCardexModel{
    constructor(db){
        this.db = db;
    }


    /**
     * Functions to get table contents
     */

    /**
     * getPreviousAnimalCardexEntries: This function wraps a query to obtain the latest animal cardex
     *                                 entry for a given list of animals
     * 
     * @param {*} animalEarringIdList: An array containing one or more earring ids to distinguish
     *                                 certain animals
     */
    getPreviousAnimalCardexEntries(animalEarringIdList){
        const sql = `SELECT animalCardexId,animalEarringId,transactionDate,movementClass,
                    transactionTypeId,transactionDetail,cashPerUnit,unitsEnteringOrExiting,
                    totalOfCashEnteringOrExitingPerUnit,currentUnitsAtAnimal,
                    currentValueOfUnitsAtAnimal,currentAnimalValue,
                    itemCardexId,itemCardexChildId,itemCardexItemCode,
                    isVaccineOfCardex, sicknessRefId
                    FROM animalcardex 
                    WHERE animalCardexId 
                    IN(SELECT MAX(animalCardexId) FROM animalcardex WHERE animalEarringId IN(?) GROUP BY animalEarringId)`
        const params = [animalEarringIdList];

        return new Promise((resolve,reject)=>{
            this.db.query(sql,params,function(err,rows){
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })
    }

    /**
     * getAccruedMovementsOfAnimal: This function wraps a query to obtain the movements of items
     *                          an animal has had during its life
     * 
     * @param {*} animalEarringId: The Earring number of a given animal
     */
    getAccruedMovementsOfAnimal(animalEarringId){
        const sql = `SELECT earringId,animalName,race,gender,birthplace,birthday,destiny,
        currentStatus,itemName,currentValueOfUnitsAtAnimal,currentAnimalValue,
        animalcardex.transactionDate,itemCardexItemCode,totalOfCashEnteringOrExitingPerUnit,
        categoryName,itemLevel
        FROM animal
        JOIN animalcardex ON animal.earringId=animalcardex.animalEarringId
        JOIN item ON animalcardex.itemCardexItemCode=item.itemId
        JOIN itemcategory
        ON itemcategory.itemIdRef = animalcardex.itemCardexItemCode
        JOIN category
        ON itemcategory.idCategory = category.idCategory
        WHERE animal.earringId = ?`;
        const params = [animalEarringId];

        return new Promise((resolve,reject)=>{
            this.db.query(sql,params,function(err,rows){
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })
    }

    /**
     * createAnimalCardex: This function handles the insertion of one or more
     *                     entries for the animalcardex table.
     *                     Returns a promise that can be chained in a transaction
     *                     or it can be used as a standalone function.
     * 
     * @param {*} animalCardex: An array of arrays [][] with the data to be
     *                          inserted at the animalcardex table. 
     * @param {*} connection: A mysql database connection
     */
    createAnimalCardex(animalCardex,connection){
        if(!connection)
            connection = this.db;

        const sql = `INSERT INTO animalcardex (animalCardexId,animalEarringId,
        transactionDate,movementClass,transactionTypeId,transactionDetail,
        cashPerUnit,unitsEnteringOrExiting,totalOfCashEnteringOrExitingPerUnit,
        currentUnitsAtAnimal,currentValueOfUnitsAtAnimal,currentAnimalValue,
        itemCardexId,itemCardexChildId,itemCardexItemCode,isVaccineOfCardex,
        sicknessRefId) VALUES ?`;
        const params = [animalCardex];

        return new Promise((resolve,reject)=>{
            connection.query(sql,params,function(err,res){
                if(err){
                    console.log(err);
                    reject(err);
                }else{
                    resolve(res);
                }
            })
        })
    }
    
    /**
     * Business logic functions
     */

    /**
     * calculateCardexEntries: This function creates new animal cardex entries through
     *                         the use of previous records to accrue the value and allow
     *                         to immediately assign a production value to an animal;
     *                         after such process of value accruing, a ready to insert
     *                          array of arrays [][] is generated for the caller function
     *                         to handle the insertion.
     * 
     * @param {*} indexedPrevEntries: A hashmap containing the latest records of animal
     *                                cardex entries
     * @param {*} toInsertEntries:  An unprocessed list of items from which a ready to insert 
     *                              data structure is to be generated
     */
    calculateCardexEntries(indexedPrevEntries,toInsertEntries){
        console.log("To Insert:");
        console.log(toInsertEntries);
        
        toInsertEntries.forEach(element => {
            let prevEntry = indexedPrevEntries[element.animalEarringId];

            if(prevEntry){
                element.currentAnimalValue = parseFloat(prevEntry.currentAnimalValue)+parseFloat(element.totalOfCashEnteringOrExitingPerUnit);
                element.currentUnitsAtAnimal=parseFloat(prevEntry.currentUnitsAtAnimal)+parseFloat(element.unitsEnteringOrExiting);
            }else{
                element.currentAnimalValue = parseFloat(element.totalOfCashEnteringOrExitingPerUnit);
                element.currentUnitsAtAnimal=parseFloat(element.unitsEnteringOrExiting);
            }
        });

        //Preparation of the array of arrays to insert
        const itemsSaveable = toInsertEntries.map(item=>{
           return [
            item.animalCardexId,
            item.animalEarringId,
            item.transactionDate,
            item.movementClass,
            item.transactionTypeId,
            item.transactionDetail,
            item.cashPerUnit,
            item.unitsEnteringOrExiting,
            item.totalOfCashEnteringOrExitingPerUnit,
            item.currentUnitsAtAnimal,
            item.currentValueOfUnitsAtAnimal,
            item.currentAnimalValue,
            item.itemCardexId,
            item.itemCardexChildId,
            item.itemCardexItemCode,
            item.isVaccineOfCardex,
            item.sicknessRefId
           ] 
        });

        console.log(itemsSaveable);
        

        return itemsSaveable;
    }

    //Transactions
    animalCardexTransaction(itemCardex,animalCardex,lotToAffect){
        const itemCardexModel = new ItemCardex(this.db);
        const itemLot    = new ItemLot(this.db);
    
        console.log(animalCardex);

        return new Promise((resolve,reject)=>{
            //1. Get the connection from the db
            this.db.getConnection((errorConnection,connection)=>{
                if(errorConnection){
                    reject(errorConnection);
                }
                    
                //2. Start transaction
                connection.beginTransaction(transactionBeginErr=>{
                    if(transactionBeginErr){
                        reject(transactionBeginErr);
                    }
                    
                    //Attempt to save the animal cardexes
                    this.createAnimalCardex(animalCardex,connection)
                    .then(succAnimalCardex=>{
                        //Attempt to create the item cardex, IT IS ASSUMED IT IS READY
                        //FOR INSERTION FROM THE FRONTEND SINCE IT HAS ALL THE INFO TO
                        //CALCULATE IT!!
                        return itemCardexModel.storeSingleItemCardexDetail(itemCardex,connection);
                    })
                    .then(succItemCardex=>{
                        //Attempt to create the item lot
                        if(lotToAffect){
                            return itemLot.updateItemLotByItemCodeAndLotNumber(-lotToAffect.qty,lotToAffect.itemCode,lotToAffect.lotNumber,connection);
                        }else{
                            return succItemCardex;
                        }
                    })
                    .then(finalSuccess=>{
                        //Finally try to commit
                        connection.commit(commitErr=>{
                            if(commitErr){
                                connection.release();
                                //reject(commitErr);
                                return commitErr;
                            }
                            //Release connection beforehand!
                            connection.release();

                            resolve(finalSuccess);
                        })
                    }).catch(err=>{
                        console.log(err);
                        connection.rollback(()=>{
                            connection.release();
                            reject(err);
                        })                        
                    })

                })
            })
        })
    }
}

module.exports = AnimalCardexModel;