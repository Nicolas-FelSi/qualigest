const port = import.meta.env.VITE_PORT_BACKEND || 8080;
const URL_BASE = `http://localhost${port != 80 ? `:${port}` : ""}/qualigest/backend/app/Controllers`;

export default URL_BASE;