// project
import style from "./index.module.scss";
import { MessageDetail } from "./MessageDetail";
import { NewMessage } from "./NewMessage";
import { ChatPageService } from "../../serivces/ChatPageService";
import { ChatService } from "../../serivces/ChatService";
import { StoreContext, actions } from "../../store";
import { calculateTimeDiff } from "../../utils";
import { UserService } from "../../serivces/UserService";
// libary
import { RiSearchLine } from "react-icons/ri";
import { LiaEdit } from "react-icons/lia";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { useState, useRef, useContext, useEffect } from "react";

function Message() {
  // const [state, dispatch] = useContext(StoreContext);
  const chatPageService = new ChatPageService();
  const chatService = new ChatService();
  const userService = new UserService();
  const messageDetailRef = useRef(null);
  const newMessageRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

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
    setChatPages(response);
  };

  useEffect(() => {
    getChatPages(pageNumberOfChatPage);
  }, [pageNumberOfChatPage]);

  // handle message detail input
  const [chatPage, setChatPage] = useState({});

  const handleMessageDetailI = (chatPage) => {
    setChatPage(chatPage);
    displayMessageDetail();
  };


  const [alreadySetChatPageFristTime, setAlreadySetChatPageFristTime] = useState(false);
  useEffect(() => {
    if (!alreadySetChatPageFristTime) {
      if (chatPages.length > 0) {
        setChatPage(chatPages[0]);
        setAlreadySetChatPageFristTime(true)
      }
    }
  }, [chatPages]);

  return (
    <div className={style.container}>
      <div className={style.containerDflex}>
        <div className={style.col1}>
          <div className={style.header}>
            <div className={style.input}>
              <RiSearchLine className={style.icon} />
              <input placeholder="Find Friends" />
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
                          <img src="https://i.pinimg.com/564x/df/ce/a7/dfcea7989195d3273c2bcb367fca0a83.jpg" />
                          {console.log(item.type == chatService.type.PAIR)}
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
                                        <p>
                                          {chatParticipant.userDTO.fullName}
                                        </p>
                                      </div>
                                    )
                                )}
                              </div>
                            )}

                            <div className={style.timeAndRead}>
                              {/* <p className={style.time}>2:40 PM</p> */}
                              {/* <p className={style.time}>{item.latestChatMessage.createdAt}</p> */}
                              {/* {item.latestChatMessage.createdAt && (
                                <p className={style.time}>
                                  {getTimeDifference(
                                    item.latestChatMessage.createdAt
                                  )}
                                </p>
                              )} */}
                              {item.latestChatMessage.createdAt && (
                                <p className={style.time}>
                                  {calculateTimeDiff(
                                    item.latestChatMessage.createdAt,
                                    currentTime
                                  )}
                                </p>
                              )}
                              <GoDotFill className={style.icon} />
                            </div>
                          </div>

                          <div className={style.row2}>
                            <p className={style.message}>
                              {item.latestChatMessage.content}
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
    </div>
  );
}

export default Message;
