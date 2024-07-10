import { useContext, useEffect } from "react";
import AllAssignmentsListing from "./Components/AllAssignmentsListing"
import Sidebar from "./Components/Sidebar"
import StudentHomePage from "./Pages/Students/StudentHomePage"
import User from "./Context/Context";
import { useNavigate } from "react-router";
import axios from "axios";

function App() {
  const { user, setUser } = useContext(User);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      axios.get("/api/users/profile")
        .then(res => setUser(res.data))
        .catch(err => {
          err.response.data.message && navigate("/login");
        })
    }
  }, [user]);

  console.log(user);
  return (
    <>
      <Sidebar>
        <StudentHomePage />
      </Sidebar>
    </>
  )
}

export default App
