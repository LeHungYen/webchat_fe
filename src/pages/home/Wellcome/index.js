import style from "./index.module.scss"
import defaultAvatar from '../../../assets/imgs/defaultAvatar.jpg'
import { IoIosSearch } from "react-icons/io";

export function Wellcome({user}) {
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
                        <button>Add Picture</button>
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
                <p className={style.subText}>Search by name or look for classmates and coworkers</p>
                <div className={style.inputGroup}>
                    <IoIosSearch className={style.icon} />
                    <input placeholder="Search by name"></input>
                </div>
            </div>

            <div className={style.guideTour}>
                <p className={style.mainText}>Get to know your privacy settings</p>
                <p className={style.subText}>You control how you share your stuff with people and apps on Social Sphere</p>
                <button>Take a privacy tour</button>
            </div>
        </div >
    )
}