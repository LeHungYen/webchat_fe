import style from "./index.module.scss";
import { ChatMessageService } from "../../../serivces/ChatMessageService";
import { StoreContext, actions } from "../../../store";
import { ChatService } from "../../../serivces/ChatService";
import { formatTime } from "../../../utils";
import { getResourceImage } from "../../../utils";
import { routes } from "../../../config/routes";
import { UserService } from "../../../serivces/UserService";
import { calculateTimeDiff } from "../../../utils";
import { ChatMessageParticipantService } from "../../../serivces/ChatMessageParticipantService";
// project stickers / bluefogs
import comingsoon from "../../../assets/stickers/bluefogs/comingsoon.png";
import didyouknow_ from "../../../assets/stickers/bluefogs/didyouknow_.png";
import goodmorning from "../../../assets/stickers/bluefogs/goodmorning.png";
import goodnight from "../../../assets/stickers/bluefogs/goodnight.png";
import staytuned from "../../../assets/stickers/bluefogs/staytuned.png";
import stayweird from "../../../assets/stickers/bluefogs/stayweird.png";
import surprise from "../../../assets/stickers/bluefogs/surprise.png";
import thisorthat from "../../../assets/stickers/bluefogs/thisorthat.png";
import welcome from "../../../assets/stickers/bluefogs/welcome.png";
import watchthis from "../../../assets/stickers/bluefogs/watchthis.png";

// project stickers / afrohead
import image_0 from "../../../assets/stickers/afrohead/image_0.png";
import image_1 from "../../../assets/stickers/afrohead/image_1.png";
import image_2 from "../../../assets/stickers/afrohead/image_2.png";
import image_3 from "../../../assets/stickers/afrohead/image_3.png";
import image_4 from "../../../assets/stickers/afrohead/image_4.png";
import image_5 from "../../../assets/stickers/afrohead/image_5.png";
import image_6 from "../../../assets/stickers/afrohead/image_6.png";
import image_7 from "../../../assets/stickers/afrohead/image_7.png";
import image_8 from "../../../assets/stickers/afrohead/image_8.png";
import image_9 from "../../../assets/stickers/afrohead/image_9.png";
import image_10 from "../../../assets/stickers/afrohead/image_10.png";
import image_11 from "../../../assets/stickers/afrohead/image_11.png";
import image_12 from "../../../assets/stickers/afrohead/image_12.png";
import image_13 from "../../../assets/stickers/afrohead/image_13.png";
import image_14 from "../../../assets/stickers/afrohead/image_14.png";
import image_15 from "../../../assets/stickers/afrohead/image_15.png";

