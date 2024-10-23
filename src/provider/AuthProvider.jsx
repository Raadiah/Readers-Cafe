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
import baseUrl from "../routes/sites";

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
        const unsubscribe = onAuthStateChanged(auth, async (currentUser)=>{
            if(currentUser) {
                try {
                    const res = await fetch(
                      `${baseUrl}/user/${currentUser.uid}`
                    );
                    if (!res.ok) {
                      throw new Error("Failed to fetch user data.");
                    }
                    const data = await res.json();
                    setUser(data);
                  } catch (error) {
                    console.error("Error fetching user data:", error.message);
                  }
            } else {
                setUser(currentUser);
            }
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