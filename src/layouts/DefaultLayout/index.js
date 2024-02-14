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
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate, Link } from 'react-router-dom';
import { routes } from '../../config/routes';
import { useState, useContext, useRef, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { StoreContext, actions } from '../../store';
function DefaultLayout({ children, keySearch, setKeySearch }) {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(StoreContext)

    const calculateTimeDifference = (javaDateTime) => {
        const createdAtDate = new Date(javaDateTime);
        const now = new Date();
        const timeDiff = now - createdAtDate;
        const secondsDiff = Math.floor(timeDiff / 1000);
        const minutesDiff = Math.floor(secondsDiff / 60);
        const hoursDiff = Math.floor(minutesDiff / 60);
        const daysDiff = Math.floor(hoursDiff / 24);
        const weeksDiff = Math.floor(daysDiff / 7);
        const monthsDiff = Math.floor(daysDiff / 30);

        if (monthsDiff > 0) {
            return `${monthsDiff} months ago`;
        } else if (weeksDiff > 0) {
            return `${weeksDiff} weeks ago`;
        } else if (daysDiff > 0) {
            return `${daysDiff} days ago`;
        } else if (hoursDiff > 0) {
            return `${hoursDiff} hours ago`;
        } else if (minutesDiff > 0) {
            return `${minutesDiff} minutes ago`;
        } else {
            return `${secondsDiff} seconds ago`;
        }
    };


    // notification
    const notificationType = {
        sendFriendRequest: "SEND_FRIEND_REQUEST"
    };

    const defaultNotification = {
        notificationId: null,
        senderId: null,
        receiverId: null,
        type: null,
        link: null,
        isRead: null,
        createAt: null,
        sender: null
    };

    const [notification, setNotification] = useState(defaultNotification);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const client = Stomp.over(socket);

        const token = JSON.parse(localStorage.getItem("userToken"));
        const headers = {
            Authorization: `Bearer ${token}`
        };

        client.connect(headers, () => {
            client.subscribe('/topic/notification', (response) => {
                const receivedNotification = JSON.parse(response.body);
                setNotification(receivedNotification);
            });
        });

        return () => {
            client.disconnect();
        };

    }, []);

    const [notifications, setNotifications] = useState([]);

    const getNotifications = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`;
        try {
            const response = await axios.get("http://localhost:8080/notification/getNotifications");
            if (response.status === 200) {
                console.log(response.data)
                setNotifications(response.data)
            }
        } catch (error) {

        }
    };

    useEffect(() => {
        getNotifications();
    }, [])




    // display notification 5s
    const fastNotificationRef = useRef(null);

    useEffect(() => {
        if (notification.notificationId != null && notification.receiverId === state.user.userId) {
            fastNotificationRef.current.style.display = 'block';
            fastNotificationRef.current.style.opacity = '1';

            const timeout = setTimeout(() => {
                fastNotificationRef.current.style.opacity = '0';
                fastNotificationRef.current.style.display = 'none';

            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [notification]);


    // handle button notification friend request
    const handleAcceptButtonClick = (e, item) => {
        // Ngăn chặn sự kiện click truyền ra ngoài các button
        e.stopPropagation();

        // Xử lý logic khi ấn nút Accept
        // Ví dụ: dispatch một action để xử lý việc chấp nhận yêu cầu kết bạn
    };

    const handleDeleteButtonClick = (e, item) => {
        // Ngăn chặn sự kiện click truyền ra ngoài các button
        e.stopPropagation();

        // Xử lý logic khi ấn nút Delete
        // Ví dụ: dispatch một action để xử lý việc xóa thông báo
    };


    // display block or none
    const notificationRef = useRef();

    const setNotificationRef = () => {
        const currentDisplay = window.getComputedStyle(notificationRef.current).display;
        if (currentDisplay === "none") {
            notificationRef.current.style.display = "block";
        } else {
            notificationRef.current.style.display = "none";
        }
    };




    return (

        <div className={style.container}>
            <div className={style.header}>
                <div className={style.group}>
                    <div onClick={() => navigate(routes.home)} className={style.logo}>
                        {/* <p>Chat Sphere</p> */}
                        <p>Social Sphere</p>
                    </div>

                    <div className={style.menu}>
                        <ul>
                            <li onClick={() => navigate(routes.home)}><OutlineHomeIcon className={style.menuIcon} /></li>
                            <li onClick={() => navigate(routes.groupWall)}><OutlineUserGroupIcon className={style.menuIcon} /></li>
                            <li ><OutlineShopingBagIcon className={style.menuIcon} /></li>
                            <li className={style.notificationMenu}>
                                <div onClick={setNotificationRef} className={style.buttonMenu}>
                                    <OutlineBellIcon className={style.menuIcon} />
                                </div>

                                <div ref={notificationRef} className={style.dropdown}>
                                    <div className={style.dropdownHeader}>
                                        <div className={style.col1}>
                                            <p className={style.title}>Notifications</p>
                                        </div>
                                        <div className={style.col2}>
                                            <HiDotsHorizontal className={style.icon} />
                                        </div>
                                    </div>

                                    <div className={style.dropdownBody}>

                                        {notifications.map((item, index) => {
                                            return (
                                                <div key={index} >
                                                    {item.type === notificationType.sendFriendRequest &&
                                                        <Link className={style.link} onClick={setNotificationRef} to={item.link} >
                                                            <div className={style.item}>
                                                                <div className={style.avatar}>
                                                                    <img src='https://haycafe.vn/wp-content/uploads/2022/10/Hinh-anh-avatar-nu-dep.jpg'></img>
                                                                </div>

                                                                <div className={style.content}>
                                                                    <div className={style.infor}>
                                                                        <p className={style.text}><span>{item.sender.fullName}</span>
                                                                            sent you a friend request
                                                                        </p>

                                                                        <p className={style.time}>{calculateTimeDifference(item.createdAt)}</p>
                                                                    </div>
                                                                    <div className={style.button}>
                                                                        <button className={style.acceptButton} onClick={(e) => { handleAcceptButtonClick(e, item) }}>Accept</button>
                                                                        <button className={style.deleteButton} onClick={(e) => { handleDeleteButtonClick(e, item) }}>Delete</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    }
                                                </div>
                                            )
                                        })}

                                        {/* <div className={style.item}>
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
                                        </div> */}




                                    </div>

                                    <div className={style.dropdownFooter}>
                                        <p>View Notifications</p>
                                    </div>
                                </div>
                            </li>
                            <li onClick={() => navigate(routes.message)}><OutlineChatIcon className={style.menuIcon} /></li>
                            <Link to={`${routes.userWall}?id=${state.user.userId}`}>
                                <li ><OutlineUserIcon className={style.menuIcon} /></li>
                            </Link>

                        </ul>
                    </div>

                    <div className={style.search}>
                        <div className={style.input}>
                            <input value={state.keySearch} onChange={(e) => dispatch(actions.setKeySearch(e.target.value))} placeholder='Search for anything'></input>
                            <OutlineSearchIcon onClick={() => navigate(routes.search)} className={style.searchIcon} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.body}>
                {children}
            </div>

            <div ref={fastNotificationRef} className={style.notification}>
                {
                    notification.notificationId !== null &&
                    <div className={style.item}>
                        <div className={style.avatar}>
                            <img src='https://haycafe.vn/wp-content/uploads/2022/10/Hinh-anh-avatar-nu-dep.jpg'></img>
                        </div>

                        <div className={style.content}>
                            <div className={style.infor}>
                                <p className={style.text}><span>{notification.sender.fullName}</span>
                                    sent you a friend request
                                </p>

                                <p className={style.time}>a few seconds ago</p>
                            </div>
                            <div className={style.button}>
                                <button className={style.acceptButton}>Accept</button>
                                <button className={style.deleteButton}>Delete</button>
                            </div>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}

export default DefaultLayout