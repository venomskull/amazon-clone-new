/* eslint-disable import/no-anonymous-default-export */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const {items, email} = req.body;

    // console.log(items);
    // console.log(email);

    const transformedItems = items.map(item => ({
        description: item.description,
        quantity: 1,
        price_data: {
            currency: 'nzd',
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image]
            },
        },
    }))

    // https://stripe.com/docs/payments/checkout/shipping
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_rates: ['shr_1JS35HG9axCa5VmAGWWIvpg8'],
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'NZ'],
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image))
        }
      });

    res.status(200).json({id: session.id})

}