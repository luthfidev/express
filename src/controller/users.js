// const { users: initialData } = require('../utils/_DB')
const userModel = require('../models/users')
const qs = require('querystring')

const getPage = (_page) => {
  const page = parseInt(_page)
  if (page && page > 0) {
    return page
  } else {
    return 1
  }
}

const getPerPage = (_perPage) => {
  const perPage = parseInt(_perPage)
  if (perPage && perPage > 0) {
    return perPage
  } else {
    return 5
  }
}

const getNextLinkQuerytString = (page, totalPage, currentQuery) => {
  if (page < totalPage) {
    const generatePage = {
      page: page + 1
    }
    return qs.stringify({ ...currentQuery, ...generatePage })
  } else {
    return null
  }
}

const getPrevLinkQueryString = (page, currentQuery) => {
  if (page > 1) {
    const generatedPage = {
      page: page - 1
    }
    return qs.stringify({ ...currentQuery, ...generatedPage })
  } else {
    return null
  }
}

module.exports = {

  getAllUsers: async (request, response) => {
    const { page, limit } = request.query
    const totalData = await userModel.getUsersCount()
    // const totalData = initialData.length
    const sliceStart = getPage(page) * getPerPage(limit) - getPerPage(limit)
    const sliceEnd = (getPage(page) * getPerPage(limit))
    const totalPage = Math.ceil(totalData / getPerPage(limit))
    const prevLink = getPrevLinkQueryString(getPage(page), request.query)
    const nextLink = getNextLinkQuerytString(getPage(page), totalPage, request.query)

    const userData = await userModel.getAllUser(sliceStart, sliceEnd)

    const data = {
      success: true,
      msg: 'List all users data',
      data: userData,
      pageInfo: {
        page: getPage(page),
        totalPage,
        perPage: getPerPage(limit),
        totalData,
        nextLink: nextLink && `http//localhost:5000/users?${nextLink}`,
        prevLink: prevLink && `http//localhost:5000/users?${prevLink}`
      }
    }
    response.status(200).send(data)
  },

  createUser: async (request, response) => {
    const { name, email, password } = request.body // mengambil data dari request.body
    if (name && email && password && name !== '' && email !== '' && password !== '') { // name dan email itu ada atau tidak / diisit dan tidaknya
      const isExist = await userModel.getUserByCondition({ email })
      if (isExist.length < 1) { // jika tidak ada user dengan email
        // const result = userModel.createUser(name, email, initialData)
        const userData = {
          name,
          email,
          password
        }
        const results = await userModel.createUser(userData)
        if (results) {
        // response success
          const data = {
            success: true,
            msg: 'user has been created success',
            data: userData
          }
          response.status(201).send(data)
        } else { // jika create user gagal
          const data = {
            success: false,
            msg: 'failed created',
            data: userData
          }
          response.status(400).send(data)
        }
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

  updateUser: async (request, response) => {
    // console.log(request.params.id)
    const { id } = request.params // mendapatkan id dari parameter
    const { name, email, password } = request.body // mendapatkan body
    // const fetchUser = userModel.getUserById(id, initialData)
    const checkId = await userModel.getUserByCondition({ id: parseInt(id) })
    if (checkId.length > 0) {
      if (name && email && name && password !== '' && email !== '' && password !== '') {
        // const result = userModel.updateUser(name, email, fetchUser.index, initialData) // {id : name password}
        const userData = [
          { name, email, password },
          { id: parseInt(id) }
        ]
        const checkEmail = await userModel.getUserByCondition({ email })
        if (checkEmail) {
          const results = await userModel.updateUser(userData) // untuk menampilkan data response ke UI (User Interface)
          if (results) {
            const data = {
              success: true,
              msg: 'user has been update',
              data: userData[0]
            }
            response.status(201).send(data)
          } else {
            const data = {
              success: false,
              msg: 'failed to update user'
            }
            response.status(401).send(data)
          }
        } else {
          const data = {
            success: false,
            msg: 'all form must be filled'
          }
          response.status(401).send(data)
        }
      }
    } else {
      const data = {
        success: false,
        msg: `User with id ${id} not found`
      }
      response.status(400).send(data)
    }
  },

  deleteUser: async (request, response) => {
    const { id } = request.params
    const _id = { id: parseInt(id) }
    const checkId = await userModel.getUserByCondition(_id)
    if (checkId.length > 0) {
      const results = await userModel.deleteUser(_id)
      if (results) {
        const data = {
          success: true,
          msg: `user with id ${id} is deleted`
        }
        response.status(200).send(data)
      } else {
        const data = {
          success: false,
          msg: 'Failed to delete user'
        }
        response.status(400).send(data)
      }
    } else {
      const data = {
        success: false,
        msg: 'cannot delete data'
      }
      response.status(400).send(data)
    }
  }

}
