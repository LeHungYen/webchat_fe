import { useState, useRef, useEffect, useContext } from "react"
import { Link, json, parsePath, useLocation, useParams, useNavigate } from 'react-router-dom'
import clsx from "clsx"
import style from './index.module.scss'

function ForgotPassword({ value }) {


    // thoát
    const btnExit = () => {
        value.displayForgotPassword.current.style.display = "none"
        value.setShowForgotPassword(false);
    }

    return (
        <div className={style.formLogin}>


            <button onClick={btnExit} className={style.btnExit}><i className="fa-solid fa-x"></i></button>


            <div className={style.rowSignUp}>
                <div className={style.col2}>
                    <p className={style.title}>Password reset</p>
                    <div className={style.form}>

                        <div>


                            <div className={style.formGroup}>
                                <div className={style.inputWithIcon}>
                                    <div className={style.iconLeft}> <i className="fa-solid fa-user"></i></div>
                                    <input placeholder="Email" />
                                    <div className={style.iconRightWrong}><i className="fa-solid fa-xmark"></i></div>
                                </div>
                            </div>


                            <div className={style.formGroup}>
                                <div className={style.inputWithIcon}>
                                    <div className={style.iconLeft}> <i className="fa-solid fa-lock"></i> </div>
                                    <input placeholder="Mật khẩu mới" />
                                    <div className={style.iconRightPassword} >
                                        <i className={`fa-solid ${true ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </div>
                                </div>
                            </div>


                            <div className={style.formGroup}>
                                <div className={style.inputWithIcon}>
                                    <div className={style.iconLeft}> <i className="fa-solid fa-lock"></i> </div>
                                    <input placeholder="Xác nhận mật khẩu" />
                                    <div className={style.iconRightPassword}>
                                        <i className={`fa-solid ${true ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className={style.formGroupBtn}>
                            <button >Lấy mã otp</button>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    );
}
export default ForgotPassword