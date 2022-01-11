const router=require("express").Router();
const path = require('path')
const shortid = require('shortid')
const Razorpay = require('razorpay')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const Payment=require("../models/payment");

const razorpay = new Razorpay({
	key_id: 'rzp_test_kLDYEyaIMsj7Hn',
	key_secret: 'XnewQePPUC5M9eiJJ3UWCa7X'
})


router.post('/verification', async (req, res) => {
	// do a validation
    console.log("here");
	const secret = '12345678'

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		try{
			const newPayment= await new Payment({
				amount: req.body.payload.payment.entity.amount,
				id: req.body.payload.payment.entity.id
			
			})  
			const payment= await newPayment.save();
		}
		catch(err){
			console.log(err);
		}


	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})


router.post('/razorpay/:id', async (req, res) => {
	const payment_capture = 1
	const amount = parseInt(req.params.id);
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})


module.exports=router;