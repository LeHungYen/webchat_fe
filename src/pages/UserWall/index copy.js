import style from "./index.module.scss";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { HiUserAdd } from "react-icons/hi";
import { IoMdMail } from "react-icons/io";
import { MdCancelScheduleSend } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { FiUserX } from "react-icons/fi";
import { SlUserUnfollow } from "react-icons/sl";
import { SlUserFollow } from "react-icons/sl";
import { TbUserCancel } from "react-icons/tb";
import { SlUserFollowing } from "react-icons/sl";
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
  MicrophoneIcon as SolidMicrophoneIcon,
  CameraIcon as SolidCameraIcon,
  PencilIcon as SolidPencilIcon,
} from "@heroicons/react/solid";

import Posts from "./Posts";
import { Followers } from "./Followers";
import { Likes } from "./Likes";
import { Photos } from "./Photos";
import defaultAvatar from "../../assets/imgs/defaultAvatar.jpg";

import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

import { StoreContext, actions } from "../../store";
import clsx from "clsx";

// project files
import { UserService } from "../../serivces/UserService";
import { FriendRequestService } from "../../serivces/FriendRequestService";
import { FriendshipService } from "../../serivces/FriendshipService";
import { UserFollowingService } from "../../serivces/UserFollowingService";
import { NotificationService } from "../../serivces/NotificationService";

