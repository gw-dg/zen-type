import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig"; // Import the correct Firestore instance (db)
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function UserStats() {
  const [data, setData] = useState([]);
  const [user, loading, error] = useAuthState(auth); // Correctly get user, loading, and error
  const navigate = useNavigate();

  // Fetch user data from Firestore
  const fetchData = async () => {
    if (!user) return; // Avoid querying when user is not available

    const userStatsRef = collection(db, "user-stats"); // Reference to Firestore collection
    const q = query(userStatsRef, where("userId", "==", user.uid)); // Query Firestore for the current user's stats

    const querySnapshot = await getDocs(q); // Get the query snapshot
    const tempData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    setData(tempData); // Set the fetched data to the state
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate("/"); // If no user and not loading, navigate to home
    }

    if (!loading && user) {
      fetchData(); // Fetch data when the user is authenticated
    }
  }, [loading, user]);

  // Show loading state
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <h1>User Stats</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
