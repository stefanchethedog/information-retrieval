import React from "react";
import DataContext, { DocumentResponse } from "./Data.context";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

type DataProviderProps = {
  children: React.ReactNode;
};

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [data, setData] = React.useState<DocumentResponse>([]);

  React.useEffect(() => {
    if (!searchParams) return;

    if (!searchParams.has("query") || !searchParams.has("field")) return;

    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3001/search?${searchParams}`
        );

        console.log(response.data);
        setData(response.data);

        toast.success("Search succeded!");
      } catch (error) {
        const axiosError = error as any;
        if (typeof axiosError == typeof axios.AxiosError)
          toast.error(axiosError.message);
        else toast.error("An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [searchParams]);

  return (
    <DataContext.Provider value={{ isLoading, data }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
