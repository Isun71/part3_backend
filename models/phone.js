const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneNumberValidator = (value) => {
  const parts = value.split('-');
  if (parts.length !== 2) {
    return false;
  }

  const [part1, part2] = parts;
  if (!/^\d{2,3}$/.test(part1) || !/^\d+$/.test(part2)) {
    return false;
  }

  return true;
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name should be at least 3 characters'],
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: phoneNumberValidator,
      message: props => `${props.value} is not a valid phone number` 
    },
    required: true
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)