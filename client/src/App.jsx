// import React, { useState } from "react";
// import Nav from "./components/Nav";
// import PostProject from "./components/PostProject";
// import BrowseProjects from "./components/BrowseProjects";
// import BuilderDashboard from "./components/BuilderDashboard";
// import Rewards from "./components/Rewards";

// export default function App() {
//   const [view, setView] = useState("login");
//   const [user, setUser] = useState(null);

//   function handleLogin(role) {
//     if (role === "client") {
//       setUser({ id: "u_client", type: "client", name: "Demo Client" });
//     } else {
//       setUser({ id: "u_builder", type: "builder", name: "Demo Builder" });
//     }
//     setView("home");
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {user && <Nav setView={setView} user={user} setUser={setUser} />}
//       <main className="p-6">
//         {!user && view === "login" && (
//           <div className="max-w-md mx-auto bg-white p-6 rounded shadow text-center">
//             <h1 className="text-2xl font-bold mb-4">Login</h1>
//             <div className="flex flex-col gap-3">
//               <button
//                 onClick={() => handleLogin("client")}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded"
//               >
//                 Login as Client
//               </button>
//               <button
//                 onClick={() => handleLogin("builder")}
//                 className="px-4 py-2 bg-green-600 text-white rounded"
//               >
//                 Login as Builder
//               </button>
//             </div>
//           </div>
//         )}
//         {user && view === "home" && (
//           <div className="max-w-4xl mx-auto">
//             <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
//             <p>Select an option from the navigation above.</p>
//           </div>
//         )}
//         {user && view === "post" && user.type === "client" && (
//           <PostProject user={user} />
//         )}
//         {user && view === "browse" && <BrowseProjects user={user} />}
//         {user && view === "builder" && user.type === "builder" && (
//           <BuilderDashboard user={user} />
//         )}
//         {user && view === "rewards" && <Rewards user={user} />}
//       </main>
//     </div>
//   );
// }

import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import PostProject from "./components/PostProject";
import BrowseProjects from "./components/BrowseProjects";
import BuilderDashboard from "./components/BuilderDashboard";
import Rewards from "./components/Rewards";
import Nav from "./components/Nav";

export default function App() {
  const [view, setView] = useState("login");
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  function handleAuth(userData) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setView("home");
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
    setView("login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user && (
        <Nav
          setView={setView}
          user={user}
          setUser={setUser}
          onLogout={handleLogout}
        />
      )}
      <main className="p-6">
        {!user && view === "login" && <Login onLogin={handleAuth} />}
        {!user && view === "register" && <Register onRegister={handleAuth} />}

        {user && view === "home" && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
            <p>Select an option from the navigation above.</p>
          </div>
        )}
        {user && view === "post" && user.role === "client" && (
          <PostProject user={user} />
        )}
        {user && view === "browse" && <BrowseProjects user={user} />}
        {user && view === "builder" && user.role === "builder" && (
          <BuilderDashboard user={user} />
        )}
        {user && view === "rewards" && <Rewards user={user} />}
      </main>
    </div>
  );
}
