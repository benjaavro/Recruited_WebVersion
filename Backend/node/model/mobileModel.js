class mobileModel {
    constructor(db) {
        this.db = db;
    }

    login(usr) {
        console.log("user: ");
        console.log(usr)
        const sql = `SELECT id,password FROM Login WHERE mail = ?`
        const params = [usr.Mail];
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
        const params = [usr.Mail,usr.Password];
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