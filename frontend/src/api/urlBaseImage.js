const port = import.meta.env.VITE_PORT_BACKEND || 8080;
const URL_BASE_IMAGE = `http://localhost${port != 80 ? `:${port}` : ""}/qualigest/backend`;

export default URL_BASE_IMAGE;