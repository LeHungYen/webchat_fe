import style from "./index.module.scss";

export function MessageMenu() {
  return (
    <div className={style.container}>
      <div className={style.notificationMenu}>
        <div onClick={setNotificationRef} className={style.buttonMenu}>
          <OutlineChatIcon className={style.menuIcon} />
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
                                  color: item.read ? "#656565" : "black",
                                }}
                              >
                                {item.sender.fullName}
                              </span>
                              sent you a friend request
                            </p>

                            <p
                              style={{
                                color: item.read ? "#656565" : "#0866ff",
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
      </div>
    </div>
  );
}
