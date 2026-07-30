import { User } from "lucide-react";
import { isImageUrl } from "../util/iconUtils.js";

const Avatar = ({ src, alt = "profile", className = "w-10 h-10", iconClassName = "w-5 h-5" }) => {
  const valid = isImageUrl(src);

  if (!valid) {
    return (
      <div
        className={`${className} rounded-full bg-gray-100 flex items-center justify-center text-purple-700 shrink-0`}
      >
        <User className={iconClassName} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} rounded-full object-cover bg-gray-100 shrink-0`}
      onError={(e) => {
        e.currentTarget.style.display = "none";
        const fallback = e.currentTarget.nextElementSibling;
        if (fallback) fallback.style.display = "flex";
      }}
    />
  );
};

/** Wrapper that always has a User fallback next to the img for onError */
const AvatarSafe = ({ src, alt = "profile", className = "w-10 h-10", iconClassName = "w-5 h-5" }) => {
  const valid = isImageUrl(src);

  if (!valid) {
    return (
      <div
        className={`${className} rounded-full bg-gray-100 flex items-center justify-center text-purple-700 shrink-0`}
      >
        <User className={iconClassName} />
      </div>
    );
  }

  return (
    <div className="relative shrink-0">
      <img
        src={src}
        alt={alt}
        className={`${className} rounded-full object-cover bg-gray-100`}
        onError={(e) => {
          e.currentTarget.classList.add("hidden");
          const fb = e.currentTarget.parentElement?.querySelector("[data-fallback]");
          if (fb) fb.classList.remove("hidden");
        }}
      />
      <div
        data-fallback
        className={`hidden ${className} rounded-full bg-gray-100 items-center justify-center text-purple-700`}
      >
        <User className={iconClassName} />
      </div>
    </div>
  );
};

export default AvatarSafe;
