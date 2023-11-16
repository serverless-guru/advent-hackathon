let webSocket: WebSocket | null = null;

export const connectWebSocket = (
  webSocketUrl: string,
  apiKey: string
): void => {
  webSocket = new WebSocket(webSocketUrl, apiKey);

  webSocket.onopen = () => {
    console.log("WebSocket Connected");
  };

  webSocket.onmessage = (event) => {
    console.log("Message from server:", event.data);
  };

  webSocket.onerror = (error) => {
    console.error("WebSocket Error:", error);
  };

  webSocket.onclose = () => {
    console.log("WebSocket Disconnected");
    webSocket = null;
  };
};

export const sendWebSocketMessage = (message: string): void => {
  if (webSocket && webSocket.readyState === WebSocket.OPEN) {
    webSocket.send(
      JSON.stringify({
        action: "send_message",
        message: message,
      })
    );
  }
};