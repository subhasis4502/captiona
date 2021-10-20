import "./message.css";
import { format } from "timeago.js";
import { useEffect, useState } from "react";

export default function Message({ message, own }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = message.sender;

    const getUser = async () => {
      try {
        const res = await axiosInstance("/users?userId=" + friendId);
        //console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [message]);

  console.log(message);
  //console.log(own);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            user?.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
