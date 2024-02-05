import style from './index.module.scss'
function Message() {

    return (
        <div className={style.container}>
            <div className={style.left}>
                <div className={style.searchBar}>
                    <div className={style.menu}>
                        <i className="fa-solid fa-bars"></i>
                    </div>

                    <div className={style.search}>
                        <i className={`fas fa-magnifying-glass ${style.searchIcon}`}></i>
                        <input type="text" placeholder="Search" className={style.roundedInput} />
                    </div>
                </div>

                <div className={style.chatList}>
                    <div className={style.item}>
                        <div className={style.avatar}>
                            <img src="https://img.pikbest.com/origin/09/19/03/61zpIkbEsTGjk.jpg!w700wp"></img>
                        </div>

                        <div className={style.texts}>
                            <div className={style.name}>
                                <p className={style.title}>Chatgram</p>
                                <p className={style.time}>19:48</p>
                            </div>

                            <div className={style.message}>
                                <p className={style.title}>Chatgram Web was updated.</p>
                                <p className={style.number}>1</p>
                            </div>
                        </div>

                    </div>

                    <div className={style.item}>
                        <div className={style.avatar}>
                            <img src="https://img.pikbest.com/origin/09/19/03/61zpIkbEsTGjk.jpg!w700wp"></img>
                        </div>

                        <div className={style.texts}>
                            <div className={style.name}>
                                <p className={style.title}>Chatgram</p>
                                <p className={style.time}>19:48</p>
                            </div>

                            <div className={style.message}>
                                <p className={style.title}>Chatgram Web was updated.</p>
                                <p className={style.number}>1</p>
                            </div>
                        </div>

                    </div>

                    <div className={style.item}>
                        <div className={style.avatar}>
                            <img src="https://img.pikbest.com/origin/09/19/03/61zpIkbEsTGjk.jpg!w700wp"></img>
                        </div>

                        <div className={style.texts}>
                            <div className={style.name}>
                                <p className={style.title}>Chatgram</p>
                                <p className={style.time}>19:48</p>
                            </div>

                            <div className={style.message}>
                                <p className={style.title}>Chatgram Web was updated.</p>
                                <p className={style.number}>1</p>
                            </div>
                        </div>

                    </div>


                </div>
            </div>

            <div className={style.right}>
                <div className={style.topBar}>

                    <div className={style.otherUser}>
                        <div className={style.avatar}>
                            <img src="https://img.pikbest.com/origin/09/19/03/61zpIkbEsTGjk.jpg!w700wp"></img>
                        </div>

                        <div className={style.texts}>
                            <div className={style.name}>
                                <p>David Moore</p>
                            </div>

                            <div className={style.lastSeen}>
                                <p>last seen 5 mins ago</p>
                            </div>
                        </div>
                    </div>

                    <div className={style.option}>
                        <ul>
                            <li><i class="fa-solid fa-magnifying-glass"></i></li>
                            <li><i class="fa-solid fa-phone"></i></li>
                            <li><i class="fa-solid fa-ellipsis-vertical"></i></li>
                        </ul>
                    </div>
                </div>

                <div className={style.messages}>

                    <ul>
                        <li className={style.dateSent}>Today</li>

                        <li className={style.messageOther}>
                            <div className={style.message}>
                                <p>OMG 😲 do you remember what you did last night at the work night out?</p>
                                <p className={style.time}>
                                    <i class="fa-solid fa-heart"></i>
                                    18:12
                                    <i class="fa-solid fa-check"></i>
                                </p>
                            </div>

                        </li>

                        <li className={style.messageOther}>
                            <div className={style.message}>
                                <p>OMG 😲 do you remember what you did last night at the work night out?</p>
                                <p className={style.time}>
                                    <i class="fa-solid fa-heart"></i>
                                    18:12
                                    <i class="fa-solid fa-check"></i>
                                </p>
                            </div>

                        </li>
                        <li className={style.messageYou}>
                            <div className={style.message}>
                                <p>no haha</p>
                                <p className={style.time}>
                                    <span>18:12</span>
                                    <i class="fa-solid fa-check"></i>
                                </p>
                            </div>

                        </li>
                        <li className={style.messageYou}>
                            <div className={style.message}>
                                <p>i don't remember anything 😄</p>
                                <p className={style.time}>
                                    <span>18:12</span>
                                    {/* <i class="fa-solid fa-check"></i> */}
                                </p>
                            </div>
                        </li>

                        

                    </ul>

                    <div className={style.inputBar}>
                        <div className={style.icon}>
                            <i class="fa-solid fa-face-smile"></i>
                        </div>

                        <div className={style.typing}>
                            <input placeholder="Message"></input>
                        </div>

                        <div className={style.sendIcon}>
                            <i class="fa-solid fa-paper-plane"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Message