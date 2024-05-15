import React from "react";
import { useForm } from "react-hook-form";
import Button from "components/atoms/button";
import Input from "components/atoms/input/Input.components";
import Select, {
  SelectOptions,
} from "components/atoms/select/Select.components";

type IndexFormProps = {};

enum SEARCH_OPTIONS {
  ID = "id",
  LINK = "link",
  LAST_MODIFIED = "last_modified",
  BODY = "body",
}

const options: SelectOptions[] = [
  { label: SEARCH_OPTIONS.ID, value: SEARCH_OPTIONS.ID },
  { label: SEARCH_OPTIONS.LINK, value: SEARCH_OPTIONS.LINK },
  { label: SEARCH_OPTIONS.LAST_MODIFIED, value: SEARCH_OPTIONS.LAST_MODIFIED },
  { label: SEARCH_OPTIONS.BODY, value: SEARCH_OPTIONS.BODY },
];

type SearchFormInput = {
  field: string;
  query: string;
};

const IndexForm: React.FC<IndexFormProps> = () => {
  const { register, handleSubmit } = useForm<SearchFormInput>({
    defaultValues: { field: SEARCH_OPTIONS.ID, query: "" },
  });

  const onSubmit = (data: SearchFormInput) => {
    console.log(data);
  };

  return (
    <div className="p-12 border-2 border-slate-300 bg-white rounded-md absolute top-0 right-0 -translate-x-12 translate-y-12">
      <div>
        <Button>Create index</Button>
      </div>
      <div className="border-b-4 border-slate-300 my-12" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select label="Field" options={options} {...register("field")} />
        <Input
          label="Query"
          placeholder="Enter your query"
          {...register("query")}
        />
        <Button className="mt-8" type="submit">
          Search
        </Button>
      </form>
    </div>
  );
};

export default IndexForm;
