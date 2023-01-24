// import { useState, createContext, useEffect } from "react";
// import { useRouter } from "next/router";
// import { useAdmins } from "../hooks/admins.hooks";

// export const AuthenticationContext = createContext();

// export const AuthenticationContextProvider = ({ children }) => {
//   const router = useRouter();
//   const { loading, signIn, loadUser } = useAdmins();
//   const [user, setUser] = useState();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     const storedUser = sessionStorage.getItem("user");

//     if (storedUser !== "undefined" && token) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const fetchUser = async () => {
//     const user = await loadUser();

//     sessionStorage.setItem("user", JSON.stringify(user));

//     setUser(user);
//   };

//   const onLogin = async (payload) => {
//     setIsLoading(loading);

//     const user = await signIn(payload);
//     if (user) {
//       sessionStorage.setItem("token", user?.token);
//       sessionStorage.setItem("user", JSON.stringify(user?.others));
//       sessionStorage.setItem("role", user?.others?.role);

//       setUser(user?.others);
//       router.push("/account");
//     }
//   };

//   const onLogout = () => {
//     console.log("LOG OUT");
//     setUser(null);
//     sessionStorage.removeItem("token");
//     sessionStorage.removeItem("user");
//     sessionStorage.removeItem("role");

//     return router.push("/");
//   };

//   return (
//     <AuthenticationContext.Provider
//       value={{
//         user,
//         loading: isLoading,
//         isAuthenticated: !!user,
//         onLogin,
//         onLogout,
//         fetchUser,
//       }}
//     >
//       {children}
//     </AuthenticationContext.Provider>
//   );
// };
