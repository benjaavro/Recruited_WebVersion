class profileModel {
    constructor(db) {
        this.db = db;
    }

    getAthleteProfile(usr) {
        console.log(usr);
        const sql = `SELECT * FROM athlete WHERE idAthlete = ?`
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

    editAthleteProfile(usr) {
        console.log(usr);
        const sql = `UPDATE athlete SET name = ? , age = ?, phoneNumber = ?, address = ? , institution = ?, description = ?, sport = ? ,password = ?, Institution_idInstitution = (SELECT idInstitution FROM institution WHERE name = ? ) WHERE idAthlete = ?`
        const params = [usr.Name,usr.Age,usr.Phone,usr.Location,usr.Institution, usr.Description,usr.Sport,usr.Password,usr.Institution,usr.Id];
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

    getCoachProfile(usr) {
        console.log(usr);
        const sql = `UPDATE coach SET name = ? , phoneNumber = ?, address = ? , institution = ?, description = ?, password = ?, Institution_idInstitution = (SELECT idInstitution FROM institution WHERE name = ? ) WHERE idCoach = ?`
        const params = [usr.Name,usr.Phone,usr.Location,usr.Institution,usr.Institution, usr.Description,usr.Password,usr.Institution,usr.Id];
        console.log("params:" +params);
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
module.exports = profileModel