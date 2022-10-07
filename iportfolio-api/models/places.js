const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   pic: {
      type: String,
      default: '/images/tv-test-pattern-146649_960_720-1502262587.png'
   },
   picCredit: String,
   cuisines: {
      type: String,
      required: true
   },
   city: {
      type: String,
      default: 'Anytown'
   },
   state: {
      type: String,
      default: 'California'
   },
   founded: {
      type: Number,
      min: [1673, 'Really? That old?'],
      max: [(new Date().getFullYear()), 'The year is in the future']
   },
   comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
   }]
})

placeSchema.methods.showEstablished = function () {
   return `${this.name} has been serving ${this.city}, ${this.state} since ${this.founded}.`
}

module.exports = mongoose.model('Place', placeSchema)


