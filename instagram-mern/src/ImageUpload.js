import React, { useState, useEffect } from "react";
import "./ImageUpload.css";
import { Button } from "@material-ui/core";
import { db, storage } from "./firebase";
import firebase from "firebase";
import axios from "./axios";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState("");
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 1500));
  }, []);
  const avatarPhoto = `https://avatars.dicebear.com/api/human/${seed}.svg`;

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = (event) => {
    const uploadtask = storage.ref(`images/${image?.name}`).put(image);

    uploadtask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(`Error: ${error.message}`);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            // axios.post("/upload", {
            //   dp:
            //     "https://th.bing.com/th/id/OIP.t82QBsDPG-zXFlrH_k-1qgHaFj?pid=Api&rs=1",
            //   caption: caption,
            //   user: username,
            //   image: url,
            // });
            //post image inside db
            db.collection("posts").add({
              dp: avatarPhoto,
              imageUrl: url,
              caption: caption,
              username: username,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      {/* caption input */}
      {/* file picker */}
      {/* upload button */}
      <div className="uploadContainer">
        <progress value={progress} max="100" className="progress" />

        <input
          type="text"
          placeholder="Enater a caption..."
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
          className="caption"
        />
        <input type="file" onChange={handleChange} className="file" />
        <Button onClick={handleUpload} className="upload">
          Upload
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
