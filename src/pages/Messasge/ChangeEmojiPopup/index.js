import style from "./index.module.scss";
import clsx from 'clsx';
import { useState } from "react";
import { ChatMessageService } from "../../../serivces/ChatMessageService";
import { ChatService } from "../../../serivces/ChatService";

function ChangeEmojiPopup({ changeEmojiPopup, setChangeEmojiPopup, sendEmoji, chatpage }) {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const chatMessageService = new ChatMessageService();
    const chatService = new ChatService();

    const emoji = [
        'Alien.png',
        'AngelHalo.png',
        'Angry.png',
        'Angry1.png',
        'AngryCat.png',
        'AngryDevil.png',
        'Anguished.png',
        'BlowKiss.png',
        'BlushedSmiling.png',
        'ColdEmoji.png',
        'Clown.png',
        'ColdSweat.png',
        'Confounded.png',
        'Confused.png',
        'cool.png',
        'Cowboy.png',
        'Crying.png',
        'Crying1.png',
        'CryingCat.png',
        'CryingSad.png',
        'Devil.png',
        'Dizzy.png',
        'Drooling.png',
        'DrunkEmoji.png',
        'DrunkFaceEmoji.png',
        'EmojiWithoutMouth.png',
        'EmotionlessKiss.png',
        'ExplodingFace.png',
        'Expressionless.png',
        'EyeRoll.png',
        'Fearful.png',
        'Flushed.png',
        'Frowning.png',
        'Ghost.png',
        'Grimacing.png',
        'Happy.png',
        'HappyCat.png',
        'heart.png',
        'HeartEyes.png',
        'HeartEyesCat.png',
        'HotEmoji.png',
        'Hugging.png',
        'Hungry.png',
        'Hurt.png',
        'Kiss.png',
        'KissingCat.png',
        'KissingEmoji.png',
        'Laughing.png',
        'LoudlyCrying.png',
        'Money.png',
        'Nerd.png',
        'Neutral.png',
        'NewMadEmoji.png',
        'NewThinking.png',
        'Omg.png',
        'OmgCat.png',
        'OopsEmoji.png',
        'PartyFaceEmoji.png',
        'Persevering.png',
        'Pinocchio.png',
        'Poisoned.png',
        'Poop.png',
        'PukeEmoji.png',
        'Pumpkin.png',
        'Relieved.png',
        'Robot.png',
        'Sad.png',
        'Sad1.png',
        'ShhEmoji.png',
        'Shy.png',
        'Sick.png',
        'Skull.png',
        'Skull1.png',
        'Sleeping.png',
        'SlightlySmiling.png',
        'SmileEmojiWithHearts.png',
        'Smiling.png',
        'SmilingCat.png',
        'SmilingWithClosedEyes.png',
        'Smirk.png',
        'Smirk1.png',
        'Sneezing.png',
        'Snoring.png',
        'StarEyesEmoji.png',
        'Sunglasses.png',
        'SuperSurprised.png',
        'Surprised.png',
        'Surprised1.png',
        'Sweat.png',
        'SweatWithSmile.png',
        'TearCat.png',
        'Tears.png',
        'TearsOfJoy.png',
        'Thinking.png',
        'Tired.png',
        'TongueOut.png',
        'TongueOut1.png',
        'TongueOut2.png',
        'Unamused.png',
        'Unhappy.png',
        'UpsideDownSmiling.png',
        'VeryHappy.png',
        'VeryMad.png',
        'VerySad.png',
        'Virus.png',
        'Weary.png',
        'WinkEmoji.png',
        'Worried.png',
        'ZipperMouth.png'
    ];

    const updateChat = async (emojiName) => {
        const newChat = {
            chatId: chatpage.chatId,
            type: chatpage.type,
            name: chatpage.name,
            avatar: chatpage.avatar,
            emoji: emojiName,
            createAt: chatpage.createAt,
            updateType: chatMessageService.type.CHANGE_EMOJI,
            chatParticipantId: chatpage.chatParticipantOfCurrentUser.chatParticipantId
        }
        await chatService.update(newChat)
        // await getChatPages(0);
        setChangeEmojiPopup(false);
    }

    return (
        <div className={style.App}>
            {changeEmojiPopup && (
                <div
                    onClick={() => setChangeEmojiPopup(false)}
                    className={style.overlay}
                >
                    {/* Content */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={style.content}
                    >

                        <div className={style.header}>
                            <p>Emoji</p>
                        </div>

                        <div className={style.body}>
                            {emoji.map((item, index) => {
                                return (
                                    <img onClick={() => updateChat(item)} key={index} src={require(`../../../assets/emoji/${item}`)} />
                                );
                            })}
                        </div>


                        <footer className={style.footer}>

                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChangeEmojiPopup;
