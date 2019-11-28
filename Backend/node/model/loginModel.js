class loginModel {
    constructor(db) {
        this.db = db;
    }

    userLogin(usr) {
        const sql = `SELECT employeeId,name,birthdate,role
            FROM ApplicationUsers
            WHERE employeeId = ? AND password = SHA2(?,384)`
        const params = [usr.employeeId, usr.password];

        return new Promise((resolve, reject) => {
            this.db.query(sql, params, function (err, res) {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }

}
module.exports = loginModel