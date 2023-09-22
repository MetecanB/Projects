import React, { useState } from 'react';

function DocumentTransfer({ socket }) {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Function to upload the selected file
  const handleFileUpload = () => {
    if (selectedFile && socket.readyState === WebSocket.OPEN) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64Data = event.target.result.split(',')[1];
        const fileName = selectedFile.name;

        // Create a data object with filename and base64 content
        const data = {
          filename: fileName,
          content: base64Data,
        };

        // Use a custom message prefix (e.g., "upload:") to identify file uploads
        socket.send('upload:' + JSON.stringify(data));
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div>
      <h2>Document Transfer</h2>
      <input
        type="file"
        id="fileInput"
        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
        onChange={handleFileSelect}
      />
      <button id="uploadButton" onClick={handleFileUpload}>
        Upload
      </button>
    </div>
  );
}

export default DocumentTransfer;
