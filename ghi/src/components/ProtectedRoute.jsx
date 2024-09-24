import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";  // Import AuthContext

export default function ProtectedRoute({ children }) {
    const { isLoggedIn, isLoading } = useContext(AuthContext);  // Access isLoggedIn and isLoading

    // Show loading spinner while checking the user's auth status
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If not logged in, redirect to the login page
    if (!isLoggedIn) {
        return <Navigate to="/signin" />;
    }

    // If logged in, render the protected content
    return children;
}
