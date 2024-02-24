// import style from './index.module.scss'
// import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
// import { IoIosArrowDown } from "react-icons/io";
// import { HiUserAdd } from "react-icons/hi";
// import { IoMdMail } from "react-icons/io";
// import { MdCancelScheduleSend } from "react-icons/md";
// import { FaUserCheck } from "react-icons/fa";
// import { IoIosCheckmarkCircle } from "react-icons/io";
// import { MdCancel } from "react-icons/md";
// import { FiUserX } from "react-icons/fi";
// import { SlUserUnfollow } from "react-icons/sl";
// import { SlUserFollow } from "react-icons/sl";
// import { TbUserCancel } from "react-icons/tb";
// import { SlUserFollowing } from "react-icons/sl";
// import {
//     HomeIcon as SolidHomeIcon,
//     UserGroupIcon as SolidUserGroupIcon,
//     ShoppingBagIcon as SolidShopingBagIcon,
//     BellIcon as SolidBellIcon,
//     ChatIcon as SolidChatIcon,
//     UserIcon as SolidUserIcon,
//     SearchIcon as SolidSearchIcon,
//     UserAddIcon as SolidUserAddIcon,
//     CogIcon as SolidCogIcon,
//     PhotographIcon as SolidPhotoIcon,
//     VideoCameraIcon as SolidVideoCameraIcon,
//     CalendarIcon as SolidCalendarIcon,
//     ShareIcon as SolidShareIcon,
//     MicrophoneIcon as SolidMicrophoneIcon,
//     CameraIcon as SolidCameraIcon,
//     PencilIcon as SolidPencilIcon,
// } from '@heroicons/react/solid'

// import Posts from './Posts';
// import { Followers } from './Followers';
// import { Likes } from './Likes';
// import { Photos } from './Photos';
// import defaultAvatar from '../../assets/imgs/defaultAvatar.jpg'

// import axios from 'axios'
// import { useState, useEffect, useContext, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import Stomp from 'stompjs';
// import SockJS from 'sockjs-client';

// import { StoreContext, actions } from '../../store';
// import clsx from 'clsx';
// function UserWall() {
//     const navigate = useNavigate();
//     const [state, dispatch] = useContext(StoreContext)

//     // get id from url
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search)
//     const userId = searchParams.get('id');

//     // recent content
//     const [content, setContent] = useState("posts");

//     // notification
//     const notificationType = {
//         sendFriendRequest: "SEND_FRIEND_REQUEST"
//     };

//     const defaultNotification = {
//         notificationId: null,
//         senderId: null,
//         receiverId: null,
//         type: null,
//         link: null,
//         isRead: null,
//         createAt: null
//     };

//     const [notification, setNotification] = useState(defaultNotification);

//     const [stompClient, setStompClient] = useState(null);

//     useEffect(() => {
//         const socket = new SockJS("http://localhost:8080/ws");
//         const client = Stomp.over(socket);

//         const token = JSON.parse(localStorage.getItem("userToken"));
//         const headers = {
//             Authorization: `Bearer ${token}`
//         };
 
//         client.connect(headers, () => {
//             client.subscribe('/topic/notification', (response) => {
//                 const receivedNotification = JSON.parse(response.body);
//                 setNotification(receivedNotification);
//             });
//         });

//         setStompClient(client);

//         return () => {
//             client.disconnect();
//         };

//     }, []);

//     const sendNotification = (data) => {
//         stompClient.send("/app/notification", {}, JSON.stringify(data));
//         setNotification(defaultNotification)
//     }

//     //get user
//     const [user, setUser] = useState({
//         bio: null,
//         birthdate: null,
//         coverPhoto: null,
//         email: null,
//         fullName: null,
//         gender: null,
//         lastLogin: null,
//         password: null,
//         phoneNumber: null,
//         profilePicture: null,
//         registrationDate: null,
//         role: null,
//         status: null,
//         userId: null,
//         username: null,
//         website: null
//     });

