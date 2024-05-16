import { SelectOptions } from "components/atoms/select/Select.components";
import { SEARCH_OPTIONS } from "components/organisms/indexForm/types";

export const options: SelectOptions[] = [
  { label: SEARCH_OPTIONS.TITLE, value: SEARCH_OPTIONS.TITLE },
  { label: SEARCH_OPTIONS.CONTENT, value: SEARCH_OPTIONS.CONTENT },
  { label: SEARCH_OPTIONS.TIMESTAMP, value: SEARCH_OPTIONS.TIMESTAMP },
];
