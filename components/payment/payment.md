Each stage of the payment process is presented as child component under the `/checkout` page and assumes that `cart` is not empty. If `cart` is empty, than `/checkout` page will be redirect the user to the homepage.

Chekcout can be initiated from the [Cart](#section-cart) by clicking the _Continue_ button in the [Cart Panel](#cartpanel). This will load [PaymentReview](#paymentreview) stage and payment process becomes available under the `/checkout` page.

Components are interacting with the `payment` object and displayed according to `payment.status`. Payment data stored as various properties of the `payment` object. Detailed information can be found in each component documentation _(See: "State Dependencies")_.

Payment uses [Stripe](https://stripe.com) to handle secure customisable transactions. Requests to Stripe API are tokenized and _idempotent_.

On the case when user leave the payment process or close the browser tab, [Redux Persit](https://github.com/rt2zz/redux-persist) will store the current stage on the machine so process can be continued from where it was stopped.

**Stages**

1. **_Review_**

   - **[PaymentReview](#paymentreview)** is the initial stage. The user has options to go back browsing or continue the process.

2. **_Details_**

   1. **[PaymentForm](#paymentform)** is presented and on submit it will create an [Intent](https://stripe.com/docs/api/payment_intents/create) with [Client Secret](https://stripe.com/docs/payments/accept-a-payment).
   2. **[PaymentConfirm](#paymentconfirm)** using the _secret_ from [PaymentForm](#paymentform), asks the user to enter card details and confirm the payment.

3. **_Finished_**

   - **[PaymentSuccess](#paymentsuccess)** is shown when transaction was successful.
   - **[PaymentCancelled](#paymentcancelled)** is shown when user cancelled the payment process.
   - **[PaymentError](#paymenterror)** is shown when somthing bad happened during the transaction.

[PaymentProgress](#paymentprogress) is always visible on the `/checkout` page representing the payment process stages.

**State Dependencies** and **Wrapped Components** are documented in each description to give brief information about the context of posible interactions of the actual component. _Examples_ prepared with proper state and may render extra controls to test different cases with ease.
