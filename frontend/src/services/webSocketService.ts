let socket: WebSocket | null = null;

export function connectWebSocket(
    onMessage: (data: any) => void
) {
    if (
        socket &&
        socket.readyState === WebSocket.OPEN
    ) {
        return socket;
    }

    socket = new WebSocket(
        "ws://127.0.0.1:5555/ws/market"
    );

    socket.onopen = () => {
        console.log("[WebSocket] Connected");
    };

    socket.onmessage = (event) => {
    console.log("[WebSocket] Raw message:", event.data);

    if (!event.data) {
        return;
    }

    try {
        const data = JSON.parse(event.data);

        onMessage(data);
    } catch (error) {
        console.error(
            "[WebSocket] Invalid JSON:",
            event.data
        );
    }
};

    socket.onerror = (error) => {
        console.error(
            "[WebSocket] Error:",
            error
        );
    };

    socket.onclose = () => {
        console.log("[WebSocket] Disconnected");
    };

    return socket;
}

export function disconnectWebSocket() {
    if (socket) {
        socket.close();
        socket = null;
    }
}