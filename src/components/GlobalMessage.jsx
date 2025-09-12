// GlobalMessage.js
function GlobalMessage({ type = "error", message, onClose }) {
    if (!message) return null;

    const colors =
        type === "error"
            ? "text-red-800 bg-red-50 border border-red-400"
            : "text-green-800 bg-green-50 border border-green-400";

    return (
        <div
            className={`flex items-center p-4 mb-4 rounded-lg ${colors}`}
            role="alert"
        >
            {/* Icon */}
            {type === "error" ? (
                <svg
                    className="shrink-0 w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
            ) : (
                <svg
                    className="shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M16.707 5.293a1 1 0 0 0-1.414 0L9 11.586 6.707 9.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0 0-1.414Z" />
                </svg>
            )}

            {/* Message */}
            <span className="sr-only">Info</span>
            <span className="ms-3 text-sm font-medium">{message}</span>

            {/* Close button */}
            <button
                type="button"
                onClick={onClose}
                className="ms-auto -mx-1.5 -my-1.5 bg-transparent text-gray-500 rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-gray-200 inline-flex items-center justify-center h-8 w-8"
                aria-label="Close"
            >
                <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                    />
                </svg>
            </button>
        </div>
    );
}

export default GlobalMessage;
