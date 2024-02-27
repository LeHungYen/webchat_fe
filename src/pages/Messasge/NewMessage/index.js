//project
import style from "./index.module.scss";
import { UserService } from "../../../serivces/UserService";
import { ChatService } from "../../../serivces/ChatService";
import { ChatParticipantService } from "../../../serivces/ChatParticipant";
import { ChatMessageService } from "../../../serivces/ChatMessageService";
import { StoreContext, actions } from "../../../store";
import { getResourceImage } from "../../../utils";
// libary
import { SlPlus } from "react-icons/sl";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { BiSend } from "react-icons/bi";
import { GoHeart } from "react-icons/go";
import { FaDeleteLeft } from "react-icons/fa6";
import { useState, useEffect, useRef, useContext } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

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

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    const token = JSON.parse(localStorage.getItem("userToken"));
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    client.connect(headers, () => {
      client.subscribe("/topic/message", (response) => {
        // const receivedNotification = JSON.parse(response.body);
        // setNotification(receivedNotification);
      });
    });

    setStompClient(client);

    return () => {
      client.disconnect();
    };
  }, []);

  // const sendChatMessage = (data) => {
  //   stompClient.send("/app/chatMessage", {}, JSON.stringify(data));
  //   // setChatMessage(defaultNotification);
  // };

  // find user
  const getUsersByKeySearch = () => {
    const fetchData = async () => {
      const response = await userService.findUserByKey(keySearch);
      setUsers(response);
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

  // display block or none message box
  useEffect(() => {
    if (receivers.length > 0) {
      messageBoxRef.current.style.display = "flex";
    } else {
      messageBoxRef.current.style.display = "none";
    }
  });

  // send message to receiver
  // const [chat, setChat] = useState(chatService.defaultChat);
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    // create newChat
    const chatRequestBody = {
      chatId: null,
      type:
        receivers.length > 2 ? chatService.type.GROUP : chatService.type.PAIR,
      name: null,
      createdAt: null,
    };

    const newChat = await chatService.save(chatRequestBody);

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
    </div>
  );
}
