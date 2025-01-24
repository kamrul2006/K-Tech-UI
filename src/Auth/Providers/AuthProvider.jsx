import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { auth } from "../FireBase/firebase.init";
import axios from "axios";


//----------------the context here------------------
export const AuthContext = createContext()
const provider = new GoogleAuthProvider()
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    //-------- create user with email-password------------
    const CreateUserByMailPass = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //--------------------------Login user with email password-------
    const LoginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //-----------------------log in with google----------
    const GoogleLogin = () => {
        return signInWithPopup(auth, provider)
    }

    //-----------------------user sign out----------------
    const UserSignOut = () => {
        signOut(auth)
            .then(() => {
            })
            .catch((error) => {

            });
    }

    //--------------------updating Profile------------------
    const updatedProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    }

    //-----------------------------------forget passWord------------------------
    const [pEmail, setPEmail] = useState(null)



    //------------value here--------------------------
    const authInfo = {
        user, setUser,
        CreateUserByMailPass,
        LoginUser,
        UserSignOut,
        loading,
        updatedProfile,
        GoogleLogin,
        pEmail, setPEmail
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)

            if (currentUser?.email) {
                const user = { email: currentUser?.email };

                axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                    .then(res => {
                        // console.log('login token', res.data);
                        if (res.data.token) {
                            localStorage.setItem('Token', res.data.token)
                        }
                        setLoading(false);
                    })

            }
            else {
                localStorage.removeItem('Token')

                axios.post('http://localhost:5000/logout', {}, {
                    withCredentials: true
                })
                    .then(res => {
                        // console.log('logout', res.data);
                        setLoading(false);
                    })
            }
            setLoading(false)
        });

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;