//     const getUserById = async () => {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`;
//         try {
//             const response = await axios.get("http://localhost:8080/user/" + userId);
//             if (response.status === 200) {
//                 setUser(response.data)
//             }
//         } catch (error) {

//         }
//     };

//     useEffect(() => {
//         getUserById();
//     }, [])

//     //friend request
//     const defaultFriendRequest = {
//         requestId: null,
//         senderUserId: null,
//         receiverUserId: null,
//         status: null,
//         createAt: null
//     }

//     const [friendRequest, setFriendRequest] = useState(defaultFriendRequest)

//     const saveFriendRequest = async () => {     // create
//         const request = {
//             requestId: null,
//             senderUserId: state.user.userId,
//             receiverUserId: userId,
//             status: "WAITING_FOR_THE_RECEIVER_TO_RESPONSE",
//             createAt: null
//         };

//         axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`;
//         try {
//             const response = await axios.post("http://localhost:8080/friendrequest", request);
//             if (response.status === 200) {
//                 setFriendRequest({ ...request, requestId: response.data })
//                 saveUserFollowing();
//             }
//         } catch (error) {

//         }
//     };

//     const updateFriendRequest = async (requestBody) => {     // update
//         axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`;
//         try {
//             const response = await axios.put(`http://localhost:8080/friendrequest/${friendRequest.requestId}`, requestBody);
//             if (response.status === 200) {

//             }
//         } catch (error) {

//         }
//     };




//     const getBySenderIdAndReceiveId = async () => {  // get
//         axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`;
//         try {
//             const response = await axios.get(`http://localhost:8080/friendrequest/findBySenderIdAndReceiverId/?senderId=${state.user.userId}&receiverId=${userId}`);
//             if (response.status === 200) {
//                 setFriendRequest(response.data)
//             }
//         } catch (error) {
//             if (error.response.status == 404) {
//                 setFriendRequest(defaultFriendRequest)
//             }
//         }
//     };

//     useEffect(() => {
//         getBySenderIdAndReceiveId();
//     }, [])

//     const deleteFriendRequest = async () => {  // delete
//         axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`;
//         try {
//             const response = await axios.delete(`http://localhost:8080/friendrequest/${friendRequest.requestId}`);
//             if (response.status === 200) {
//                 setFriendRequest(defaultFriendRequest)
//             }
//         } catch (error) {

//         }
//     };

//     const addFriendRequest = () => {

//         sendNotification(
//             {
//                 notificationId: null,
//                 senderId: state.user.userId,
//                 receiverId: userId,
//                 type: notificationType.sendFriendRequest,
//                 link: `http://localhost:3000/userWall?id=${state.user.userId}`,
//                 isRead: false,
//                 createAt: null
//             }
//         );
//         if (friendRequest.requestId === null) {
//             saveFriendRequest();
//         } else if (friendRequest.status == "THE_RECEIVER_CANCELED") {
//             const updatedFriendRequest = { ...friendRequest, status: "WAITING_FOR_THE_SENDER_TO_RESPONSE" };
//             setFriendRequest(updatedFriendRequest)
//             updateFriendRequest(updatedFriendRequest)
//         } else if (friendRequest.status == "THE_SENDER_CANCELED") {
//             const updatedFriendRequest = { ...friendRequest, status: "WAITING_FOR_THE_RECEIVER_TO_RESPONSE" };
//             setFriendRequest(updatedFriendRequest)
//             updateFriendRequest(updatedFriendRequest)
//         }

//     }

//     const refuseFriendRequest = () => {
//         if (state.user.userId == friendRequest.senderUserId) {
//             const updatedFriendRequest = { ...friendRequest, status: "THE_SENDER_CANCELED" }
//             setFriendRequest(updateFriendRequest);
//             updateFriendRequest(updatedFriendRequest);
//         } else if (state.user.userId == friendRequest.receiverUserId) {
//             const updatedFriendRequest = { ...friendRequest, status: "THE_RECEIVER_CANCELED" }
//             setFriendRequest(updatedFriendRequest);
//             updateFriendRequest(updatedFriendRequest);
//         }
//         setResponseDisplay();
//     }



