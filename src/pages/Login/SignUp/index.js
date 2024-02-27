import { useState, useRef, useEffect, useContext } from "react"
import axios from "axios"
import { Link, json, parsePath, useLocation, useParams, useNavigate } from 'react-router-dom'
import clsx from "clsx"
import style from './index.module.scss'
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaTransgender } from "react-icons/fa6";
// import { useNavigate } from 'react-router-dom';
import { UserService } from "../../../serivces/UserService"
import { routes } from '../../../config/routes';

export function SignUp({ value }) {
    const userService = new UserService();
    const navigate = useNavigate();

    const getUserInfor = async () => {
        const response = await userService.getCurrentUser();
        await localStorage.setItem("user", JSON.stringify(response))
    }

    const register = () => {
        const addUser = async () => {
            try {
                const response = await axios.post("http://localhost:8080/api/v1/auth/register", signUpForm)
                await localStorage.setItem("userToken", JSON.stringify(response.data.token))
                await getUserInfor();
                handleDefaultValue();
                navigate(routes.home)
            } catch (error) {
                console.log(error.response.data.message)
                setValidateForm((prev) => ({
                    ...prev,
                    email: 1
                }));
            }
        }
        addUser();
    }

    // sign up
    const [signUpForm, setSignUpForm] = useState({ firstName: "", lastName: "", gender: "", email: "", phoneNumber: "", password: "", agreeTerm: "" })
    // const [notificationMessage, setNotificationMessage] = useState('')

    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerm, setAgreeTerm] = useState(false);
    const [validateForm, setValidateForm] = useState({
        firstName: -1,
        lastName: -1,
        gender: -1,
        email: -1,
        phoneNumber: -1,
        password: -1,
        agreeTerm: -1
    })

    let msgSignUpForm = {
        firstName: -1,
        lastName: -1,
        gender: -1,
        email: -1,
        phoneNumber: -1,
        password: -1,
        agreeTerm: -1
    };

    const handleInput = (key, value) => {
        setSignUpForm((prev) => ({
            ...prev,
            [key]: value
        }));


    };

    const validateInput = (key, value) => {
        const validators = {
            phoneNumber: /^(?:\+?84|0)(?:\d{9}|\d{10})$/,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            // password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            password: /^.{8,16}$/,
        };


        if (!signUpForm.agreeTerm) {
            msgSignUpForm = {
                ...msgSignUpForm,
                agreeTerm: 0
            };

            setValidateForm((prev) => ({
                ...prev,
                agreeTerm: 0
            }));
            return false;
        } else {
            msgSignUpForm = {
                ...msgSignUpForm,
                agreeTerm: -1
            };

            setValidateForm((prev) => ({
                ...prev,
                agreeTerm: -1
            }));
        }

        if (key == "firstName" || key == "lastName" || key == "gender" || key == "email" || key == "phoneNumber" || key == "password") {
            if (value == undefined || value == null) {
                msgSignUpForm = {
                    ...msgSignUpForm,
                    [key]: 0
                };

                setValidateForm((prev) => ({
                    ...prev,
                    [key]: 0
                }));
                return false;
            } else if (typeof value === 'string') {
                if (value.trim() == '') {
                    msgSignUpForm = {
                        ...msgSignUpForm,
                        [key]: 0
                    };

                    setValidateForm((prev) => ({
                        ...prev,
                        [key]: 0
                    }));
                    return false;
                }
            }

            if (key == "firstName" || key == "lastName" || key == "gender") {
                msgSignUpForm = {
                    ...msgSignUpForm,
                    [key]: -1
                };

                setValidateForm((prev) => ({
                    ...prev,
                    [key]: -1
                }));
            }
        }

        const validator = validators[key];
        if (validator) {
            const isValid = validator.test(value);
            msgSignUpForm = {
                ...msgSignUpForm,
                [key]: isValid ? -1 : 0,
            };

            setValidateForm((prev) => ({
                ...prev,
                [key]: isValid ? -1 : 0,
            }));
            return isValid;
        }

        return true;
    };

    const handleDefaultValue = (action) => {
        setSignUpForm({
            firstName: "",
            lastName: "",
            gender: "",
            email: "",
            phoneNumber: "",
            password: "",
            agreeTerm: ""
        })

        msgSignUpForm = {
            firstName: -1,
            lastName: -1,
            gender: -1,
            email: -1,
            phoneNumber: -1,
            password: -1,
            agreeTerm: -1
        }

        setValidateForm({
            firstName: -1,
            lastName: -1,
            gender: -1,
            email: -1,
            phoneNumber: -1,
            password: -1,
            agreeTerm: -1
        })
    }


    const handleSignUp = async () => {
        let isValid = true;

        for (const key in signUpForm) {
            if (signUpForm.hasOwnProperty(key)) {
                if (signUpForm.id && key === 'password') {
                    continue;
                }
                await validateInput(key, signUpForm[key])
            }
        }

        for (const key in msgSignUpForm) {
            if (msgSignUpForm[key] !== -1) {
                isValid = false; // Nếu có bất kỳ giá trị nào khác -1, trả về false
                break;
            }
        }


        if (isValid) {
            register();
        }
    };

    //


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
                            <div className={style.inputWithIcon}>
                                {validateForm.firstName == 0 &&
                                    <div className={style.wrong}>
                                        <p>Please enter valid data</p>
                                    </div>
                                }
                                <div className={style.iconLeft}>  <MdDriveFileRenameOutline className={style.icon} /></div>
                                <input onChange={(e) => handleInput("firstName", e.target.value)} value={signUpForm.firstName} type="text" placeholder="First Name" />
                            </div>
                        </div>

                        <div className={style.formGroup}>
                            <div className={style.inputWithIcon}>
                                {validateForm.lastName == 0 &&
                                    <div className={style.wrong}>
                                        <p>Please enter valid data</p>
                                    </div>
                                }
                                <div className={style.iconLeft}> <MdDriveFileRenameOutline className={style.icon} /></div>
                                <input onChange={(e) => handleInput("lastName", e.target.value)} value={signUpForm.lastName} type="text" placeholder="Last Name" />
                            </div>
                        </div>

                        <div className={style.formGroup}>
                            <div className={style.inputWithIcon}>
                                {validateForm.email == 0 &&
                                    <div className={style.wrong}>
                                        <p>Please enter valid data</p>
                                    </div>
                                }
                                {validateForm.email == 1 &&
                                    <div className={style.wrong}>
                                        <p>Email already exist</p>
                                    </div>
                                }
                                <div className={style.iconLeft}> <MdEmail className={style.icon} /></div>
                                <input onChange={(e) => handleInput('email', e.target.value)} value={signUpForm.email} placeholder="Email" />
                            </div>
                        </div>

                        <div className={style.formGroup}>
                            <div className={style.inputWithIcon}>
                                {validateForm.phoneNumber == 0 &&
                                    <div className={style.wrong}>
                                        <p>Please enter valid data</p>
                                    </div>
                                }
                                <div className={style.iconLeft}> <MdOutlinePhoneAndroid className={style.icon} /> </div>
                                <input onChange={(e) => handleInput('phoneNumber', e.target.value)} value={signUpForm.phoneNumber} placeholder="Phone number" />
                            </div>
                        </div>

                        <div className={style.formGroup}>
                            <div className={style.inputWithIcon}>
                                {validateForm.password == 0 &&
                                    <div className={style.wrong}>
                                        <p>Password must be 8-16 characters</p>
                                    </div>
                                }
                                <div className={style.iconLeft}> <RiLockPasswordFill className={style.icon} /> </div>
                                <input onChange={(e) => handleInput('password', e.target.value)} value={signUpForm.password} type="password" placeholder="Password" />
                            </div>
                        </div>

                        <div className={style.formGroup}>
                            <div className={style.inputWithIcon}>
                                {validateForm.gender == 0 &&
                                    <div className={style.wrong}>
                                        <p>Please select gender</p>
                                    </div>
                                }
                                <div className={style.iconLeft}> <FaTransgender className={style.icon} /></div>
                                <select value={signUpForm.gender} onChange={(e) => handleInput("gender", e.target.value)}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                    <option value="other">Không xác định</option>
                                </select>
                            </div>

                        </div>



                        <div className={style.formGroupCBX}>
                            {validateForm.agreeTerm == 0 &&
                                <div className={style.wrong}>
                                    <p>You must agree to the terms before registering</p>
                                </div>
                            }
                            <input onChange={(e) => handleInput('agreeTerm', e.target.checked)} value={signUpForm.agreeTerm} type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                            <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>I agree all statements in <a>Terms of service</a></label>
                        </div>

                        <div className={style.formGroupBtn}>
                            <button onClick={handleSignUp}>Register</button>
                        </div>
                    </div>

                </div>

            </div>

            {/* <Notification message={notificationMessage} /> */}
        </div>
    );
}