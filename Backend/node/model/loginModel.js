class loginModel {
    constructor(db) {
        this.db = db;
    }

    athleteLogin(usr) {
        console.log("aTHLETE:");
        console.log(usr);
        console.log("user: "+usr.User);
        console.log("user: "+usr.Password);
        const sql = `SELECT idAthlete
            FROM Athlete
            WHERE mail = ? AND password = ?`
        const params = [usr.User, usr.Password];
        console.log("params:" +params);
        return new Promise((resolve, reject) => {
            this.db.query(sql, params, function (err, res) {
                if (err) {
                    reject(err)
                } else {
                    console.log("Respuesta: ");
                    console.log(res);
                    resolve(res)
                }
            })
        })
    }

    coachLogin(usr) {
        console.log("COACH");
        console.log(usr);
        console.log("user: "+usr.mail);
        console.log("user: "+usr.password);
        const sql = `SELECT idCoach
            FROM Coach
            WHERE mail = ? AND password = ?`
        const params = [usr.User, usr.Password];
        console.log("params:" +params);
        return new Promise((resolve, reject) => {
            this.db.query(sql, params, function (err, res) {
                if (err) {
                    reject(err)
                } else {
                    console.log("respuesta ="+res);
                    resolve(res)
                }
            })
        })
    }

}
module.exports = loginModel