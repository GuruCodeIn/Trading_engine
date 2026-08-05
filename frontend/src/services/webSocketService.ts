let socket: WebSocket | null = null;

const messageListeners: Array<
    (data: any) => void
> = [];

const statusListeners: Array<
    (status: string) => void
> = [];

let reconnectTimer: number | null = null;

function notifyStatus(
    status: string
) {
    statusListeners.forEach(
        (listener) =>
            listener(status)
    );
}

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

    notifyStatus(
        "CONNECTING"
    );

    socket = new WebSocket(
        "ws://127.0.0.1:5555/ws/market"
    );

    socket.onopen = () => {

        console.log(
            "[WebSocket] Connected"
        );

        notifyStatus(
            "CONNECTED"
        );

    };

    socket.onmessage = (
        event
    ) => {

        if (!event.data) {
            return;
        }

        try {

            const data =
                JSON.parse(
                    event.data
                );

            messageListeners.forEach(
                (listener) =>
                    listener(data)
            );

        } catch {

            console.error(
                "[WebSocket] Invalid JSON"
            );

        }

    };

    socket.onerror = (
        error
    ) => {

        console.error(
            "[WebSocket] Error",
            error
        );

    };

    socket.onclose = () => {

        console.log(
            "[WebSocket] Disconnected"
        );

        socket = null;

        notifyStatus(
            "DISCONNECTED"
        );

        if (
            reconnectTimer === null
        ) {

            notifyStatus(
                "RECONNECTING"
            );

            reconnectTimer =
                window.setTimeout(
                    () => {

                        reconnectTimer =
                            null;

                        connectWebSocket();

                    },
                    3000
                );

        }

    };

    return socket;

}

export function subscribeWebSocket(
    listener: (
        data: any
    ) => void
) {

    messageListeners.push(
        listener
    );

    return () => {

        const index =
            messageListeners.indexOf(
                listener
            );

        if (index !== -1) {

            messageListeners.splice(
                index,
                1
            );

        }

    };

}

export function subscribeConnectionStatus(
    listener: (
        status: string
    ) => void
) {

    statusListeners.push(
        listener
    );

    return () => {

        const index =
            statusListeners.indexOf(
                listener
            );

        if (index !== -1) {

            statusListeners.splice(
                index,
                1
            );

        }

    };

}

export function disconnectWebSocket() {

    if (socket) {

        socket.close();

        socket = null;

    }

}