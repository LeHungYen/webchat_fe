import axios from "axios";

export class ChatMessageService {
  defaultChatMessage = {
    chatMessageId: null,
    chatId: null,
    chatParticipantId: null,
    replyToMessageId: null,
    content: "",
    mediaType: null,
    mediaURL: null,
    createdAt: null,
    status: null,
  };

  mediaType = {
    TEXT: "TEXT",
    IMAGE: "IMAGE",
    VIDEO: "VIDEO",
    STICKER: "STICKER",
  };

  status = {
    SEEN: "SEEN",
    SENDED: "SENDED",
    DELETED: "DELETED",
  };

  // create
  save = async (requestBody) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.post(
        "http://localhost:8080/chatmessage",
        requestBody
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return this.defaultChatMessage;
    }
  };

  // save img
  saveImg = async (chatId , chatParticipantId, file) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;

    const formData = new FormData();
    formData.append("chatId" , chatId);
    formData.append("chatParticipantId" , chatParticipantId);
    formData.append("file" , file);
    try {
      const response = await axios.post(
        "http://localhost:8080/chatmessage/saveImg",
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

  // // update
  // updateFriendRequest = async (requestBody) => {
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
  //     localStorage.getItem("userToken")
  //   )}`;
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:8080/friendrequest/${requestBody.requestId}`,
  //       requestBody
  //     );
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // get
  getByChatId = async (chatId, pageNumber) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.get(
        `http://localhost:8080/chatmessage/findByChatId?chatId=${chatId}&pageNumber=${pageNumber}`
      );

      return response.data.content;
    } catch (error) {
      console.log("Error:", error);
      return [];
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
