
import style from './index.module.scss'
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"
import { UserService } from '../../../../serivces/UserService';
import { routes } from '../../../../config/routes';
export function AuthenticationEmail() {
    const userService = new UserService();
    const navigate = useNavigate();
    // get id from url
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");


    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const register = () => {
        const addUser = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/api/v1/auth/register/${code}`)
                await localStorage.setItem("userToken", JSON.stringify(response.data.token))
                await getUserInfor();
                navigate(routes.home)
            } catch (error) {
                setMessage(error.response.data.message)
            }
        }
        addUser();
    }


    const getUserInfor = async () => {
        const response = await userService.getCurrentUser();
        await localStorage.setItem("user", JSON.stringify(response))
    }

    return (
        <div className={style.container}>
            <div className={style.form}>
                <div className={style.header}>
                    <p> Enter the code from your email</p>
                </div>

                <div className={style.body}>
                    <p className={style.text}>Please let us know this email belongs to you. Please enter the code in the email sent to {email} </p>

                    <div className={style.formInput}>
                        <label>SS-</label>
                        <input value={code} onChange={(e) => setCode(e.target.value)}></input>
                    </div>
                    {message && <p className={style.message}>{message}</p>}

                    <p className={style.resendEmail}>Resend email</p>
                </div>

                <div className={style.footer}>
                    <button onClick={() => navigate(routes.login)}>Cancel</button>
                    <button
                        disabled={code == "" ? true : false}
                        style={{ background: code == "" ? "" : "#0389c9", color: code == "" ? "" : "#ffffff" }}
                        onClick={register}
                    >Continue</button>
                </div>
            </div>

        </div>
    );
}