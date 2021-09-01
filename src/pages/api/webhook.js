import { buffer } from "micro";
import * as admin from 'firebase-admin';


// Secure a connection to FIREBASE from the backend
const serviceAccount = require('../../../permissions.json');
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();

// Establixh a connection to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fullFillOrder = async (session) => {
    return app
        .firestore()
        .collection('users')
        .doc(session.metadata.email)
        .collection('orders')
        .doc(session.id)
        .set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        })
        .then(() => console.log(`SUCCESS: Order: ${session.id} has been added to DB`))
        .catch(err => console.log(`ERROR: ${err.message} while insertion to DB`))
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    if (req.method === 'POST') {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers['stripe-signature'];

        // Verify that the EVENT posted came from stripe
        // https://stripe.com/docs/connect/webhooks
        let event;
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
            console.log(`ERROR from verifying: ${err.message}`)
            return res.status(400).send(`WEBHOOK event Error: ${err.message}`);
        }

        // Handle the checkout.session.completed event
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            // Fullfill the order...
            return fullFillOrder(session)
                .then(() => res.status(200))
                .catch(err => res.status(400).send(`WEBHOOK fullfillOrder Error: ${error.message}`));
        }
    }
}

export const config = {
    api: {
        bodyParser: false, // Useless for webhooks
        externalResolver: true
    }
}


