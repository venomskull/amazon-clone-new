import moment from "moment";
import Currency from 'react-currency-formatter';

function Order({ id, amount, amountShipping, images, timestamp, items }) {
    return (
        <div className='relative border rounded-md'>
            <div className='flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600'>
                <div>
                    <p className='text-xs font-bold'>ORDER PLACED</p>
                    <p>{moment.unix(timestamp).format('DD MMM YYYY')}</p>
                </div>
                <div>
                    <p className='text-xs font-bold'>TOTAL</p>
                    <p>
                        <Currency quantity={amount} currency='NZD' /> - Next Day Delievery {' '}
                        <Currency quantity={amountShipping} currency='NZD' />
                    </p>
                </div>
                <p className='sm:text-lg text-blue-500 self-end text-right flex-1 whitespace-nowrap'>
                    {items.length} Items
                </p>
                <p className='absolute top-2 right-2 truncate whitespace-nowrap text-xs w-40 lg:w-72'>
                    OREDR# {id}
                </p>
            </div>

            <div className='p-5 sm:p-10'>
                <div className='flex space-x-6 overflow-x-auto'>
                    {images.map((image, key) => (
                        <img key={key} src={image} alt="" className='h-20 object-contain sm:h-32' />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Order
