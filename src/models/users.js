const db = require('../utils/db')

module.exports = {

  getAllUser: (start, end) => { // harus menggunakan promise agar data di tidak terlambat datang
    const sql = `SELECT * FROM users LIMIT ${end} OFFSET ${start}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, results, fields) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results)
      })
    })
  },
  getUsersCount: () => {
    const sql = 'SELECT COUNT(*) as total FROM users'
    return new Promise((resolve, reject) => {
      db.query(sql, (error, results) => {
        if (error) {
          reject(Error(error).total)
        }
        resolve(results[0].total)
      })
    })
  },
  createUser: (data) => {
    const sql = 'INSERT INTO users SET ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        console.log(results)
        resolve(true)
      })
    })
  },
  getUserById: (id, data = []) => {
    let idx = null
    const userData = data.filter((user, index) => {
      if (user.id === parseInt(id)) {
        idx = index
        return user.id === parseInt(id)
      }
    })
    return { data: userData, index: idx }
  },

  getUserByName: (name, data = []) => {
    return data.filter(user => {
      return user.name === name
    })
  },

  getUserByCondition: (data) => {
    const sql = 'SELECT * FROM users WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results)
      })
    })
  },

  updateUser: (data) => {
    const sql = 'UPDATE users SET ? WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results.affetedRows)
      })
    })
  },

  deleteUser: (data) => {
    const sql = 'DELETE FROM users WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results.affetedRows)
      })
    })
  }

}