function UserWall() {
  const navigate = useNavigate();
  // const [state, dispatch] = useContext(StoreContext);

  const userService = new UserService();
  const friendRequestService = new FriendRequestService();
  const friendshipService = new FriendshipService();
  const userFollowingService = new UserFollowingService();
  const notificationService = new NotificationService();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  // get id from url
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("id");

  // recent content
  const [content, setContent] = useState("posts");

  // notification

  const [notification, setNotification] = useState(
    notificationService.defaultNotification
  );

  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    const token = JSON.parse(localStorage.getItem("userToken"));
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    client.connect(headers, () => {
      // client.subscribe('/topic/notification', (response) => {
      //     const receivedNotification = JSON.parse(response.body);
      //     setNotification(receivedNotification);
      // });
    });

    setStompClient(client);

    return () => {
      client.disconnect();
    };
  }, []);

  //get user
  const [user, setUser] = useState(userService.defaultUser);

  useEffect(() => {
    const fetchData = async () => {
      const response = await userService.getUserById(userId);
      setUser(response);
    };

    fetchData();
  }, []);

  //friend request

  const [friendRequest, setFriendRequest] = useState(
    friendRequestService.defaultFriendRequest
  );

  const getFriendRequestBySenderIdAndReceiveId = () => {
    const fetchData = async () => {
      const response = await friendRequestService.getBySenderIdAndReceiveId(
        currentUser.userId,
        userId
      );
      setFriendRequest(response);
    };
    fetchData();
  };

  useEffect(() => {
    getFriendRequestBySenderIdAndReceiveId();
  }, []);

  const deleteFriendRequest = () => {
    const fetchData = async () => {
      const response = await friendRequestService.deleteFriendRequest(
        friendRequest.requestId
      );
      setFriendRequest(response);
    };
    fetchData();
  };


  const addFriendRequest = () => {

    if (friendRequest.requestId == null) {
      const fetchData = async () => {
        const response = await friendRequestService.saveFriendRequest(
          currentUser.userId,
          userId
        );
        setFriendRequest(response);
      };
      fetchData();
    } else if (
      friendRequest.status == friendRequestService.status.THE_RECEIVER_CANCELED
    ) {
      const updatedFriendRequest = {
        ...friendRequest,
        status: friendRequestService.status.WAITING_FOR_THE_SENDER_TO_RESPONSE,
      };
      setFriendRequest(updatedFriendRequest);
      friendRequestService.updateFriendRequest(updatedFriendRequest);
    } else if (
      friendRequest.status == friendRequestService.status.THE_SENDER_CANCELED
    ) {
      const updatedFriendRequest = {
        ...friendRequest,
        status:
          friendRequestService.status.WAITING_FOR_THE_RECEIVER_TO_RESPONSE,
      };
      setFriendRequest(updatedFriendRequest);
      friendRequestService.updateFriendRequest(updatedFriendRequest);
    }
  };

  const refuseFriendRequest = () => {
    if (currentUser.userId == friendRequest.senderUserId) {
      const updatedFriendRequest = {
        ...friendRequest,
        status: friendRequestService.status.THE_SENDER_CANCELED,
      };
      setFriendRequest(updatedFriendRequest);
      friendRequestService.updateFriendRequest(updatedFriendRequest);
    } else if (currentUser.userId == friendRequest.receiverUserId) {
      const updatedFriendRequest = {
        ...friendRequest,
        status: friendRequestService.status.THE_RECEIVER_CANCELED,
      };
      setFriendRequest(updatedFriendRequest);
      friendRequestService.updateFriendRequest(updatedFriendRequest);
    }
    setResponseDisplay();
  };

  // user following

  const [userFollowing, setUserFollowing] = useState(
    userFollowingService.defaultUserFollowing
  );

  const saveUserFollowing = () => {
    const fetchData = async () => {
      const response = await userFollowingService.saveUserFollowing(
        currentUser.userId,
        userId
      );
      setUserFollowing(response);
    };
    fetchData();
  };

  const getUserFollowingByUserIdAndFollowingUserId = () => {
    const fetchData = async () => {
      const response =
        await userFollowingService.getUserFollowingByUserIdAndFollowingUserId(
          currentUser.userId,
          userId
        );
      setUserFollowing(response);
    };
    fetchData();
  };

  useEffect(() => {
    getUserFollowingByUserIdAndFollowingUserId();
  }, []);

  const deleteUserFollowing = () => {
    const fetchData = async () => {
      const response = await userFollowingService.deleteUserFollowing(
        userFollowing.followingId
      );
      setUserFollowing(response);
    };
    fetchData();
  };

  // friend ship

  const [friendShip, setFriendShip] = useState(
    friendshipService.defaultFriendShip
  );

  const saveFriendShip = async () => {
    const fetchData = async () => {
      const response = await friendshipService.saveFriendShip(
        friendRequest.senderUserId,
        friendRequest.receiverUserId
      );
      setFriendShip(response);
    };
    await fetchData();
    getUserFollowingByUserIdAndFollowingUserId();
    getFriendRequestBySenderIdAndReceiveId();
    setResponseDisplay();
  };
  console.log(friendShip);

  useEffect(() => {
    const fetchData = async () => {
      const response = await friendshipService.getFriendShipByUserId1AndUserId2(
        currentUser.userId,
        userId
      );
      setFriendShip(response);
    };
    fetchData();
  }, []);

  const deleteFriendShip = () => {
    const fetchData = async () => {
      const response = await friendshipService.deleteFriendShip(
        friendShip.friendshipId,
        friendShip.userId1,
        friendShip.userId2
      );
      setFriendShip(response);
    };
    fetchData();
    getUserFollowingByUserIdAndFollowingUserId();
    setFriendshipRef();
  };

  //display block or none
  const responseRef = useRef();
  const setResponseDisplay = () => {
    const currentDisplay = window.getComputedStyle(responseRef.current).display;
    if (currentDisplay == "none") {
      responseRef.current.style.display = "block";
    } else {
      responseRef.current.style.display = "none";
    }
  };

  const friendshipRef = useRef();
  const setFriendshipRef = () => {
    const currentDisplay = window.getComputedStyle(
      friendshipRef.current
    ).display;
    if (currentDisplay == "none") {
      friendshipRef.current.style.display = "block";
    } else {
      friendshipRef.current.style.display = "none";
    }
  };

  const ellipsisHorizontalMenuRef = useRef();
  const setEllipsisHorizontalMenuRef = () => {
    const currentDisplay = window.getComputedStyle(
      ellipsisHorizontalMenuRef.current
    ).display;
    if (currentDisplay == "none") {
      ellipsisHorizontalMenuRef.current.style.display = "block";
    } else {
      ellipsisHorizontalMenuRef.current.style.display = "none";
    }
  };

  return (
    <div className={style.container}>
      <div className={style.userWall}>
        <div className={style.background}>
          <img
            src="https://images.alphacoders.com/133/1339872.png"
            alt="background img"
          ></img>
          <div className={style.editCoverPhoto}>
            <button>
              <SolidCameraIcon className={style.cameraIcon} />
              Edit Cover Photo
            </button>
          </div>
        </div>

        <div className={style.infor}>
          <div className={style.avatar}>
            <img src="https://antimatter.vn/wp-content/uploads/2022/04/hinh-anh-avatar-nu.jpg"></img>
            <div className={style.editAvatarPhoto}>
              <button>
                <SolidCameraIcon className={style.cameraIcon} />
              </button>
            </div>
          </div>

          <div className={style.columns}>
            <div className={style.column1}>
              <p className={style.name}>{user.fullName}</p>
              {/* <p className={style.job}>UI/UX Designer</p> */}
              <p className={style.job}>{user.email}</p>
              {/* <p className={style.friend}>216 friends</p> */}
            </div>

            {/* owner */}
            {currentUser.userId == userId && (
              <div className={style.column2}>
                <div className={style.buttons}>
                  <div className={style.button}>
                    <button>
                      <SolidPencilIcon className={style.icon} /> Edit Profile
                    </button>
                  </div>
                  <div className={style.button}>
                    <button>
                      <SolidShareIcon className={style.icon} /> Share
                    </button>
                  </div>
                </div>

                <div className={style.button}>
                  <button>
                    <IoIosArrowDown className={style.iconDown} />
                  </button>
                </div>
              </div>
            )}

            {/* other user */}
            {currentUser.userId != userId && (
              <div className={style.column2}>
                <div className={style.buttons}>
                  <div
                    className={clsx(style.button, style.buttonFriendRequest)}
                  >
                    {friendRequest.requestId == null &&
                      friendShip.friendshipId == null && (
                        <button onClick={addFriendRequest}>
                          <HiUserAdd className={style.icon} /> Add friend
                        </button>
                      )}

                    {friendRequest.status == "THE_SENDER_CANCELED" &&
                      currentUser.userId == friendRequest.senderUserId && (
                        <button onClick={addFriendRequest}>
                          <HiUserAdd className={style.icon} /> Add friend
                        </button>
                      )}

                    {friendRequest.status == "THE_RECEIVER_CANCELED" &&
                      currentUser.userId == friendRequest.receiverUserId && (
                        <button onClick={addFriendRequest}>
                          <HiUserAdd className={style.icon} /> Add friend
                        </button>
                      )}

                    {friendRequest.requestId != null &&
                      friendRequest.status ==
                        "WAITING_FOR_THE_RECEIVER_TO_RESPONSE" &&
                        currentUser.userId == friendRequest.senderUserId && (
                        <button onClick={deleteFriendRequest}>
                          <MdCancelScheduleSend className={style.icon} /> Cancel
                          request
                        </button>
                      )}

                    {friendRequest.requestId != null &&
                      friendRequest.status ==
                        "WAITING_FOR_THE_SENDER_TO_RESPONSE" &&
                        currentUser.userId == friendRequest.receiverUserId && (
                        <button onClick={deleteFriendRequest}>
                          <MdCancelScheduleSend className={style.icon} /> Cancel
                          request
                        </button>
                      )}

                    {friendRequest.requestId != null &&
                      friendRequest.status ==
                        "WAITING_FOR_THE_RECEIVER_TO_RESPONSE" &&
                        currentUser.userId == friendRequest.receiverUserId && (
                        <button
                          onClick={() => setResponseDisplay((prev) => !prev)}
                        >
                          <FaUserCheck className={style.icon} /> Respond
                        </button>
                      )}

                    {friendRequest.requestId != null &&
                      friendRequest.status ==
                        "WAITING_FOR_THE_SENDER_TO_RESPONSE" &&
                        currentUser.userId == friendRequest.senderUserId && (
                        <button
                          onClick={() => setResponseDisplay((prev) => !prev)}
                        >
                          <FaUserCheck className={style.icon} /> Respond
                        </button>
                      )}

                    {friendRequest.requestId == null &&
                      friendShip.friendshipId != null && (
                        <button onClick={setFriendshipRef}>
                          <FaUserCheck className={style.icon} /> Friends
                        </button>
                      )}

                    {friendRequest.requestId != null &&
                      friendRequest.status == "THE_SENDER_CANCELED" &&
                      currentUser.userId == friendRequest.receiverUserId &&
                      userFollowing != null &&
                      userFollowing.userId == currentUser.userId && (
                        <button onClick={deleteUserFollowing}>
                          <SlUserFollowing className={style.icon} /> Following
                        </button>
                      )}

                    {friendRequest.requestId != null &&
                      friendRequest.status == "THE_RECEIVER_CANCELED" &&
                      currentUser.userId == friendRequest.senderUserId &&
                      userFollowing != null &&
                      userFollowing.userId == currentUser.userId && (
                        <button onClick={deleteUserFollowing}>
                          <SlUserFollowing className={style.icon} /> Following
                        </button>
                      )}

                    {friendRequest.requestId != null &&
                      friendRequest.status == "THE_SENDER_CANCELED" &&
                      currentUser.userId == friendRequest.receiverUserId &&
                      userFollowing.followingId == null && (
                        <button onClick={saveUserFollowing}>
                          <SlUserFollow className={style.icon} /> Follow
                        </button>
                      )}

                    {friendRequest.requestId != null &&
                      friendRequest.status == "THE_RECEIVER_CANCELED" &&
                      currentUser.userId == friendRequest.senderUserId &&
                      userFollowing.followingId == null && (
                        <button onClick={saveUserFollowing}>
                          <SlUserFollow className={style.icon} /> Follow
                        </button>
                      )}

                    <div ref={responseRef} className={style.response}>
                      <button onClick={saveFriendShip}>
                        <IoIosCheckmarkCircle className={style.icon} /> Confirm
                      </button>
                      <button onClick={refuseFriendRequest}>
                        <MdCancel className={style.icon} /> Delete request
                      </button>
                    </div>

                    <div ref={friendshipRef} className={style.friendship}>
                      {/* <button ><FaRegStar className={style.icon} /> Favorites</button>
                                        <button ><FaStar className={style.icon} /> Favorites</button> */}
                      {userFollowing.followingId == null && (
                        <button onClick={saveUserFollowing}>
                          <SlUserFollow className={style.icon} /> Follow
                        </button>
                      )}
                      {userFollowing.followingId != null && (
                        <button onClick={deleteUserFollowing}>
                          <SlUserUnfollow className={style.icon} /> Unfollow
                        </button>
                      )}

                      <button onClick={deleteFriendShip}>
                        <FiUserX className={style.icon} /> Unfriend
                      </button>
                    </div>
                  </div>

                  <div className={style.button}>
                    <button>
                      <IoMdMail className={style.icon} /> Message
                    </button>
                  </div>

                  <div className={style.button}>
                    <button>
                      <IoIosArrowDown className={style.icon} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={style.menu}>
          <div className={style.column1}>
            <ul>
              <li onClick={() => setContent("followers")}>
                <button>Follower</button>
              </li>
              <li onClick={() => setContent("fans")}>
                <button>Fans</button>
              </li>
              <li onClick={() => setContent("likes")}>
                <button>Likes</button>
              </li>
              <li onClick={() => setContent("posts")}>
                <button>Posts</button>
              </li>
              <li onClick={() => setContent("photos")}>
                <button>Photos</button>
              </li>
              <li onClick={() => setContent("video")}>
                <button>Video</button>
              </li>
              <li onClick={() => setContent("audio")}>
                <button>Audio</button>
              </li>
              <li onClick={() => setContent("vault")}>
                <button>Vault</button>
              </li>
            </ul>
          </div>

          <div className={style.column2}>
            <div className={style.button}>
              <button onClick={setEllipsisHorizontalMenuRef}>
                {" "}
                <HiMiniEllipsisHorizontal className={style.icon} />
              </button>

              <div
                ref={ellipsisHorizontalMenuRef}
                className={style.ellipsisHorizontalMenu}
              >
                {friendRequest.requestId != null &&
                  friendRequest.status == "THE_RECEIVER_CANCELED" &&
                  currentUser.userId != friendRequest.senderUserId &&
                  userFollowing.followingId == null && (
                    <button onClick={saveUserFollowing}>
                      <SlUserFollow className={style.icon} /> Follow
                    </button>
                  )}

                {friendRequest.requestId != null &&
                  friendRequest.status == "THE_SENDER_CANCELED" &&
                  currentUser.userId != friendRequest.receiverUserId &&
                  userFollowing.followingId == null && (
                    <button onClick={saveUserFollowing}>
                      <SlUserFollow className={style.icon} /> Follow
                    </button>
                  )}

                {friendRequest.requestId != null &&
                  friendRequest.status == "THE_SENDER_CANCELED" &&
                  currentUser.userId != friendRequest.receiverUserId &&
                  userFollowing.followingId != null &&
                  userFollowing.userId == currentUser.userId && (
                    <button onClick={deleteUserFollowing}>
                      <SlUserFollowing className={style.icon} /> Unfollow
                    </button>
                  )}

                {friendRequest.requestId != null &&
                  friendRequest.status == "THE_RECEIVER_CANCELED" &&
                  currentUser.userId != friendRequest.senderUserId &&
                  userFollowing.followingId != null &&
                  userFollowing.userId == currentUser.userId && (
                    <button onClick={deleteUserFollowing}>
                      <SlUserFollowing className={style.icon} /> Unfollow
                    </button>
                  )}

                <button>
                  <TbUserCancel className={style.iconBlock} /> Block
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.content}>
        {content == "posts" && <Posts />}

        {content == "followers" && <Followers />}

        {content == "likes" && <Likes />}

        {content == "photos" && <Photos />}
      </div>
    </div>
  );
}

export default UserWall;
