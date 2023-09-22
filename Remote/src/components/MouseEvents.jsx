import React, { useState } from 'react';

function MouseEventsComponent({ isSharingScreen, socket }) {
  const [isClickInProgress, setClickInProgress] = useState(false);

  // Left-click handler
  const handleLeftClick = (e) => {
    if (isSharingScreen && !isClickInProgress) {
      // Extract the necessary coordinates and action from the click event
      const posX = e.target.offsetLeft;
      const posY = e.target.offsetTop;
      const X = e.pageX - posX;
      const Y = e.pageY - posY;
      const action = 1; // 1 represents a left-click action

      // Call a function to handle the click action
      pointer(X, Y, action);
    }
  };

  // Right-click handler
  const handleRightClick = (e) => {
    if (isSharingScreen && !isClickInProgress) {
      e.preventDefault(); // Prevent the default right-click context menu

      // Extract the necessary coordinates and action from the click event
      const posX = e.target.offsetLeft;
      const posY = e.target.offsetTop;
      const X = e.pageX - posX;
      const Y = e.pageY - posY;
      const action = 2; // 2 represents a right-click action

      // Call a function to handle the click action
      pointer(X, Y, action);
    }
  };

  // Function to send mouse coordinates to the server
  const pointer = (X, Y, action) => {
    // Check if the WebSocket is in the OPEN state
    if (socket.readyState === WebSocket.OPEN) {
      // Replace with your server's screen width and height
      const serverScreenWidth = 1920;
      const serverScreenHeight = 1080;

      // Calculate scaling factors
      const clientScreenWidth = window.screen.width;
      const clientScreenHeight = window.screen.height;
      const xScaleFactor = clientScreenWidth / serverScreenWidth;
      const yScaleFactor = clientScreenHeight / serverScreenHeight;

      // Adjust coordinates based on scaling factors
      const adjustedX = Math.floor(X / xScaleFactor);
      const adjustedY = Math.floor(Y / yScaleFactor);

      // Create the adjusted coordinate string
      const adjustedCoordinates = `${adjustedX},${adjustedY},${action}`;

      // Log and send the adjusted coordinates to the server
      console.log('Adjusted Pointer Coordinates:', adjustedCoordinates);
      socket.send(adjustedCoordinates); // Send the coordinates to the server through WebSocket
    } else {
      console.log('WebSocket is not in the OPEN state. Cannot send data.');
    }
  };

  return (
    <div>
      {/* Add the component's JSX here */}
      {/* For example, you can attach event listeners to specific elements */}
      <div
        id="vid"
        onClick={handleLeftClick}
        onContextMenu={handleRightClick}
        // Add other relevant attributes
      >
        {/* Add content or video element here */}
      </div>
    </div>
  );
}

export default MouseEventsComponent;
