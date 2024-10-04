const Toast = ({message})=>{
    return (
        <>
            <div className="modal-box text-center">
                {message}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </>
    )
}

export default Toast