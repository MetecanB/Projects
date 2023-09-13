// Creating a WebSocket connection to a server running on 'localhost' at port 5000
const socket = new WebSocket('ws://localhost:5000');
let isSharingScreen = false;
let isClickInProgress = false;

// Function to start sharing the screen
function startScreenSharing() {
  if (!isSharingScreen) { 
    // Asking for permission to access the screen and microphone
    navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
        .then((stream) => {
            // Injecting the stream object as a source for a video element with 'vid' as its id
            document.getElementById('vid').srcObject = stream;
            document.getElementById('vid').play(); 
            isSharingScreen = true;
            // Changing the button text to 'Stop Sharing'
            document.getElementById('shareScreenButton').textContent = 'Stop Sharing';
        })
        .catch(e => console.log(e)); // Handling any errors
  }
}

// Function to stop sharing the screen
function stopScreenSharing() {
    const stream = document.getElementById('vid').srcObject;
    const tracks = stream.getTracks();

    // Stopping all tracks (camera and microphone)
    tracks.forEach((track) => track.stop());

    // Removing the stream as the source for the video element
    document.getElementById('vid').srcObject = null;
    isSharingScreen = false;
    // Changing the button text back to 'Share Screen'
    document.getElementById('shareScreenButton').textContent = 'Share Screen';
}

// Adding an event listener to run this code when the webpage has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var shareButton = document.getElementById('shareScreenButton');
    let SbuttonClicked = false;

    // Adding a click event listener to the 'Share Screen' button
    shareButton.addEventListener('click', function handleClick() {
        startScreenSharing(); // Start screen sharing
        if (SbuttonClicked) {
            stopScreenSharing(); // Stop screen sharing if it was already started
        }
        SbuttonClicked = true;
    });
});

// Adding another event listener for a button with id 'viewScreenButton'
document.addEventListener('DOMContentLoaded', function () {
    var viewButton = document.getElementById('viewScreenButton');
    let viewButtonClicked = false;

    // Adding a click event listener to the 'View Screen' button
    viewButton.addEventListener('click', function handleClick() {
        console.log('View Screen button is clicked');
        if (viewButtonClicked) {
            console.log('View Screen button has already been clicked');
        }
        viewButtonClicked = true;
    });
});
// Left-click handler
document.addEventListener('click', function (e) {
    if (isSharingScreen && !isClickInProgress) {
        isClickInProgress = true;

        // Get the coordinates of the click event
        let posX = document.getElementById('vid').offsetLeft;
        let posY = document.getElementById('vid').offsetTop;
        let X = e.pageX - posX;
        let Y = e.pageY - posY;

        // Call pointer function for left-click (1) action
        pointer(e, 1); // 1 represents a left-click action

        // Set a timeout to allow another click after a delay
        setTimeout(function () {
            isClickInProgress = false;
        }, 500); // Adjust the delay as needed
    }
});


// Right-click handler
document.addEventListener('contextmenu', function (e) {
    if (isSharingScreen && !isClickInProgress) {
        isClickInProgress = true;
        e.preventDefault(); // Prevent the default right-click context menu
        // Get the coordinates of the click event
        let posX = document.getElementById('vid').offsetLeft;
        let posY = document.getElementById('vid').offsetTop;
        let X = e.pageX - posX;
        let Y = e.pageY - posY;

        // Call pointer function for left-click (1) action
        pointer(e, 2); // 2 represents a right-click action

        // Set a timeout to allow another click after a delay
        setTimeout(function () {
            isClickInProgress = false;
        }, 500); // Adjust the delay as needed
    }
});

// Function to send keyboard input to the server
function sendKeyboardInput(key) {
    if (socket.readyState === WebSocket.OPEN) {
        // Send the key to the server through WebSocket
        socket.send(key);
    } else {
        console.log('WebSocket is not in the OPEN state. Cannot send data.');
    }
}
// Event listener for keydown event
document.addEventListener('keydown', function (e) {
    if (isSharingScreen) {
        e.preventDefault(); // Prevent the default key action (optional)

        // Get the key code or key name and send it to the server
        const key = e.key || String.fromCharCode(e.keyCode);
        sendKeyboardInput(key);
    }
});

// Event listener for keyup event (optional)
document.addEventListener('keyup', function (e) {
    if (isSharingScreen) {
        e.preventDefault(); // Prevent the default key action (optional)

        // Get the key code or key name and send it to the server
        const key = e.key || String.fromCharCode(e.keyCode);
        sendKeyboardInput(key);
    }
});




// Function to send mouse coordinates to the server
function pointer(e, action) {
    // Check if the WebSocket is in the OPEN state
    if (socket.readyState === WebSocket.OPEN) {
        let posX = document.getElementById('vid').offsetLeft;
        let posY = document.getElementById('vid').offsetTop;
        let X = e.pageX - posX;
        let Y = e.pageY - posY;

        // Calculate scaling factors
        const clientScreenWidth = window.screen.width;
        const clientScreenHeight = window.screen.height;
        const serverScreenWidth = 1920; // Replace with your server's screen width
        const serverScreenHeight = 1080; // Replace with your server's screen height
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
}


