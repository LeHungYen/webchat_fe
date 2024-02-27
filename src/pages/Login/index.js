import Modal from 'react-modal';

import style from './index.module.scss'
import style1 from './SignUp/index.module.scss'

import rectangle1 from './imgs/rectangle1.jpg'
import rectangle2 from './imgs/rectangle2.jpg'
import rectangle3 from './imgs/rectangle3.jpg'
import rectangle4 from './imgs/rectangle4.jpg'
import rectangle6 from './imgs/rectangle6.jpg'
import rectangle7 from './imgs/rectangle7.jpg'
import rectangle8 from './imgs/rectangle8.jpg'
import eclipse2 from './imgs/eclipse2.jpg'
import eclipse3 from './imgs/eclipse3.jpg'
import ForgotPassword from './ForgotPassword';
import { routes } from '../../config/routes';
import { SignUp } from './SignUp';

import { useState, useRef, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { StoreContext, actions } from '../../store';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../serivces/UserService';


function Login() {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(StoreContext);
    const userService = new UserService();
    // login
    const [account, setAccount] = useState({ email: "", password: "" });
    const [loginException, setLoginException] = useState(null);

    const handleEmail = (e) => {
        setAccount((prev) => ({ ...prev, email: e.target.value }));
    };

    const handlePassword = (e) => {
        setAccount((prev) => ({ ...prev, password: e.target.value }));
    };

    const getUserInfor = async () => {
        const response = await userService.getCurrentUser();
        await localStorage.setItem("user", JSON.stringify(response))
    }


    const login = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/v1/auth/authenticate", account);
            if (response.status === 200) {
                await localStorage.setItem("userToken", JSON.stringify(response.data.token))
                await getUserInfor(response.data.token);
                await navigate(routes.home)
            }
        } catch (error) {
            setLoginException(error.response.data.message)
        }
    };

    const loginWithGoogle = async (request) => {
        try {
            const response = await axios.post("http://localhost:8080/api/v1/auth/authenticate/google", request);
            if (response.status === 200) {
                await localStorage.setItem("userToken", JSON.stringify(response.data.token))
                await getUserInfor(response.data.token);
                await navigate(routes.home)
            }
        } catch (error) {

        }
    };


    //show sign up
    const [showSignUp, setShowSignUp] = useState(false);

    const displaySignUp = useRef();
    useEffect(() => {
        if (showSignUp) {
            displaySignUp.current.style.display = 'block'
        }
    }, [showSignUp])


    //show forgot password
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const displayForgotPassword = useRef();
    useEffect(() => {
        if (showForgotPassword) {
            displayForgotPassword.current.style.display = 'block'
        }
    }, [showForgotPassword])

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.keyCode === 27) {
                displaySignUp.current.style.display = 'none';
                displayForgotPassword.current.style.display = 'none';
                setShowSignUp(false);
                setShowForgotPassword(false);

            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    // login google
    const gg_client_id = "346474773447-md0spfuk433e23pr14ccdjcchrgava8n.apps.googleusercontent.com"

    // const handleLogin1 = (credentialResponse) => {
    //     var obj = jwtDecode(credentialResponse.credential);
    //     var data = JSON.stringify(obj);
    //     console.log(data);
    // }

    // new 
    const google = window.google;

    const handleCallbackResponse = (response) => {
        if (response.credential) {
            var userObject = jwtDecode(response.credential)

            const request = {
                firstName: userObject.family_name,
                lastName: userObject.given_name,
                email: userObject.email,
            }
            loginWithGoogle(request);
        } else {
            console.error('Google login error:', response.error);
        }
    }

    const handleSignOutGoogle = (event) => {

    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "346474773447-md0spfuk433e23pr14ccdjcchrgava8n.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        )
    }, [])

    return (
        <div className={style.container}>

            <div className={style.left}>
                <img className={style.rectangle1} src={rectangle1}></img>
                <img className={style.rectangle2} src={rectangle2}></img>
                <img className={style.rectangle3} src={rectangle3}></img>
                <img className={style.rectangle4} src={rectangle4}></img>
                <img className={style.eclipse2} src={eclipse2}></img>
                <img className={style.eclipse3} src={eclipse3}></img>
                <img className={style.rectangle6} src={rectangle6}></img>
                <img className={style.rectangle7} src={rectangle7}></img>
                <img className={style.rectangle8} src={rectangle8}></img>
            </div>

            <div className={style.right}>
                <div className={style.row1}>
                    <p className={style.main}>Welcome back</p>
                    <p className={style.sub}>We've missed you! Please sign in to catch up on what you've missed</p>
                </div>

                <div className={style.row2}>
                    <div className={style.formContainer}>
                        <div className={style.form}>
                            <div className={style.loginWith}>


                                <div className={style.adddddd} id='signInDiv'></div>
                                {/* <GoogleOAuthProvider clientId={"sada"}>
                                    <GoogleLogin
                                        onSuccess={handleLogin1}
                                        text='Log in with Google'
                                    />
                                </GoogleOAuthProvider> */}

                                {/* <div className={style.button}>
                                        <button onClick={() => googleLogin()}>
                                            <i className="fa-brands fa-google"></i> Log in with Google
                                        </button>
                                    </div> */}

                                <p className={style.or}>or</p>
                            </div>

                            <div className={style.loginForm}>
                                <div className={style.infor}>
                                    {loginException && <p className={style.loginException}>{loginException}</p>}
                                    <div className={style.email}>
                                        <label>Email</label>
                                        <input onChange={(e) => handleEmail(e)} value={account.email} placeholder="Enter your email"></input>
                                    </div>

                                    <div className={style.password}>
                                        <label>Password</label>
                                        <input
                                            onChange={(e) => handlePassword(e)}
                                            value={account.password}
                                            type='password'
                                            onKeyDown={(e) => e.key === "Enter" && login()}
                                            placeholder="Enter your password">
                                        </input>
                                    </div>
                                </div>

                                {/* <div className={style.option}>
                                    <div className={style.rememberMe}>
                                        <input type='checkbox'></input>
                                        <label>Remember Me</label>
                                    </div>

                                    <div className={style.forgotPassword}>
                                        <p onClick={() => setShowForgotPassword(true)}>ForgotPassword</p>
                                    </div>
                                </div> */}

                                <div className={style.buttonLogin}>
                                    <button onClick={login}>Log in</button>
                                </div>

                            </div>
                        </div>

                        <div className={style.signUp}>
                            <p>Don't have an account yet? <span onClick={() => setShowSignUp(true)}>Sign up</span> now to join our community</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* <Notification notification={notification} setNotification={setNotification} /> */}

            <div ref={displayForgotPassword} className={style1.displayForgotPassword}>
                <ForgotPassword value={{ displayForgotPassword: displayForgotPassword, setShowForgotPassword: setShowForgotPassword }} ></ForgotPassword>
            </div>

            <div ref={displaySignUp} className={style1.displaySignUp}>
                <SignUp value={{ displaySignUp: displaySignUp, setShowSignUp: setShowSignUp }} ></SignUp>
            </div>

        </div>
    )
}

export default Login;