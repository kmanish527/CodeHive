import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { initSocket } from "../socket";
import { ACTIONS } from "../actions";
import Editor from "../components/Editor";
import UserAvatar from "../components/UserAvatar";
import CodeHiveLogo from "/image/Logo.png";

export default function EditorPage() {
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        socketRef.current = await initSocket();
        socketRef.current.on("connect_error", (err) => handleErrors(err));
        socketRef.current.on("connect_failed", (err) => handleErrors(err));

        function handleErrors(e) {
          console.log("socket error", e);
          toast.error("Socket connection failed, try again later.");
          navigate("/");
        }

        socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state?.username,
        });

        socketRef.current.on(
          ACTIONS.JOINED,
          ({ clients, username, socketId }) => {
            if (username !== location.state?.username) {
              toast.success(`${username} joined the room.`);
            }
            setClients(clients);
          }
        );

        socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code: receivedCode }) => {
          if (receivedCode !== null) {
            setCode(receivedCode);
          }
        });

        socketRef.current.on(
          ACTIONS.LANGUAGE_CHANGE,
          ({ language: receivedLanguage }) => {
            if (receivedLanguage) {
              setLanguage(receivedLanguage);
            }
          }
        );

        socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
          toast.error(`${username} left the room.`);
          setClients((prev) =>
            prev.filter((client) => client.socketId !== socketId)
          );
        });
      } catch (err) {
        console.error("Initialization error:", err);
        navigate("/");
      }
    };
    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
        socketRef.current.off(ACTIONS.CODE_CHANGE);
        socketRef.current.off(ACTIONS.LANGUAGE_CHANGE);
      }
    };
  }, []);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy Room ID.");
    }
  };

  if (!location.state?.username) {
    useEffect(() => {
      navigate("/");
    }, []);
    return null;
  }

  return (
    <div className="relative flex h-screen bg-zinc-900 text-white overflow-hidden">
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="md:hidden absolute top-4 right-4 z-40 p-2 bg-zinc-800 rounded-md"
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? "✖️" : "☰"}
      </button>

      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-10"
        ></div>
      )}

      <aside
        className={`w-64 bg-zinc-800 flex flex-col p-4 shadow-lg
                           fixed md:relative h-full z-20 transition-transform duration-300 ease-in-out
                           ${
                             isSidebarOpen
                               ? "translate-x-0"
                               : "-translate-x-full"
                           } md:translate-x-0`}
      >
        <div className="mb-4 p-2 border-b border-zinc-700">
          <img
            src={CodeHiveLogo}
            alt="CodeHive Logo"
            className="w-32 mx-auto"
          />
        </div>
        <h2 className="text-lg font-semibold mb-4 text-zinc-300">Connected</h2>
        <div className="flex-grow flex flex-row flex-wrap gap-4 content-start overflow-y-auto">
          {clients
            .filter((client) => client.username)
            .map((client) => (
              <UserAvatar key={client.socketId} username={client.username} />
            ))}
        </div>
        <div className="mt-auto space-y-3">
          <button
            onClick={copyRoomId}
            className="w-full py-2 bg-zinc-700 rounded-md hover:bg-zinc-600"
          >
            Copy ROOM ID
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full py-2 bg-red-600 rounded-md hover:bg-red-700"
          >
            Leave
          </button>
        </div>
      </aside>

      <main className="flex-1 h-full">
        <Editor
          initialCode={code}
          language={language}
          onCodeChange={(newCode) => {
            setCode(newCode);
            if (socketRef.current) {
              socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                roomId,
                code: newCode,
              });
            }
          }}
          onLanguageChange={(newLanguage) => {
            setLanguage(newLanguage);
            if (socketRef.current) {
              socketRef.current.emit(ACTIONS.LANGUAGE_CHANGE, {
                roomId,
                language: newLanguage,
              });
            }
          }}
        />
      </main>
    </div>
  );
}
