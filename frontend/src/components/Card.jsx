import React from "react";
import { CgProfile } from "react-icons/cg";

const Card = ({ name="Prajwal Lad", profession="Developer", review="This is default review, edit it according to yours" }) => {
  return (
    <div className="flex flex-col border-1 rounded-xl m-1 p-3 gap-1 w-72 bg-sky-100 shadow-lg">
      <div className="flex gap-3 items-center">
        <CgProfile size={30} />
        <span className="text-md font-bold">{name}, {profession}</span>
      </div>
      <p className="description text-sm">
        {review}
      </p>
    </div>
  );
};

export default Card;
