import { useState, useRef, useEffect, useContext } from "react"
import axios from "axios"
import { Link, json, parsePath, useLocation, useParams, useNavigate } from 'react-router-dom'
import clsx from "clsx"
import style from './index.module.scss'
// import Notification from "../../../components/Notification"

export function SignUp({ value }) {
    const [signUpForm, setSignUpForm] = useState({ fullName: "", email: "", phoneNumber: "", password: "", agreeTerm: "" })
    const [notificationMessage, setNotificationMessage] = useState('')

    const handleInput = (key, value) => {
        setSignUpForm((prev) => ({
            ...prev, [key]: value
        }))
    }

    // const register = () => {
    //     console.log(user)
    //     const addUser = async () => {
    //         try {
    //             const response = await axios.post("http://localhost:8080/api/v1/auth/register", signUpForm)
    //             setNotificationMessage("Đăng ký tài khoản thành công")
    //         } catch (error) {

    //         }
    //     }
    //     addUser();
    // }

    // thoát
    const btnExit = () => {
        value.displaySignUp.current.style.display = "none"
        value.setShowSignUp(false);
    }

    return (
        <div className={style.formLogin}>


            <button onClick={btnExit} className={style.btnExit}><i className="fa-solid fa-x"></i></button>


            <div className={style.rowSignUp}>
                <div className={style.col2}>
                    <p className={style.title}>Create account</p>
                    <div className={style.form}>
                        <div className={style.formGroup}>
                            <div className="form-group">
                                <div className={style.inputWithIcon}>
                                    <div className={style.iconLeft}> <i className="fa-solid fa-user"></i></div>
                                    <input onChange={(e) => handleInput("fullName", e.target.value)} value={signUpForm.fullName} type="text" placeholder="Your Name" />
                                </div>
                            </div>
                        </div>

                        <div className={style.formGroup}>
                            <div className={style.inputWithIcon}>
                                <div className={style.iconLeft}> <i className="fa-solid fa-envelope"></i> </div>

                                <input onChange={(e) => handleInput('email', e.target.value)} value={signUpForm.email} placeholder="Your Email" />
                                {/* <div className={style.iconRightWrong}><i className="fa-solid fa-xmark"></i></div> */}
                            </div>
                        </div>

                        <div className={style.formGroup}>
                            <div className={style.inputWithIcon}>
                                <div className={style.iconLeft}> <i className="fa-solid fa-phone"></i> </div>
                                <input onChange={(e) => handleInput('phoneNumber', e.target.value)} value={signUpForm.phoneNumber} placeholder="Your Phone number" />
                            </div>
                        </div>


                        <div className={style.formGroup}>
                            <div className={style.inputWithIcon}>
                                <div className={style.iconLeft}> <i className="fa-solid fa-lock"></i> </div>
                                <input onChange={(e) => handleInput('password', e.target.value)} value={signUpForm.password} placeholder="Password" />
                                <div className={style.iconRightPassword}>
                                    <i className={`fa-solid ${true ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </div>
                            </div>
                        </div>

                        <div className={style.formGroupCBX}>
                            <input onChange={(e) => handleInput('agreeTerm', e.target.checked)} value={signUpForm.agreeTerm} type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                            <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>I agree all statements in <a>Terms of service</a></label>
                        </div>

                        <div className={style.formGroupBtn}>
                            <button onClick={register}>Register</button>
                        </div>
                    </div>

                </div>

            </div>

            {/* <Notification message={notificationMessage} /> */}
        </div>
    );
}