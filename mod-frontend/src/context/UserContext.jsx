import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [firmId, setFirmId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const authUser = authData?.user;

      if (authUser) {
        setUser(authUser);

        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("firm_id")
          .eq("email", authUser.email)
          .maybeSingle(); // ✅ prevents crash when no rows

        if (profile?.firm_id) {
          setFirmId(profile.firm_id);
        } else {
          console.warn("⚠️ No matching user row or no firm_id found.");
        }
      }
    };

    fetchUserData();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
        setFirmId(null);
      }
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, firmId }}>
      {children}
    </UserContext.Provider>
  );
};
