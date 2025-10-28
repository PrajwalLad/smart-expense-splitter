import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import FriendsSummaryTable from "./FriendsSummaryTable";
import GroupsSummaryTable from "./GroupsSummaryTable";

const SummaryTables = () => {
  const { token } = useContext(AuthContext);
  const [friendsSummary, setFriendsSummary] = useState(null);
  const [groupsSummary, setGroupsSummary] = useState(null);

  const fetchSummary = async () => {
    try {
      const [resFriends, resGroups] = await Promise.all([
        axios.get("http://localhost:3000/api/expense/friends", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3000/api/expense/groups", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setFriendsSummary(resFriends.data);
      setGroupsSummary(resGroups.data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-8">
      <FriendsSummaryTable data={friendsSummary} />
      <GroupsSummaryTable data={groupsSummary} />
    </div>
  );
};

export default SummaryTables;
