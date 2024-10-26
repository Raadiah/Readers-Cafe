import { FaGoogle, FaGithub } from "react-icons/fa"
import { Link, useLocation, Navigate } from "react-router-dom"
import { ROUTES } from "../routes"
import { useContext, useState } from "react"
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider"
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth"
import Loader from "./Loader";

const Login = ()=>{
    const [loader, setLoader] = useState(false);
    const { loginWithEmailPassword, loginWithGoogle, loginWithGitHub, user } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const {state} = useLocation();

    window.scrollTo(0,0);

    const handleLogin = (event)=>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        setLoader(true);
        loginWithEmailPassword(email, password)
        .then(()=>{
            toast.success('You are successfully logged in');
        })
        .catch((error)=>{
            toast.error('Request could not be processed')
            setLoader(false);
            console.error(error);
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
        {
            user ? 
            <Navigate to={state ? state : ROUTES.PROFILE}></Navigate>
            :
            <>
                <div className="max-w-screen-sm mx-2 my-10 md:w-3/4 md:mx-auto space-y-2 
                border p-8 md:px-32 shadow-md rounded-lg
                bg-white z-20">
                    {
                        loader ? 
                        <div className="w-full h-full flex items-center justify-center">
                            <Loader></Loader>
                        </div>
                        :
                        <>
                            <form onSubmit={handleLogin} className="space-y-2">
                                <div className="text-center pb-3 font-semibold">Please Login</div>
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
                                <input id="password" type="password" className="grow" placeholder="******" />
                                </label>
                                <div className="flex justify-center">
                                    <button type="submit" className="btn btn-wide">Login</button>
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
                        </>
                    }
                </div> 
            </>
        }
        </> 
    )
}

export default Login