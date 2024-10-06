import { FaGoogle, FaGithub } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { ROUTES } from "../routes"
import { useContext } from "react"
import { AuthContext } from "../provider/AuthProvider"

const Register = ()=>{
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (event)=>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const username = event.target.username.value;
        const photoUrl = event.target.photoUrl.value;

        createUser(email, password)
        .then(()=>{
            navigate(ROUTES.LOGIN)
        })
        .catch((error)=>{
            console.error(error);
        });
    }

    return (
        <div className="max-w-screen-sm mx-2 my-10 md:w-3/4 md:mx-auto space-y-2 border p-8 shadow-md rounded-lg">
            <form className="space-y-2" onSubmit={handleRegister}>
                <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input id="username" type="text" className="grow" placeholder="Username" />
                </label>
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
                <label className="input input-bordered flex items-center gap-2">
                <input id="photoUrl" type="text" className="grow" placeholder="Photo URL" />
                </label>
                <div className="flex justify-center">
                    <button type="submit" className="btn btn-wide">Register</button>
                </div>
            </form>
            <div className="text-xs italic text-center p-2">
                Already have an account? <Link className="font-semibold text-cyan-700" to={ROUTES.LOGIN}>Login</Link> here.
            </div>
        </div>   
    )
}

export default Register