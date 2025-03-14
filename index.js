const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()

const path = require('path')
const dbPath = path.join(__dirname, 'goodreads.db')

let db = null
const initializeDBAndSever = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDBAndSever()

app.get('/books/', async (request, response) => {
  const getBooksQuery = `SELECT * FROM book ORDER BY book_id;`

  const booksArray = await db.all(getBooksQuery)
  response.send(booksArray)
})
