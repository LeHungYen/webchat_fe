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

import { useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes';
import { useState, useContext } from 'react';
import { StoreContext, actions } from '../../store';
export function Search() {
    const [content, setContent] = useState("people");
    const [state, dispatch] = useContext(StoreContext);
    const [keySearch, setKeySearch] = useState(state.keySearch);

    

    return <div className={style.container}>
        <div className={style.pageMenu}>
            <p className={style.title}>Search result</p>
            <ul>
                <li onClick={() => setContent("posts")}><BsFillPostcardHeartFill className={style.icon} /> <span>Posts</span></li>
                <li onClick={() => setContent("people")}><IoPeopleSharp className={style.icon} /><span>People</span></li>
                <li onClick={() => setContent("images")}><IoIosImages className={style.icon} /> <span>Images</span></li>
                <li onClick={() => setContent("videos")}><GoVideo className={style.icon} /> <span>Videos</span></li>
                <li onClick={() => setContent("marketplace")}><GiShoppingBag className={style.icon} /> <span>Marketplace</span></li>
                <li onClick={() => setContent("groups")}><HiUserGroup className={style.icon} /><span>Groups</span></li>
                <li onClick={() => setContent("events")}><RiCalendarEventFill className={style.icon} /> <span>Events</span></li>
            </ul>
        </div>

        {content == "people" && <People />}
        {content == "groups" && <Groups />}
        {content == "posts" && <Posts />}

    </div>
}