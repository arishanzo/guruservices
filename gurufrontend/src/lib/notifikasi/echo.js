import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
//    broadcaster: "pusher",
//   key: import.meta.env.VITE_PUSHER_APP_KEY,
//   cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//   wsHost: import.meta.env.VITE_PUSHER_HOST ?? `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//   wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//   wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//   forceTLS: import.meta.env.VITE_PUSHER_SCHEME === "https",
//   enabledTransports: ["ws", "wss"],

 broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  wsHost: import.meta.env.VITE_PUSHER_HOST,
  wsPort: import.meta.env.VITE_PUSHER_PORT,
  wssPort: import.meta.env.VITE_PUSHER_PORT,
  forceTLS: false,
  encrypted: false,
  disableStats: true,
  enabledTransports: ["ws"],


  authEndpoint: "http://localhost:8000/broadcasting/auth",
  withCredentials: true,


  
});


console.log("App Key from env:", import.meta.env.VITE_PUSHER_APP_KEY);
export default echo;
