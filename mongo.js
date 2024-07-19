const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://bmaron:rhdiddl789@fullstack-cluster.uol77bl.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=fullstack-cluster`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Test Naming',
  number: '010-44000',
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})