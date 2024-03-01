import style from "./index.module.scss";
import clsx from 'clsx';
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { calculateTimeDifference } from "../../../utils";
import { HiDotsHorizontal } from "react-icons/hi";
import { NotificationService } from "../../../serivces/NotificationService";
import { PiBellZThin } from "react-icons/pi";
function NotificationPopup({ notificationLocation, setLocationPopupOpen, locationPopupOpen, handleDeleteButtonFR, handleAcceptButtonFR, notifications, handleClickNotification, notificationService }) {

    return (
        <div className={style.App}>

            {locationPopupOpen && (
                <div
                    onClick={() => setLocationPopupOpen(false)}
                    className={style.overlay}
                >
                    {/* Content */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={style.content}

                    >

                        <div
                            className={style.dropdown}
                            style={{ left: (notificationLocation.left - 177), top: (notificationLocation.top + 50) }}
                        >
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

                                                            <div className={style.content1}>
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

                                {
                                    notifications.length == 0 && <div className={style.nullNotification}>
                                        <PiBellZThin className={style.icon} />
                                        <p>You have no notifications</p>
                                    </div>
                                }

                            </div>

                            <div className={style.dropdownFooter}>
                                <p>View Notifications</p>
                            </div>
                        </div>

                    </div>
                </div>
            )
            }
        </div >
    );
}

export default NotificationPopup;
