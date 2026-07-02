import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("netflix-user");
        return saved ? JSON.parse(saved) : null;
    });
    useEffect(() => {
        if (user) {
            localStorage.setItem("netflix-user", JSON.stringify(user));
        } else {
            localStorage.removeItem("netflix-user");
        }
    }, [user]);

    const login = (email) => setUser({ email });
    const signup = (email) => setUser({ email });
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }} >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}