import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CodeHiveLogo from "/image/Logo.png";

export default function HomePage() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a new room");
  };

  const joinRoom = () => {
    if (!roomId.trim() || !username.trim()) {
      toast.error("ROOM ID & username is required");
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: { username: username.trim() },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-900">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <div className="flex justify-center mb-6">
          <img src={CodeHiveLogo} alt="CodeHive Logo" className="w-48" />
        </div>
        <p className="text-center text-zinc-400 mb-8 -mt-4">
          Realtime collaboration
        </p>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            className="p-3 bg-zinc-700 rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="ROOM ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="p-3 bg-zinc-700 rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="USERNAME"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyUp={handleInputEnter}
          />
          <button
            className="p-3 bg-yellow-400 text-black font-bold rounded-md hover:bg-yellow-500 transition-colors"
            onClick={joinRoom}
          >
            Join
          </button>
          <p className="text-center text-zinc-400">
            If you don't have an invite then create a&nbsp;
            <span
              onClick={createNewRoom}
              className="text-yellow-400 font-semibold cursor-pointer hover:underline"
            >
              new room
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
