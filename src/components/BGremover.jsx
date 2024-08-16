import { useState } from "react";
import axios from "axios";

const RemoveBackground = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [removedBgImage, setRemovedBgImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleRemoveBackground = async () => {
    if (!selectedFile) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("image_file", selectedFile);

    try {
      const response = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        formData,
        {
          headers: {
            "X-Api-Key": "rFgppDfC9LLeuNqySar1MUTr",
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      const imageBlob = response.data;
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setRemovedBgImage(imageObjectURL);
    } catch (error) {
      console.error("Error removing background:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br />
      <button
        onClick={handleRemoveBackground}
        disabled={!selectedFile || loading}
      >
        {loading ? "Processing..." : "Remove Background"}
      </button>
      <br />
      {selectedFile && (
        <div>
          <h3>Original Image:</h3>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Original"
            style={{ maxWidth: "300px", marginTop: "20px" }}
          />
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
