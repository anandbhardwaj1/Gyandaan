import React, { useState } from 'react'


function loadScript(src) {
   
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'

function App() {
	const [name, setName] = useState("")
	const [amt, setAmt] = useState("")

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://localhost:8800/razorpay/'+amt, { method: 'POST' }).then((t) =>
			t.json()
		)

		console.log(data)

		const options = {
			key: __DEV__ ? 'rzp_test_kLDYEyaIMsj7Hn' : 'PRODUCTION_KEY',
			currency: data.currency,
			amount: amt,
			order_id: data.id,
			name: 'Donation',
			description: 'Thank you for nothing. Please give us some money',
			image: '',
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
			},
			prefill: {
				name,
				email: 'sdfdsjfh2@ndsfdf.com',
				phone_number: '9899999999'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

	return (
        
		<>
		<br/>
		<br/>
		<br/>
		<div className="container">
<div className="jumbotron">
  <h1 className="display-4">Donation</h1>
  <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
  <hr className="my-4" />
  <div className="form-group mx-sm-3 mb-2">
    <label htmlfor="inputPassword2" className="sr-only">Password</label>

    <input type="text" className="form-control" id="inputPassword2" placeholder="Enter Donation Amount in ₹" onChange={(e) => setAmt(e.target.value)}/>
  </div>
  <br/>
  <p className="lead">
    <a className="btn btn-primary btn-lg" href="#" role="button" onClick={displayRazorpay}>Donate</a>
  </p>
</div>
</div>
				</>
	)
}

export default App
