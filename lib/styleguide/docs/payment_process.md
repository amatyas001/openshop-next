Each stage of the payment process is presented as child component under the `/checkout` page. Chekcout can be requested from the [Cart Panel](#cartpanel) and initially loads [Payment Review](#paymentreview) to start the process.

**Stages**

1. **_Review_**

   - **[Review cart items](#paymentreview)** where the user has options to go back browsing prodcts or continue the checkout.

2. **_Details_**

   1. **[Form of user billing details](#paymentform)** is presented and on submit it will create an [Intent](https://stripe.com/docs/api/payment_intents/create) with [Client Secret](https://stripe.com/docs/payments/accept-a-payment).
   2. **[Confirm the cart](#paymentconfirm)** using the _secret_ from the [billing details form](#paymentform), asks the user to enter card details before submit.

3. **_Finished_**

   - **[Success information](#paymentsuccess)** displayed when transaction was successful.
   - **[Cancelled details](#paymentcancelled)** are shown when user cancelled the payment process on the [Confirm](#paymentconfirm) stage.
   - **[Error message](#paymenterror)** displayed on unexpected behaviour of the payment process.
