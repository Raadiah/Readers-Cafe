const ContactUs = ()=>{
    return (
        <div>
            <div className="hero p-4 border rounded-lg shadow-md">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Contact Us</h1>
                        <p className="py-6">
                            Have a question? Want you favourite book in the collection? Contact us for support!
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea className="textarea textarea-bordered" placeholder="Type here"></textarea>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-accent">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs