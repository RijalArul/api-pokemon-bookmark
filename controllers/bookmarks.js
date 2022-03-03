const { Bookmark } = require('../models')
class BookmarkController {
  static async catch (req, res) {
    try {
      const { id } = req.params
      const { name } = req.body

      let randomNumber = Math.floor(Math.random() * 100)

      if (randomNumber >= 50) {
        const pokemon = await Bookmark.create({ name, idPokemon: id })
        res.status(201).json({
          message: `YEEE!, you got pokemon ${pokemon.name}`,
          status: true,
          data: pokemon
        })
      } else {
        throw { name: 'Bad_Request' }
      }
    } catch (err) {
      if (err.name === 'Bad_Request') {
        res.status(400).json({
          message: 'Oh No! Failed Catch, Try Again Please!',
          status: false
        })
      } else {
        res.status(500).json({
          message: 'Internal Server Error',
          status: false
        })
      }
    }
  }

  static async release (req, res) {
    try {
      const { id } = req.params
      let randomNumber = Math.floor(Math.random() * 10)

      if (randomNumber <= 1) {
        throw { name: 'Bad_Request' }
      } else {
        for (var i = 2; i < randomNumber; i++) {
          if (randomNumber % i === 0) {
            throw { name: 'Bad_Request' }
          }
        }

        await Bookmark.destroy({
          where: {
            id: id
          }
        })

        res.status(200).json({
          message: `Bye2 Pokemon ${id} and has been released`,
          status: true
        })
      }
    } catch (err) {
      if (err.name === 'Bad_Request') {
        res.status(400).json({
          message: 'Failed Released, Try Again!!',
          status: false
        })
      } else {
        res.status(500).json({
          message: 'Internal Server Error',
          status: false
        })
      }
    }
  }

  static async rename (req, res) {
    try {
      const { id } = req.params
      const findBookmark = await Bookmark.findByPk(id)
      const findNumber = findBookmark.name.match(/\d*$/)
      const findNumLength = findBookmark.name.replace(/[^0-9]/g, '')
      const result = [0, 1]
      for (let i = 2; i <= +findNumber; i++) {
        const a = result[i - 1]
        const b = result[i - 2]

        result.push(a + b)
      }

      if (findNumLength.length === 0) {
        const update = await Bookmark.update(
          { name: `${findBookmark.name} 0` },
          {
            where: {
              id: id
            },
            returning: true
          }
        )

        res.status(200).json({
          data: update[1][0],
          status: true
        })
      } else {
        const increment = +findNumber + result[result.length - 1]
        const editResult = `${findBookmark.name.substr(0, findNumber.index) +
          increment}`
        const update = await Bookmark.update(
          { name: editResult },
          {
            where: {
              id: id
            },
            returning: true
          }
        )
        res.status(200).json({
          data: update[1][0],
          status: true,
          message: `Yeayy! your poke had been new nickname ${update[1][0].name}`
        })
      }
    } catch (err) {
      res.status(500).json({
        status: false,
        message: 'Internal Server Error'
      })
    }
  }

  static async all (req, res) {
    try {
      const bookmarks = await Bookmark.findAll()

      res.status(200).json({
        data: bookmarks,
        status: true
      })
    } catch (err) {
      res.status(500).json({
        status: false,
        message: 'Internal Server Error'
      })
    }
  }
}

module.exports = BookmarkController
