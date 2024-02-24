import style from "./index.module.scss";

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
  MicrophoneIcon as OutlineMicrophoneIcon,
} from "@heroicons/react/outline";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate, Link } from "react-router-dom";
import { routes } from "../../config/routes";
import { useState, useContext, useRef, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

// project files
import { StoreContext, actions } from "../../store";
import { calculateTimeDifference } from "../../utils";
import { NotificationService } from "../../serivces/NotificationService";
import { FriendRequestService } from "../../serivces/FriendRequestService";
import { UserService } from "../../serivces/UserService";
function DefaultLayout({ children, keySearch, setKeySearch }) {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(StoreContext);
  const notificationService = new NotificationService();
  const friendRequestService = new FriendRequestService();
  const userService = new UserService();
  const userIdRef = useRef(null); // contain userId

  // get current user infor
  const getUserInfor = async () => {
    const response = await userService.getCurrentUser();
    userIdRef.current = response.userId;
    dispatch(actions.setUser(response));
    return response;
  };

  // useEffect(() => {
  //   getUserInfor();
  // }, []);

  // notification
  const [notification, setNotification] = useState(
    notificationService.defaultNotification
  );

  const [stompClient, setStompClient] = useState(null);
  const stompClientRef = useRef(null);
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    const token = JSON.parse(localStorage.getItem("userToken"));
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    client.connect(headers, async () => {
      client.subscribe("/topic/notification", (response) => {
        const receivedNotification = JSON.parse(response.body);
        if (receivedNotification.receiverId == state.user.userId) {
          setNotification(receivedNotification);
          getNotifications();
        }
      });

      // client.subscribe("/topic/connect", (response) => {
      //   const receivedNotification = JSON.parse(response.body);
      // });

      // client.subscribe("/topic/disconnect", (response) => {
      //   const receivedNotification = JSON.parse(response.body);
      // });

      await getUserInfor();
      client.send("/app/connect", {}, JSON.stringify(userIdRef.current));

      stompClientRef.current = client;
    });
    setStompClient(client);
    return () => {
      client.disconnect();
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
    } catch (error) {}
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

    if (state.user.userId == friendRequest.senderUserId) {
      const updatedFriendRequest = {
        ...friendRequest,
        status: friendRequestService.status.THE_SENDER_CANCELED,
      };
      await friendRequestService.updateFriendRequest(updatedFriendRequest);
    } else if (state.user.userId == friendRequest.receiverUserId) {
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
      notification.receiverId === state.user.userId
    ) {
      fastNotificationRef.current.style.display = "block";
      fastNotificationRef.current.style.opacity = "1";

      const timeout = setTimeout(() => {
        fastNotificationRef.current.style.opacity = "0";
        fastNotificationRef.current.style.display = "none";
      }, 55000);

      return () => clearTimeout(timeout);
    }
  }, [notification]);

  // display block or none
  const notificationRef = useRef();

  const setNotificationRef = () => {
    const currentDisplay = window.getComputedStyle(
      notificationRef.current
    ).display;
    if (currentDisplay === "none") {
      getNotifications();
      notificationRef.current.style.display = "block";
    } else {
      notificationRef.current.style.display = "none";
    }
  };

  // click on notification
  const handleClickNotification = (item) => {
    setNotificationRef();

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

            <img src="data:image/jpeg;base64,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bHnDqwAySygoAAAAAIAA3NNL38vntrDXrtfYx1CUAAAa987GpoeG+NhvgKLEVBUFgCGEs9+QB6nW2j5/eE9AAnz2PT5ndyh6iwZJZ6AJQEIKgqCoSoKgqC3Em3scx49dnPhvPruY8UdbX0Xrz6YR78VBUqUQAAABIlYj1BEvZ5nf5+gObpAAAcHveGmfCHbzgtuNihQgAKBAAQAAAEAABAAAGUsBAAUAxBjcLA9RZ0PN3/c4O4JQAAAOXz/pOF1YeA38AW4jIQAACAAAgAAAIAAAAqwAACCCFDEkPUFPX6Dx9uLqDLUAAAABjkT57DucPtwQ08gXLAZpYAESpQQoBEqUEKgqVABSUioKgsAQsigRgeoA7Hl0+boDm3AAAAAAAau0s+bnc4nbhBp5AWIyuGQEVCAWAACACigEAAAAEllgDGrilgqTpXqc24c3QAAAAAAAAA8fZZ895fScLsx8Ua+AALcRmwyipZAAAARYMkoEACVUhYAlWYxLD1BlGPU99zl3Dn3AAAAAAAAAAAA5Gh9NqdOXEenn05AAAAluIyvnTNgM2FjJjEzvmPR5D1mAzmIyYys5iSwoAvR83V7Xq4ugM9AAAAAAAAAAAAAAHL6j35+ZfScrqy0CbeKgsAAEAAAABAAACEpsy6211Nnm18/Q5tgUAAAAAAAAAAAAAAAABzek9efnvH6fX6PHAdHS2z8x7gAAiVBUFQAljIxbu7n74+92GGnj7GGgSgAAAAAAAAAAAAAAAAAAAAAY6m69eeT4d1p5+c8vqHufLvqHvz8u+ktfNT6fLy+b9PoHj1x9joPHrx9jP0EoAAAAAAAAAAAH/8QAAv/aAAwDAQACAAMAAAAh8888888888882xc9uIRRszx8888888888888888888884pXPe7jCMd9wzDN7288888888888888887hs++6mMN9yzDGe99wQz88888888888888yV/7CPxh4zDGe984hBBEvb/8APPPPPPPPPPJGYhjXbzkhjvfMIRQHv+8og1tPPPPPPPPPIQgVOdDAp/feIBzvv84AAQXPPLPPPPPPPPOTuXfvvfVuIRzn+88IQRPPv9+s8xNvPPPPP0ckMcYQACji8NDTTXHfe88sM97DPWvPPPPKA4whj3//AOiX7zzzzzzzEMNEMIIJLDBzzzyv23/7rLKEFfzzzzzzzztz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xnLHHUx33PDH/wA888888H6D3yxwikOcU88845994GPPc9n88888888tZzO8994w96he888kxgOLywsPN+885Evew0PO3DBFNOe//ue+87EdyHOOf5w0/wDPLPYnXOQDnv8A/PGAGFDjELzk/wD5ADHbwg8Q8888qN/4Bh++/wD9u9+s3nrfj7wBQ8fDV+rRePPPPDYwAsU4xzjTjDTDfDdhjjsUvPRGMLj+FP8Azzyzx+vEEAEOIMJJCcx2kx/AR/oNiGI87+Hnzzzx6V7337z3z32yMLbjwvL0jHY9LMUQVXzv3zzzwY0ww0ww0x/CGZGEzuI3kEB7rfz/AAwAG1888/1+/wD/AL3z2wMJfucxkY/rMAXj/wA857wFdt/88/JNMNMNOdwANR0LClMJQ3uf388uAzx6yA088YyzyzyzkC156yFM7PP+7FM388su6OMMN188sMNNMNNd85fuhM91mMX6BNK9888IKDDC4884CDCCDDkfq9463OlLygwD5s78888N7Y9888ENMAY5kxwz88aBQiEc94izDCl188888888uAFf/wD6JDzn/PG4i6R8xvv+5c/wM/PPPPN+XuzTTXLgRTXPPL8scOMOMfTjjzjTjTXrPLjPU8ccc98t+vPPPC+cF9fs+MOdcNcNMfcYUMewhkcfv+Z/PPPPPPQIBX7vj7j73r3rXP7voAggx4ADjh/PPPPPPTk8qQMZSBQBSBTCRjkgAEN2Ok8pPPPPPPPPP0fMbofj/nvvsswQAADHMThRO+vPPPPPPPPPLGTucMCjzjzvz/f/AP0c/isUvdzzzzzzzzzzzy6w1IPKNLjnvWMXXr03/LSfzzzzzzzzzzzzzzxyk01PKM4MY73jXi0a/wC888888888888888888fGPRx01MNJ9Z8V/88888888888888888888888dt+OCXcfP8888888888888//EAEARAAIBAwAGBgYGCgIDAAAAAAECAwAEEQUQEiAhMRMiMEFRcTJAQlJhkRQjYoGhsQYVM1NygpLB0eE0okRkc//aAAgBAgEBPwDswCxwASaSznfmAo+NJo8e3J8qW0t19jPmaWGJeUa/KujT3B8q6NPcHyro09xflRt4G5xLTWEDcgV8jT6OPsSA+dPazx84zjxHH1aOGSU9RfvqKwUcZDtfAUkaIMKoG/jdktoZfSQZ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"></img>

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
                                        {item.sender.fullName}
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
              <li onClick={() => navigate(routes.message)}>
                <OutlineChatIcon className={style.menuIcon} />
              </li>
              <Link to={`${routes.userWall}?id=${state.user.userId}`}>
                <li>
                  <OutlineUserIcon className={style.menuIcon} />
                </li>
              </Link>
            </ul>
          </div>

          <div className={style.search}>
            <div className={style.input}>
              <input
                value={state.keySearch}
                onChange={(e) => dispatch(actions.setKeySearch(e.target.value))}
                placeholder="Search for anything"
              ></input>
              <OutlineSearchIcon
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
                    <span>{notification.sender.fullName}</span>
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
