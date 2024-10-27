const ErrorMessage = ({message})=>{
    return(<>
    <div className="flex grow">
        <span className="p-2 text-xs bg-pink-50 rounded-lg w-full">{message}</span>
    </div>
    </>)
}

export default ErrorMessage