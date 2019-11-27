class AnimalModel{
    constructor(db){
        this.db = db;
    }

    createAnimal(cow,result){
        const insertSQL = `INSERT INTO animal (earringId,species,animalName,
            race,gender,birthplace,birthday,systemRegisterDate,
            destiny,currentStatus,animalSectionId,fatherId,
            motherId)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);`;
        
            const params = [  cow.earringId,
                cow.species,
                cow.animalName,
                cow.race,
                cow.gender,
                cow.birthplace,
                cow.birthday,
                cow.systemRegisterDate,
                cow.destiny,
                cow.currentStatus,
                cow.animalSectionId,
                cow.fatherId,
                cow.motherId];
        
        this.db.query(insertSQL,params,function(err,res){
            if(err){
                console.log(err);
                result(err,null);
            }else{
                result(null,res);
            }
        });
    }

    getAnimalsInSection(section,result){
        const sql = `SELECT * FROM animal WHERE animalSectionId=?`;
        const params = [section];

        this.db.query(sql,params,function(err,rows){
            if(err){
                console.log(err);
                result(err,null);
            }else{
                result(null,rows);
            }
        })
    }

    updateCowSection(section,earringId,result){
        const sql = `UPDATE animal set animalSectionId=? WHERE earringId=?`;

        const params = [section,earringId];

        this.db.query(sql,params,function(err,res){
            if(err){
                console.log(err);
                result(err,null);
            }else{
                result(null,res);
            }
        })
    }

    getCowForId(earringId,result){
        const sql = `SELECT earringId,animalName,race,gender,birthplace,birthday,destiny,
            currentStatus,itemName,currentValueOfUnitsAtAnimal,currentAnimalValue,
            AnimalCardex.transactionDate,itemCardexItemCode,totalOfCashEnteringOrExitingPerUnit
            FROM animal
            JOIN animalcardex ON animal.earringId=animalcardex.animalEarringId
            JOIN item ON animalcardex.itemCardexItemCode=Item.itemId
            WHERE animal.earringId = ?`;
        
        const params = [earringId];

        this.db.query(sql,params,function(err,rows){
            if(err){
                console.log(err);
                result(err,null);
            }else{
                result(null,rows);
            }
        })
    }
}

module.exports = AnimalModel