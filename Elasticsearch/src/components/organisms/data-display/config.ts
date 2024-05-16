import { DocumentSource } from "src/providers/data-provider/Data.context";
import { ConfigObject } from "src/utils";

export const configObject: ConfigObject<Partial<DocumentSource>> = {
  filePath: {
    title: "filePath",
    mapper: (value) => [
      {
        title: "File Path",
        value: value || "",
      },
    ],
    index: 1,
  },
  content: {
    title: "content",
    mapper: (value) => [
      {
        title: "Content",
        value: value || "",
      },
    ],
    index: 2,
  },
  timestamp: {
    title: "timestamp",
    mapper: (value) => [
      {
        title: "Timestamp",
        value: value || "",
      },
    ],
    index: 3,
  },
};
