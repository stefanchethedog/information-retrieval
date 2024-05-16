import { DataDisplayRowProps as DataDisplayProps } from "components/molecules/data-display-row/DataDisplayRow.components";

export type ConfigObject<T> = {
  [K in keyof T]: {
    title: K;
    mapper: (value: T[K]) => DataDisplayProps[];
    index: number;
  };
};

type ValueOf<T> = T[keyof T];
type ValueOfConfigObject<T> = ValueOf<ConfigObject<T>>;
type ConfigOrderType<T> = ArrayLike<ValueOfConfigObject<T>>;

const createDisplayConfig = <T>(
  object: T,
  configurationOrder: ConfigObject<T>
): DataDisplayProps[] =>
  Object.values<ValueOfConfigObject<T>>(
    configurationOrder as ConfigOrderType<T>
  )
    .sort((a, b) => a.index - b.index)
    .map(({ title, mapper }) => mapper(object[title as keyof object]))
    .reduce((acc, curr: DataDisplayProps[]) => [...acc, ...curr], []);

export default createDisplayConfig;
