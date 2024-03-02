//project
import style from "./index.module.scss";
import { UserService } from "../../../serivces/UserService";
import { ChatService } from "../../../serivces/ChatService";
import { ChatParticipantService } from "../../../serivces/ChatParticipant";
import { ChatMessageService } from "../../../serivces/ChatMessageService";
import { StoreContext, actions } from "../../../store";
import { getResourceImage } from "../../../utils";
import { formatTime } from "../../../utils";
// libary
import { SlPlus } from "react-icons/sl";
import { BsThreeDots } from "react-icons/bs";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { BiSend } from "react-icons/bi";
import { GoHeart } from "react-icons/go";
import { FaDeleteLeft } from "react-icons/fa6";
import { useState, useEffect, useRef, useContext } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { ImImages } from "react-icons/im";

export function NewMessage({
  displayMessageDetail,
  getChatPages,
  setPageNumberOfChatPage,
}) {

  const user = JSON.parse(localStorage.getItem("user"));
  // const [state, dispatch] = useContext(StoreContext);
  const [keySearch, setKeySearch] = useState("");
  const [users, setUsers] = useState([]);
  const userService = new UserService();
  const chatService = new ChatService();
  const chatParticipantService = new ChatParticipantService();
  const chatMessageService = new ChatMessageService();
  const inputSearchRef = useRef(null);
  const searchResultRef = useRef(null);
  const messageBoxRef = useRef(null);

  // chatMessage websocket
  const [stompClient, setStompClient] = useState(null);

  // find user
  const getUsersByKeySearch = () => {
    const fetchData = async () => {
      const response = await userService.findUserByKey(keySearch);
      if (Array.isArray(response)) {
        const filteredUsers = response.filter(user => !receivers.some(receiver => receiver.userId === user.userId));
        setUsers(filteredUsers);
      }
    };

    fetchData();
  };

  useEffect(() => {
    getUsersByKeySearch();

    // display block or none search results
    if (keySearch.trim() == "" || keySearch.trim() == null) {
      searchResultRef.current.style.display = "none";
    } else {
      searchResultRef.current.style.display = "block";
    }
  }, [keySearch]);

  // handle receivers
  const [receivers, setReceivers] = useState([]);

  const addReceiver = (user) => {
    setReceivers((prev) => [...prev, user]);
    inputSearchRef.current.focus();
    setKeySearch("");
  };

  const removeReceiver = (index) => {
    setReceivers((prevReceivers) => {
      const newReceivers = [...prevReceivers];
      newReceivers.splice(index, 1);
      return newReceivers;
    });
  };
  // check chat already exist

  // useEffect(() => {
  //   const fetchData = async () => {

  //   }

  //   fetchData();
  // }, [receivers])

  // display block or none message box
  useEffect(() => {
    if (receivers.length > 0) {
      messageBoxRef.current.style.display = "flex";
    } else {
      messageBoxRef.current.style.display = "none";
    }
  }, [receivers]);

  // send message to receiver
  // const [chat, setChat] = useState(chatService.defaultChat);
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message.trim().length == 0) {
      return;
    }

    if (receivers.length == 1) {
      const response = await chatService.getByType(user.userId, receivers[0].userId, chatService.type.PAIR);
      if (response.chatId) {
        const chat = response;

        const requestBody = {
          chatMessageId: null,
          chatId: chat.chatId,
          chatParticipantId: chat.chatParticipantId,
          replyToMessageId: null,
          content: message,
          mediaType: chatMessageService.mediaType.TEXT,
          mediaURL: null,
          createdAt: null,
        };

        // update last chat id
        const userResponse = await userService.updateLastChatId(user.userId, chat.chatId);
        await localStorage.setItem("user", JSON.stringify(userResponse))


        await chatMessageService.save(requestBody);
        setMessage("");
        setReceivers([]);
        displayMessageDetail();
        return;
      }
    }


    // create newChat
    let chatRequestBody;
    if (receivers.length > 1) {
      chatRequestBody = {
        chatId: null,
        type: chatService.type.GROUP,
        name: receivers[0].lastName + ", " + receivers[1].lastName + ` and  ${receivers.length - 1} other people`,
        avatar: "defaultGroupChat.png",
        emoji: "heart.png",
        createdAt: null,
      };
    } else {
      chatRequestBody = {
        chatId: null,
        type: chatService.type.PAIR,
        name: null,
        emoji: "heart.png",
        createdAt: null,
      };
    }


    const newChat = await chatService.save(chatRequestBody);

    // update last chat id
    const userResponse = await userService.updateLastChatId(user.userId, newChat.chatId);
    await localStorage.setItem("user", JSON.stringify(userResponse))
    // add participant

    const chatParticipantRequestBody = {
      chatParticipantId: null,
      chatId: newChat.chatId,
      userId: user.userId,
      joinedAt: null,
    };
    const newChatParticipant = await chatParticipantService.save(
      chatParticipantRequestBody
    );

    for (const user of receivers) {
      const chatParticipantRequestBody = {
        chatParticipantId: null,
        chatId: newChat.chatId,
        userId: user.userId,
        joinedAt: null,
      };
      await chatParticipantService.save(chatParticipantRequestBody);
    }

    // add chat message
    const newChatMessageRequestBody = {
      chatMessageId: null,
      chatId: newChat.chatId,
      chatParticipantId: newChatParticipant.chatParticipantId,
      replyToMessageId: null,
      content: message,
      mediaType: chatMessageService.mediaType.TEXT,
      mediaURL: null,
      createdAt: null,
      status: chatMessageService.status.SENDED,
    };
    // sendChatMessage(newChatMessageRequestBody);
    await chatMessageService.save(newChatMessageRequestBody);
    setMessage("");
    setReceivers([]);
    await getChatPages(0);
    displayMessageDetail();
  };
  return (
    <div className={style.newMessage}>
      <div className={style.header}>
        <p className={style.receivers}>
          To:
          {receivers.map((item, index) => {
            return (
              <span key={index}>
                {item.firstName + " " + item.lastName}{" "}
                <FaDeleteLeft
                  onClick={() => removeReceiver(index)}
                  className={style.iconDelete}
                />
              </span>
            );
          })}
        </p>
        <div className={style.input}>
          <input
            ref={inputSearchRef}
            value={keySearch}
            onChange={(e) => setKeySearch(e.target.value)}
            placeholder="Find Friends"
          />

          <div className={style.users} ref={searchResultRef}>
            <ul>
              {users.map((item, index) => {
                return (
                  <li key={index} onClick={() => addReceiver(item)}>
                    <div className={style.user}>
                      <div className={style.avatar}>
                        <img src="https://shopbanphim.com/wp-content/uploads/2023/11/hinh-anh-avatar-cap-doi-cute-de-thuong.jpg"></img>
                      </div>

                      <div className={style.infor}>
                        <p className={style.fullname}>{item.firstName + " " + item.lastName}</p>
                        <p className={style.email}>{item.email}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div ref={messageBoxRef} className={style.messageBox}>
        <div className={style.messageBoxCol1}>
          <SlPlus className={style.icon} />
          <FaRegFaceSmileBeam className={style.icon} />
        </div>

        <div className={style.messageBoxCol2}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <BiSend className={style.icon} />
        </div>

        <div className={style.messageBoxCol3}>
          <GoHeart className={style.icon} />
        </div>
      </div>

      {/* <div ref={messageBoxRef} className={style.messageBox}>
        <div className={style.messageBoxCol1}>

          <form action="/upload" method="POST" encType="multipart/form-data">
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
      </div> */}
    </div>
  );
}
