// import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// // ─── Types ────────────────────────────────────────────────────────────────────

// export interface User {
//   id: string;
//   username: string;
//   email: string;
// }

// export interface RegisterData {
//   username: string;
//   email: string;
//   password: string;
// }

// export interface LoginData {
//   email: string;
//   password: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   register: (data: RegisterData) => Promise<void>;
//   login: (data: LoginData) => Promise<void>;
//   logout: () => void;
//   error: string | null;
//   clearError: () => void;
// }

// // ─── Context ─────────────────────────────────────────────────────────────────

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // ─── Provider ─────────────────────────────────────────────────────────────────

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser]       = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true); // true on mount so we can rehydrate
//   const [error, setError]     = useState<string | null>(null);

//   // Rehydrate from localStorage on mount
//   useEffect(() => {
//     try {
//       const stored = localStorage.getItem("as_user");
//       if (stored) setUser(JSON.parse(stored));
//     } catch {
//       localStorage.removeItem("as_user");
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   // ── Register ────────────────────────────────────────────────────────────────
//   const register = async (data: RegisterData) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       // TODO: replace with your real API call, e.g.:
//       // const res = await fetch("/api/auth/register", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
//       // const json = await res.json();
//       // if (!res.ok) throw new Error(json.message);
//       // const newUser: User = json.user;

//       // ── Mock response (remove once API is wired up) ──
//       await new Promise(r => setTimeout(r, 800));
//       const newUser: User = {
//         id: crypto.randomUUID(),
//         username: data.username,
//         email: data.email,
//       };
//       // ─────────────────────────────────────────────────

//       localStorage.setItem("as_user", JSON.stringify(newUser));
//       setUser(newUser);
//     } catch (err: any) {
//       setError(err.message ?? "Registration failed. Please try again.");
//       throw err; // re-throw so the form can react
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ── Login ───────────────────────────────────────────────────────────────────
//   const login = async (data: LoginData) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       // TODO: replace with your real API call, e.g.:
//       // const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } });
//       // const json = await res.json();
//       // if (!res.ok) throw new Error(json.message);
//       // const loggedInUser: User = json.user;

//       // ── Mock response (remove once API is wired up) ──
//       await new Promise(r => setTimeout(r, 800));
//       const loggedInUser: User = {
//         id: crypto.randomUUID(),
//         username: data.email.split("@")[0],
//         email: data.email,
//       };
//       // ─────────────────────────────────────────────────

//       localStorage.setItem("as_user", JSON.stringify(loggedInUser));
//       setUser(loggedInUser);
//     } catch (err: any) {
//       setError(err.message ?? "Login failed. Please check your credentials.");
//       throw err;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ── Logout ──────────────────────────────────────────────────────────────────
//   const logout = () => {
//     localStorage.removeItem("as_user");
//     setUser(null);
//   };

//   const clearError = () => setError(null);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         isLoading,
//         register,
//         login,
//         logout,
//         error,
//         clearError,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // ─── Hook ─────────────────────────────────────────────────────────────────────

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// }
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserRole =
  | "academic"
  | "student"
  | "researcher"
  | "institution"
  | "professional";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  myReferralCode?: string;
  referredBy?: string | null;
  createdAt?: string;
}

export interface RegisterData {
  username:     string;
  email:        string;
  password:     string;
  role:         UserRole;
  referralCode?: string; // optional
}

export interface LoginData {
  email:    string;
  password: string;
}

interface AuthContextType {
  user:            User | null;
  isAuthenticated: boolean;
  isLoading:       boolean;
  register:        (data: RegisterData) => Promise<void>;
  login:           (data: LoginData)    => Promise<void>;
  logout:          () => void;
  error:           string | null;
  clearError:      () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,      setUser]      = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error,     setError]     = useState<string | null>(null);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("as_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {
      localStorage.removeItem("as_user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Register ─────────────────────────────────────────────────────────────────
  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      const body: Record<string, string> = {
        username: data.username.trim(),
        email:    data.email.trim().toLowerCase(),
        password: data.password,
        role:     data.role,
      };
      if (data.referralCode?.trim()) {
        body.referralCode = data.referralCode.trim().toUpperCase();
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/sch-register`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Registration failed.");

      const newUser: User = json.user;
      localStorage.setItem("as_token", json.token);
      localStorage.setItem("as_user",  JSON.stringify(newUser));
      setUser(newUser);
    } catch (err: any) {
      setError(err.message ?? "Registration failed. Please try again.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ── Login ────────────────────────────────────────────────────────────────────
  const login = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/sch-login`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          email:    data.email.trim().toLowerCase(),
          password: data.password,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Login failed.");

      const loggedInUser: User = json.user;
      localStorage.setItem("as_token", json.token);
      localStorage.setItem("as_user",  JSON.stringify(loggedInUser));
      setUser(loggedInUser);
    } catch (err: any) {
      setError(err.message ?? "Login failed. Please check your credentials.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ── Logout ───────────────────────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem("as_token");
    localStorage.removeItem("as_user");
    setUser(null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        register,
        login,
        logout,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// ─── Role helpers (useful for conditional UI rendering) ───────────────────────

export const ROLE_LABELS: Record<UserRole, string> = {
  academic:     "Academic / Lecturer",
  student:      "Student",
  researcher:   "Researcher",
  institution:  "Institution",
  professional: "Professional",
};

/** Returns true if the current user has one of the given roles */
export function useHasRole(...roles: UserRole[]) {
  const { user } = useAuth();
  return user ? roles.includes(user.role) : false;
}
