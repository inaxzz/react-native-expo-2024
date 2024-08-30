import { createContext, useState, useEffect, useContext } from "react";
import { useUsersDatabase,  } from "../../database/useUserDatabase";

const AuthContext = createContext({});

export const Role = {
  SUPER: "SUPER",
  ADM: "ADM",
  USER: "USER",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    autenticated: null,
    user: null,
    role: null,
  });

  const { authUser } = useUsersDatabase();

  const signIn = async ({ email, password }) => {
    const response = await authUser({ email, password });

    if (!response) {
      setUser({
        autenticated: false,
        user: null,
        role: null,
      });
    }

    setUser({
      autenticated: true,
      user: { id: 1, name: "Super Usuário", email },
      role: Role.SUPER,
    });
  };

  const signOut = async () => {
    setUser({});
  };

  useEffect(() => {
    console.log("AuthProvider", user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
