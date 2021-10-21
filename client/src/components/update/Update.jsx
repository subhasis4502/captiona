import "./update.css";
//import Sidebar from "../../components/sidebar/Sidebar";
import { useRef, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";
import { axiosInstance } from "../../config";

export default function EditProfile() {
  const name = useRef();
  const bio = useRef();
  const city = useRef();
  const country = useRef();
  const relationship = useRef();
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [dpFile, setDpFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      password: "123456",
      name: name.current?.value,
      desc: bio.current?.value,
      city: city.current?.value,
      from: country.current?.value,
      relationship: relationship.current?.value,
    };
    try {
      //Error
      //Here it sends request to localhost:3000 but i want localhost:8000
      await axiosInstance.put(`/users/${user._id}`, updatedUser);
      history.push(`/${user.name}`);
      alert("Profile Updated");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="update">
      <h2>Personal Information</h2>
      <hr />
      <form className="userinfo" onSubmit={handleClick}>
        <input
          type="text"
          placeholder="Enter your name"
          ref={name}
          className="userInput"
        />
        <input
          type="text"
          placeholder="Give a bio"
          ref={bio}
          className="userInput"
        />
        <input
          type="text"
          placeholder="Enter your city"
          ref={city}
          className="userInput"
        />
        <input
          type="text"
          placeholder="Enter your country"
          ref={country}
          className="userInput"
        />
        <select
          name="relationship"
          id="relationship"
          ref={relationship}
          className="userInput"
        >
          <option value="1">Single</option>
          <option value="2">In Relationship</option>
          <option value="3">Married</option>
        </select>
        <div className="buttons">
          <button className="submit" type="submit">
            Update
          </button>
          <button className="cancel" type="reset">
            Cancel
          </button>
        </div>
      </form>

      <h2>Profile Pictures</h2>
      <hr />
      <div className="profilePictures">
        <div className="displayPicture">
          <h3>Display Picture:</h3>
          {dpFile && (
            <div className="dpContainer">
              <img
                className="dpContainerImg"
                src={URL.createObjectURL(dpFile)}
                alt=""
              />
            </div>
          )}
          <input
            type="file"
            id="file"
            accept=".png,.jpeg,.jpg"
            onChange={(e) => setDpFile(e.target.files[0])}
          />
          <div className="buttons">
            <button className="submit" type="submit">
              Update
            </button>
            <button className="cancel" type="reset" onClick={() => setDpFile(null)} >
              Cancel
            </button>
          </div>
        </div>
        <div className="coverPicture">
          <h3>Cover Picture:</h3>
          {coverFile && (
            <div className="coverContainer">
              <img
                className="coverContainerImg"
                src={URL.createObjectURL(coverFile)}
                alt=""
              />
            </div>
          )}
          <input
            type="file"
            id="file"
            accept=".png,.jpeg,.jpg"
            onChange={(e) => setCoverFile(e.target.files[0])}
          />
          <div className="buttons">
            <button className="submit" type="submit">
              Update
            </button>
            <button className="cancel" type="reset" onClick={() => setCoverFile(null)} >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
