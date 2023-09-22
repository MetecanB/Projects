import React, { useState, useEffect } from 'react';

function ScreenSharingComponent() {
  const [isSharingScreen, setSharingScreen] = useState(false);

  const toggleScreenSharing = () => {
    if (isSharingScreen) {
      stopScreenSharing();
    } else {
      startScreenSharing();
    }
  };

  const startScreenSharing = () => {
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((stream) => {
        setSharingScreen(true);
        const videoElement = document.getElementById('vid');
        videoElement.srcObject = stream;
        videoElement.play();
      })
      .catch((e) => console.log(e));
  };

  const stopScreenSharing = () => {
    const videoElement = document.getElementById('vid');
    const stream = videoElement.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());

    videoElement.srcObject = null;
    setSharingScreen(false);
  };

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5000');

    return () => {
      socket.close(); // Close the WebSocket connection on unmount
    };
  }, []);

  return (
    <div>
      <video id="vid" autoPlay muted></video>
      <button id="shareScreenButton" onClick={toggleScreenSharing}>
        {isSharingScreen ? 'Stop Sharing' : 'Share Screen'}
      </button>
    </div>
  );
}

export default ScreenSharingComponent;
