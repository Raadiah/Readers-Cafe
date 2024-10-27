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
import toast from "react-hot-toast";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children})=>{
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const addUserToDatabase = async (uid, userInfo)=>{
        try {
            const res = await fetch(`${baseUrl}/user/${uid}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(userInfo)
            })

            if (!res.ok) {
                throw new Error("Failed to fetch user data.");
            }

            const data = await res.json()

            if(data?.upsertedCount==0) {
                console.error("DB: New User data Insertion Error");
                return false
            }

            return true;
        } catch(error) {
            console.error(error)
            return false
        }
    }

    const createUser = async (email, password, userInfo)=>{
        if(user) await logout()

        const handleErrorMessage = (errorCode)=>{
            if(!errorCode) return
            switch(errorCode) {
                case 'auth/email-already-in-use':
                case 'auth/email-already-exists':
                    toast.error('Email is already registered')
                    break;
                default:
                    toast.error('An unexpected error occured while tring to login');
            }
        }

        try {
            const {user} = await createUserWithEmailAndPassword(auth, email, password);
            const {uid} = user;
            const successfulDbInsertion = await addUserToDatabase(uid, {...userInfo, uid})
            if(successfulDbInsertion) {
                const successfulReload = await reloadUser(uid)
                return successfulReload
            } else {
                toast.error('Data could not be added into server')
                return false
            }
        } catch(error) {
            const errorCode = error.code;
            handleErrorMessage(errorCode)
            return false
        }
    }

    const loginWithEmailPassword = async(email, password)=>{
        if(user) await logout()
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
    const reloadUser = async (uid, refresh=false)=>{
        if(!refresh && (user && user.uid!=uid)) return false //when editing user data, check if it is user's own data
        try {
            const res = await fetch(
              `${baseUrl}/user/${uid}`
            );
            if (!res.ok) {
              throw new Error("Failed to fetch user data.");
              return false
            }
            const data = await res.json();
            setUser(data);
        } catch (error) {
            toast.error("Unable to fetch user data")
            console.error("Error fetching user data:", error.message);
            return false
        }

        return true
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async (currentUser)=>{
            if(!currentUser) {
                setUser(currentUser); //when logged out
            } else {
                const {uid} = currentUser;
                reloadUser(uid, true)
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