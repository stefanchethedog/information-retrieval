import React, { useContext } from "react";
import DataContext, {
  DocumentSource,
} from "../../../providers/data-provider/Data.context";
import createDisplayConfig from "../../../utils";
import { configObject } from "./config";
import DataDisplayCard from "components/molecules/data-display-card/DataDisplayCard.components";
import Button from "components/atoms/button";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const handleDownload = async (fileId: string) => {
  try {
    console.log(`http://localhost:3001/download/${fileId}`);
    const response = await axios.get(
      `http://localhost:3001/download/${fileId}`,
      {
        responseType: "blob",
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `file-${fileId}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

type DataDisplayProps = {};

const DataDisplay: React.FC<DataDisplayProps> = () => {
  const { data, isLoading } = useContext(DataContext);

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && data ? (
        <div>
          <div className="flex gap-[20rem]">
            <h1 className="text-3xl mb-8">
              <span className="font-bold">Total Results:</span>{" "}
              {data?.totalItems}
            </h1>
            <div className="flex gap-4">
              {Array.from({ length: data?.totalPages }, (_, i) => i + 1).map(
                (item) => (
                  <button
                    key={item}
                    className={`text-2xl ${
                      (item - 1).toString() === searchParams.get("page")
                        ? "underline font-bold text-blue-500"
                        : ""
                    }`}
                    onClick={() => {
                      setSearchParams((prev) => {
                        prev.set("page", (item - 1).toString());
                        return prev;
                      });
                    }}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {data?.data?.map((item) => (
              <DataDisplayCard
                downloadButton={
                  <Button onClick={() => handleDownload(item._id)}>
                    Download {item._source.title}
                  </Button>
                }
                options={createDisplayConfig<Partial<DocumentSource>>(
                  item._source,
                  configObject
                )}
              />
            ))}
          </div>
        </div>
      ) : (
        <>No data</>
      )}
    </div>
  );
};

export default DataDisplay;
