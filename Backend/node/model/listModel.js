class listModel {
    constructor(db) {
        this.db = db;
    }

    list(usr) {
        const sql = `select  c.idCoach,c.name, al.Athlete_idAthlete, a.name from coach AS c  JOIN interestlist AS il  JOIN athletelist AS al JOIN athlete AS a WHERE interestList_idList=idList AND coach_idCoach=idCoach AND athlete_idAthlete=idAthlete AND c.idCoach = ? ORDER BY idCoach ASC;`
        const params = [usr.Id];
        return new Promise((resolve, reject) => {
            this.db.query(sql, params, function (err, res) {
                if (err) {
                    reject(err)
                } else {
                    console.log("Respuesta");
                    console.log(res);
                    resolve(res)
                }
            })
        })
    }

    listCoach(usr) {
        const sql = `select  c.idCoach,c.name from coach AS c  JOIN interestlist AS il  JOIN athletelist AS al JOIN athlete AS a WHERE interestList_idList=idList AND coach_idCoach=idCoach AND athlete_idAthlete=idAthlete AND a.idAthlete = ? ORDER BY idCoach ASC;`
        const params = [usr.Id];
        return new Promise((resolve, reject) => {
            this.db.query(sql, params, function (err, res) {
                if (err) {
                    reject(err)
                } else {
                    console.log("Respuesta");
                    console.log(res);
                    resolve(res)
                }
            })
        })
    }

    insertList(usr) {
        const sql = `INSERT INTO AthleteList VALUES(?,?)`
        const params = [usr.IdA,usr.IdC];
        return new Promise((resolve, reject) => {
            this.db.query(sql, params, function (err, res) {
                if (err) {
                    reject(err)
                } else {
                    console.log("Respuesta");
                    console.log(res);
                    resolve(1)
                }
            })
        })
    }

    getMail(usr) {
        const sql = `SELECT mail FROM Athlete WHERE idAthlete = ?`
        const params = [usr.IdA];
        return new Promise((resolve, reject) => {
            this.db.query(sql, params, function (err, res) {
                if (err) {
                    reject(err)
                } else {
                    console.log("Respuesta");
                    console.log(res);
                    resolve(res)
                }
            })
        })
    }


}
module.exports = listModel