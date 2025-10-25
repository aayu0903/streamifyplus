import { Link } from "react-router";
import { MessageCircle } from "lucide-react";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
  return (
    <div className="bg-base-100/80 backdrop-blur-sm rounded-2xl p-5 border border-primary/10 hover:border-primary/20 hover:shadow-xl transition-all duration-300 group">
      <div className="space-y-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="avatar size-14 rounded-full ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
              <img src={friend.profilePic} alt={friend.fullName} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-base-100"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
              {friend.fullName}
            </h3>
            <p className="text-xs opacity-60">Online now</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="badge badge-primary text-xs gap-1">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs gap-1">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        <Link 
          to={`/chat/${friend._id}`} 
          className="btn btn-primary w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <MessageCircle className="size-4 mr-2" />
          Start Chat
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}