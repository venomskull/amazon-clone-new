import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
    return (
        <div className='relative'>
            <div className='absolute w-full h-32 bg-gradient-to-t from-gray-700 to-transparent z-20
                bottom-0 '/>
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={5000}
            >
                <div>
                    {/* <img loading='lazy' src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/153439260/original/fb8e75ceff1d72359075f4cfbac112564302a995/create-attractive-animated-gif-or-flash-banner.jpg" alt="" /> */}
                    <img loading='lazy' src="https://www.loombiz.com/wp-content/uploads/2021/05/Amazon-taining-Banner.png" alt="" />

                </div>
                <div>
                    <img loading='lazy' src="https://thedomesticatedman.files.wordpress.com/2013/10/amazon-banner.png" alt="" />
                </div>
                <div>
                    <img loading='lazy' src="https://circusppc.com/wp-content/uploads/2020/01/amazon-banner-1.png" alt="" />
                </div>
            </Carousel>
        </div>
    )
}

export default Banner
