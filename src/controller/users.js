let { users: initialData } = require('../utils/DB')

module.exports = {
  getAllUsers: (request, response) => {
    const data = {
      success: true,
      msg: 'List all users data',
      data: initialData,
      pageInfo: {
        page: 1,
        totalPage: 10,
        perPage: 5,
        totalData: 50,
        nextLink: 'http://localhost:5000/users/2',
        prevLink: 'null'
      }

    }
    response.status(200).send(data)
  },
  createUser: (request, response) => {
    const { name, email } = request.body // mengambil data dari request.body
    if (name && email && name !== '' && email !== '') { // name dan email itu ada atau tidak / diisit dan tidaknya
      const isExist = initialData.filter(user => user.email === email)
      if (isExist < 1) {
        // data dari object akan di push aray
        const userData = {
          id: new Date().getTime(),
          name,
          email
        }
        initialData.push(userData)
        // mengembalikan response succes
        const data = {
          success: true,
          msg: 'user has been created',
          data: request.body
        }
        response.status(201).send(data)
      } else { // jika email sudahdi gunakan
        // akan mengembalikan response false
        const data = {
          success: false,
          msg: 'Email alerdy'
        }
        response.status(400).send(data)
      }
    } else {
      const data = {
        success: false,
        msg: 'All form must be filled'
      }
      response.status(400).send(data)
    }
  },
  updateUser: (request, response) => {
    // console.log(request.params.id)
    const { id } = request.params // mendapatkan id dari parameter
    const { name, email } = request.body // mendapatkan body
    let idx = null

    const getUser = initialData.filter(function (object, index) {
      if (object.id === parseInt(id)) {
        idx = index
        return object.id === parseInt(id)
      }
    })

    if (getUser.length > 0) {
      if (name && email && name !== '' && email !== '') {
        const oldData = initialData[idx] // {id : name password}
        initialData[idx].name = name
        const newData = {
          name,
          email
        }
        initialData[idx] = { ...oldData, ...newData }
        const data = {
          success: true,
          msg: 'user has been update',
          data: {
            oldData,
            newData
          }
        }
        response.status(201).send(data)
      }
    } else {
      const data = {
        success: false,
        msg: 'all form must be filled'
      }
      response.status(401).send(data)
    }
  },
  deleteUser: (request, response) => {
    const { id } = request.params
    let idx = null
    const result = initialData.filter((o, index) => {
      if (o.id === parseInt(id)) {
        idx = index
        return o.id === parseInt(id)
      }
    })
    if (result.length > 0) {
      delete initialData[idx]
      initialData = initialData.filter(obj => obj)
      const data = {
        success: true,
        msg: `user with id ${request.params.id} is deleted`
      }
      response.status(200).send(data)
    } else {
      const data = {
        success: false,
        msg: 'cannot delete data'
      }
      response.status(400).send(data)
    }
  }
}
