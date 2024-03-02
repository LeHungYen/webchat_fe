import axios from "axios";

export class ChatService {
  defaultChat = {
    chatId: null,
    type: null,
    name: null,
    avatar: null,
    emoji: null,
    createdAt: null,
  };

  type = {
    PAIR: "PAIR",
    GROUP: "GROUP",
  };

  // create
  save = async (requestBody) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.post(
        "http://localhost:8080/chat",
        requestBody
      );
      return { ...requestBody, chatId: response.data };
    } catch (error) {
      console.error("Error:", error);
      return this.defaultFriendRequest;
    }
  };

  // update
  update = async (requestBody) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.put(
        `http://localhost:8080/chat/${requestBody.chatId}`,
        requestBody
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // update photo of chat group
  saveImg = async (chatId, chatParticipantId, file) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;

    const formData = new FormData();
    formData.append("chatId", chatId);
    formData.append("chatParticipantId", chatParticipantId);
    formData.append("file", file);
    try {
      const response = await axios.post(
        "http://localhost:8080/chat/saveImg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return this.defaultChatMessage;
    }
  };


  // get
  getByType = async (userId1, userId2, type) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.get(
        `http://localhost:8080/chat/getByType/${userId1}/${userId2}/${type}`
      );
      if (response.data != null) {
        return response.data;
      } else {
        return this.defaultChat;
      }
    } catch (error) {
      console.log("Error:", error);
      return this.defaultChat;
    }
  };

  // // delete
  // deleteFriendRequest = async (requestId) => {
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
  //     localStorage.getItem("userToken")
  //   )}`;
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:8080/friendrequest/${requestId}`
  //     );

  //     return this.defaultFriendRequest;
  //   } catch (error) {}
  // };
}
