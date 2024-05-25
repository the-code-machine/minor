import React, { useEffect, useState, useRef } from "react";


function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentImage, setCurrentImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // To store the preview of the selected image
  const [messageList, setMessageList] = useState([]);
  const fileInputRef = useRef(null);

  // useEffect(() => {
  //   socket.on("load_chat_history", (chatHistory) => {
  //     setMessageList(chatHistory);
  //   });

  //   socket.on("receive_message", (data) => {
  //     setMessageList((list) => [...list, data]);
  //   });

  //   socket.on("receive_image", (data) => {
  //     setMessageList((list) => [...list, data]);
  //   });
  // }, [socket]);

  const sendMessage = async () => {
    if (currentImage) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = {
          room,
          author: username,
          image: e.target.result,
          time: new Date().toLocaleTimeString(),
        };

        await socket.emit("send_image", imageData);
        setMessageList((list) => [...list, imageData]);
        setCurrentImage(null);
        setImagePreview(null); // Reset the image preview after sending
      };
      reader.readAsDataURL(currentImage);
    } else if (currentMessage !== "") {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time: new Date().toLocaleTimeString(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCurrentImage(file); // Store the selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result); // Store the Data URL for the preview
      };
      reader.readAsDataURL(file);
    }
  };

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  return (
    <div className="lg:w-full lg:h-3/5 w-full h-screen flex flex-col p-2 shadow-2xl bg-[#1DBF73] justify-between lg:rounded">
      <div className=" h-10 rounded font-semibold flex justify-center items-center p-3 bg-white">
        <p>Notices</p>
      </div>
      <div className="h-3/4 p-3 flex flex-col mt-2 border-t-2 border-white">
        <div
          className="flex flex-col h-[50vh] scroll-bar overflow-y-auto"
          style={{ maxHeight: "60vh" }}
        >
          <div style={{ flexGrow: 1 }} />
          {messageList.map((messageContent, index) => (
            <Message key={index} messageContent={messageContent} username={username} />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="w-full p-3 flex items-center justify-between">
        <input
          type="text"
          className="px-4 py-2 rounded w-full outline-none"
          value={currentMessage}
          placeholder="Type your message..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button
          onClick={() => {
            fileInputRef.current.click();
          }}
          className="flex items-center justify-center p-2"
          title="Attach Image"
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Selected"
              style={{ width: "24px", height: "24px" }}
            />
          ) : (
            <svg width="44px" height="44px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.2639 15.9375L12.5958 14.2834C11.7909 13.4851 11.3884 13.086 10.9266 12.9401C10.5204 12.8118 10.0838 12.8165 9.68048 12.9536C9.22188 13.1095 8.82814 13.5172 8.04068 14.3326L4.04409 18.2801M14.2639 15.9375L14.6053 15.599C15.4112 14.7998 15.8141 14.4002 16.2765 14.2543C16.6831 14.126 17.12 14.1311 17.5236 14.2687C17.9824 14.4251 18.3761 14.8339 19.1634 15.6514L20 16.4934M14.2639 15.9375L18.275 19.9565M18.275 19.9565C17.9176 20 17.4543 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4.12796 18.7313 4.07512 18.5321 4.04409 18.2801M18.275 19.9565C18.5293 19.9256 18.7301 19.8727 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V16.4934M4.04409 18.2801C4 17.9221 4 17.4575 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.07989 4 7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V16.4934M17 8.99989C17 10.1045 16.1046 10.9999 15 10.9999C13.8954 10.9999 13 10.1045 13 8.99989C13 7.89532 13.8954 6.99989 15 6.99989C16.1046 6.99989 17 7.89532 17 8.99989Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          )}
        </button>
        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          onChange={handleImageSelect}
        />

        <button onClick={sendMessage} className="flex items-center justify-center">
          <img src="/svg/svgsend.svg"/>
        </button>
      </div>
    </div>
  );
}

function Message({ messageContent, username }) {
  return (
    <div
      className={`message-item scroll-bar ${
        username === messageContent.author ? "self-end" : "self-start"
      } bg-white p-2 rounded-lg my-2`}
      style={{
        maxWidth: "70%", // Constrain the maximum width of message boxes
      }}
    >
      <div>
        {messageContent.message ? (
          <div className="message-content font-semibold">
            <p>{messageContent.message}</p>
          </div>
        ) : (
          <div className="image-content">
            <img
              src={messageContent.image}
              alt="Sent"
              style={{ maxWidth: "200px" }}
              className=" rounded-3xl" // Constrain image size
            />
          </div>
        )}
      </div>
      <div className="author text-xs text-right text-gray-500">
        {messageContent.author} • {messageContent.time}
      </div>
    </div>
  );
}

export default Chat;
