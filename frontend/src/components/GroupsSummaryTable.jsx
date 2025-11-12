import React from "react";
import { Link } from "react-router-dom";

const GroupsSummaryTable = ({ data }) => {
  if (!data) return <div className="text-gray-500">Loading...</div>;

  const groups = data.data?.groups || [];
  const totalOwedToYou = data.data?.totalOwedToYou || 0;
  const totalYouOwe = data.data?.totalYouOwe || 0;

  const total =
    Math.abs(totalOwedToYou - totalYouOwe) === 0
      ? 0
      : totalOwedToYou - totalYouOwe;

  return (
    <div
      className="flex flex-col w-74 sm:w-80 lg:w-96 gap-2.5 rounded-xl 
        bg-gradient-to-r from-sky-400 via-sky-400 to-sky-300 text-gray-700 px-5 pt-7 pb-3 
        shadow-lg hover:shadow-2xl hover:scale-105 hover:brightness-105 transform 
        transition-all duration-300 ease-in-out text-lg font-bold relative"
    >
      <h2 className="text-center">Groups</h2>
      <Link to="/groups"><span className="absolute right-1.5 top-1 text-sm cursor-pointer hover:underline text-blue-800">
        Manage groups
      </span></Link>

      <div className="total flex justify-between px-2">
        <h3>Total</h3>
        <span>{total}</span>
      </div>

      {groups.length === 0 ? (
        <div className="text-center text-gray-600">{data.message}</div>
      ) : (
        <>
          <div className="youOwe flex flex-col">
            <h3 className="text-rose-700">You owe</h3>
            {groups
              .filter((g) => g.youOwe > 0)
              .map((g) => (
                <p key={g.groupId} className="flex justify-between">
                  <span>{g.name}</span>
                  <span>{g.youOwe}</span>
                </p>
              ))}
          </div>

          <div className="owedToYou flex flex-col">
            <h3 className="text-emerald-800">Owed to you</h3>
            {groups
              .filter((g) => g.owedToYou > 0)
              .map((g) => (
                <p key={g.groupId} className="flex justify-between">
                  <span>{g.name}</span>
                  <span>{g.owedToYou}</span>
                </p>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GroupsSummaryTable;
