import { createContext, useEffect, useState } from "react"
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile,
    signInWithPopup,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import app from "../Firebase/firebase.init";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children})=>{
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = (profile)=>{
        return updateProfile(auth.currentUser, profile)
    }

    const loginWithEmailPassword = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const loginWithGoogle = (provider)=>{
        setLoading(true)
        return signInWithPopup(auth, provider);
    }

    const loginWithGitHub = (provider)=>{
        setLoading(true)
        return signInWithPopup(auth, provider);
    }

    const logout = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false)
        })

        return ()=>{
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        updateUserProfile,
        loginWithEmailPassword,
        loginWithGoogle,
        loginWithGitHub,
        logout
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider