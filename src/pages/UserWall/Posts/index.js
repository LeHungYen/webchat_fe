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

import avatar from '../imgs/avatar.jpg'
import background from '../imgs/background.jpg'
import healthyTrackingApp from '../imgs/healthyTrackingApp.jpg'
import photoIsPerfect from '../imgs/photoIsPerfect.jpg'
import advertisement from '../imgs/advertisement.jpg'
import steveJob from '../imgs/steveJob.jpg'
import ryanRoslansky from '../imgs/ryanRoslansky.jpg'
import dylanField from '../imgs/dylanField.jpg'
import uxDesign from '../imgs/uxDesign.jpg'
import uiDesign from '../imgs/uiDesign.jpg'

function Posts() {
    return <div className={style.posts}>
        <div className={style.post}>
            <div className={style.writeNewPost}>
                <div className={style.row}>
                    <div className={style.avatar}>
                        <img src={avatar}></img>
                    </div>

                    <div className={style.edit}>
                        <textarea placeholder='Write something ...'></textarea>
                        <LuPencilLine className={style.iconPencil} />
                    </div>
                </div>

                <div className={style.buttons}>
                    <ul>
                        <li> <OutlinePhotoIcon className={style.menuIcon} /> <span>Photo</span></li>
                        <li><OutlineVideoCameraIcon className={style.menuIcon} /> <span>Video</span></li>
                        <li><OutlineCalendarIcon className={style.menuIcon} /> <span>Event</span></li>
                        <li><HiOutlineNewspaper className={style.menuIcon} /> <span>Article</span></li>
                    </ul>
                    <div className={style.iconSend}>
                        <BsSend className={style.icon} />
                    </div>
                </div>
            </div>

            <div className={style.news}>
                <div className={style.new}>
                    <div className={style.row1}>
                        <div className={style.user}>
                            <img src={avatar}></img>
                            <div className={style.text}>
                                <p className={style.name}>Karim Saif</p>
                                <p className={style.job}>UI/UX Designer</p>
                            </div>
                        </div>
                        <div className={style.menu}>
                            <BsThreeDotsVertical className={style.icon} />
                        </div>
                    </div>

                    <div className={style.row2}>
                        <div className={style.content}>
                            <p>-Healthy Tracking App </p>
                        </div>
                        <div className={style.imgOrVideo}>
                            <img src={healthyTrackingApp}></img>
                        </div>
                    </div>

                    <div className={style.row3}>
                        <div className={style.interact}>
                            <div className={style.reaction}>
                                {/* <BiLike className={style.likeIcon}/> */}
                                <BiSolidLike className={style.likeIcon} />
                                {/* <i class="fa-regular fa-thumbs-up"></i> */}
                                <span>32</span>
                            </div>
                            <div className={style.commentAndShare}>
                                <p>5 bình luận</p>
                                <p>1 lượt chia sẻ</p>
                            </div>
                        </div>

                        <div className={style.icons}>
                            <ul>
                                <li> <BiLike className={style.menuIcon} /> <span>Like</span></li>
                                <li><FaRegCommentDots className={style.menuIcon} /> <span>Comment</span></li>
                                <li><IoShareSocialOutline className={style.menuIcon} /> <span>Share</span></li>
                            </ul>
                        </div>

                        <div className={style.writeComment}>
                            <img src={avatar}></img>
                            <input placeholder='Write a comment'></input>
                            <OutlineMicrophoneIcon className={style.microIcon}></OutlineMicrophoneIcon>
                            <OutlinePhotoIcon className={style.photoIcon}></OutlinePhotoIcon>
                        </div>
                    </div>
                </div>

                <div className={style.new}>
                    <div className={style.row1}>
                        <div className={style.user}>
                            <img src={avatar}></img>
                            <div className={style.text}>
                                <p className={style.name}>Karim Saif</p>
                                <p className={style.job}>UI/UX Designer</p>
                            </div>
                        </div>
                        <div className={style.menu}>
                            <BsThreeDotsVertical className={style.icon} />
                        </div>
                    </div>

                    <div className={style.row2}>
                        <div className={style.content}>
                            <p>-Healthy Tracking App </p>
                        </div>
                        <div className={style.imgOrVideo}>
                            <img src={photoIsPerfect}></img>
                        </div>
                    </div>

                    <div className={style.row3}>
                        <div className={style.interact}>
                            <div className={style.reaction}>
                                {/* <BiLike className={style.likeIcon}/> */}
                                <BiSolidLike className={style.likeIcon} />
                                {/* <i class="fa-regular fa-thumbs-up"></i> */}
                                <span>32</span>
                            </div>
                            <div className={style.commentAndShare}>
                                <p>5 bình luận</p>
                                <p>1 lượt chia sẻ</p>
                            </div>
                        </div>

                        <div className={style.icons}>
                            <ul>
                                <li> <BiLike className={style.menuIcon} /> <span>Like</span></li>
                                <li><FaRegCommentDots className={style.menuIcon} /> <span>Comment</span></li>
                                <li><IoShareSocialOutline className={style.menuIcon} /> <span>Share</span></li>
                            </ul>
                        </div>

                        <div className={style.writeComment}>
                            <img src={avatar}></img>
                            <input placeholder='Write a comment'></input>
                            <OutlineMicrophoneIcon className={style.microIcon}></OutlineMicrophoneIcon>
                            <OutlinePhotoIcon className={style.photoIcon}></OutlinePhotoIcon>
                        </div>
                    </div>
                </div>

                <div className={style.new}>
                    <div className={style.row1}>
                        <div className={style.user}>
                            <img src={avatar}></img>
                            <div className={style.text}>
                                <p className={style.name}>Karim Saif</p>
                                <p className={style.job}>UI/UX Designer</p>
                            </div>
                        </div>
                        <div className={style.menu}>
                            <BsThreeDotsVertical className={style.icon} />
                        </div>
                    </div>

                    <div className={style.row2}>
                        <div className={style.content}>
                            <p>-Healthy Tracking App </p>
                        </div>
                        <div className={style.imgOrVideo}>
                            <img src={healthyTrackingApp}></img>
                        </div>
                    </div>

                    <div className={style.row3}>
                        <div className={style.interact}>
                            <div className={style.reaction}>
                                {/* <BiLike className={style.likeIcon}/> */}
                                <BiSolidLike className={style.likeIcon} />
                                {/* <i class="fa-regular fa-thumbs-up"></i> */}
                                <span>32</span>
                            </div>
                            <div className={style.commentAndShare}>
                                <p>5 bình luận</p>
                                <p>1 lượt chia sẻ</p>
                            </div>
                        </div>

                        <div className={style.icons}>
                            <ul>
                                <li> <BiLike className={style.menuIcon} /> <span>Like</span></li>
                                <li><FaRegCommentDots className={style.menuIcon} /> <span>Comment</span></li>
                                <li><IoShareSocialOutline className={style.menuIcon} /> <span>Share</span></li>
                            </ul>
                        </div>

                        <div className={style.writeComment}>
                            <img src={avatar}></img>
                            <input placeholder='Write a comment'></input>
                            <OutlineMicrophoneIcon className={style.microIcon}></OutlineMicrophoneIcon>
                            <OutlinePhotoIcon className={style.photoIcon}></OutlinePhotoIcon>
                        </div>
                    </div>
                </div>

                <div className={style.new}>
                    <div className={style.row1}>
                        <div className={style.user}>
                            <img src={avatar}></img>
                            <div className={style.text}>
                                <p className={style.name}>Karim Saif</p>
                                <p className={style.job}>UI/UX Designer</p>
                            </div>
                        </div>
                        <div className={style.menu}>
                            <BsThreeDotsVertical className={style.icon} />
                        </div>
                    </div>

                    <div className={style.row2}>
                        <div className={style.content}>
                            <p>-Healthy Tracking App </p>
                        </div>
                        <div className={style.imgOrVideo}>
                            <img src={healthyTrackingApp}></img>
                        </div>
                    </div>

                    <div className={style.row3}>
                        <div className={style.interact}>
                            <div className={style.reaction}>
                                {/* <BiLike className={style.likeIcon}/> */}
                                <BiSolidLike className={style.likeIcon} />
                                {/* <i class="fa-regular fa-thumbs-up"></i> */}
                                <span>32</span>
                            </div>
                            <div className={style.commentAndShare}>
                                <p>5 bình luận</p>
                                <p>1 lượt chia sẻ</p>
                            </div>
                        </div>

                        <div className={style.icons}>
                            <ul>
                                <li> <BiLike className={style.menuIcon} /> <span>Like</span></li>
                                <li><FaRegCommentDots className={style.menuIcon} /> <span>Comment</span></li>
                                <li><IoShareSocialOutline className={style.menuIcon} /> <span>Share</span></li>
                            </ul>
                        </div>

                        <div className={style.writeComment}>
                            <img src={avatar}></img>
                            <input placeholder='Write a comment'></input>
                            <OutlineMicrophoneIcon className={style.microIcon}></OutlineMicrophoneIcon>
                            <OutlinePhotoIcon className={style.photoIcon}></OutlinePhotoIcon>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className={style.about}>
            <div className={style.infor}>
                <div className={style.title}>
                    <p>About</p>
                </div>

                <ul>
                    <li>
                        <FaFemale className={style.icon} />
                        {/* <FaMale  className={style.icon}/> */}
                        <span>Female</span>
                    </li>

                    <li> <FaBirthdayCake className={style.icon} /><span>Born June 26, 1980</span></li>
                    <li> <IoLocationSharp className={style.icon} /><span>2239 Hog Camp Road Schaumburg</span></li>
                    <li> <IoIosMail className={style.icon} /><span>charles5182@ummoh.com</span></li>
                    <li> <BiSolidPhone className={style.icon} /><span>33757005467</span></li>
                </ul>
                <div className={style.seeAll}>
                    <button>See all</button>
                </div>
            </div>
        </div>
    </div>
}

export default Posts