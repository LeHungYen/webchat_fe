import style from "./index.module.scss";
import clsx from 'clsx';
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { ChatService } from "../../../../serivces/ChatService";
import { ChatMessageService } from "../../../../serivces/ChatMessageService";
function ChangeChatName({ changeChatNamePopup, setChangeChatNamePopup, chatpage }) {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const chatService = new ChatService();
    const chatMessageService = new ChatMessageService();

    const [chatName, setChatName] = useState("")

    const updateChat = async () => {
        const newChat = {
            chatId: chatpage.chatId,
            type: chatpage.type,
            name: chatName,
            avatar: chatpage.avatar,
            emoji: chatpage.emoji,
            createAt: chatpage.createAt,
            updateType: chatMessageService.type.CHANGE_NAME,
            chatParticipantId: chatpage.chatParticipantOfCurrentUser.chatParticipantId
        }
        await chatService.update(newChat)
        // await getChatPages(0);
        setChangeChatNamePopup(false);
    }

    return (
        <div className={style.App}>
            {changeChatNamePopup && (
                <div
                    onClick={() => setChangeChatNamePopup(false)}
                    className={style.overlay}
                >
                    {/* Content */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={style.content}
                    >
                        {/* Header */}
                        <div className={style.header}>
                            <div className={style.title}>
                                <p>Change chat name</p>
                            </div>

                            <div
                                onClick={() => setChangeChatNamePopup(false)}
                                className={style.closeBtn}
                            >
                                <IoCloseCircleOutline className={style.icon} />
                            </div>
                        </div>
                        {/* Body */}
                        <div className={style.body}>
                            <p>Changing the name of a group chat changes it for everyone.</p>

                            <div className={style.textForm}>
                                <label>Chat name</label>
                                <input value={chatName} onChange={(e) => setChatName(e.target.value)} className={style.textInput} maxLength="255" placeholder="Enter chat name of group here"></input>
                            </div>
                        </div>


                        <footer className={style.footer}>
                            <button onClick={() => setChangeChatNamePopup(false)}>Cancel</button>
                            <button
                                disabled={chatName == "" ? true : false}
                                style={{ background: chatName == "" ? "" : "#0389c9", color: chatName == "" ? "" : "#ffffff" }}
                                onClick={updateChat}
                            >Save</button>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChangeChatName;