//     // user following
//     const defaultUserFollowing = {
//         followingId: null,
//         userId: null,
//         followingUserId: null,
//         followDate: null
//     };

//     const [userFollowing, setUserFollowing] = useState(defaultUserFollowing)

//     const saveUserFollowing = async () => {     // create
//         const request = {
//             followingId: null,
//             userId: state.user.userId,
//             followingUserId: userId,
//             followDate: null
//         };

//         axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`;
//         try {
//             const response = await axios.post("http://localhost:8080/userfollowing", request);
//             if (response.status === 200) {
//                 setUserFollowing({ ...request, followingId: response.data });
//             }
//         } catch (error) {

//         }
//     };

//     const getUserFollowingByUserIdAndFollowingUserId = async () => {  // get
//         axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`;
//         try {
//             const response = await axios.get(`http://localhost:8080/userfollowing/findByUserIdAndFollowingUserId?userId=${state.user.userId}&followingUserId=${userId}`);
//             if (response.status === 200) {
//                 setUserFollowing(response.data)
//             }
//         } catch (error) {
//             if (error.response.status == 404) {
//                 setUserFollowing(defaultUserFollowing);
//             }
//         }
//     };

//     useEffect(() => {
//         getUserFollowingByUserIdAndFollowingUserId();
//     }, [])

//     const deleteUserFollowing = async () => {  // delete
//         axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`;
//         try {
//             const response = await axios.delete(`http://localhost:8080/userfollowing/${userFollowing.followingId}`);
//             if (response.status === 200) {
//                 setUserFollowing(defaultUserFollowing)
//             }
//         } catch (error) {

//         }
//     };

//     // friend ship
//     const defaultFriendShip = {
//         friendshipId: null,
//         userId1: null,
//         userId2: null,
//         status: null,
//         createAt: null,
//         updatedAt: null
//     }

//     const [friendShip, setFriendShip] = useState(defaultFriendShip)

//     const saveFriendShip = async () => {     // create
//         setResponseDisplay();
//         const request = {
//             friendshipId: null,
//             userId1: friendRequest.senderUserId,
//             userId2: friendRequest.receiverUserId,
//             status: null,
//             createAt: null,
//             updatedAt: null
//         };

//         axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`;
//         try {
//             const response = await axios.post("http://localhost:8080/friendship", request);
//             if (response.status === 200) {
//                 setFriendShip({ ...request, friendshipId: response.data });
//                 deleteFriendRequest();
//                 saveUserFollowing();
//             }
//         } catch (error) {

//         }
//     };

//     const getFriendShipByUserId1AndUserId2 = async () => {  // get
//         axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`;
//         try {
//             const response = await axios.get(`http://localhost:8080/friendship/findByUserId1AndUserId2?userId1=${state.user.userId}&userId2=${userId}`);
//             if (response.status === 200) {
//                 setFriendShip(response.data)
//             }
//         } catch (error) {
//             if (error.response.status == 404) {
//                 setFriendShip(defaultFriendShip)
//             }
//         }
//     };

//     useEffect(() => {
//         getFriendShipByUserId1AndUserId2();
//     }, [])

//     const deleteFriendShip = async () => {  // delete
//         setFriendshipRef();
//         axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("userToken"))}`;
//         try {
//             const response = await axios.delete(`http://localhost:8080/friendship?friendshipId=${friendShip.friendshipId}&userId1=${friendShip.userId1}&userId2=${friendShip.userId2}`, friendShip);
//             if (response.status === 200) {
//                 setFriendShip(defaultFriendShip)
//             }
//         } catch (error) {

