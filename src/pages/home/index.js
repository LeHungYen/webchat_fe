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

import { DefaultContent } from './DefaultContent';
import { Wellcome } from './Wellcome';
import { useState, useEffect, useContext } from 'react';
import { StoreContext, actions } from '../../store';
import axios from 'axios';
function Home() {
    const [state, dispatch] = useContext(StoreContext);
    // const [user, setUser] = useState({
    //     bio: null,
    //     birthdate: null,
    //     coverPhoto: null,
    //     email: null,
    //     fullName: null,
    //     gender: null,
    //     lastLogin: null,
    //     password: null,
    //     phoneNumber: null,
    //     profilePicture: null,
    //     registrationDate: null,
    //     role: null,
    //     status: null,
    //     userId: null,
    //     username: null,
    //     website: null
    // });

    return (
        <div className={style.container}>
            <div className={style.body}>
                <div className={style.left}>
                    <div className={style.user}>
                        <div className={style.background}>
                            <img src={background} alt='background img'></img>
                        </div>
                        <div className={style.avatar}>
                            <img src={avatar}></img>
                        </div>

                        <div className={style.infor}>
                            <div className={style.columns}>
                                <div className={style.column1}>
                                    <p className={style.name}>{state.user.fullName}</p>
                                    <p className={style.job}>UI/UX Designer</p>
                                </div>
                                <div className={style.column2}>
                                    <div className={style.progressBar}>
                                        <div className={style.progress}></div>
                                    </div>
                                    <span>90%</span>
                                </div>
                            </div>
                        </div>

                        <div className={style.anotherAccount}>
                            <i class="fa-regular fa-square-plus"></i>
                            <p>Add another account</p>
                        </div>
                    </div>

                    <div className={style.menu}>
                        <ul>
                            <li> <i className="fa-regular fa-circle-play"></i> <span>Video</span></li>
                            <li><i className="fa-solid fa-rotate-left"></i> <span>Memory</span></li>
                            <li><OutlineUserAddIcon className={style.menuIcon} /> <span>Find colleagues</span></li>
                            <li><i className="fa-regular fa-bookmark"></i> <span>Bookmarks</span> </li>
                            <li><i className="fa-solid fa-gamepad"></i> <span>Gaming</span> <span className={style.new}>New</span></li>
                            <li><OutlineCogIcon className={style.menuIcon} /> <span>Setting</span></li>
                        </ul>
                    </div>

                    <div className={style.hashtag}>
                        <div className={style.title}>
                            <span>Followed hashtags</span>
                        </div>

                        <div className={style.hashtags}>
                            <button>#work</button>
                            <button>#business</button>
                            <button>#hr</button>
                            <button>#userinterface</button>
                            <button>#digital</button>
                            <button>#userexperience</button>
                            <button>#ux</button>
                            <button>#ui</button>
                            <button>#freelance</button>
                        </div>
                    </div>
                </div>

                <div className={style.middle}>
                    {/* <DefaultContent /> */}
                    <Wellcome user={state.user} />
                </div>

                <div className={style.right}>
                    <div className={style.advertisement}>
                        <img src={advertisement}></img>
                    </div>

                    <div className={style.people}>
                        <p className={style.title}>People you may know:</p>
                        <div className={style.users}>

                            <div className={style.user}>
                                <div className={style.avatar}>
                                    <img src={steveJob}></img>
                                </div>
                                <div className={style.infor}>
                                    <p className={style.name}>Steve Jobs</p>
                                    <p className={style.job}>CEO of Apple</p>
                                </div>
                                <div className={style.button}>
                                    <button>Connect</button>
                                </div>
                            </div>

                            <div className={style.user}>
                                <div className={style.avatar}>
                                    <img src={ryanRoslansky}></img>
                                </div>
                                <div className={style.infor}>
                                    <p className={style.name}>Ryan Roslansky</p>
                                    <p className={style.job}>CEO of Linkedin</p>
                                </div>
                                <div className={style.button}>
                                    <button>Connect</button>
                                </div>
                            </div>

                            <div className={style.user}>
                                <div className={style.avatar}>
                                    <img src={dylanField}></img>
                                </div>
                                <div className={style.infor}>
                                    <p className={style.name}>Dylan Field</p>
                                    <p className={style.job}>CEO of Figma</p>
                                </div>
                                <div className={style.button}>
                                    <button>Connect</button>
                                </div>
                            </div>
                        </div>

                        <div className={style.seeAll}>
                            <button>See All</button>
                        </div>
                    </div>

                    <div className={style.pages}>
                        <div className={style.page}>
                            <div className={style.logo}>
                                <img src={uxDesign}></img>
                            </div>

                            <div className={style.name}>
                                <p>UX Design</p>
                            </div>


                        </div>

                        <div className={style.page}>
                            <div className={style.logo}>
                                <img src={uiDesign}></img>
                            </div>

                            <div className={style.name}>
                                <p>UI Design</p>
                            </div>

                            <div className={style.counter}>
                                <p>+99</p>
                            </div>
                        </div>

                        <div className={style.page}>
                            <div className={style.logo}>
                                <IoAddCircleOutline className={style.icon} />
                            </div>

                            <div className={style.name}>
                                <p>Add new page</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home