class postModel {
    constructor(db) {
        this.db = db;
    }

    post(usr) {
        const sql = `INSERT INTO PostAthlete(date,description,Athlete_idAthlete) VALUES(?,?,?)`
        const params = [usr.Date,usr.Description,usr.Id];
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

    getPost() {
        const sql = `SELECT * FROM PostAthlete`
        const params = [];
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

module.exports = postModel;