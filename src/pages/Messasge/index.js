// project
import style from "./index.module.scss";
import { MessageDetail } from "./MessageDetail";
import { NewMessage } from "./NewMessage";
import { ChatPageService } from "../../serivces/ChatPageService";
import { ChatService } from "../../serivces/ChatService";
import { StoreContext, actions } from "../../store";
import { calculateTimeDiff } from "../../utils";
import { UserService } from "../../serivces/UserService";
import { getResourceImage } from "../../utils";
import defaultAvatar from '../../assets/imgs/defaultAvatar.jpg'
// libary
import { RiSearchLine } from "react-icons/ri";
import { LiaEdit } from "react-icons/lia";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { useState, useRef, useContext, useEffect } from "react";
import { ChatMessageService } from "../../serivces/ChatMessageService";

function Message() {
  // const [state, dispatch] = useContext(StoreContext);
  const chatPageService = new ChatPageService();
  const chatService = new ChatService();
  const userService = new UserService();
  const chatMessageService = new ChatMessageService();
  const messageDetailRef = useRef(null);
  const newMessageRef = useRef(null);
  let user = JSON.parse(localStorage.getItem("user"));

  // current time
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // display newMessage or message detail
  const displayNewMessage = () => {
    newMessageRef.current.style.display = "block";
    messageDetailRef.current.style.display = "none";
  };

  const displayMessageDetail = () => {
    newMessageRef.current.style.display = "none";
    messageDetailRef.current.style.display = "block";
  };

  // get chat page
  const [chatPages, setChatPages] = useState([]);
  const [pageNumberOfChatPage, setPageNumberOfChatPage] = useState(0);

  const getChatPages = async (pageNumber) => {
    const response = await chatPageService.get(pageNumber);
    user = JSON.parse(localStorage.getItem("user"));

    // update mediaURL
    const handleMediaUrl = async () => {
      const updatedChatPages = await Promise.all(
        response.map(async (item) => {
          if (item.type == chatService.type.GROUP) {
            const newAvatar = await getResourceImage(`imgs/${item.avatar}`);
            const newEmoji = await getResourceImage(`emoji/${item.emoji}`)

            if (user.lastChatId == item.chatId) {
              await setChatPage({ ...item, newAvatar: newAvatar, newEmoji: newEmoji })
            }

            return { ...item, newAvatar: newAvatar, newEmoji: newEmoji };
          }
          if (item.type == chatService.type.PAIR) {
            const newEmoji = await getResourceImage(`emoji/${item.emoji}`)

            if (user.lastChatId == item.chatId) {
              await setChatPage({ ...item, newEmoji: newEmoji })
            }

            return { ...item, newEmoji: newEmoji };
          }
          return item;
        })
      );
      setChatPages(updatedChatPages);
    };
    handleMediaUrl();
  };

  useEffect(() => {
    getChatPages(pageNumberOfChatPage);
  }, [pageNumberOfChatPage]);

  // handle message detail input
  const [chatPage, setChatPage] = useState({});

  const handleMessageDetailI = async (chatPage) => {
    // update last chat id
    const userResponse = await userService.updateLastChatId(user.userId, chatPage.chatId);
    await localStorage.setItem("user", JSON.stringify(userResponse))
    await setChatPage(chatPage);
    // console.log("Chat page Id " + chatPage.chatId)
    displayMessageDetail();
  };


  // const [alreadySetChatPageFristTime, setAlreadySetChatPageFristTime] = useState(false);
  // useEffect(() => {
  //   if (!alreadySetChatPageFristTime) {
  //     if (chatPages.length > 0) {
  //       setChatPage(chatPages[0]);
  //       setAlreadySetChatPageFristTime(true)
  //     }
  //   }
  // }, [chatPages]);

  return (
    <div className={style.container}>
      <div className={style.containerDflex}>
        <div className={style.col1}>
          <div className={style.header}>
            <div className={style.input}>
              <RiSearchLine className={style.icon} />
              <input placeholder="Find chats" />
            </div>

            <div className={style.newChat}>
              <button onClick={displayNewMessage}>
                <LiaEdit className={style.icon} />
              </button>
            </div>
          </div>

          <div className={style.body}>
            <ul>
              {chatPages.map((item, index) => {
                return (
                  <li key={index} onClick={() => handleMessageDetailI(item)}>
                    <Link className={style.link}>
                      <div className={style.item}>
                        <div className={style.avatar}>

                          {item.type === chatService.type.GROUP && <img src={item.newAvatar} />}

                          {console.log(item)}

                          {item.type === chatService.type.PAIR &&
                            item.chatParticipants.map((chatParticipant, index) => {
                              return (
                                chatParticipant.userId !== user.userId && (
                                  <div key={index}>
                                    {chatParticipant.userDTO.gender === "male" && (
                                      <img src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook.jpg?ssl=1" alt="Male Avatar" />
                                    )}
                                    {chatParticipant.userDTO.gender === "female" && (
                                      <img src="https://cdn.alongwalk.info/info/wp-content/uploads/2022/11/16190605/image-99-hinh-avatar-cute-ngau-ca-tinh-de-thuong-nhat-cho-nam-nu-0096fcffd35002f7d89daff94d95ab6b.jpg" alt="Female Avatar" />
                                    )}
                                    {(chatParticipant.userDTO.gender === "other" || chatParticipant.userDTO.gender == null) && (
                                      <img src={defaultAvatar} alt="Default Avatar" />
                                    )}
                                  </div>
                                )
                              );
                            })
                          }






                          {/* {item.type === chatService.type.PAIR && (
                            {
                              item.gender == "male" &&
                                <img src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook.jpg?ssl=1"></img>
                            }

{
                            item.gender == "female" &&
                            <img src="https://cdn.alongwalk.info/info/wp-content/uploads/2022/11/16190605/image-99-hinh-avatar-cute-ngau-ca-tinh-de-thuong-nhat-cho-nam-nu-0096fcffd35002f7d89daff94d95ab6b.jpg"></img>
                          }

                          {
                            (item.gender == "other" || item.gender == null) &&
                            <img src={defaultAvatar}></img>
                          }
                          )
                          } */}

                          {item.type === chatService.type.PAIR &&
                            item.chatParticipants
                              .filter((chatParticipant) => {
                                return (
                                  chatParticipant.userDTO.userId !==
                                  user.userId &&
                                  chatParticipant.userDTO.alreadyBeFriend &&
                                  chatParticipant.userDTO.status ===
                                  userService.status.ONLINE
                                );
                              })
                              .map((chatParticipant, index) => (
                                <GoDotFill key={index} className={style.icon} />
                              ))}

                          {/* {item.type === chatService.type.GROUP &&
                            item.chatParticipants
                              .filter((chatParticipant) => {
                                return (
                                  chatParticipant.userDTO.userId !==
                                  user.userId &&
                                  chatParticipant.userDTO.alreadyBeFriend &&
                                  chatParticipant.userDTO.status ===
                                  userService.status.ONLINE
                                );
                              })
                              .map((chatParticipant, index) => (
                                <GoDotFill key={index} className={style.icon} />
                              ))} */}
                          {/* <GoDotFill className={style.icon} /> */}
                        </div>

                        <div className={style.infor}>
                          <div className={style.row1}>
                            {item.type == chatService.type.PAIR && (
                              <div>
                                {item.chatParticipants.map(
                                  (chatParticipant, index) =>
                                    chatParticipant.userDTO.userId !=
                                    user.userId && (
                                      <div
                                        key={index}
                                        className={style.userName}
                                      >
                                        <p style={{ fontWeight: item.alreadyRead ? "400" : "500" }}>
                                          {chatParticipant.userDTO.firstName + " " + chatParticipant.userDTO.lastName}
                                        </p>
                                      </div>
                                    )
                                )}
                              </div>
                            )}

                            {item.type == chatService.type.GROUP && (
                              <div>


                                <div className={style.userName}>
                                  <p style={{ fontWeight: item.alreadyRead ? "400" : "500" }}>
                                    {item.name.length > 28 ? item.name.substring(0, 28) + "..." : item.name}
                                  </p>
                                </div>
                              </div>
                            )}

                            <div className={style.timeAndRead}>
                              {item.latestChatMessage.createdAt && (
                                <p className={style.time}>
                                  {calculateTimeDiff(
                                    item.latestChatMessage.createdAt,
                                    currentTime
                                  )}
                                </p>
                              )}

                              {!item.alreadyRead && <GoDotFill className={style.icon} />}

                            </div>
                          </div>

                          <div className={style.row2}>
                            <p style={{
                              color: item.alreadyRead ? "#333" : "#000",
                              fontWeight: item.alreadyRead ? "300" : "400",
                              fontSize: item.alreadyRead ? "14px" : "16px"
                            }} className={style.message}>

                              {item.latestChatMessage.type == chatMessageService.type.CHANGE_AVATAR && `${item.latestChatMessage.lastName}: changed chat avatar`}

                              {item.latestChatMessage.type == chatMessageService.type.CHANGE_NAME && `${item.latestChatMessage.lastName}: changed chat name`}

                              {item.latestChatMessage.type == chatMessageService.type.CHANGE_EMOJI && `${item.latestChatMessage.lastName}: changed chat emoji`}

                              {(item.latestChatMessage.type == chatMessageService.type.MESSAGE || item.latestChatMessage.type == null) &&
                                item.latestChatMessage.mediaType == chatMessageService.mediaType.STICKER && `${item.latestChatMessage.lastName}: sent a sticker`
                              }

                              {(item.latestChatMessage.type == chatMessageService.type.MESSAGE || item.latestChatMessage.type == null) &&
                                item.latestChatMessage.mediaType == chatMessageService.mediaType.IMAGE && `${item.latestChatMessage.lastName}: sent a photo`
                              }

                              {(item.latestChatMessage.type == chatMessageService.type.MESSAGE || item.latestChatMessage.type == null) &&
                                item.latestChatMessage.mediaType == chatMessageService.mediaType.EMOJI && `${item.latestChatMessage.lastName}: sent a emoji`
                              }
                              {(item.latestChatMessage.type == chatMessageService.type.MESSAGE || item.latestChatMessage.type == null) &&
                                (item.latestChatMessage.mediaType == chatMessageService.mediaType.TEXT || item.latestChatMessage.mediaType == null) &&
                                `${item.latestChatMessage.lastName}: ${item.latestChatMessage.content}`
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className={style.col2}>
          <div ref={messageDetailRef} className={style.messageDetail}>
            {chatPage.chatParticipantOfCurrentUser && <MessageDetail
              chatPage={chatPage}
              getChatPages={getChatPages}
              currentTime={currentTime}
            />}
          </div>

          <div ref={newMessageRef} className={style.newMessage}>
            <NewMessage
              // bổ sung set chat page when create new chat
              displayMessageDetail={displayMessageDetail}
              getChatPages={getChatPages}
              setPageNumberOfChatPage={setPageNumberOfChatPage}
            />
          </div>
        </div>
      </div>
    </div >
  );
}

export default Message;
