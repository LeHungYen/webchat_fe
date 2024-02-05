import style from './index.module.scss'
import { LuFilter } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { CiGrid41 } from "react-icons/ci";
import { MdFormatListBulleted } from "react-icons/md";
export function Members() {

    return <div className={style.container}>
        <div className={style.header}>

            <div className={style.col1}>
                <div className={style.search}>
                    <input placeholder='Find members...'></input>
                    <FiSearch className={style.icon} />
                </div>
            </div>
            <div className={style.col2}>
                <button className={style.gridView}><CiGrid41 className={style.gridIcon} /></button>
                <button className={style.listView}><MdFormatListBulleted className={style.listIcon} /></button>
                <button className={style.filter}><LuFilter className={style.filterIcon} /></button>
            </div>
        </div>

        <div className={style.body}>
            <div className={style.organizer}>
                <p className={style.name}>Organizers</p>

                <div className={style.organizerItem}>
                    <div className={style.item}>
                        <div className={style.background}>
                            <img src='https://haycafe.vn/wp-content/uploads/2022/05/Background-phong-canh-dep.jpg'></img>
                        </div>

                        <div className={style.avatar}>
                            <img src='https://haycafe.vn/wp-content/uploads/2023/12/hinh-anh-avatar-cute-dep-ngau-chibi-nu.jpg'></img>
                        </div>

                        <p className={style.name}>Vernon</p>

                        <ul>
                            <li className={style.join}>Joined a year ago</li>
                            <li className={style.active}>Active a year ago</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={style.member}>
                <p className={style.name}>Members</p>

                <div className={style.memberItem}>
                    <div className={style.item}>
                        <div className={style.background}>
                            <img src='https://haycafe.vn/wp-content/uploads/2022/05/Background-phong-canh-dep.jpg'></img>
                        </div>

                        <div className={style.avatar}>
                            <img src='https://haycafe.vn/wp-content/uploads/2023/12/hinh-anh-avatar-cute-dep-ngau-chibi-nu.jpg'></img>
                        </div>

                        <p className={style.name}>Vernon</p>

                        <ul>
                            <li className={style.join}>Joined a year ago</li>
                            <li className={style.active}>Active a year ago</li>
                        </ul>
                    </div>

                    <div className={style.item}>
                        <div className={style.background}>
                            <img src='https://haycafe.vn/wp-content/uploads/2022/05/Background-phong-canh-dep.jpg'></img>
                        </div>

                        <div className={style.avatar}>
                            <img src='https://haycafe.vn/wp-content/uploads/2023/12/hinh-anh-avatar-cute-dep-ngau-chibi-nu.jpg'></img>
                        </div>

                        <p className={style.name}>Vernon</p>

                        <ul>
                            <li className={style.join}>Joined a year ago</li>
                            <li className={style.active}>Active a year ago</li>
                        </ul>
                    </div>

                    <div className={style.item}>
                        <div className={style.background}>
                            <img src='https://haycafe.vn/wp-content/uploads/2022/05/Background-phong-canh-dep.jpg'></img>
                        </div>

                        <div className={style.avatar}>
                            <img src='https://haycafe.vn/wp-content/uploads/2023/12/hinh-anh-avatar-cute-dep-ngau-chibi-nu.jpg'></img>
                        </div>

                        <p className={style.name}>Vernon</p>

                        <ul>
                            <li className={style.join}>Joined a year ago</li>
                            <li className={style.active}>Active a year ago</li>
                        </ul>
                    </div>

                    <div className={style.item}>
                        <div className={style.background}>
                            <img src='https://haycafe.vn/wp-content/uploads/2022/05/Background-phong-canh-dep.jpg'></img>
                        </div>

                        <div className={style.avatar}>
                            <img src='https://haycafe.vn/wp-content/uploads/2023/12/hinh-anh-avatar-cute-dep-ngau-chibi-nu.jpg'></img>
                        </div>

                        <p className={style.name}>Vernon</p>

                        <ul>
                            <li className={style.join}>Joined a year ago</li>
                            <li className={style.active}>Active a year ago</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
}