import './App.css';
import './styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Event from './pages/event/Event';
import Profile from './pages/profile/Profile';
import CreateEvent from './pages/createEvent/CreateEvent';
import Events from './pages/events/Events';
import InterestedEvents from './pages/interests/InterestedEvents';
import {createBrowserRouter, RouterProvider, Outlet, Navigate, json} from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/event/:id',
      element: <Event />,
    },
    {
      path: '/createEvent',
      element: <CreateEvent />,
    }, 
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '/events',
      element: <Events />,
    },
    {
      path: '/interested-events',
      element: <InterestedEvents />,
    }
]);

  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
