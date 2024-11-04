import { useNavigate } from "react-router-dom";
import store from "../../store/state";
import UserProfile from "./UserProfile";

function Navbar() {
  const {isAuthenticated} = store();
  const navigate = useNavigate()
  
  return (
    <>
      <nav className="sticky top-0 z-10 flex items-center justify-between w-full h-20 px-4 bg-white shadow-sm sm:px-10 sm:h-24">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold sm:text-3xl">Mini Loan App</h1>
        </div>
        <div className="mr-0">
          {isAuthenticated ? <UserProfile /> : (
            <div className="flex flex-col sm:flex-row">
            <button className="px-3 py-1 mr-3 text-sm font-semibold border-2 rounded sm:py-2 sm:px-4 hover:bg-gray-100 active:bg-gray-50 sm:text-base" onClick={() => navigate("/admin-register")}>Admin SignUp</button>
            <button className="px-3 py-1 mr-3 text-sm font-semibold border-2 rounded sm:py-2 sm:px-4 hover:bg-gray-100 active:bg-gray-50 sm:text-base " onClick={() => navigate("/login")}>Login</button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;