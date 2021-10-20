import "./closeFriend.css";

export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  //console.log(user);
  return (
    <li className="sidebarFriend">
      <img
        src={
          user.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
        className="sidebarFriendImg"
      />
      <span className="sidebarFriendName">{user.name ? user.name : user.username}</span>
    </li>
  );
}
