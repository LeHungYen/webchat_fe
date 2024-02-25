import axios from "axios";

export class ChatMessageParticipantService {

    status = {
        DELETED_BY_RECEIVER: "DELETED_BY_RECEIVER",
        DELETED_BY_SENDER: "DELETED_BY_SENDER",
        RECEIVED: "RECEIVED",
        WATCHED: "WATCHED"
    };



    // update Status Watched
    updateStatusWatched = async (chatParticipantId, chatId) => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
            localStorage.getItem("userToken")
        )}`;
        try {
            const response = await axios.put(
                `http://localhost:8080/chatMessageParticipant/updateStatusWatched/${chatParticipantId}/${chatId}`);
        } catch (error) {
            console.error("Error:", error);
        }
    };

}
