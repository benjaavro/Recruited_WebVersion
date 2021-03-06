class postModel {
    constructor(db) {
        this.db = db;
    }

    post(usr) {
        console.log("User");
        console.log(usr);
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

    postC(usr) {
        console.log("User");
        console.log(usr);
        const sql = `INSERT INTO PostCoach(date,description,Coach_idCoach) VALUES(?,?,?)`
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

    getPostC() {
        const sql = `SELECT * FROM PostCoach`
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