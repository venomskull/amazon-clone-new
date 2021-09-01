module.exports = {
  // reactStrictMode: true,
  images: {
    domains: [
      'media.idownloadblog.com', 'fakestoreapi.com', 'fiverr-res.cloudinary.com', 'encrypted-tbn0.gstatic.com', 
      'g.foolcdn.com', 'www.nicepng.com'
    ]
  },
  // Stripe public key should be added here from process.env
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY
  },
}
