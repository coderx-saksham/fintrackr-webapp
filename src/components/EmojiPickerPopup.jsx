import {useState} from "react";
import {Image, X} from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import IconOrEmoji from "./IconOrEmoji.jsx";

const EmojiPickerPopup = ({icon, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleEmojiClick = (emojiData) => {
        // Prefer emoji character — never breaks as an <img>
        onSelect(emojiData?.emoji || emojiData?.imageUrl || "");
        setIsOpen(false);
    }
    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
            <div
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-4 cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg overflow-hidden">
                    {icon ? (
                        <IconOrEmoji icon={icon} alt="Icon" className="w-10 h-10" textClassName="text-2xl" />
                    ): (
                        <Image />
                    )}

                </div>
                <p>{icon ? "Change icon" : "Pick Icon"}</p>
            </div>

            {isOpen && (
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer">
                        <X />
                    </button>
                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={handleEmojiClick}
                    />
                </div>
            )}
        </div>
    )
}

export default EmojiPickerPopup;