//         }
//     };

//     //display block or none
//     const responseRef = useRef();
//     const setResponseDisplay = () => {
//         const currentDisplay = window.getComputedStyle(responseRef.current).display;
//         if (currentDisplay == "none") {
//             responseRef.current.style.display = "block"
//         } else {
//             responseRef.current.style.display = "none"
//         }
//     }

//     const friendshipRef = useRef();
//     const setFriendshipRef = () => {
//         const currentDisplay = window.getComputedStyle(friendshipRef.current).display;
//         if (currentDisplay == "none") {
//             friendshipRef.current.style.display = "block"
//         } else {
//             friendshipRef.current.style.display = "none"
//         }
//     }

//     const ellipsisHorizontalMenuRef = useRef();
//     const setEllipsisHorizontalMenuRef = () => {
//         const currentDisplay = window.getComputedStyle(ellipsisHorizontalMenuRef.current).display;
//         if (currentDisplay == "none") {
//             ellipsisHorizontalMenuRef.current.style.display = "block"
//         } else {
//             ellipsisHorizontalMenuRef.current.style.display = "none"
//         }
//     }

//     return (
//         <div className={style.container}>

//             <div className={style.userWall}>
//                 <div className={style.background}>
//                     <img src="https://images.alphacoders.com/133/1339872.png" alt='background img'></img>
//                     <div className={style.editCoverPhoto}>
//                         <button><SolidCameraIcon className={style.cameraIcon} />Edit Cover Photo</button>
//                     </div>
//                 </div>


//                 <div className={style.infor}>
//                     <div className={style.avatar}>
//                         <img src="https://antimatter.vn/wp-content/uploads/2022/04/hinh-anh-avatar-nu.jpg"></img>
//                         <div className={style.editAvatarPhoto}>
//                             <button><SolidCameraIcon className={style.cameraIcon} /></button>
//                         </div>
//                     </div>

//                     <div className={style.columns}>
//                         <div className={style.column1}>
//                             <p className={style.name}>{user.fullName}</p>
//                             {/* <p className={style.job}>UI/UX Designer</p> */}
//                             <p className={style.job}>{user.email}</p>
//                             {/* <p className={style.friend}>216 friends</p> */}
//                         </div>

//                         {/* owner */}
//                         {state.user.userId == userId && <div className={style.column2}>
//                             <div className={style.buttons}>
//                                 <div className={style.button}>
//                                     <button><SolidPencilIcon className={style.icon} /> Edit Profile</button>
//                                 </div>
//                                 <div className={style.button}>
//                                     <button><SolidShareIcon className={style.icon} /> Share</button>
//                                 </div>
//                             </div>

//                             <div className={style.button}>
//                                 <button><IoIosArrowDown className={style.iconDown} /></button>
//                             </div>
//                         </div>}

//                         {/* other user */}
//                         {state.user.userId != userId && <div className={style.column2}>
//                             <div className={style.buttons}>
//                                 <div className={clsx(style.button, style.buttonFriendRequest)}>


//                                     {
//                                         friendRequest.requestId == null &&
//                                         friendShip.friendshipId == null &&
//                                         <button onClick={addFriendRequest}><HiUserAdd className={style.icon} /> Add friend</button>
//                                     }

//                                     {
//                                         friendRequest.status == "THE_SENDER_CANCELED" &&
//                                         state.user.userId == friendRequest.senderUserId &&
//                                         <button onClick={addFriendRequest}><HiUserAdd className={style.icon} /> Add friend</button>
//                                     }

//                                     {
//                                         friendRequest.status == "THE_RECEIVER_CANCELED" &&
//                                         state.user.userId == friendRequest.receiverUserId &&
//                                         <button onClick={addFriendRequest}><HiUserAdd className={style.icon} /> Add friend</button>
//                                     }

