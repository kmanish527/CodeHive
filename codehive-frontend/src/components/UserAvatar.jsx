import React from "react";

export default function UserAvatar({ username }) {
  const initial = username[0].toUpperCase();
  const colorIndex = username.charCodeAt(0) % 5;
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-orange-500",
  ];

  return (
    <div className="flex flex-col items-center" title={username}>
      <div
        className={`w-12 h-12 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-bold text-xl mb-1`}
      >
        {initial}
      </div>
      <span className="text-zinc-200 text-sm truncate max-w-[60px]">
        {username}
      </span>
    </div>
  );
}
