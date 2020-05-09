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
  /*   const userData = {
      id: new Date().getTime(),
      name,
      email
    }
    if (data.push(userData)) {
      return true
    } else {
      return false
    } */
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

  // getUserByEmail: (data) => {
  //   /*  return data.filter(user => {
  //     return user.email === email
  //   }) */
  //   const sql = 'SELECT * FROM users WHERE ?'
  //   return new Promise((resolve, reject) => {
  //     db.query(sql, data, (error, results) => {
  //       if (error) {
  //         reject(Error(error))
  //       }
  //       resolve(results)
  //     })
  //   })
  // },

  getUserByName: (name, data = []) => {
    return data.filter(user => {
      return user.name === name
    })
  },

  getUserByCondition: (data) => {
    /*  return data.filter(user => {
      return user.email === email
    }) */
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
    /* onst oldData = data[index]
    const newData = {
      name,
      email
    }
    const assignData = { ...oldData, ...newData }
    data[index] = assignData
    return assignData */
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
  /*   if (data[index]) {
      delete data[index]
      data = data.filter(object => object)
      return true
    } else {
      return false
    } */
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
