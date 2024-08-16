import { useState } from "react";
import axios from "axios";

const RemoveBackground = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [removedBgImage, setRemovedBgImage] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <input type="file" />
      <br />
      <button>{loading ? "Processing..." : "Remove Background"}</button>
      <br />
      {selectedFile && (
        <div>
          <h3>Original Image:</h3>
          <img alt="Original" />
        </div>
      )}
      {removedBgImage && (
        <div>
          <h3>Image without Background:</h3>
          <img
            src={removedBgImage}
            alt="Without Background"
            style={{ maxWidth: "300px", marginTop: "20px" }}
          />
        </div>
      )}
    </div>
  );
};

export default RemoveBackground;
