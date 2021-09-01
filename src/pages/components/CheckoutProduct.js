import Image from "next/image";
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../../slices/basketSlice";


function CheckoutProduct({ id, title, price, rating, description, category, image, hasPrime }) {
    const dispatch = useDispatch();

    const addItemToBasket = () => {
        const product = {id, title, price, rating, description, category, image, hasPrime};

        // Push item in to REDUX
        dispatch(addToBasket(product));
    }

    const removeItemFromBasket = () => {
        // Remove item from REDUX
        dispatch(removeFromBasket({id}));
    }

    return (
        <div className='grid grid-cols-5'>
            <Image src={image} alt='' objectFit='contain' width={200} height={200} />

            {/* Middle */}
            <div className='col-span-3 mx-5'>
                <p>{title}</p>
                <div className='flex'>
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon key={i} className='text-yellow-400 h-5' />
                    ))}
                </div>
                <div className='text-xs my-2 line-clamp-3'>{description}</div>
                <Currency
                    quantity={price}
                    currency="NZD"
                />
                {hasPrime && (
                    <div className='flex items-center space-x-2'>
                        <img loading='lazy' alt="" src="data:image/jpeg;base64,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"
                            className='w-12'
                        />
                        <p className='text-xs text-gray-500'>Free Next-day Delivery</p>
                    </div>
                )}
            </div>

            {/* Right Add/Remove buttons */}
            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                <button className='button' onClick={addItemToBasket} >Add to Basket</button>
                <button className='button' onClick={removeItemFromBasket} >Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
