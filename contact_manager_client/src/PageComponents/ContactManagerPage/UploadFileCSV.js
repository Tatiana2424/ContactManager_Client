import React, { useState } from "react";
import axios from "axios";
import "./UploadFileCSV.css";

const UploadFileCSV = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const saveFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    console.log(file);
    const formData = new FormData();
    formData.append("formFile", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post("https://localhost:5001/api/file", formData);
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        className="select_button"
        type="file"
        accept=".csv"
        onChange={saveFile}
      />
      <button className="download_button" onClick={uploadFile}>
        Upload
      </button>
    </div>
  );
};

export default UploadFileCSV;
