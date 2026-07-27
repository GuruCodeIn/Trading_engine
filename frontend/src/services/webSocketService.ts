let socket: WebSocket | null = null;

const listeners: Array<(data: any) => void> = [];

export function connectWebSocket() {
    if (
        socket &&
        (
            socket.readyState === WebSocket.OPEN ||
            socket.readyState === WebSocket.CONNECTING
        )
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
        console.log(
            "[WebSocket] Raw message:",
            event.data
        );

        if (!event.data) {
            return;
        }

        try {
            const data = JSON.parse(event.data);

            listeners.forEach((listener) =>
                listener(data)
            );
        } catch {
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
        console.log(
            "[WebSocket] Disconnected"
        );

        socket = null;
    };

    return socket;
}

export function subscribeWebSocket(
    listener: (data: any) => void
) {
    listeners.push(listener);

    return () => {
        const index =
            listeners.indexOf(listener);

        if (index !== -1) {
            listeners.splice(index, 1);
        }
    };
}

export function disconnectWebSocket() {
    if (
        socket &&
        listeners.length === 0
    ) {
        socket.close();
        socket = null;
    }
}