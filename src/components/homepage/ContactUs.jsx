const ContactUs = ()=>{
    return (
        <div>
            <div className="hero border rounded-lg shadow-md mb-4
            max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <h1 className="text-lg md:text-5xl font-bold">Contact Us</h1>
                        <p className="py-6 text-wrap">
                            Have a question? Feel free to contact us.
                        </p>
                    </div>
                    <div className="md:card md:w-full md:shrink-0 md:max-w-sm bg-base-100 md:shadow-2xl">
                        <form className="md:card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="e.g. john.doe@gmail.com" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea className="textarea textarea-bordered" placeholder="Write your message here.."></textarea>
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