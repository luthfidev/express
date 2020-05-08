module.exports = {
  createUser: (name, email, data) => {
    const userData = {
      id: new Date().getTime(),
      name,
      email
    }
    if (data.push(userData)) {
      return true
    } else {
      return false
    }
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

  getUserByEmail: (email, data = []) => {
    return data.filter(user => {
      return user.email === email
    })
  },

  getUserByName: (name, data = []) => {
    return data.filter(user => {
      return user.name === name
    })
  },

  updateUser: (name, email, index, data = []) => {
    const oldData = data[index]
    const newData = {
      name,
      email
    }
    const assignData = { ...oldData, ...newData }
    data[index] = assignData
    return assignData
  },

  deleteUser: (index, data = []) => {
    if (data[index]) {
      delete data[index]
      data = data.filter(object => object)
      return true
    } else {
      return false
    }
  }

}
