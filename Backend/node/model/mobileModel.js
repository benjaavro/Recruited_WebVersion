class mobileModel {
    constructor(db) {
        this.db = db;
    }

    login(usr) {
        console.log("user: "+usr.User);
        const sql = `SELECT mail,password FROM Login WHERE mail = ?`
        const params = [usr.User];
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

    insert(usr) {
        console.log("user: "+usr.User);
        const sql = `INSERT INTO Login(mail,password) VALUES(?,?)`
        const params = [usr.Userusr.Password];
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


}
module.exports = mobileModel