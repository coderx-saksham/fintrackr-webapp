import { isImageUrl } from "../util/iconUtils.js";

/**
 * Renders category/transaction icons correctly whether they are
 * emoji characters or image URLs.
 */
const IconOrEmoji = ({ icon, alt = "", className = "w-6 h-6", textClassName = "text-2xl", fallback = "💰" }) => {
  if (!icon) {
    return <span className={textClassName}>{fallback}</span>;
  }

  if (isImageUrl(icon)) {
    return (
      <img
        src={icon}
        alt={alt}
        className={`${className} object-contain`}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          const sibling = e.currentTarget.nextSibling;
          if (sibling) sibling.style.display = "inline";
        }}
      />
    );
  }

  return <span className={textClassName}>{icon}</span>;
};

export default IconOrEmoji;
