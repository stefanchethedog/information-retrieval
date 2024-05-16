import React from "react";
import DataDisplay, {
  DataDisplayRowProps,
} from "../data-display-row/DataDisplayRow.components";

type DataDisplayCardProps = {
  downloadButton: React.ReactNode;
  options: DataDisplayRowProps[];
};

const DataDisplayCard: React.FC<DataDisplayCardProps> = ({
  downloadButton,
  options,
}) => {
  return (
    <div className="border border-slate-400 px-8 py-4 w-[45rem] bg-white rounded-md">
      {options.map((option, index) => (
        <DataDisplay key={index} {...option} />
      ))}
      <div className="flex">{downloadButton}</div>
    </div>
  );
};

export default DataDisplayCard;
