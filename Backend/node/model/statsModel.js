class statsModel {
    constructor(db) {
        this.db = db;
    }


    insert(usr) {
        console.log("Insert stats: ");
        console.log(usr);
        const sql = `INSERT INTO Stats(name,content,Athlete_idAthlete) VALUES (?,?,?)`
        const params = [usr.Name,usr.Content,usr.Id];
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

    get(usr) {
        const sql = `SELECT * FROM Stats WHERE Athlete_idAthlete = ?`
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

    update(usr) {
        const sql = `UPDATE Stats SET content = ? WHERE idRecord = ?`
        const params = [usr.Content,usr.IdRecord];
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


}
module.exports = statsModel
