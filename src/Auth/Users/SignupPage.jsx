import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
// import Swal from "sweetalert2";
import { sendEmailVerification } from "firebase/auth";
import { AuthContext } from "../Providers/AuthProvider";
import { auth } from "../FireBase/firebase.init";
import bg from "../../assets/others/authentication.png"
import ill from "../../assets/others/authentication1.png"
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";




const SignupPage = () => {

    const axiosPublic = UseAxiosPublic()
    const navigate = useNavigate()
    //--------------------------Context use--------------------------
    const { CreateUserByMailPass, setUser, updatedProfile, GoogleLogin } = useContext(AuthContext)

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [show, setShow] = useState(false)

    const HandleSignUp = (e) => {
        e.preventDefault();
        // -------------------clearing error +success msg
        setError(null)
        setSuccess(null)

        const Email = e.target.email.value
        const Password = e.target.password.value
        const Name = e.target.name.value
        const Terms = e.target.terms.checked


        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!Terms) {
            setError('Pleas accept all terms and conditions.')
            return
        }
        else if (Password.length < 6) {
            setError('Password should must be 6 character or more !!')
            return
        }
        else if (!passwordRegex.test(Password)) {
            setError('Password should contain a-z, A-Z, 0-9 and a special character.')
            return
        }


        CreateUserByMailPass(Email, Password)
            .then((userCredential) => {
                //         // ----------------------------Signed up 
                const user = userCredential.user;
                // const time = userCredential.user.metadata.creationTime;
                setUser(user)

                const UserInfo = {
                    name: Name,
                    email: Email,
                    role: "user"
                }

                axiosPublic.post('/users', UserInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            setSuccess('Sign Up Successful.')
                        }
                    })

                // -------------updating profile-----------
                updatedProfile({ displayName: Name })
                    .then(() => {
                        e.target.reset()
                        navigate('/')
                    })
                    .catch(err => setError(err.massage))

                // --------------sending verification ----------
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        //                 console.log('Email verification sent!')
                    })
            });


    }

    //------------------- HAndle google--------------
    const HandleGoogleLogin = () => {
        GoogleLogin()
            .then((res) => {
                // console.log(res.user)
                setUser(res.user)

                const UserInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    role: "user"
                }
                
                setSuccess('Sign Up Successful.')
                navigate('/')

                axiosPublic.post('/users', UserInfo)
                    .then(res =>{} )


            })
            .catch(err => {
                console.log(err);
                setUser(null)
            })
    }

    const ShowPassWord = (e) => {
        e.preventDefault();
        setShow(!show)
    }


    return (
        <div className="bg-center bg-cover px-28 py-10 min-h-screen"
            style={{ background: `url(${bg})` }}
        >

            <div >
                <div className="flex items-center justify-center flex-row-reverse shadow-xl rounded-lg shadow-black" style={{ background: `url(${bg})` }}>

                    {/* Left Side */}
                    <div className="w-1/2  flex  items-center justify-center" >
                        <img
                            src={ill}
                            alt="Login Illustration"
                            className="w-3/4"
                        />
                    </div>

                    {/* ----------------form------------ */}
                    <div className=" p-8  px-16 w-full md:w-1/2 my-5">
                        <h2 className="text-3xl font-bold  text-center mb-6">Sign up</h2>

                        <form onSubmit={HandleSignUp} className="space-y-3">

                            <div className="relative">
                                <label className="  text-sm mx-2">
                                    Full Name:
                                </label>
                                <input
                                    type="Text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-2 border border-white-300 rounded-lg focus:outline-none text-black focus:border-blue-500 peer"
                                    placeholder="First name + Last Name"
                                    required
                                />
                            </div>

                            <div className="">
                                <label className="  text-sm mx-2">
                                    Email Address:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-2 border border-white-300 rounded-lg focus:outline-none focus:border-blue-500 peer text-black"
                                    placeholder="Email "
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label className="  text-sm mx-2">
                                    Password:
                                </label>
                                <input
                                    type={show ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="w-full px-4 py-2 border border-white-300 rounded-lg focus:outline-none focus:border-blue-500 peer text-black"
                                    placeholder="Password"
                                    required
                                />
                                <button onClick={ShowPassWord} className="btn btn-ghost btn-xs absolute right-3 top-8 text-lg">
                                    {show ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            <div className="my-2">
                                <label className="cursor-pointer flex items-center gap-2">
                                    <input type="checkbox" name="terms" className="checkbox checkbox-warning" />
                                    <span className=" text-yellow-500">Accept all terms and conditions</span>
                                </label>
                            </div>

                            {error && <p className="text-xs font-semibold text-red-500 text-center">{error}</p>}
                            {success && <p className="text-xs font-semibold text-green-500 text-center">{success}</p>}

                            <button
                                type="submit"
                                className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-md"
                            >
                                Sign up
                            </button>
                        </form>

                        <div className="mt-2 text-center">
                            <p className="text-sm text-gray-600">Or sign in with</p>

                            <div className="flex justify-center space-x-4 mt-2">
                                <button onClick={HandleGoogleLogin} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                    <FaGoogle className="text-red-500 text-xl" />
                                </button>
                                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                    <FaFacebook
                                        className="text-blue-500 text-xl" />
                                </button>
                                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                    <FaGithub className="text-gray-800 text-xl" />
                                </button>
                            </div>
                        </div>

                        <p className="text-center mt-2">
                            Already have an account?  <Link to={'/logIn'} className="text-blue-500 hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;