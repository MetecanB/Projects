import React from 'react';
import ScreenSharingComponent from './components/ScreenSharingComponent';
import DocumentTransferComponent from './components/DocumentTransfer';
import KeyboardInputComponent from './components/KeyboardInput';
import MouseEventsComponent from './components/mouseEvents';

function App() {
    return (
      <div>
        <h1>Welcome to My React App</h1>
        <ScreenSharingComponent />
        <DocumentTransferComponent />
        <KeyboardInputComponent />
        <MouseEventsComponent />
        {/* Add other components as needed */}
      </div>
    );
  }
  