import { FaGoogle, FaGithub } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { ROUTES } from "../routes"
import { useContext, useState } from "react"
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider"
import Loader from "./Loader";
import baseUrl from "../routes/sites";
import ErrorMessage from "../components/common/ErrorMessage";

const Register = ()=>{
    const [loader, setLoader] = useState(false);
    const { createUser } = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    window.scrollTo(0,0);

    const validateForm = (name, email, password) => {
        const newErrors = {};
        if (!name) {
            newErrors.name = "Name is Required";
        }
        if (!email) {
            newErrors.email = "Email is Required";
        }
        if (!password) {
            newErrors.password = "A 6 character long password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be 6 characters long";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = (event)=>{
        event.preventDefault();
        const name = event.target.username.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const address = event.target.address.value;
        const password = event.target.password.value;
        const isAdmin = false;
        const isBanned = false;
        const photoURL = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";
        const userInfo = {email, name, phone, address, isAdmin, isBanned, photoURL}

        if(!validateForm(name, email, password)) return;
        setLoader(true);
        createUser(email, password, userInfo)
        .then((success)=>{
            if(success) {
                toast.success("Successfully Registered")
                setLoader(false);
                navigate(ROUTES.PROFILE)
            } else {
                console.error("DB: Data Insertion Error");
                setLoader(false);
            }
        })
        .catch((error)=>{
            toast.error('Request could not be processed')
            setLoader(false);
            console.error(error);
        });
    }

    return (
        <div className="
        max-w-screen-sm mx-2 my-10 md:w-3/4 md:mx-auto space-y-2 border p-8 md:px-32 shadow-md rounded-lg
        bg-white z-20
        ">  {
                loader ? 
                <div className="w-full h-full flex items-center justify-center">
                    <Loader></Loader>
                </div>
                :
                <>
                <form className="space-y-2" onSubmit={handleRegister}>
                    <div className="text-center pb-3 font-semibold">Welcome to Reader's Cafe!</div>
                    <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input id="username" type="text" className="grow" placeholder="Full Name" />
                    </label>
                    {
                        errors.name && <ErrorMessage message={errors.name}></ErrorMessage>
                    }
                    <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input id="email" type="text" className="grow" placeholder="Email" />
                    </label>
                    {
                        errors.email && <ErrorMessage message={errors.email}></ErrorMessage>
                    }
                    <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 22 22"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        fillRule="evenodd"
                        d="M16.5562 12.9062L16.1007 13.359C16.1007 13.359 15.0181 14.4355 12.0631 11.4972C9.10812 8.55901 10.1907 7.48257 10.1907 7.48257L10.4775 7.19738C11.1841 6.49484 11.2507 5.36691 10.6342 4.54348L9.37326 2.85908C8.61028 1.83992 7.13596 1.70529 6.26145 2.57483L4.69185 4.13552C4.25823 4.56668 3.96765 5.12559 4.00289 5.74561C4.09304 7.33182 4.81071 10.7447 8.81536 14.7266C13.0621 18.9492 17.0468 19.117 18.6763 18.9651C19.1917 18.9171 19.6399 18.6546 20.0011 18.2954L21.4217 16.883C22.3806 15.9295 22.1102 14.2949 20.8833 13.628L18.9728 12.5894C18.1672 12.1515 17.1858 12.2801 16.5562 12.9062Z"
                        clipRule="evenodd" />
                    </svg>
                    <input id="phone" type="text" className="grow" placeholder="Phone Number" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                    <svg 
                        fill="currentColor" 
                        viewBox="0 0 80 80" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 opacity-70">
                            <path 
                            fillRule="evenodd"
                            d="M49,18.92A23.74,23.74,0,0,0,25.27,42.77c0,16.48,17,31.59,22.23,35.59a2.45,2.45,0,0,0,3.12,0c5.24-4.12,22.1-19.11,22.1-35.59A23.74,23.74,0,0,0,49,18.92Zm0,33.71a10,10,0,1,1,10-10A10,10,0,0,1,49,52.63Z"                            clipRule="evenodd" />
                            </svg>
                    <input id="address" type="text" className="grow" placeholder="Address" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd" />
                    </svg>
                    <input id="password" type="password" className="grow" placeholder="******"/>
                    </label>
                    {
                        errors.password && <ErrorMessage message={errors.password}></ErrorMessage>
                    }
                    <div className="flex justify-center">
                        <button type="submit" className="btn btn-wide">Register</button>
                    </div>
                </form>
                <div className="text-xs italic text-center p-2">
                    Already have an account? <Link className="font-semibold text-cyan-700" to={ROUTES.LOGIN}>Login</Link> here.
                </div>
                </>
            }
        </div>   
    )
}

export default Register