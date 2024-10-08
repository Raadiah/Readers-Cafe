import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes/index'
import bookImage from '../../assets/books.png'

function Banner() {
  return (
    <div className="
    hero border-b border-amber-50 text-amber-950 
    bg-teal-200 bg-gradient-to-br from-lime-50 min-h-screen
    z-10 shadow-lg">
        <div className="hero-content flex-col w-full lg:flex-row-reverse">
            <img
            src={bookImage}
            className="max-h-90 md:max-w-x md:max-h-xs mt-6 lg:mt-0 rounded-lg shadow-2xl" />
            <div>
            <div className="py-6 pr-6">
              <h1 className="card-title mb-6 text-3xl lg:text-5xl font-bold text-green-800">Reader's Cafe</h1>
              Unlock a World of Stories – Find Your Next Favorite Book.
            </div>
            <Link 
            to={ROUTES.BUY}
            className="btn bg-teal-600 text-white">Buy Book</Link>
            </div>
        </div>
    </div>
  )
}

export default Banner
