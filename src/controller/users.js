const { users: initialData } = require('../utils/DB')
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

  getAllUsers: (request, response) => {
    const { page, limit } = request.query
    const totalData = initialData.length
    const sliceStart = getPage(page) * getPerPage(limit) - getPerPage(limit)
    const sliceEnd = (getPage(page) * getPerPage(limit))
    const totalPage = Math.ceil(totalData / getPerPage(limit))
    const prevLink = getPrevLinkQueryString(getPage(page), request.query)
    const nextLink = getNextLinkQuerytString(getPage(page), totalPage, request.query)
    const data = {
      success: true,
      msg: 'List all users data',
      data: [...initialData].slice(sliceStart, sliceEnd),
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

  createUser: (request, response) => {
    const { name, email } = request.body // mengambil data dari request.body
    if (name && email && name !== '' && email !== '') { // name dan email itu ada atau tidak / diisit dan tidaknya
      const isExist = userModel.getUserByEmail(email, initialData).length
      // jika create user berhasil
      if (isExist < 1) { // jika tidak ada user dengan email
        const result = userModel.createUser(name, email, initialData)
        if (result) {
        // response success
          const data = {
            success: true,
            msg: 'created',
            data: request.body
          }
          response.status(201).send(data)
        } else { // jika create user gagal
          const data = {
            success: false,
            msg: 'failed created',
            data: request.body
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

  updateUser: (request, response) => {
    // console.log(request.params.id)
    const { id } = request.params // mendapatkan id dari parameter
    const { name, email } = request.body // mendapatkan body
    const fetchUser = userModel.getUserById(id, initialData)

    if (fetchUser.data.length > 0) {
      if (name && email && name !== '' && email !== '') {
        const result = userModel.updateUser(name, email, fetchUser.index, initialData) // {id : name password}
        const data = {
          success: true,
          msg: 'user has been update',
          data: result
        }
        response.status(201).send(data)
      } else {
        const data = {
          success: false,
          msg: 'all form must be filled'
        }
        response.status(401).send(data)
      }
    } else {
      const data = {
        success: true,
        msg: `User with id ${id} not found`
      }
      response.status(400).send(data)
    }
  },

  deleteUser: (request, response) => {
    const { id } = request.params
    const fetchUser = userModel.getUserById(id, initialData)
    if (fetchUser.data.length > 0) {
      const result = userModel.deleteUser(fetchUser.index, initialData)
      if (result) {
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
    } else {
      const data = {
        success: false,
        msg: 'cannot delete data'
      }
      response.status(400).send(data)
    }
  }
}
