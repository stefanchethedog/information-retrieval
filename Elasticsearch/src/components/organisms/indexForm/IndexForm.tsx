import React from "react";
import { useForm } from "react-hook-form";

import Button from "components/atoms/button";
import Input from "components/atoms/input/Input.components";
import Select from "components/atoms/select/Select.components";
import { options } from "./config";
import axios from "axios";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { SEARCH_OPTIONS } from "./types";

type IndexFormProps = {};

type SearchFormInput = {
  field: string;
  query: string;
};

const IndexForm: React.FC<IndexFormProps> = () => {
  const [isLoadingCreateIndex, setIsLoadingCreateIndex] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { register, handleSubmit } = useForm<SearchFormInput>({
    defaultValues: {
      field: searchParams.get("field") || SEARCH_OPTIONS.TITLE,
      query: searchParams.get("query") || "",
    },
  });

  const onSubmit = (data: SearchFormInput) => {
    setSearchParams({ field: data.field, query: data.query });
  };

  const createIndex = async () => {
    try {
      setIsLoadingCreateIndex(true);
      await axios.post("http://localhost:3001/create-index");

      toast.success("Index created successfully");
    } catch (error) {
      const axiosError = error as any;
      if (typeof axiosError == typeof axios.AxiosError)
        toast.error(axiosError.message);
      else toast.error("An error occurred");
    } finally {
      setIsLoadingCreateIndex(false);
    }
  };

  return (
    <div className="p-12 border-2 border-slate-300 bg-white rounded-md absolute top-0 right-0 -translate-x-12 translate-y-12">
      <div>
        <Button onClick={createIndex} disabled={isLoadingCreateIndex}>
          {isLoadingCreateIndex ? "Loading" : "Create index"}
        </Button>
      </div>
      <div className="border-b-4 border-slate-300 my-12" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          label="Field"
          options={options}
          {...register("field", { required: true })}
        />
        <Input
          label="Query"
          placeholder="Enter your query"
          {...register("query", { required: true })}
        />
        <Button className="mt-8" type="submit">
          Search
        </Button>
      </form>
    </div>
  );
};

export default IndexForm;
