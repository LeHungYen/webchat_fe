import style from './index.module.scss'
import { LuFilter } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
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
import { HiUserGroup } from "react-icons/hi2";
import { FaUserFriends } from "react-icons/fa";
import { BsPostcardFill } from "react-icons/bs";
import { IoMdPhotos } from "react-icons/io";
import { IoIosAlbums } from "react-icons/io";
import { RiDiscussFill } from "react-icons/ri";
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

import { Members } from './Members';
export function GroupWall() {

    return (
        <div className={style.container}>
            <div className={style.groupWall}>
                <div className={style.background}>
                    <img src="https://images.alphacoders.com/133/1339872.png" alt='background img'></img>
                    <div className={style.editCoverPhoto}>
                        <button><SolidCameraIcon className={style.cameraIcon} />Edit Cover Photo</button>
                    </div>
                </div>


                <div className={style.infor}>
                    <div className={style.columns}>
                        <div className={style.col1}>
                            <p className={style.name}>Testing Group</p>

                            <button className={style.group}>Group</button>

                            <ul>
                                <li><HiUserGroup className={style.icon} /> <span>Public</span></li>
                                <li><span>Active 6 months ago</span></li>
                            </ul>

                            <p className={style.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        </div>

                        <div className={style.col2}>
                            <div className={style.organizeBy}>
                                <p>Organized by</p>
                            </div>

                            <div className={style.img}>
                                <img src='https://antimatter.vn/wp-content/uploads/2022/04/hinh-anh-avatar-nu.jpg'></img>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className={style.menu}>
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

                </div> */}
            </div>

            <div className={style.body}>
                <div className={style.bodyMenu}>
                    <ul>
                        <li><FaUserFriends className={style.icon} /> <span>Members</span></li>
                        <li><BsPostcardFill className={style.icon} /> <span>Feed</span></li>
                        <li><IoMdPhotos className={style.icon} /> <span>Photos</span></li>
                        <li><IoIosAlbums className={style.icon} /><span>Albums</span></li>
                        <li><RiDiscussFill className={style.icon} /><span>Discussions</span></li>
                    </ul>
                </div>

                <div className={style.content}>
                    <Members />
                </div>

                <div className={style.right}>
                    <div className={style.members}>
                        <p className={style.title}>Members</p>
                        <div className={style.membersMenu}>
                            <ul>
                                <li>Newest</li>
                                <li>Active</li>
                                <li>Popular</li>
                            </ul>
                        </div>

                        <div className={style.people}>
                            <div className={style.item}>
                                <div className={style.avatar}>
                                    <img src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-105.jpg'></img>
                                </div>

                                <div className={style.infor}>
                                    <p className={style.name}>Ralph</p>
                                    <p className={style.active}>a year ago</p>
                                </div>
                            </div>

                            <div className={style.item}>
                                <div className={style.avatar}>
                                    <img src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-105.jpg'></img>
                                </div>

                                <div className={style.infor}>
                                    <p className={style.name}>Ralph</p>
                                    <p className={style.active}>a year ago</p>
                                </div>
                            </div>

                            <div className={style.item}>
                                <div className={style.avatar}>
                                    <img src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-105.jpg'></img>
                                </div>

                                <div className={style.infor}>
                                    <p className={style.name}>Ralph</p>
                                    <p className={style.active}>a year ago</p>
                                </div>
                            </div>

                            <div className={style.item}>
                                <div className={style.avatar}>
                                    <img src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-105.jpg'></img>
                                </div>

                                <div className={style.infor}>
                                    <p className={style.name}>Ralph</p>
                                    <p className={style.active}>a year ago</p>
                                </div>
                            </div>
                        </div>

                        <div className={style.seeAll}>
                            <button>See all</button>
                        </div>
                    </div>

                    <div className={style.groups}>
                        <p className={style.title}>Groups</p>
                        <div className={style.groupsMenu}>
                            <ul>
                                <li>Newest</li>
                                <li>Active</li>
                                <li>Popular</li>
                            </ul>
                        </div>

                        <div className={style.items}>
                            <div className={style.item}>
                                <div className={style.avatar}>
                                    <img src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-105.jpg'></img>
                                </div>

                                <div className={style.infor}>
                                    <p className={style.name}>Ralph</p>
                                    <p className={style.active}>a year ago</p>
                                </div>
                            </div>

                            <div className={style.item}>
                                <div className={style.avatar}>
                                    <img src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-105.jpg'></img>
                                </div>

                                <div className={style.infor}>
                                    <p className={style.name}>Ralph</p>
                                    <p className={style.active}>a year ago</p>
                                </div>
                            </div>

                            <div className={style.item}>
                                <div className={style.avatar}>
                                    <img src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-105.jpg'></img>
                                </div>

                                <div className={style.infor}>
                                    <p className={style.name}>Ralph</p>
                                    <p className={style.active}>a year ago</p>
                                </div>
                            </div>

                            <div className={style.item}>
                                <div className={style.avatar}>
                                    <img src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-105.jpg'></img>
                                </div>

                                <div className={style.infor}>
                                    <p className={style.name}>Ralph</p>
                                    <p className={style.active}>a year ago</p>
                                </div>
                            </div>
                        </div>

                        <div className={style.seeAll}>
                            <button>See all</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}