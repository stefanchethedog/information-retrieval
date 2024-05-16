import React from "react";

export type DataDisplayRowProps = {
  title: string;
  value: string;
};

const DataDisplayRow: React.FC<DataDisplayRowProps> = ({ title, value }) => {
  return (
    <div className="my-2">
      <div className="text-2xl font-bold text-slate-800">{title}</div>
      <div className="text-lg text-slate-700">{value}</div>
    </div>
  );
};

export default DataDisplayRow;
