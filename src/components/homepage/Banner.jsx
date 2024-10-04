import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes/index'
import bookImage from '../../assets/books.png'

function Banner() {
  return (
    <div className="hero bg-base-200 min-h-screen max-w-screen">
        <div className="hero-content flex-col w-full lg:flex-row-reverse">
            <img
            src={bookImage}
            className="max-w-xs max-h-xs mt-6 lg:mt-0 rounded-lg shadow-2xl" />
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
