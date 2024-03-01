import style from "./index.module.scss"
import defaultAvatar from '../../../assets/imgs/defaultAvatar.jpg'
import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { StoreContext, actions } from "../../../store";
import { routes } from "../../../config/routes";
export function Wellcome({ user }) {
    const [state, dispatch] = useContext(StoreContext);
    const navigate = useNavigate();
    return (
        <div className={style.container}>
            <p className={style.wellcome}>
                Wellcome to Social Sphere, {user.firstName + " " + user.lastName}
            </p>

            <div className={style.profilePicture}>
                <div className={style.row}>
                    <div className={style.col1}>
                        <p className={style.mainText}>Upload a Profile Picture</p>
                        <p className={style.subText}>Add a photo so friends can easily identify you.</p>
                        <button className={style.disable}>Add Picture</button>
                    </div>

                    <div className={style.col2}>
                        <div className={style.img}>
                            <img src={defaultAvatar}></img>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.findPeople}>
                <p className={style.mainText}>Find people you know</p>
                <p className={style.subText}>Search for classmates and coworkers</p>
                <div className={style.inputGroup}>
                    <IoIosSearch className={style.icon} />
                    <input
                        value={state.keySearch}
                        onChange={(e) => dispatch(actions.setKeySearch(e.target.value))}
                        onKeyDown={(e) => e.key === "Enter" && navigate(routes.search)}
                        placeholder="Search by name , email , phone number"></input>
                </div>
            </div>

            <div className={style.guideTour}>
                <p className={style.mainText}>Get to know your privacy settings</p>
                <p className={style.subText}>You control how you share your stuff with people and apps on Social Sphere</p>
                <button className={style.disable}>Take a privacy tour</button>
            </div>
        </div >
    )
}