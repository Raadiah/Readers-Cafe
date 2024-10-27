import { FaGoogle, FaGithub, FaUser, FaAt, FaPhoneAlt, FaKey } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { ROUTES } from "../routes"
import { useContext, useState } from "react"
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider"
import Loader from "./Loader";
import baseUrl from "../routes/sites";
import ErrorMessage from "../components/common/ErrorMessage";
import { Helmet } from "react-helmet-async";
import { FaLocationDot } from "react-icons/fa6";

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
                navigate(ROUTES.LOGIN)
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
        <>
            <Helmet>
                <title>Register | Reader's Cafe</title>
            </Helmet>
            <div className="
            max-w-screen-sm mx-2 my-10 md:w-3/4 md:mx-auto space-y-2 border p-8 md:px-32 shadow-md rounded-lg
            bg-white z-20
            ">  
                <form className="space-y-2" onSubmit={handleRegister}>
                    <div className="text-center pb-3 font-semibold">Welcome to Reader's Cafe!</div>
                    <label className="input input-bordered flex items-center gap-2">
                    <FaUser className="text-gray-600"></FaUser>
                    <input id="username" type="text" className="grow" placeholder="Full Name" />
                    </label>
                    {
                        errors.name && <ErrorMessage message={errors.name}></ErrorMessage>
                    }
                    <label className="input input-bordered flex items-center gap-2">
                    <FaAt className="text-gray-600"></FaAt>
                    <input id="email" type="text" className="grow" placeholder="Email" />
                    </label>
                    {
                        errors.email && <ErrorMessage message={errors.email}></ErrorMessage>
                    }
                    <label className="input input-bordered flex items-center gap-2">
                    <FaPhoneAlt className="text-gray-600"></FaPhoneAlt>
                    <input id="phone" type="text" className="grow" placeholder="Phone Number" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                    <FaLocationDot className="text-gray-600"></FaLocationDot>
                    <input id="address" type="text" className="grow" placeholder="Address" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                    <FaKey className="text-gray-600"></FaKey>
                    <input id="password" type="password" className="grow" placeholder="******"/>
                    </label>
                    {
                        errors.password && <ErrorMessage message={errors.password}></ErrorMessage>
                    }
                    <div className="flex justify-center">
                    {
                        loader ?
                        <Loader></Loader>
                        :
                        <button type="submit" className="btn btn-wide">Register</button>
                    }
                    </div>
                    <div className="text-xs italic text-center p-2">
                        Already have an account? <Link className="font-semibold text-cyan-700" to={ROUTES.LOGIN}>Login</Link> here.
                    </div>
                </form>
            </div>
        </>   
    )
}

export default Register