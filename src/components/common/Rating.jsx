import { FaStar } from "react-icons/fa"

const Rating = ({ratingValue}) => {
    return (
        <div className="rating">
            {[...Array(5)].map((star, index)=>{
                return (
                    <FaStar key={index+1} color={index + 1 < ratingValue ? '#ffc107':'#e3e7e9'}></FaStar>
                )
            })}
            <span className="ml-2 text-sm italic">{ratingValue} / 5</span>
        </div>
    )
} 

export default Rating