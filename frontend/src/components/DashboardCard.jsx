import React from "react";

const DashboardCard = (props) => {
  return (
    <div
      className="flex flex-col items-center w-64 gap-3 rounded-2xl 
            bg-gradient-to-r from-sky-400 via-sky-400 to-sky-300 text-gray-950 px-3 py-7 
            cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 hover:brightness-105 transform 
            transition-all duration-300 ease-in-out text-lg font-bold "
    >
      <h2>{props.cardTitle}</h2>
			{props.cardTitle === "You owe" ? (
				<span className="text-rose-700">{`₹${props.amount}`}</span>
			) : (props.cardTitle === "Owed to you" ? (<span className="text-green-900">{`₹${props.amount}`}</span>): (
				<span>{props.amount}</span>
			))}
    </div>
  );
};

export default DashboardCard;
