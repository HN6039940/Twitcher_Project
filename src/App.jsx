// page components
import HomeLayout from "./pages/Home/HomeLayout";
import GameSearch from "./pages/Games/GamesSearchPage";
import GameStreamPage from "./pages/game/GameStreamPage";
import StreamerSearch from "./pages/Streamer/StreamerSearchPage";
import Stream from "./pages/Stream/Stream";
import Error from "./pages/Error/Error";

// react-router imports
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/games",
        element: <GameSearch />,
      },
      {
        path: "/streamers",
        element: <StreamerSearch />,
      },
      {
        path: "/game/:id",
        element: <GameStreamPage />,
      },
      {
        path: "/stream",
        element: <Stream />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={browserRouter} />;
}

export default App;
