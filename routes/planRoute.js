const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('../config');
const router = express.Router();
const Plan = require('../models/planModel.js');

// Get Plan List
router.get('/planlist', (req, res) => {
  return Plan.find((err, plan) => {
      if (err) return res.json({ error: 'Fail', reason: err});
      res.json({ details: plan, success: 'success' })
  })
});

// Approve by Admin once payment has been done
router.post('/approvePlan', (req, res) => {
  const filter = { _id: req.body.userid };
  const update = {
    isapprove: true
  };
  return Plan.findOneAndUpdate(filter, update, {new: true, useFindAndModify: false},
    function(err, result) {
      if(err) {
        return res.json({ error: 'Fail to Approve'});
      }
      return res.json({ success: 'success' });
    });
});

// FInd the Plan If user has plan then update else add one
router.post('/confirmPlan', (req, res) => {
  console.log('plan ------', req.body);
  const filter = { _id: req.body.userid };
  const newDate = (new Date().getMonth() + parseInt(req.body.duration.month.split("")[0]) + 1);

  console.log('new Date().getMonth()', new Date().getMonth());
  console.log('newDate', newDate);
  const update = {
    plantype: req.body.duration.type,
    username: req.body.userDetails.username,
    userid: req.body.userid,
    plantype: req.body.duration.type,
    planduration: req.body.duration.month,
    amount: req.body.amount.amount,
    intreset: req.body.interest,
    planDate: newDate,
    isapprove: false
  };
  return Plan.findOneAndUpdate(filter, update, {new: true, useFindAndModify: true, upsert: true, rawResult: true},
    function(err, result) {
      if(err) {
        return res.json({ error: 'Fail to Approve'});
      } else {
        return res.json({ success: 'success', res: result });
      }
    });
});


router.post('/planDetailsById', async (req, res) => {
  let userid = req.body.id;

  return Plan.findOne({ userid: userid}, function(err, result) {
    if (err) throw err;
    if (result) {
      res.json({details: result, success: 'success'});
    } else {
      res.json({success: 'Fail-no data found'});
    } 
  })
  .catch(err => console.log(err))
});

module.exports = router;
