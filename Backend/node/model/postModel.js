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
        const sql = `SELECT Athlete.idAthlete,Athlete.name,PostAthlete.idPostAthlete,PostAthlete.date,PostAthlete.description,PostAthlete.Athlete_idAthlete FROM PostAthlete
INNER JOIN Athlete ON PostAthlete.Athlete_idAthlete = Athlete.idAthlete;`
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
        const sql = `SELECT Coach.name,PostCoach.idPostCoach,PostCoach.date,PostCoach.description,PostCoach.Coach_idCoach FROM PostCoach
INNER JOIN Coach ON PostCoach.Coach_idCoach = Coach.idCoach;`
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