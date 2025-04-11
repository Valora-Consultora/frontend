import React, { useRef, useState } from "react";

import { Edit } from "@mui/icons-material";
import { getAvatarByName } from "./formatters";

const UserAvatar = ({ editable, className, avatarClassName, avatarSize, imageUrl, user }) => {
  const [showPencil, setShowPencil] = useState(false);
  const avatarRef = useRef();

  console.log('show', showPencil)

  console.log('editable', editable)

  const handleMouseEnter = () => {
    console.log('mouseenter')
    avatarRef.current.classList.add('blur-md');
    if (editable) {
      setShowPencil(true);
    }
  }
  
  const handleMouseLeave = () => {
    console.log('mouseleave')
    avatarRef.current.classList.remove('blur-md');
    if (editable) {
      setShowPencil(false);
    }
  }

  return (
    <div className={`flex items-center ${className}`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${user.name}'s avatar`}
          className={`w-10 h-10 rounded-full ${avatarClassName}`}
        />
      ) : (
        <div className="relative">
          <div>
            <span className={`absolute top-0 left-0 rounded-full flex items-center justify-center ${avatarClassName} text-[24px]`}>
              <Edit className={`text-gray-500 ${!showPencil ? '!hidden' : ''}`} />
            </span>
          </div>
          <div ref={avatarRef} on onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={`${avatarClassName} pointer-events-none w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center`}>
            <span className="text-gray-500">{getAvatarByName(user.nombre)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAvatar
