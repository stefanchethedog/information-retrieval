import { createContext } from "react";

export type DocumentSource = {
  title: string;
  filePath: string;
  content: string;
  timestamp: string;
};

type Document = {
  _id: string;
  _index: string;
  _score: number;
  _source: DocumentSource;
};

export type DocumentResponse = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: Document[];
};

type ContextProps = {
  children: React.ReactNode;
  isLoading: boolean;
  data: DocumentResponse;
};

export default createContext<Partial<ContextProps>>({});
