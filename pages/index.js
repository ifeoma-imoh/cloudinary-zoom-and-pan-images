import { useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [image, setImage] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [responseUrl, setresponseUrl] = useState("");

  const handleImageChange = (e) => {
    const reader = new FileReader();
    if (!e.target.files[0]) return;
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function (e) {
      setImage(e.target.result);
    };
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadStatus("Uploading...");
    setresponseUrl("");
    try {
      const response = await axios.post("/api/upload", { image });
      const mp4Url = /https?[^<>]*?\.mp4/.exec(response.data)[0];
      setresponseUrl(mp4Url);
      setUploadStatus("Upload successful");
    } catch (error) {
      console.log(error);
      setUploadStatus("Upload failed..");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Demo of Cloudinary Zoompan Effect</h2>
      <input type="file" onChange={handleImageChange} />
      <button
        onClick={handleUpload}
        disabled={!image || uploadStatus === "Uploading..."}
      >
        Upload
      </button>
      <p>{uploadStatus}</p>
      <section className={styles.main}>
        <div>{image && <img src={image} alt="file-input" />}</div>
        <div>
          {responseUrl && (
            <video controls autoPlay>
              <source src={responseUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </section>
    </div>
  );
}
