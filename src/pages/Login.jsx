import { FaGoogle, FaGithub, FaAt, FaKey } from "react-icons/fa"
import { Link, useLocation, Navigate } from "react-router-dom"
import { ROUTES } from "../routes"
import { useContext, useState } from "react"
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider"
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth"
import Loader from "./Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import { Helmet } from "react-helmet-async";

const Login = ()=>{
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState({});

    const { 
        loginWithEmailPassword, loginWithGoogle, loginWithGitHub, 
        user, reloadUser } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const {state} = useLocation();

    window.scrollTo(0,0);

    const handleErrorMessage = (errorCode)=>{
        if(!errorCode) return
        switch(errorCode) {
            case 'auth/invalid-credential':
            case 'auth/invalid-email':
                toast.error('Invalid email or password')
                break;
            default:
                toast.error('An unexpected error occured while tring to login');
        }
    }

    const validateForm = (email, password) => {
        const newErrors = {};
        if (!email) {
            newErrors.email = "Please enter a valid email";
        }
        if (!password) {
            newErrors.password = "Please enter your password";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = (event)=>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        if(!validateForm(email, password)) return;

        setLoader(true);
        loginWithEmailPassword(email, password)
        .then(({user})=>reloadUser(user.uid))
        .then((success)=>{
            if(success) {
                toast.success('You are successfully logged in');
                setLoader(false)
            }
        })
        .catch((error)=>{
            const errorCode = error.code;
            handleErrorMessage(errorCode)
            setLoader(false);
        });
    }

    const handleGoogleLogin = ()=>{
        setLoader(true);
        loginWithGoogle(googleProvider)
        .then(()=>{
            toast.success('You are successfully logged in with Google');
         })
        .catch((error)=>{
            toast.error('Request could not be processed')
            setLoader(false);
            console.error(error);
        });
    }

    const handleGithubLogin = ()=>{
        setLoader(true);
        loginWithGitHub(githubProvider)
        .then(()=>{
            toast.success('You are successfully logged in with Github');
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
            <title>Login | Reader's Cafe</title>
        </Helmet>
        {
            user ? 
            <Navigate to={state ? state : ROUTES.PROFILE}></Navigate>
            :
            <>
                <div className="max-w-screen-sm mx-2 my-10 md:w-3/4 md:mx-auto space-y-2 
                border p-8 md:px-32 shadow-md rounded-lg
                bg-white z-20">
                    <form onSubmit={handleLogin} className="space-y-2">
                        <div className="text-center pb-3 font-semibold">Please Login</div>
                        <label className="input input-bordered flex items-center gap-2">
                        <FaAt className="text-gray-600"></FaAt>
                        <input id="email" type="text" className="grow" placeholder="Email" />
                        </label>
                        {
                            errors.email && <ErrorMessage message={errors.email}></ErrorMessage>
                        }
                        <label className="input input-bordered flex items-center gap-2">
                        <FaKey className="text-gray-600"></FaKey>
                        <input id="password" type="password" className="grow" placeholder="******" />
                        </label>
                        {
                            errors.password && <ErrorMessage message={errors.password}></ErrorMessage>
                        }
                        <div className="flex justify-center">
                            {
                                loader ? 
                                <Loader></Loader>
                                :
                                <button type="submit" className="btn btn-wide">Login</button>
                            }
                        </div>
                    </form>
                    <div className="divider py-6 hidden">Or Login With</div>
                    <div className="justify-center items-center gap-4 hidden">
                        <FaGoogle onClick={handleGoogleLogin} className="text-3xl text-red-600 cursor-pointer hover:text-red-700" title="Google"></FaGoogle>
                        <FaGithub onClick={handleGithubLogin} className="text-3xl cursor-pointer text-black hover:text-slate-700" title="GitHub"></FaGithub>
                    </div>
                    <div className="text-xs italic text-center p-2">
                        Don't have an account? <Link className="font-semibold text-cyan-700" to={ROUTES.REGISTER}>Register</Link> here.
                    </div>
                </div> 
            </>
        }
        </> 
    )
}

export default Login