//                                     {
//                                         friendRequest.requestId != null &&
//                                         friendRequest.status == "WAITING_FOR_THE_RECEIVER_TO_RESPONSE" &&
//                                         state.user.userId == friendRequest.senderUserId &&
//                                         <button onClick={deleteFriendRequest}><MdCancelScheduleSend className={style.icon} /> Cancel request</button>
//                                     }

//                                     {
//                                         friendRequest.requestId != null &&
//                                         friendRequest.status == "WAITING_FOR_THE_SENDER_TO_RESPONSE" &&
//                                         state.user.userId == friendRequest.receiverUserId &&
//                                         <button onClick={deleteFriendRequest}><MdCancelScheduleSend className={style.icon} /> Cancel request</button>
//                                     }

//                                     {
//                                         friendRequest.requestId != null &&
//                                         friendRequest.status == "WAITING_FOR_THE_RECEIVER_TO_RESPONSE" &&
//                                         state.user.userId == friendRequest.receiverUserId &&
//                                         <button onClick={() => setResponseDisplay(prev => !prev)}><FaUserCheck className={style.icon} /> Respond</button>
//                                     }

//                                     {
//                                         friendRequest.requestId != null &&
//                                         friendRequest.status == "WAITING_FOR_THE_SENDER_TO_RESPONSE" &&
//                                         state.user.userId == friendRequest.senderUserId &&
//                                         <button onClick={() => setResponseDisplay(prev => !prev)}><FaUserCheck className={style.icon} /> Respond</button>
//                                     }

//                                     {
//                                         friendRequest.requestId == null &&
//                                         friendShip.friendshipId != null &&
//                                         <button onClick={setFriendshipRef}><FaUserCheck className={style.icon} /> Friends</button>
//                                     }

//                                     {
//                                         friendRequest.requestId != null &&
//                                         friendRequest.status == "THE_SENDER_CANCELED" &&
//                                         state.user.userId == friendRequest.receiverUserId &&
//                                         userFollowing != null &&
//                                         userFollowing.userId == state.user.userId &&
//                                         <button onClick={deleteUserFollowing}><SlUserFollowing className={style.icon} /> Following</button>
//                                     }

//                                     {
//                                         friendRequest.requestId != null &&
//                                         friendRequest.status == "THE_RECEIVER_CANCELED" &&
//                                         state.user.userId == friendRequest.senderUserId &&
//                                         userFollowing != null &&
//                                         userFollowing.userId == state.user.userId &&
//                                         <button onClick={deleteUserFollowing}><SlUserFollowing className={style.icon} /> Following</button>
//                                     }

//                                     {
//                                         friendRequest.requestId != null &&
//                                         friendRequest.status == "THE_SENDER_CANCELED" &&
//                                         state.user.userId == friendRequest.receiverUserId &&
//                                         userFollowing.followingId == null &&
//                                         <button onClick={saveUserFollowing}><SlUserFollow className={style.icon} /> Follow</button>
//                                     }

//                                     {
//                                         friendRequest.requestId != null &&
//                                         friendRequest.status == "THE_RECEIVER_CANCELED" &&
//                                         state.user.userId == friendRequest.senderUserId &&
//                                         userFollowing.followingId == null &&
//                                         <button onClick={saveUserFollowing}><SlUserFollow className={style.icon} /> Follow</button>
//                                     }

//                                     <div ref={responseRef} className={style.response}>
//                                         <button onClick={saveFriendShip}><IoIosCheckmarkCircle className={style.icon} /> Confirm</button>
//                                         <button onClick={refuseFriendRequest}><MdCancel className={style.icon} /> Delete request</button>
//                                     </div>

//                                     <div ref={friendshipRef} className={style.friendship}>
//                                         {/* <button ><FaRegStar className={style.icon} /> Favorites</button>
//                                         <button ><FaStar className={style.icon} /> Favorites</button> */}
//                                         {
//                                             userFollowing.followingId === null &&
//                                             <button onClick={saveUserFollowing}><SlUserFollow className={style.icon} /> Follow</button>
//                                         }
//                                         {
//                                             userFollowing.followingId !== null &&
//                                             <button onClick={deleteUserFollowing}><SlUserUnfollow className={style.icon} /> Unfollow</button>
//                                         }

