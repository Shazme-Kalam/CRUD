import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import User from './components/getuser/User';
import Add from './components/adduser/add';
import Edit from './components/updateuser/Edit';


function App() {

  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
      // element: "Home page",
    },
    {
      path: "/add",
      element: <Add />,
      // element: "User add page",
    },
    {
      path: "/edit/:id",
      element: <Edit />,
    },
  ])

  return (
    <div className="App">
      <RouterProvider router={route}>  </RouterProvider>
    </div>
  );
}

export default App;
