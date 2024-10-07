import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes/index'
import bookImage from '../../assets/books.png'

function Banner() {
  return (
    <div className="
    hero border-b border-amber-50 text-amber-950 
    bg-teal-200 bg-gradient-to-br from-lime-50 
    max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl min-h-screen
    z-10 shadow-lg">
        <div className="hero-content flex-col w-full lg:flex-row-reverse">
            <img
            src={bookImage}
            className="max-h-90 md:max-w-x md:max-h-xs mt-6 lg:mt-0 rounded-lg shadow-2xl" />
            <div>
            <p className="py-6 pr-6">
            Unlock a World of Stories – Find Your Next Favorite Book at <span className='font-semibold text-green-700'>Reader's Cafe</span>
            </p>
            <Link 
            to={ROUTES.BUY}
            className="btn bg-teal-600 text-white">Buy Book</Link>
            </div>
        </div>
    </div>
  )
}

export default Banner
