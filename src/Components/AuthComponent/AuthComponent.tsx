import { useEffect, useState } from "react";

type AuthRouteProps = {
    children: React.ReactNode;
};

// Utility function to get a cookie by name
const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        const token = getCookie("token");

        if (token) {
            setIsAuthenticated(true);
        } else {
            // Redirect to the home page if the token is not found
            window.location.href = "/";
        }
    }, []);

    return isAuthenticated ? <>{children}</> : null;
};

export default AuthRoute;