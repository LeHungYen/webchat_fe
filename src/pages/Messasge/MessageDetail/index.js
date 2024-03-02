import style from "./index.module.scss";
import { ChatMessageService } from "../../../serivces/ChatMessageService";
import { StoreContext, actions } from "../../../store";
import { ChatService } from "../../../serivces/ChatService";
import { formatTime } from "../../../utils";
import { getResourceImage } from "../../../utils";
import { routes } from "../../../config/routes";
import { UserService } from "../../../serivces/UserService";
import { calculateTimeDiff } from "../../../utils";
import ChangeChatName from "./ChangeChatNamePopUp";
import { ChatMessageParticipantService } from "../../../serivces/ChatMessageParticipantService";
import EmojiPopup from "../EmojiPopup";
import ChangeEmojiPopup from "../ChangeEmojiPopup";
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
// project sticker icon
import sticker from "../../../assets/stickers/sticker.png";
import cool from "../../../assets/emoji/cool.png";
import picture from "../../../assets/picture.png";
import customize from "../../../assets/projectIcon/customize.png";
// libary
import { CiEdit } from "react-icons/ci";
import { PiGooglePhotosLogoLight } from "react-icons/pi";
import { PiTextAaLight } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
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
import { GiCheckMark, GiM3GreaseGun } from "react-icons/gi";
import { LuSticker } from "react-icons/lu";
import { IoAdd } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";
import { GoDotFill } from "react-icons/go";
import { useState, useRef, useContext, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import clsx from "clsx";
export function MessageDetail({ chatPage, getChatPages, currentTime }) {
  // const [state, dispath] = useContext(StoreContext);
  const chatMessageService = new ChatMessageService();
  const chatService = new ChatService();
  const userService = new UserService();
  const chatMessageParticipantService = new ChatMessageParticipantService();
  const [stickers, setStickers] = useState([]);
  const chatHistoryUlRef = useRef(null);
  let user = JSON.parse(localStorage.getItem("user"));
  const [changeChatNamePopup, setChangeChatNamePopup] = useState(false)
  const [emojiPopup, setEmojiPopup] = useState(false)
  const [changeEmojiPopup, setChangeEmojiPopup] = useState(false)
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

  // get location of icon emoji to display popup emoji
  const emojiRef = useRef(null);
  const [emojiLocation, setEmojiLocation] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  })

  useEffect(() => {
    const handleResize = () => {
      const element = emojiRef.current;

      if (element) {
        const rect = element.getBoundingClientRect();
        const location = {
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right
        }
        setEmojiLocation(location);

      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  // display block or none customize chat menu
  const customizeChatRef = useRef(null);
  const displaycustomizeChatRefRef = () => {
    const currentDisplay = window.getComputedStyle(
      customizeChatRef.current
    ).display;

    if (currentDisplay == "none") {
      customizeChatRef.current.style.display = "block";
    } else {
      customizeChatRef.current.style.display = "none";
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
            const newMediaUrl = await getResourceImage(`imgs/${item.mediaURL}`);
            return { ...item, mediaURL: newMediaUrl };
          }
          if (item.mediaType == chatMessageService.mediaType.EMOJI) {
            const newMediaUrl = await getResourceImage(`emoji/${item.mediaURL}`);
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
      client.debug = false;
      const token = JSON.parse(localStorage.getItem("userToken"));
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      client.connect(headers, () => {
        client.subscribe(
          `/topic/chatMessage/${user.userId}`,
          async (response) => {
            const chatId = JSON.parse(response.body);

            user = JSON.parse(localStorage.getItem("user"));
            const currentChatId = user.lastChatId;

            if (chatId == currentChatId) {
              await getChatHistory(currentChatId);
            }
            getChatPages(0);
          }
        );
      });

      return () => {
        client.disconnect();
      };
    }
  }, []);

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
      type: chatMessageService.type.MESSAGE
      // status: chatMessageService.status.SENDED,
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

  const sendEmoji = async (mediaName) => {
    if (emojiPopup) {
      setEmojiPopup(false)
    }
    const requestBody = {
      ...messageInput,
      chatId: chatPage.chatId,
      chatParticipantId:
        chatPage.chatParticipantOfCurrentUser.chatParticipantId,
      mediaType: chatMessageService.mediaType.EMOJI,
      mediaURL: mediaName,
      status: chatMessageService.status.SENDED,
    };
    await chatMessageService.save(requestBody);
    setMessageInput(chatMessageService.defaultChatMessage);
    // displayStickerIconRef();
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
      event.target.value = null;
    }
  };

  // change photo of group chat
  const changePhotoGroupChat = async (event) => {
    const file = event.target.files[0];
    if (file) {

      await chatService.saveImg(
        chatPage.chatId,
        chatPage.chatParticipantOfCurrentUser.chatParticipantId,
        file
      );

      // await getChatPages(0);
      event.target.value = null;
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

          {chatPage.type == chatService.type.GROUP && (
            <div>
              <div className={style.userInfor}>
                <div className={style.avatar}>
                  <img src={chatPage.newAvatar} />
                  {/* <GoDotFill className={style.icon} /> */}
                </div>
                <div className={style.dflexColumn}>
                  <p className={style.username}>
                    {/* {chatPage.name} */}
                    {chatPage.name.length > 28 ? chatPage.name.substring(0, 28) + "..." : chatPage.name}
                  </p>
                </div>
              </div>
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
          <ul className={style.chatHistoryUl} ref={chatHistoryUlRef}>
            {chatHistory.map((item, index) => {

              return (
                <li key={index}>
                  {item.type === chatMessageService.type.CHANGE_AVATAR && (
                    <div className={style.changeSth}>
                      <p>{item.lastName} changed the group photo to </p>
                      <img src={item.mediaURL}></img>
                    </div>
                  )}

                  {item.type === chatMessageService.type.CHANGE_EMOJI && (
                    <div className={style.changeSth}>
                      <p>{item.lastName} change the quick reaction  </p>
                    </div>
                  )}

                  {item.type === chatMessageService.type.CHANGE_NAME && (
                    <div className={style.changeSth}>
                      {/* <p>{item.lastName} has set the group name to {item.content}</p> */}
                      <p>{item.lastName} has set the group name to {item.content.length > 20 ? item.content.substring(0, 20) + "..." : item.content}</p>
                    </div>
                  )}

                  {
                    (item.type == null || item.type == chatMessageService.type.MESSAGE) && (


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

                        {chatPage.type === chatService.type.PAIR && (
                          <div>
                            {item.mediaType === chatMessageService.mediaType.STICKER && (
                              <img src={item.mediaURL} className={style.sticker} alt="Sticker" />
                            )}

                            {item.mediaType === chatMessageService.mediaType.EMOJI && (
                              <div className={style.emoji}>
                                <img src={item.mediaURL} alt="Emoji" />
                              </div>
                            )}

                            {item.mediaType === chatMessageService.mediaType.IMAGE && (
                              <img src={item.mediaURL} className={style.chatImg} alt="Image" />
                            )}

                            {item.content != null && item.content !== "" && (
                              <p className={style.text}>{item.content}</p>
                            )}
                          </div>
                        )}

                        {chatPage.type === chatService.type.GROUP && (
                          <div className={style.chatGroup}>

                            {item.chatParticipantId !=
                              chatPage.chatParticipantOfCurrentUser.chatParticipantId &&
                              <div className={style.name}>
                                <p>{item.lastName}</p>
                              </div>
                            }

                            <div className={style.chat}>
                              {item.mediaType === chatMessageService.mediaType.STICKER && (
                                <img src={item.mediaURL} className={style.sticker} alt="Sticker" />
                              )}

                              {item.mediaType === chatMessageService.mediaType.EMOJI && (
                                <div className={style.emoji}>
                                  <img src={item.mediaURL} alt="Emoji" />
                                </div>
                              )}

                              {item.mediaType === chatMessageService.mediaType.IMAGE && (
                                <img src={item.mediaURL} className={style.chatImg} alt="Image" />
                              )}

                              {item.content != null && item.content !== "" && (
                                <p className={style.text}>{item.content}</p>
                              )}
                            </div>
                          </div>
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
                    )
                  }

                  <ul className={style.peopleViewed}>
                    {item.chatMessageParticipantDTOs.map((chatMessageParticipantDTO, index) => (
                      chatMessageParticipantDTO.lastViewedAt &&
                      chatMessageParticipantDTO.chatParticipantId != chatPage.chatParticipantOfCurrentUser.chatParticipantId && (
                        <li key={index}>
                          <div className={style.peopleViewedDetail}>
                            <span>{chatMessageParticipantDTO.lastName}   đã xem lúc {formatTime(chatMessageParticipantDTO.lastViewedAt)}</span>
                          </div>
                          <div className={style.avatarPeopleViewed}>
                            <img src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook.jpg?ssl=1"></img>
                          </div>
                        </li>
                      )
                    ))}
                  </ul>

                </li>
              )



            })}
          </ul>
        </div>

        <div className={style.messageBox}>
          <div className={style.messageBoxCol1}>
            {/* <SlPlus className={style.icon} /> */}

            <form action="/upload" method="POST" encType="multipart/form-data">
              <label htmlFor="messageBoxImg" className={style.icon}>
                {/* <ImImages /> */}
                <img src={picture} className={style.imgIcon} ></img>
              </label>
              <input
                type="file"
                id="messageBoxImg"
                onChange={sendImage}
                style={{ display: "none" }}
              />
            </form>

            <img ref={emojiRef} src={cool} onClick={() => setEmojiPopup(prev => !prev)} className={style.imgIcon}></img>

            <div className={style.sticker}>
              <img src={sticker} className={style.imgIcon} onClick={displayStickerIconRef}></img>


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
            <BiSend onClick={sendMessage} className={style.icon} />
          </div>

          <div className={style.messageBoxCol3}>
            {/* <GoHeart className={style.icon} /> */}
            <img src={chatPage.newEmoji} onClick={() => sendEmoji(chatPage.emoji)}></img>
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
                <div key={index} className={style.otherUserInfor}>
                  <div className={style.avatar}>
                    <img src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook.jpg?ssl=1"></img>
                  </div>
                  <p className={style.name}>{item.userDTO.firstName + " " + item.userDTO.lastName}</p>
                  <p className={style.gmail}>{item.userDTO.email}</p>
                  <Link
                    className="link"
                    to={`${routes.userWall}?id=${item.userId}`}

                  >
                    <button>View profile</button>
                  </Link>
                </div>
              )
          )}

        {chatPage.type === chatService.type.GROUP &&
          <div className={style.otherUserInfor}>
            <div className={style.avatar}>
              <img src={chatPage.newAvatar}></img>
            </div>
            <p className={style.name}>{chatPage.name}</p>
          </div>
        }

        <ul>
          <li className={style.dropDownMenu} >
            <div className={style.dflex} onClick={displaycustomizeChatRefRef}>
              <img src={customize}></img>
              <p>Customize Chat</p>
              <IoIosArrowDown />
            </div>

            <ul ref={customizeChatRef} className={style.customizeChat}>

              {chatPage.type === chatService.type.GROUP &&
                <li onClick={() => setChangeChatNamePopup(true)}>
                  <div className={style.dflex}>
                    <CiEdit className={style.icon} />
                    <p>Change chat name</p>
                  </div>
                </li>
              }

              {chatPage.type === chatService.type.GROUP &&
                <li>
                  <form action="" method="POST" encType="multipart/form-data">
                    <label htmlFor="messageBoxImg1" className={style.icon}>
                      <div className={style.dflex}>
                        <PiGooglePhotosLogoLight className={style.icon} />
                        <p>Change photo</p>
                      </div>
                    </label>
                    <input
                      type="file"
                      id="messageBoxImg1"
                      onChange={changePhotoGroupChat}
                      style={{ display: "none" }}
                    />
                  </form>
                </li>


              }






              <li>
                <div className={style.dflex} onClick={() => setChangeEmojiPopup(true)}>
                  <img src={chatPage.newEmoji}></img>
                  <p>Change emoji</p>
                </div>
              </li>

              <li>
                <div className={clsx(style.dflex, style.disable)} >
                  <PiTextAaLight className={style.icon} />
                  <p>Edit nicknames</p>
                </div>
              </li>
            </ul>
          </li>

          <li>
            <div className={clsx(style.dflex, style.disable)} >
              <GoBellSlash className={style.icon} />
              <p>Mute Notification</p>
            </div>
          </li>

          <li>
            <div className={clsx(style.dflex, style.disable)} >
              <IoFlagOutline className={style.icon} />
              <p>Report</p>
            </div>
          </li>

          <li>
            <div className={clsx(style.dflex, style.disable)} >
              <MdBlock className={style.icon} />
              <p>Block</p>
            </div>
          </li>

          <li>
            <div className={clsx(style.dflex, style.disable)} >
              <IoTrashOutline className={style.icon} />
              <p>Delete Chat</p>
            </div>
          </li>
        </ul>
      </div>


      <ChangeChatName
        changeChatNamePopup={changeChatNamePopup}
        setChangeChatNamePopup={setChangeChatNamePopup}
        chatpage={chatPage}
      // getChatPages={getChatPages} 
      />

      <EmojiPopup
        emojiPopup={emojiPopup}
        setEmojiPopup={setEmojiPopup}
        emojiLocation={emojiLocation}
        sendEmoji={sendEmoji}
      />

      <ChangeEmojiPopup
        changeEmojiPopup={changeEmojiPopup}
        setChangeEmojiPopup={setChangeEmojiPopup}
        sendEmoji={sendEmoji}
        chatpage={chatPage}
      />


    </div >


  );
}
