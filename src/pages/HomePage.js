import "./HomePage.css";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function HomePage() {
  const { isLoggedIn, user} = useContext(AuthContext);
  return (
    <>
      {!isLoggedIn && (
        <div className="company-welcome">
          <h1>Welcome, deliverer</h1>
        </div>
      )}
      {isLoggedIn && (
        <div className="company-welcome">
          <h1>Welcome, {user && user.name}</h1>
        </div>
      )}
    </>
  );
}

export default HomePage;