//                                         <button onClick={deleteFriendShip}><FiUserX className={style.icon} /> Unfriend</button>
//                                     </div>
//                                 </div>

//                                 <div className={style.button}>
//                                     <button><IoMdMail className={style.icon} /> Message</button>
//                                 </div>

//                                 <div className={style.button}>
//                                     <button><IoIosArrowDown className={style.icon} /></button>
//                                 </div>
//                             </div>
//                         </div>}

//                     </div>
//                 </div>

//                 <div className={style.menu}>
//                     <div className={style.column1}>
//                         <ul>
//                             <li onClick={() => setContent("followers")}><button>Follower</button></li>
//                             <li onClick={() => setContent("fans")}><button>Fans</button></li>
//                             <li onClick={() => setContent("likes")}><button>Likes</button></li>
//                             <li onClick={() => setContent("posts")}><button>Posts</button></li>
//                             <li onClick={() => setContent("photos")}><button>Photos</button></li>
//                             <li onClick={() => setContent("video")}><button>Video</button></li>
//                             <li onClick={() => setContent("audio")}><button>Audio</button></li>
//                             <li onClick={() => setContent("vault")}><button>Vault</button></li>
//                         </ul>
//                     </div>

//                     <div className={style.column2}>
//                         <div className={style.button}>
//                             <button onClick={setEllipsisHorizontalMenuRef}> <HiMiniEllipsisHorizontal className={style.icon} /></button>

//                             <div ref={ellipsisHorizontalMenuRef} className={style.ellipsisHorizontalMenu}>

//                                 {
//                                     friendRequest.requestId != null &&
//                                     friendRequest.status == "THE_RECEIVER_CANCELED" &&
//                                     state.user.userId !== friendRequest.senderUserId &&
//                                     userFollowing.followingId == null &&
//                                     <button onClick={saveUserFollowing}><SlUserFollow className={style.icon} /> Follow</button>
//                                 }

//                                 {
//                                     friendRequest.requestId != null &&
//                                     friendRequest.status == "THE_SENDER_CANCELED" &&
//                                     state.user.userId !== friendRequest.receiverUserId &&
//                                     userFollowing.followingId == null &&
//                                     <button onClick={saveUserFollowing}><SlUserFollow className={style.icon} /> Follow</button>
//                                 }

//                                 {
//                                     friendRequest.requestId != null &&
//                                     friendRequest.status == "THE_SENDER_CANCELED" &&
//                                     state.user.userId != friendRequest.receiverUserId &&
//                                     userFollowing.followingId != null &&
//                                     userFollowing.userId == state.user.userId &&
//                                     <button onClick={deleteUserFollowing}><SlUserFollowing className={style.icon} /> Unfollow</button>
//                                 }

//                                 {
//                                     friendRequest.requestId != null &&
//                                     friendRequest.status == "THE_RECEIVER_CANCELED" &&
//                                     state.user.userId !== friendRequest.senderUserId &&
//                                     userFollowing.followingId != null &&
//                                     userFollowing.userId == state.user.userId &&
//                                     <button onClick={deleteUserFollowing}><SlUserFollowing className={style.icon} /> Unfollow</button>
//                                 }


//                                 <button ><TbUserCancel className={style.iconBlock} /> Block</button>
//                             </div>
//                         </div>


//                     </div>

//                 </div>
//             </div>

//             <div className={style.content}>

//                 {content == "posts" && <Posts />}

//                 {content == "followers" && <Followers />}

//                 {content == "likes" && <Likes />}

//                 {content == "photos" && <Photos />}

//             </div>

//         </div >
//     )
// }

// export default UserWall