import { useSession } from "next-auth/client";
import Image from "next/image"
import { useSelector } from "react-redux"
import { selectItems, selectTotal } from "../slices/basketSlice"
import CheckoutProduct from "./components/CheckoutProduct";
import Header from "./components/Header"
import Currency from 'react-currency-formatter';
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Cant give STRIPE_PUBLIC_KEY from process.env directly. After allocating to another variable stripe_public_key from next.config.js
const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);
    const [session] = useSession();

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;

        // Call the backend to create a checkout session...
        const checkoutSession = await axios.post('/api/create-checkout-session', {
            items: items,
            email: session.user.email,
        });

        // Redirect user/customer to Stripe checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        });

        if (result.error) {
            alert(result.error.message);
        }
    }

    return (
        <div className='bg-gray-100'>

            {/* Header */}
            <Header />

            <main className='lg:flex max-w-screen-2xl mx-auto'>
                {/* Left */}
                <div className='flex-grow m-5 shadow-sm'>
                    <Image
                        src='https://g.foolcdn.com/editorial/images/484546/screen-shot-2018-06-05-at-111429-am.png'
                        alt=''
                        width={1020} height={250}
                        objectFit='contain'
                    />

                    {/* Center */}
                    <div className='flex flex-col bg-white space-y-10 p-5'>
                        <h1 className='border-b pb-4 text-3xl'>
                            {items.length === 0 ? 'Your Amazon Basket is empty' : 'Shopping Basket'}
                        </h1>
                        {items.map((item, i) => (
                            <CheckoutProduct
                                key={i}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                hasPrime={item.hasPrime}
                            />
                        ))}
                    </div>
                </div>

                {/* Right */}
                <div className='flex flex-col bg-white p-10 shadow-md'>
                    {items.length > 0 && (
                        <>
                            <h2 className='whitespace-nowrap'>
                                Subtotal ({items.length} items): {' '}
                                <Currency
                                    quantity={total}
                                    currency="NZD"
                                />
                            </h2>
                            <button
                                role='link'
                                onClick={createCheckoutSession}
                                disabled={!session}
                                className={`button mt-2 
                                    ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}
                            >
                                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
                            </button>
                        </>
                    )}
                </div>
            </main>

        </div>
    )
}

export default Checkout
