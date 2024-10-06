import { createContext, useEffect, useState } from "react"
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithPopup,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import app from "../Firebase/firebase.init";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children})=>{
    const [user, setUser] = useState([]);
    const createUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginWithEmailPassword = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        })

        return ()=>{
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        createUser,
        loginWithEmailPassword
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider