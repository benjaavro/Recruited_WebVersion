class loginModel {
    constructor(db) {
        this.db = db;
    }

    athleteLogin(usr) {
        console.log(usr);
        console.log("user: "+usr.mail);
        console.log("user: "+usr.password);
        const sql = `SELECT name
            FROM Athlete
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