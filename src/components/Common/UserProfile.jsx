import { useState } from "react";
import Avatar from "react-avatar";
import Popup from "reactjs-popup";
import store from "../../store/state";

function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = store();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    if(confirm("Are you sure you want to logout?")) {
      logout();
    }
  };
  const { user } = store();

  return (
    <>
      <button onClick={togglePopup} className="user-icon-button" title={user?.name}>
        <Avatar className="rounded-full " name={user?.name} size="50" />
      </button>
      <Popup
        open={isOpen}
        onClose={() => setIsOpen(false)}
        position="top right"
        closeOnDocumentClick
        overlayStyle={{ background: '#00000000' }}
        contentStyle={{
          position: 'fixed',
          top: '90px',
          right: '40px',
          transitionDuration: '10s',
        }}
      >
        <div className="flex flex-col items-center px-12 py-10 text-white bg-black shadow-xl rounded-xl">
          <Avatar className="mb-4 font-bold rounded-full" name={user.name} size="80" />
          <h1 className="mb-3 text-xl font-bold">Hi, {user?.name.split(" ")[0]}!</h1>
          <p className="mb-1 opacity-80">{user?.email}</p>
          <p className="opacity-80">Role: {user?.role}</p>
          <button className="px-6 py-2 mt-5 text-sm border-[1px] rounded-full sm:font-semibold hover:bg-gray-600 active:bg-gray-500 sm:text-md" onClick={handleLogout}>Log out</button>
        </div>
      </Popup>
    </>
  );
}

export default UserProfile;
