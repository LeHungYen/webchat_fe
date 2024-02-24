import axios from "axios";

export class ChatPageService {
  defaultChatPage = [
    {
      chatId: null,
      type: null,
      name: null,
      createdAt: null,
      chatParticipants: [],
      chatParticipantOfCurrentUser: null,
      latestChatMessage: ""
    },
  ];

  // get
  get = async (pageNumber) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("userToken")
    )}`;
    try {
      const response = await axios.get(
        `http://localhost:8080/chatPage?page=${pageNumber}`
      );

      return response.data.content;
    } catch (error) {
      console.log("Error:", error);
      return this.defaultChatPage;
    }
  };
}
