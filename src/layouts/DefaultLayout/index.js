import style from "./index.module.scss";
import { FiSearch } from "react-icons/fi";
import {
  HomeIcon as OutlineHomeIcon,
  UserGroupIcon as OutlineUserGroupIcon,
  ShoppingBagIcon as OutlineShopingBagIcon,
  BellIcon as OutlineBellIcon,
  ChatIcon as OutlineChatIcon,
  UserIcon as OutlineUserIcon,
  SearchIcon as OutlineSearchIcon,
} from "@heroicons/react/outline";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate, Link } from "react-router-dom";

import { routes } from "../../config/routes";
import { useState, useContext, useRef, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

// project files
import NotificationPopup from "./NotificationPopup";
import { StoreContext, actions } from "../../store";
import { calculateTimeDifference } from "../../utils";
import { NotificationService } from "../../serivces/NotificationService";
import { FriendRequestService } from "../../serivces/FriendRequestService";
import { UserService } from "../../serivces/UserService";
import Logo_SocialSphere from "../../assets/logo/Logo_SocialSphere.png";

function DefaultLayout({ children, keySearch, setKeySearch }) {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(StoreContext);
  const notificationService = new NotificationService();
  const friendRequestService = new FriendRequestService();
  const userService = new UserService();
  let user = JSON.parse(localStorage.getItem("user"));
  // const userIdRef = useRef(user.userId); // contain userId
  const userIdRef = useRef(null); // contain userId
  if (user.userId) {
    userIdRef.current = user.userId;
  }

  const [locationPopupOpen, setLocationPopupOpen] = useState(false);
  // get current user infor
  const getUserInfor = async () => {
    try {
      const response = await userService.getCurrentUser();
      localStorage.setItem("user", JSON.stringify(response))
      user = JSON.parse(localStorage.getItem("user"));
      userIdRef.current = user.userId;
    } catch {
      window.location.assign("localhost:3000/login")
    }
  };
  getUserInfor();






  // notification
  const [notification, setNotification] = useState(
    notificationService.defaultNotification
  );

  const [stompClient, setStompClient] = useState(null);
  const stompClientRef = useRef(null);
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);
    client.debug = false;
    const token = JSON.parse(localStorage.getItem("userToken"));
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    client.connect(headers, async () => {
      client.subscribe("/topic/notification", (response) => {
        const receivedNotification = JSON.parse(response.body);
        if (receivedNotification.receiverId == user.userId) {
          setNotification(receivedNotification);
          getNotifications();
        }
      });

      client.send("/app/connect", {}, JSON.stringify(userIdRef.current));
      stompClientRef.current = client;
    });
    setStompClient(client);
    return () => {
      client.disconnect();
    };
  }, []);

  // get location of icon notification to display popup notification
  const [notificationLocation, setNotificationLocation] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  })

  useEffect(() => {
    const handleResize = () => {
      const element = notificationRef.current;

      if (element) {
        const rect = element.getBoundingClientRect();
        const location = {
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right
        }
        setNotificationLocation(location);

      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // send status user offline to server backend
  const disconnect = () => {
    stompClientRef.current.send(
      "/app/disconnect",
      {},
      JSON.stringify(userIdRef.current)
    );
  };

  useEffect(() => {
    window.addEventListener("beforeunload", disconnect);
    window.addEventListener("offline", disconnect);

    return () => {
      window.addEventListener("beforeunload", disconnect);
      window.removeEventListener("offline", disconnect);
    };
  }, []);

  const [notifications, setNotifications] = useState([]);

  // get
  const getNotifications = async () => {
    const fetchData = async () => {
      const response = await notificationService.getNotifications();
      setNotifications(response);
    };

    fetchData();
  };

  useEffect(() => {
    getNotifications();
  }, []);

  // delete
  const deleteNotification = async (id) => {
    await notificationService.delete(id);
    await getNotifications();
  };

  // friend request

  // get
  const getFriendRequestBySenderIdAndReceiveId = async (userId1, userId2) => {
    const response = await friendRequestService.getBySenderIdAndReceiveId(
      userId1,
      userId2
    );
    return response;
  };

  // friendship

  const saveFriendShip = async (userId1, userId2) => {
    // create
    const request = {
      friendshipId: null,
      userId1: userId1,
      userId2: userId2,
      status: null,
      createAt: null,
      updatedAt: null,
    };

    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.post(
        "http://localhost:8080/friendship",
        request
      );
      if (response.status === 200) {
      }
    } catch (error) { }
  };

  // handle button of notification friend request

  const handleAcceptButtonFR = async (item) => {
    await saveFriendShip(item.senderId, item.receiverId);
    await getNotifications();
    setNotification(notificationService.defaultNotification);
  };

  const handleDeleteButtonFR = async (item) => {
    const friendRequest = await getFriendRequestBySenderIdAndReceiveId(
      item.senderId,
      item.receiverId
    );

    if (user.userId == friendRequest.senderUserId) {
      const updatedFriendRequest = {
        ...friendRequest,
        status: friendRequestService.status.THE_SENDER_CANCELED,
      };
      await friendRequestService.updateFriendRequest(updatedFriendRequest);
    } else if (user.userId == friendRequest.receiverUserId) {
      const updatedFriendRequest = {
        ...friendRequest,
        status: friendRequestService.status.THE_RECEIVER_CANCELED,
      };
      await friendRequestService.updateFriendRequest(updatedFriendRequest);
    }

    await getNotifications();
    setNotification(notificationService.defaultNotification);
  };

  // display notification 5s
  const fastNotificationRef = useRef(null);

  useEffect(() => {
    if (
      notification.notificationId != null &&
      notification.receiverId == user.userId
    ) {
      fastNotificationRef.current.style.display = "block";
      fastNotificationRef.current.style.opacity = "1";

      const timeout = setTimeout(() => {
        fastNotificationRef.current.style.opacity = "0";
        fastNotificationRef.current.style.display = "none";
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [notification]);

  // display block or none
  const notificationRef = useRef();

  const handleLocationPopupOpen = () => {
    if (!locationPopupOpen) {
      getNotifications();
    }

    setLocationPopupOpen(prev => !prev);
  };

  // click on notification
  const handleClickNotification = (item) => {
    setLocationPopupOpen(false)
    if (!item.isRead) {
      const updatedNotification = { ...item, read: true };
      notificationService.updateNotification(updatedNotification);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.group}>
          <div onClick={() => navigate(routes.home)} className={style.logo}>
            {/* <p>Chat Sphere</p> */}

            <img src={Logo_SocialSphere}></img>

            <p>Social Sphere</p>
          </div>

          <div className={style.menu}>
            <ul>
              <li onClick={() => navigate(routes.home)}>
                <OutlineHomeIcon className={style.menuIcon} />
              </li>
              <li onClick={() => navigate(routes.groupWall)}>
                <OutlineUserGroupIcon className={style.menuIcon} />
              </li>
              <li>
                <OutlineShopingBagIcon className={style.menuIcon} />
              </li>
              {/* <li className={style.notificationMenu}>
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
                    {notifications?.map((item, index) => {
                      return (
                        <div key={index}>
                          {item.type ==
                            notificationService.notificationType
                              .SEND_FRIEND_REQUEST && (
                              <div className={style.item}>
                                <Link
                                  className={style.link}
                                  onClick={() => handleClickNotification(item)}
                                  to={item.link}
                                >
                                  <div className={style.avatar}>
                                    <img src="https://haycafe.vn/wp-content/uploads/2022/10/Hinh-anh-avatar-nu-dep.jpg"></img>
                                  </div>

                                  <div className={style.content}>
                                    <div className={style.infor}>
                                      <p
                                        style={{
                                          color: item.read ? "#656565" : "black",
                                        }}
                                        className={style.text}
                                      >
                                        <span
                                          style={{
                                            color: item.read
                                              ? "#656565"
                                              : "black",
                                          }}
                                        >
                                          {item.sender.firstName + " " + item.sender.lastName}
                                        </span>
                                        sent you a friend request
                                      </p>

                                      <p
                                        style={{
                                          color: item.read
                                            ? "#656565"
                                            : "#0866ff",
                                          fontWeight: item.read ? 400 : 500,
                                        }}
                                        className={style.time}
                                      >
                                        {calculateTimeDifference(item.createdAt)}
                                      </p>
                                    </div>
                                  </div>
                                </Link>

                                <div className={style.button}>
                                  <button
                                    onClick={() => handleAcceptButtonFR(item)}
                                    className={style.acceptButton}
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() => handleDeleteButtonFR(item)}
                                    className={style.deleteButton}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                        </div>
                      );
                    })}

                  </div>

                  <div className={style.dropdownFooter}>
                    <p>View Notifications</p>
                  </div>
                </div>
              </li> */}

              <li className={style.notificationMenu}>
                <div onClick={handleLocationPopupOpen} className={style.buttonMenu}>
                  <OutlineBellIcon ref={notificationRef} className={style.menuIcon} />
                </div>

                <NotificationPopup
                  className={style.notificationPopup}
                  notificationLocation={notificationLocation}
                  setLocationPopupOpen={setLocationPopupOpen}
                  locationPopupOpen={locationPopupOpen}
                  handleDeleteButtonFR={handleDeleteButtonFR}
                  handleAcceptButtonFR={handleAcceptButtonFR}
                  notifications={notifications}
                  handleClickNotification={handleClickNotification}
                  notificationService={notificationService}
                />

              </li>

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
              <li onClick={() => navigate(routes.message)}>
                <OutlineChatIcon className={style.menuIcon} />
              </li>
              {user && <Link to={`${routes.userWall}?id=${user.userId}`}>
                <li>
                  <OutlineUserIcon className={style.menuIcon} />
                </li>
              </Link>}
            </ul>
          </div>

          <div className={style.search}>
            <div className={style.input}>
              <input
                value={state.keySearch}
                onChange={(e) => dispatch(actions.setKeySearch(e.target.value))}
                placeholder="Search for anything"
                onKeyDown={(e) => e.key === "Enter" && navigate(routes.search)}
              ></input>
              <FiSearch
                onClick={() => navigate(routes.search)}
                className={style.searchIcon}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={style.body}>{children}</div>

      <div ref={fastNotificationRef} className={style.notification}>
        {notification.notificationId !== null && (
          <div className={style.item}>
            <div className={style.title}>
              <p>New notification</p>
            </div>

            <Link className={style.link} to={notification.link}>
              <div className={style.avatar}>
                <img src="https://haycafe.vn/wp-content/uploads/2022/10/Hinh-anh-avatar-nu-dep.jpg"></img>
              </div>

              <div className={style.content}>
                <div className={style.infor}>
                  <p className={style.text}>
                    <span>{notification.sender.firstName + " " + notification.sender.lastName}</span>
                    sent you a friend request
                  </p>

                  <p className={style.time}>
                    {calculateTimeDifference(notification.createdAt)}
                  </p>
                </div>
              </div>
            </Link>

            <div className={style.button}>
              <button
                onClick={() => handleAcceptButtonFR(notification)}
                className={style.acceptButton}
              >
                Accept
              </button>
              <button
                onClick={() => handleDeleteButtonFR(notification)}
                className={style.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>



    </div>
  );
}

export default DefaultLayout;
