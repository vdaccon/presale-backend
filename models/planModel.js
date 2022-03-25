const mongoose = require('mongoose');

const PlanSchema = mongoose.Schema({
  userid: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: false
  },
  plantype: {
    type: String,
    required: false
  },
  planduration: {
    type: String,
    required: false
  },
  planDate: {
    type: String,
    required: false
  },
  amount: {
    type: String,
    required: false
  },
  intreset: {
    type: String,
    required: false
  },
  isapprove: {
    type: Boolean,
    default: false,
    required: false
  },
});

var collectionName = 'plan'

const Plan = mongoose.model('Plan', PlanSchema, collectionName)

module.exports = Plan;