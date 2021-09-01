import Header from "./components/Header";
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useRouter } from "next/dist/client/router";

function Success() {
    const router = useRouter();

    return (
        <div className='bg-gray-100 h-screen'>
            <Header />

            <main className='max-w-screen-lg mx-auto'>
                <div className='bg-white p-10 flex flex-col'>
                    <div className='flex items-center space-x-2 mb-5'>
                        <CheckCircleIcon className='text-green-500 h-10'/>
                        <h1 className='text-3xl'>Thank you, your order has been confirmed!</h1>
                    </div>
                    <p>
                    Thank you for shopping with us. we will send a confirmation once your
                    items has been shipped, if you would like to check the status of
                    order(s) please press the link below
                    </p>
                    <button onClick={() => router.push('/orders')} className='button mt-8'>Go to my orders</button>
                </div>
            </main>
        </div>
    )
}

export default Success
