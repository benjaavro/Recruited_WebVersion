class registerModel {
    constructor(db) {
        this.db = db;
    }

    athleteRegister(usr) {
        console.log("Usuario al insertar: ")
        console.log(usr);
        const sql = `INSERT INTO athlete (name,age,gender,phoneNumber,mail,address,institution,description,sport,password,Institution_idInstitution)VALUES (?, ?, ?, ?, ?,?,?,
        " ",?,?,(SELECT idInstitution FROM institution WHERE name = ? ))`
        const params = [usr.Name, usr.Age,usr.Sex,usr.Phone,usr.Email,usr.Location,usr.Institution,usr.Sport,usr.Password,usr.Institution];
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

    coachRegister(usr) {
        console.log(usr);
        const sql = `INSERT INTO coach (name,gender,phoneNumber,mail,address,institution,description,status,password,Institution_idInstitution)VALUES (?,?,?,?,?,?,
 "",1,?, (SELECT idInstitution FROM institution WHERE name = ? ));`
        const params = [usr.Name, usr.Sex,usr.Phone,usr.Email,usr.Location,usr.Institution,usr.Password,usr.Institution];
        console.log("params:" +params);
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

    coachList(usr) {
        console.log(usr);
        const sql = `INSERT INTO InterestList(idList,Coach_idCoach) VALUES((SELECT idCoach FROM Coach WHERE mail = ?),(SELECT idCoach FROM Coach WHERE mail = ?));`
        const params = [usr.Email,usr.Email];
        console.log("params:" +params);
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
module.exports = registerModel