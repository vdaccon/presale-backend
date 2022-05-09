const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('../config');
const router = express.Router();
const Plan = require('../models/planModel.js');


const sendEmail = (data, userDetails, currency) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'dgtlz.finance@gmail.com',
      pass: 'adkztkP!22'
    },
  });
  
  const mailOptions = {
    from:      'dgtlz.finance@gmail.com',
    to:        `${userDetails.useremail}, 'webdev@dgtlz.finance'`,
    subject:  'Plan Details form DGTLZ Finance',
    html:     `<h2 style="color: #5e9ca0;">Welcome to DGTLZ Finance</h2>
              <p>Greeting of the Day!</p>
              <p>Below is plan details you have selected:</p>
              <p>
              <div className="col-md-12">
              <div className="pricingBlock text-center shadow p-4 border-top border-success border-4 rounded-3">
                <h4 className="fw-bold">
                  <button className="btn btn-success btn-round py-3 col-md-8">
                    <ul>
                      <li>Type: ${data.plantype}</li><br />
                      <li className="pt-3 fs-5">Duration: ${data.planduration}</li><br />
                      <li className="pt-3 fs-5">Currency: ${currency} </li><br />
                      <li className="pt-3 fs-5">Amount: ${data.amount}</li>
                      <li><p className="pt-5 fs-5"><span className="fw-bold">${data.interest}</span> Minimum Return</p></li>
                      <li><p className="fs-5"><span className="fw-bold">$20</span> Management Fees</p></li>
                      <li><p className="fs-5">Interest paid ${data.intreset == '1 Year' ? '2' : data.intreset} Times</p></li>
                      <li><p className="fs-5">Secure Platform</p></li>
                      <li><p className="fs-5">24/7 Dedicated Customer Support</p></li>
                      <li><p className="fs-5">Withdrawable anytime</p></li>
                    </ul>
                  </button>
                </h4>
              </div>
              </div>
              </p>
              <p>Thanks and Regards,<br />DGTLZ Finance Team</p>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

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
        sendEmail(update, req.body.userDetails, req.body.currency);
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
