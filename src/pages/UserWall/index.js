import style from './index.module.scss'
import { BsSend } from "react-icons/bs";
import { LuPencilLine } from "react-icons/lu";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaFemale } from "react-icons/fa";
import { FaMale } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { BiSolidPhone } from "react-icons/bi";

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
    CameraIcon as OutlineCameraIcon,
    PencilIcon as OutlinePencilIcon,

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
    MicrophoneIcon as SolidMicrophoneIcon,
    CameraIcon as SolidCameraIcon,
    PencilIcon as SolidPencilIcon,
} from '@heroicons/react/solid'

import avatar from './imgs/avatar.jpg'
import background from './imgs/background.jpg'
import healthyTrackingApp from './imgs/healthyTrackingApp.jpg'
import photoIsPerfect from './imgs/photoIsPerfect.jpg'
import advertisement from './imgs/advertisement.jpg'
import steveJob from './imgs/steveJob.jpg'
import ryanRoslansky from './imgs/ryanRoslansky.jpg'
import dylanField from './imgs/dylanField.jpg'
import uxDesign from './imgs/uxDesign.jpg'
import uiDesign from './imgs/uiDesign.jpg'

import Posts from './Posts';
import { Followers } from './Followers';
import { Likes } from './Likes';
import { Photos } from './Photos';


import defaultAvatar from '../../assets/imgs/defaultAvatar.jpg'
function UserWall() {
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
                            <li><OutlineBellIcon className={style.menuIcon} /></li>
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

            <div className={style.userWall}>
                <div className={style.background}>
                    <img src="https://images.alphacoders.com/133/1339872.png" alt='background img'></img>
                    <div className={style.editCoverPhoto}>
                        <button><SolidCameraIcon className={style.cameraIcon} />Edit Cover Photo</button>
                    </div>
                </div>


                <div className={style.infor}>
                    <div className={style.avatar}>
                        <img src="https://antimatter.vn/wp-content/uploads/2022/04/hinh-anh-avatar-nu.jpg"></img>
                        <div className={style.editAvatarPhoto}>
                            <button><SolidCameraIcon className={style.cameraIcon} /></button>
                        </div>
                    </div>

                    <div className={style.columns}>
                        <div className={style.column1}>
                            <p className={style.name}>Karim Saif</p>
                            <p className={style.job}>UI/UX Designer</p>
                            {/* <p className={style.friend}>216 friends</p> */}
                        </div>
                        <div className={style.column2}>
                            {/* <p className={style.follower}>32 Follower</p> */}
                            <div className={style.buttons}>
                                <div className={style.button}>
                                    <button><SolidPencilIcon className={style.icon} /> Edit Profile</button>
                                </div>
                                <div className={style.button}>
                                    <button><SolidShareIcon className={style.icon} /> Share</button>
                                </div>
                            </div>

                            <div className={style.button}>
                                {/* <button><IoIosArrowUp className={style.iconUp} /></button> */}
                                <button><IoIosArrowDown className={style.iconDown} /></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.menu}>
                    <div className={style.column1}>
                        <ul>
                            <li><button>Follower</button></li>
                            <li><button>Fans</button></li>
                            <li><button>Likes</button></li>
                            <li><button>Posts</button></li>
                            <li><button>Photo</button></li>
                            <li><button>Video</button></li>
                            <li><button>Audio</button></li>
                            <li><button>Vault</button></li>
                        </ul>
                    </div>

                    <div className={style.column2}>
                        <button> <HiMiniEllipsisHorizontal className={style.icon} /></button>
                    </div>

                </div>
            </div>

            <div className={style.content}>
                {/* <Posts></Posts> */}

                {/* <Followers></Followers> */}

                {/* <Likes></Likes> */}

                <Photos></Photos>
            </div>

        </div>
    )
}

export default UserWall