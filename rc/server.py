import asyncio
import websockets
import pyautogui

# Define the server's screen resolution
server_screen_width = 1920  # Replace with your server's screen width
server_screen_height = 1080  # Replace with your server's screen height

# Asynchronous function to handle WebSocket connections
async def handler(websocket, path):
    async for message in websocket:
        try:
            parts = message.split(',')
            if len(parts) == 3:
                x, y, action = map(int, parts)
                
                # Calculate scaling factors based on the client's and server's screen resolutions
                client_screen_width = server_screen_width  # Assuming client and server have the same width
                client_screen_height = server_screen_height  # Assuming client and server have the same height
                x_scale_factor = client_screen_width / server_screen_width
                y_scale_factor = client_screen_height / server_screen_height
                
                # Adjust the coordinates using the scaling factors
                adjusted_x = int(x * x_scale_factor)
                adjusted_y = int(y * y_scale_factor)
                
                if action == 1:
                    # Left-click action
                    pyautogui.click(adjusted_x, adjusted_y, button='left')
                elif action == 2:
                    # Right-click action
                    pyautogui.click(adjusted_x, adjusted_y, button='right')
                else:
                    # No click action
                    pass
                
                # Debugging: Print the received and adjusted coordinates
                print('Received X:', x)
                print('Received Y:', y)
                print('Adjusted X:', adjusted_x)
                print('Adjusted Y:', adjusted_y)
                print('Action:', action)
            else:
                # Handle keyboard input (assuming the message is a single character)
                key = message
                pyautogui.press(key)
                print('Key Pressed:', key)
                
        except Exception as e:
            print('Error:', e)

# Initialize the WebSocket server
start_server = websockets.serve(handler, "localhost", 5000)

# Run the server continuously
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
