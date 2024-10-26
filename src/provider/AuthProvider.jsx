import { createContext, useEffect, useState } from "react"
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
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
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginWithEmailPassword = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    const loginWithGoogle = (provider)=>{
        return signInWithPopup(auth, provider);
    }

    const loginWithGitHub = (provider)=>{
        return signInWithPopup(auth, provider);
    }

    const logout = ()=>{
        return signOut(auth)
    }

    //used when user is created/edit
    const reloadUser = async (uid)=>{
        if(user?.uid!=uid) return
        try {
            const res = await fetch(
              `${baseUrl}/user/${uid}`
            );
            if (!res.ok) {
              throw new Error("Failed to fetch user data.");
            }
            const data = await res.json();
            setUser(data);
          } catch (error) {
            console.error("Error fetching user data:", error.message);
          }
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
        reloadUser,
        createUser,
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