// libary
import { IoCallOutline } from "react-icons/io5";
import { ImImages } from "react-icons/im";
import { IoVideocamOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { SlPlus } from "react-icons/sl";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { BiSend } from "react-icons/bi";
import { GoHeart } from "react-icons/go";
import { GoBellSlash } from "react-icons/go";
import { IoTrashOutline } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { IoFlagOutline } from "react-icons/io5";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { LuSticker } from "react-icons/lu";
import { IoAdd } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";
import { GoDotFill } from "react-icons/go";
import { useState, useRef, useContext, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
export function MessageDetail({ chatPage, getChatPages, currentTime }) {
  // const [state, dispath] = useContext(StoreContext);
  const chatMessageService = new ChatMessageService();
  const chatService = new ChatService();
  const userService = new UserService();
  const chatMessageParticipantService = new ChatMessageParticipantService();
  const [stickers, setStickers] = useState([]);
  const chatHistoryUlRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));
  // handle sticker

  useEffect(() => {
    const bluefogs = [
      comingsoon,
      didyouknow_,
      goodmorning,
      goodnight,
      staytuned,
      stayweird,
      surprise,
      thisorthat,
      welcome,
      watchthis,
    ];

    const afrohead = [
      image_0,
      image_1,
      image_2,
      image_3,
      image_4,
      image_5,
      image_6,
      image_7,
      image_8,
      image_9,
      image_10,
      image_11,
      image_12,
      image_13,
      image_14,
      image_15,
    ];

    setStickers((prev) => [...prev, afrohead, bluefogs]);
  }, []);

  const [indexStickers, setIndexStickers] = useState(0);

  // display block or none stickers , icon
  const stickerIconRef = useRef(null);
  const displayStickerIconRef = () => {
    const currentDisplay = window.getComputedStyle(
      stickerIconRef.current
    ).display;

    if (currentDisplay == "none") {
      stickerIconRef.current.style.display = "block";
    } else {
      stickerIconRef.current.style.display = "none";
    }
  };

  // display block or none chatInfor
  const chatInforRef = useRef(null);
  const displaychatInforRef = () => {
    const currentDisplay = window.getComputedStyle(
      chatInforRef.current
    ).display;

    if (currentDisplay == "none") {
      chatInforRef.current.style.display = "block";
    } else {
      chatInforRef.current.style.display = "none";
    }
  };

  // page number of chat history
  const [pageNumberCH, setPageNumberCH] = useState(0);   
  // get chat history
  const [chatHistory, setChatHistory] = useState([]);
  const getChatHistory = async (chatId) => {
    const response = await chatMessageService.getByChatId(chatId, chatPage.chatParticipantOfCurrentUser.chatParticipantId, pageNumberCH);

    // update mediaURL
    const handleMediaUrl = async () => {
      const updatedChatHistory = await Promise.all(
        response.map(async (item) => {
          if (item.mediaType == chatMessageService.mediaType.IMAGE) {
            const newMediaUrl = await getResourceImage(item.mediaURL);
            return { ...item, mediaURL: newMediaUrl };
          }
          return item;
        })
      );
      setChatHistory(updatedChatHistory);
    }
    handleMediaUrl();
  };
  useEffect(() => {
    if (chatPage && chatPage.chatParticipantOfCurrentUser) {
      getChatHistory(chatPage.chatId);
    }
  }, [chatPage, pageNumberCH]);

  // websocket connection
  useEffect(() => {
    if (chatPage.chatId) {
      const socket = new SockJS("http://localhost:8080/ws");
      const client = Stomp.over(socket);
      const token = JSON.parse(localStorage.getItem("userToken"));
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      client.connect(headers, () => {
        client.subscribe(
          `/topic/chatMessage/${user.userId}`,
          (response) => {
            const receivedMessage = JSON.parse(response.body);
            getChatPages(0);
            if (receivedMessage.chatId == chatPage.chatId) {
              // chatMessageParticipantService.updateStatusWatched(chatPage.chatParticipantOfCurrentUser.chatParticipantId, chatPage.chatId);
              // setChatHistory((prev) => [...prev, receivedMessage]);
              getChatHistory(chatPage.chatId);
            }
          }
        );
      });

      return () => {
        client.disconnect();
      };
    }
  }, [chatPage]);

  // handle mesage input
  const [messageInput, setMessageInput] = useState(
    chatMessageService.defaultChatMessage
  );

  const handleMessageInput = (key, value) => {
    setMessageInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  // send message
  const sendMessage = async () => {
    if (messageInput.content.trim().length == 0) {
      return;
    }

    const requestBody = {
      ...messageInput,
      chatId: chatPage.chatId,
      chatParticipantId:
        chatPage.chatParticipantOfCurrentUser.chatParticipantId,
      status: chatMessageService.status.SENDED,
    };
    await chatMessageService.save(requestBody);
    setMessageInput(chatMessageService.defaultChatMessage);
    chatHistoryUlRef.current.scrollTop = chatHistoryUlRef.current.scrollHeight;
  };

  const sendSticker = async (mediaURL) => {
    const requestBody = {
      ...messageInput,
      chatId: chatPage.chatId,
      chatParticipantId:
        chatPage.chatParticipantOfCurrentUser.chatParticipantId,
      mediaType: chatMessageService.mediaType.STICKER,
      mediaURL: mediaURL,
      status: chatMessageService.status.SENDED,
    };
    await chatMessageService.save(requestBody);
    setMessageInput(chatMessageService.defaultChatMessage);
    displayStickerIconRef();
    setTimeout(() => {
      chatHistoryUlRef.current.scrollTop =
        chatHistoryUlRef.current.scrollHeight;
    }, 500);
  };

  const sendImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await chatMessageService.saveImg(
        chatPage.chatId,
        chatPage.chatParticipantOfCurrentUser.chatParticipantId,
        file
      );
      setMessageInput(chatMessageService.defaultChatMessage);
    }
  };

  return (
    <div className={style.messageDetail}>
      <div className={style.chatContent}>
        <div className={style.row1}>
          {chatPage.type == chatService.type.PAIR && (
            <div>
              {chatPage.chatParticipants.map(
                (chatParticipant, index) =>
                  chatParticipant.userDTO.userId != user.userId && (
                    <div key={index} className={style.userInfor}>
                      <div className={style.avatar}>
                        <img src="https://i.pinimg.com/564x/df/ce/a7/dfcea7989195d3273c2bcb367fca0a83.jpg" />
                        {chatParticipant.userDTO.alreadyBeFriend &&
                          chatParticipant.userDTO.status ==
                          userService.status.ONLINE && (
                            <GoDotFill className={style.icon} />
                          )}
                      </div>
                      <div className={style.dflexColumn}>
                        <p className={style.username}>
                          {chatParticipant.userDTO.firstName + " " + chatParticipant.userDTO.lastName}
                        </p>

                        {chatParticipant.userDTO.alreadyBeFriend &&
                          chatParticipant.userDTO.status ===
                          userService.status.ONLINE && (
                            <p
                              style={{ color: "green" }}
                              className={style.activeTime}
                            >
                              Online
                            </p>
                          )}

                        {!chatParticipant.userDTO.alreadyBeFriend && (
                          <p className={style.activeTime}>No friendship</p>
                        )}

                        {chatParticipant.userDTO.alreadyBeFriend &&
                          chatParticipant.userDTO.status ===
                          userService.status.OFFLINE && (
                            <p className={style.activeTime}> Active {calculateTimeDiff(
                              chatParticipant.userDTO.lastLogin,
                              currentTime
                            )} ago</p>
                          )}
                      </div>
                    </div>
                  )
              )}
            </div>
          )}

          <div className={style.menuOption}>
            <ul>
              <li>
                <IoCallOutline className={style.icon} />
              </li>
              <li>
                <IoVideocamOutline className={style.icon} />
              </li>
              <li>
                <IoSettingsOutline className={style.icon} />
              </li>
              <li onClick={displaychatInforRef}>
                <IoIosInformationCircleOutline className={style.icon} />
              </li>
            </ul>
          </div>
        </div>

        <div className={style.chatHistory}>
          {/* <ul ref={chatHistoryUlRef}>
            {chatHistory.map((item, index) => {
              return (
                <li key={index}>
                  <div
                    className={
                      item.chatParticipantId ==
                        chatPage.chatParticipantOfCurrentUser.chatParticipantId
                        ? style.thisUser
                        : style.otherUser
                    }
                  >
                    {item.mediaType == chatMessageService.mediaType.STICKER && (
                      <img src={item.mediaURL} className={style.sticker}></img>
                    )}

                    {item.mediaType == chatMessageService.mediaType.IMAGE && (
                      <img src={item.mediaURL} className={style.chatImg} ></img>
                    )}

                    {item.content != null && item.content != "" && (
                      <p className={style.text}>{item.content}</p>
                    )}

                    <div className={style.chatDetails}>
                      <p className={style.time}>
                        {formatTime(item.createdAt)} 
                      </p>
                    </div>

                    <div className={style.iconMessageMenu}>
                      <BsThreeDots className={style.icon} />
                    </div>

                    {item.chatMessageParticipantDTOs.map((chatMessageParticipantDTO, index) => (
                      chatMessageParticipantDTO.lastViewedAt && (
                        <div key={index} className={style.peopleViewed}>
                          <p >{chatMessageParticipantDTO.userParticipantName} đã xem</p>
                        </div>
                      )
                    ))}
                  </div>


                </li>
              );
            })}
          </ul> */}

          <ul className={style.chatHistoryUl} ref={chatHistoryUlRef}>
            {chatHistory.map((item, index) => {
              return (
                <li key={index}>
                  <div
                    className={
                      item.chatParticipantId ==
                        chatPage.chatParticipantOfCurrentUser.chatParticipantId
                        ? style.thisUser
                        : style.otherUser
                    }
                  >

                    <div className={style.avatarChat}>
                      <img src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook.jpg?ssl=1"></img>
                    </div>

                    {item.mediaType == chatMessageService.mediaType.STICKER && (
                      <img src={item.mediaURL} className={style.sticker}></img>
                    )}

                    {item.mediaType == chatMessageService.mediaType.IMAGE && (
                      <img src={item.mediaURL} className={style.chatImg} ></img>
                    )}

                    {item.content != null && item.content != "" && (
                      <p className={style.text}>{item.content}</p>
                    )}

                    <div className={style.chatDetails}>
                      <p className={style.time}>
                        {formatTime(item.createdAt)}
                      </p>
                    </div>

                    <div className={style.iconMessageMenu}>
                      <button> <BsThreeDots className={style.icon} /></button>
                    </div>
                  </div>


                  <ul className={style.peopleViewed}>
                    {item.chatMessageParticipantDTOs.map((chatMessageParticipantDTO, index) => (
                      chatMessageParticipantDTO.lastViewedAt && (
                        <li key={index}>
                          <div className={style.peopleViewedDetail}>
                            <span>{chatMessageParticipantDTO.lastName} đã xem lúc {formatTime(chatMessageParticipantDTO.lastViewedAt)}</span>
                          </div>
                          <div className={style.avatarPeopleViewed}>
                            <img src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook.jpg?ssl=1"></img>
                          </div>
                        </li>
                      )
                    ))}
                  </ul>

                </li>
              );
            })}
          </ul>
        </div>

        <div className={style.messageBox}>
          <div className={style.messageBoxCol1}>
            {/* <SlPlus className={style.icon} /> */}

            <form action="/upload" method="POST" enctype="multipart/form-data">
              <label htmlFor="messageBoxImg" className={style.icon}>
                <ImImages />
              </label>
              <input
                type="file"
                id="messageBoxImg"
                onChange={sendImage}
                style={{ display: "none" }}
              />
            </form>

            <FaRegFaceSmileBeam className={style.icon} />

            <div className={style.sticker}>
              <LuSticker
                className={style.icon}
                onClick={displayStickerIconRef}
              />

              <div className={style.stickerIconMenu} ref={stickerIconRef}>
                <div className={style.stickerIconMenuHeader}>
                  <ul>
                    <li className={style.stickerHeader}>
                      <p>Stickers</p>
                    </li>
                    <li className={style.iconHeader}>
                      <p>Emoji</p>
                    </li>
                    <li className={style.iconHeader}>
                      <p>Gif</p>
                    </li>
                  </ul>
                </div>

                <div className={style.stickerMenuBody}>
                  {stickers &&
                    stickers[indexStickers]?.map((item, index) => {
                      return (
                        <img
                          key={index}
                          src={item}
                          onClick={() => sendSticker(item)}
                        ></img>
                      );
                    })}
                </div>

                <div className={style.stickerMenuFooter}>
                  <ul>
                    <li className={style.prev}>
                      <GrPrevious className={style.icon} />
                    </li>

                    {stickers &&
                      stickers.map((item, index) => {
                        return (
                          <li
                            className={style.liMenu}
                            key={index}
                            onClick={() => setIndexStickers(index)}
                          >
                            <img src={item[0]} />
                          </li>
                        );
                      })}
                    <li className={style.next}>
                      <GrNext className={style.icon} />
                    </li>
                  </ul>

                  <div className={style.addSticker}>
                    <IoAdd className={style.icon} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={style.messageBoxCol2}>
            <input
              value={messageInput.content}
              onChange={(e) => handleMessageInput("content", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <BiSend className={style.icon} />
          </div>

          <div className={style.messageBoxCol3}>
            <GoHeart className={style.icon} />
          </div>
        </div>
      </div>

      <div ref={chatInforRef} className={style.chatInfor}>
        <div className={style.exit} onClick={displaychatInforRef}>
          <TiDeleteOutline className={style.icon} />
        </div>

        {chatPage.type === chatService.type.PAIR &&
          chatPage.chatParticipants.map(
            (item, index) =>
              item.userId !== user.userId && (
                <div className={style.otherUserInfor}>
                  <div className={style.avatar}>
                    <img src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook.jpg?ssl=1"></img>
                  </div>
                  <p className={style.name}>{item.userDTO.firstName + " " + item.userDTO.lastName}</p>
                  <p className={style.gmail}>{item.userDTO.email}</p>
                  <Link
                    className="link"
                    to={`${routes.userWall}?id=${item.userId}`}
                    key={index}
                  >
                    <button>View profile</button>
                  </Link>
                </div>
              )
          )}

        <ul>
          <li>
            <div className={style.dflex}>
              <GoBellSlash className={style.icon} />
              <p>Mute Notification</p>
            </div>
          </li>

          <li>
            <div className={style.dflex}>
              <IoFlagOutline className={style.icon} />
              <p>Report</p>
            </div>
          </li>

          <li>
            <div className={style.dflex}>
              <MdBlock className={style.icon} />
              <p>Block</p>
            </div>
          </li>

          <li>
            <div className={style.dflex}>
              <IoTrashOutline className={style.icon} />
              <p>Delete Chat</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
