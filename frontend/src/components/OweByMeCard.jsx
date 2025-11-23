import React, { useEffect, useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const OweByMeCard = (split) => {
  const [expense, setExpense] = useState(split.split);
  console.log(split);
  return (
    <div className="flex flex-col bg-sky-900 px-5 py-1 md:py-2 gap-1 md:gap-2 rounded-lg w-3/4 md:w-1/3 lg:w-1/4">
      <h4 className="text-lg">{expense.description}</h4>
      <span className="">₹{expense.amount}</span>
      <div className="mt-1 flex flex-row items-center gap-3">
        <div className="bg-gray-50 h-0.5 w-1/2" />
        <span>{expense.splitAmong.length} people</span>
      </div>
      {expense.isComplete ? (
        <span className={"flex items-center text-emerald-400 gap-1"}>
          <TiTick size={19} />
          All paid
        </span>
      ) : expense.hasPaid ? (
        <span className={"flex items-center text-emerald-400 gap-1"}>
          <TiTick size={19} />
          You paid
        </span>
      ) : (
        <button className="flex items-center justify-center cursor-pointer rounded-lg bg-emerald-700 px-2 py-1 text-white hover:bg-emerald-800 shadow transition gap-1.5">
          <TiTick size={19} /> Settle up
        </button>
      )}
      <button className="text-blue-300 cursor-pointer flex w-fit mx-auto items-center transition-all delay-200 hover:gap-0.5 hover:scale-[1.01] mb-1 md:mb-2">
        View details
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default OweByMeCard;
