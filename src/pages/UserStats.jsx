import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig"; // Import the correct Firestore instance (db)
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";

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
    <div className="table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#e2dddd", fontWeight: "bold" }}>
              WPM
            </TableCell>
            <TableCell sx={{ color: "#e2dddd", fontWeight: "bold" }}>
              Raw WPM
            </TableCell>
            <TableCell sx={{ color: "#e2dddd", fontWeight: "bold" }}>
              Accuracy
            </TableCell>
            <TableCell sx={{ color: "#e2dddd", fontWeight: "bold" }}>
              Mistakes
            </TableCell>
            <TableCell sx={{ color: "#e2dddd", fontWeight: "bold" }}>
              Characters Typed
            </TableCell>
            <TableCell sx={{ color: "#e2dddd", fontWeight: "bold" }}>
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d) => {
            return (
              <TableRow key={d.timeStamp}>
                <TableCell sx={{ color: "#f0f0f0" }}>{d.wpm}</TableCell>
                <TableCell sx={{ color: "#f0f0f0" }}>{d.rawWpm}</TableCell>
                <TableCell sx={{ color: "#f0f0f0" }}>{d.accuracy}</TableCell>
                <TableCell sx={{ color: "#f0f0f0" }}>{d.mistakes}</TableCell>
                <TableCell sx={{ color: "#f0f0f0" }}>{d.charTyped}</TableCell>
                <TableCell sx={{ color: "#f0f0f0" }}>
                  {d.timeStamp.toDate().toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
