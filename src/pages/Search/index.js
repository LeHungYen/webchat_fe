import style from './index.module.scss'
import { BsFillPostcardHeartFill } from "react-icons/bs";
import { IoIosImages } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { GoVideo } from "react-icons/go";
import { GiShoppingBag } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi2";
import { RiCalendarEventFill } from "react-icons/ri";



import { People } from './People';
import { Groups } from './Groups';
import { Posts } from './Posts';
export function Search() {

    return <div className={style.container}>
        <div className={style.pageMenu}>
            <p className={style.title}>Search result</p>
            <ul>
                <li><BsFillPostcardHeartFill className={style.icon} /> <span>Posts</span></li>
                <li><IoPeopleSharp className={style.icon} /><span>People</span></li>
                <li><IoIosImages className={style.icon} /> <span>Images</span></li>
                <li><GoVideo className={style.icon} /> <span>Videos</span></li>
                <li><GiShoppingBag className={style.icon} /> <span>Marketplace</span></li>
                <li><HiUserGroup className={style.icon} /><span>Groups</span></li>
                <li><RiCalendarEventFill className={style.icon} /> <span>Events</span></li>
            </ul>
        </div>

        {/* <People /> */}
        <Groups />
        {/* <Posts /> */}
    </div>
}