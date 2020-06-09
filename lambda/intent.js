const axios = require('axios');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY),
  headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
    };
  }

  const data = JSON.parse(event.body);

  if (!data.items) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: 'List of items to purchase is missing.',
      }),
    };
  }

  try {
    const store = await axios.get(
      'https://openshop.netlify.app/storedata.json'
      //'http://localhost:3000/storedata.json'
    );
    const amount = data.items.reduce((a, c) => {
      const purchased = store.data.items.find((item) => item.id === c.id);
      return a + purchased.price * 100;
    }, 0);

    const intent = await stripe.paymentIntents.create({
      currency: 'usd',
      amount: amount,
      description: 'Order from store',
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        id: intent.id,
        secret: intent.client_secret,
      }),
    };
  } catch (err) {
    console.log(err);

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: err,
      }),
    };
  }
};
