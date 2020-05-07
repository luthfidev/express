const initialData = [
  {
    id: 1,
    name: 'admin',
    email: 'admin@admin.com'
  },
  {
    id: 2,
    name: 'administrator',
    email: 'administrator@server.com'
  }
]

module.exports = {
  getAllUsers: (request, response) => {
    const data = {
      success: true,
      msg: 'List all users data',
      data: {
        pageInfo: {
          page: 1,
          totalPage: 10,
          perPage: 5,
          totalData: 50,
          nextLink: 'http://localhost:5000/users/2',
          prevLink: 'null'
        }
      }
    }
    response.status(200).send(data)
  },
  createUser: (request, response) => {
    const data = {
      success: true,
      msg: 'user has been created',
      data: request.body
    }
    response.status(201).send(data)
  },
  updateUser: (request, response) => {
    // console.log(request.params.id)
    const result = initialData.filter(function (object) {
      return object.id === parseInt(request.params.id)
    })
    if (result.length > 0) {
      const data = {
        success: true,
        msg: 'user has been update',
        data: {
          oldData: result[0],
          newData: request.body
        }
      }
      response.status(200).send(data)
    } else {
      const data = {
        success: false,
        msg: `user with id ${request.params.id} not found`
      }
      response.status(401).send(data)
    }
  },
  deleteUser: (request, response) => {
    const result = initialData.filter(object => object.id === parseInt(request.params.id))
    if (result.length > 0) {
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
