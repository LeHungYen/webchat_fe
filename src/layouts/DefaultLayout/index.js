import style from './index.module.scss'

import {
    HomeIcon as OutlineHomeIcon,
    UserGroupIcon as OutlineUserGroupIcon,
    ShoppingBagIcon as OutlineShopingBagIcon,
    BellIcon as OutlineBellIcon,
    ChatIcon as OutlineChatIcon,
    UserIcon as OutlineUserIcon,
    SearchIcon as OutlineSearchIcon,
    UserAddIcon as OutlineUserAddIcon,
    CogIcon as OutlineCogIcon,
    PhotographIcon as OutlinePhotoIcon,
    VideoCameraIcon as OutlineVideoCameraIcon,
    CalendarIcon as OutlineCalendarIcon,
    ShareIcon as OutlineShareIcon,
    MicrophoneIcon as OutlineMicrophoneIcon
} from '@heroicons/react/outline'
import {
    HomeIcon as SolidHomeIcon,
    UserGroupIcon as SolidUserGroupIcon,
    ShoppingBagIcon as SolidShopingBagIcon,
    BellIcon as SolidBellIcon,
    ChatIcon as SolidChatIcon,
    UserIcon as SolidUserIcon,
    SearchIcon as SolidSearchIcon,
    UserAddIcon as SolidUserAddIcon,
    CogIcon as SolidCogIcon,
    PhotographIcon as SolidPhotoIcon,
    VideoCameraIcon as SolidVideoCameraIcon,
    CalendarIcon as SolidCalendarIcon,
    ShareIcon as SolidShareIcon,
    MicrophoneIcon as SolidMicrophoneIcon
} from '@heroicons/react/solid'
import { HiDotsHorizontal } from "react-icons/hi";
function DefaultLayout({ children }) {
    return (

        <div className={style.container}>
            <div className={style.header}>
                <div className={style.group}>
                    <div className={style.logo}>
                        <p>Chat Sphere</p>
                    </div>

                    <div className={style.menu}>
                        <ul>
                            <li><OutlineHomeIcon className={style.menuIcon} /></li>
                            <li><OutlineUserGroupIcon className={style.menuIcon} /></li>
                            <li><OutlineShopingBagIcon className={style.menuIcon} /></li>
                            <li className={style.notificationMenu}>
                                <OutlineBellIcon className={style.menuIcon} />
                                <div className={style.dropdown}>
                                    <div className={style.dropdownHeader}>
                                        <div className={style.col1}>
                                            <p className={style.title}>Notifications</p>
                                        </div>
                                        <div className={style.col2}>
                                            <HiDotsHorizontal className={style.icon} />
                                        </div>
                                    </div>

                                    <div className={style.dropdownBody}>
                                        <div className={style.item}>
                                            <div className={style.avatar}>
                                                <img src='https://haycafe.vn/wp-content/uploads/2022/10/Hinh-anh-avatar-nu-dep.jpg'></img>
                                            </div>

                                            <div className={style.content}>
                                                <div className={style.infor}>
                                                    <p className={style.text}><span >Jesse Steeve</span>
                                                        mentioned you in a story. Check it out and reply.
                                                    </p>

                                                    <p className={style.time}>8 hours ago</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={style.item}>
                                            <div className={style.avatar}>
                                                <img src='https://haycafe.vn/wp-content/uploads/2022/10/Hinh-anh-avatar-nu-dep.jpg'></img>
                                            </div>

                                            <div className={style.content}>
                                                <div className={style.infor}>
                                                    <p className={style.text}><span >Jesse Steeve</span>
                                                        mentioned you in a story. Check it out and reply.
                                                    </p>

                                                    <p className={style.time}>8 hours ago</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={style.item}>
                                            <div className={style.avatar}>
                                                <img src='https://haycafe.vn/wp-content/uploads/2022/10/Hinh-anh-avatar-nu-dep.jpg'></img>
                                            </div>

                                            <div className={style.content}>
                                                <div className={style.infor}>
                                                    <p className={style.text}><span >Jesse Steeve</span>
                                                        mentioned you in a story. Check it out and reply.
                                                    </p>

                                                    <p className={style.time}>8 hours ago</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={style.item}>
                                            <div className={style.avatar}>
                                                <img src='https://haycafe.vn/wp-content/uploads/2022/10/Hinh-anh-avatar-nu-dep.jpg'></img>
                                            </div>

                                            <div className={style.content}>
                                                <div className={style.infor}>
                                                    <p className={style.text}><span >Jesse Steeve</span>
                                                        mentioned you in a story. Check it out and reply.
                                                    </p>

                                                    <p className={style.time}>8 hours ago</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={style.item}>
                                            <div className={style.avatar}>
                                                <img src='https://haycafe.vn/wp-content/uploads/2022/10/Hinh-anh-avatar-nu-dep.jpg'></img>
                                            </div>

                                            <div className={style.content}>
                                                <div className={style.infor}>
                                                    <p className={style.text}><span>Jesse Steeve</span>
                                                        sent you a friend request
                                                    </p>

                                                    <p className={style.time}>8 hours ago</p>
                                                </div>
                                                <div className={style.button}>
                                                    <button className={style.acceptButton}>Accept</button>
                                                    <button className={style.deleteButton}>Delete</button>
                                                </div>
                                            </div>

                                        </div>

                                        <div className={style.item}>
                                            <div className={style.avatar}>
                                                <img src='https://haycafe.vn/wp-content/uploads/2022/10/Hinh-anh-avatar-nu-dep.jpg'></img>
                                            </div>

                                            <div className={style.content}>
                                                <div className={style.infor}>
                                                    <p className={style.text}><span>Jesse Steeve</span>
                                                        sent you a friend request
                                                    </p>

                                                    <p className={style.time}>8 hours ago</p>
                                                </div>
                                                <div className={style.button}>
                                                    <button className={style.acceptButton}>Accept</button>
                                                    <button className={style.deleteButton}>Delete</button>
                                                </div>
                                            </div>

                                        </div>

                                        <div className={style.item}>
                                            <div className={style.avatar}>
                                                <img src='https://haycafe.vn/wp-content/uploads/2022/10/Hinh-anh-avatar-nu-dep.jpg'></img>
                                            </div>

                                            <div className={style.content}>
                                                <div className={style.infor}>
                                                    <p className={style.text}><span>Jesse Steeve</span>
                                                        sent you a friend request
                                                    </p>

                                                    <p className={style.time}>8 hours ago</p>
                                                </div>
                                                <div className={style.button}>
                                                    <button className={style.acceptButton}>Accept</button>
                                                    <button className={style.deleteButton}>Delete</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className={style.dropdownFooter}>
                                        <p>View Notifications</p>
                                    </div>
                                </div>
                            </li>
                            <li><OutlineChatIcon className={style.menuIcon} /></li>
                            <li><OutlineUserIcon className={style.menuIcon} /></li>
                        </ul>
                    </div>

                    <div className={style.search}>
                        <div className={style.input}>
                            <input placeholder='Search for anything'></input>
                            <OutlineSearchIcon className={style.searchIcon} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.body}>
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout