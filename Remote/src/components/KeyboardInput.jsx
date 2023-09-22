import React, { useEffect, useState } from 'react';

function KeyboardInput() {
  // State to track pressed modifiers
  const [pressedModifiers, setPressedModifiers] = useState([]);

  // Event listener for keydown
  const handleKeyDown = (e) => {
    e.preventDefault(); // Prevent the default key action (optional)

    // Get the key code or key name
    const key = e.key || String.fromCharCode(e.keyCode);

    console.log('Keydown:', key); // Log the key being pressed

    // Check if it's a modifier key (Ctrl, Alt, Shift)
    if (e.key === 'Control' || e.key === 'Alt' || e.key === 'Shift') {
      // If it's a modifier key, add it to the pressedModifiers array
      if (!pressedModifiers.includes(key)) {
        setPressedModifiers([...pressedModifiers, key]);
      }
    } else {
      // It's not a modifier key, send it as a combination of modifier+key
      if (pressedModifiers.length > 0) {
        const combo = pressedModifiers.join('-') + '-' + key;
        console.log('Sending combo:', combo); // Log the combination being sent
        // Send the combo to the server via WebSocket (you can implement this)
      } else {
        console.log('Sending key:', key); // Log the key being sent
        // Send the key to the server via WebSocket (you can implement this)
      }
    }
  };

  // Event listener for keyup (optional)
  const handleKeyUp = (e) => {
    e.preventDefault(); // Prevent the default key action (optional)

    // Get the key code or key name
    const key = e.key || String.fromCharCode(e.keyCode);

    console.log('Keyup:', key); // Log the key being released

    // Check if it's a modifier key (Ctrl, Alt, Shift) and remove it from the pressedModifiers array
    if (e.key === 'Control' || e.key === 'Alt' || e.key === 'Shift') {
      const updatedModifiers = pressedModifiers.filter((modifier) => modifier !== key);
      setPressedModifiers(updatedModifiers);
    }
  };

  // Add event listeners and cleanup functions
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Clean up event listeners
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [pressedModifiers]);

  return (
    <div>
      {/* JSX for your KeyboardInput component */}
    </div>
  );
}

export default KeyboardInput;
