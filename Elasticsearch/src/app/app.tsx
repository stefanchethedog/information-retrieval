import IndexForm from "components/organisms/indexForm/IndexForm";
import { Toaster } from "react-hot-toast";
import DataProvider from "../providers/data-provider/Data.provider";
import DataDisplay from "components/organisms/data-display/DataDisplay.components";

function App() {
  return (
    <DataProvider>
      <div className="w-full h-[100vh] flex justify-start items-start p-10 bg-slate-200 overflow-auto">
        <Toaster position="bottom-right" />
        <DataDisplay />
        <IndexForm />
      </div>
    </DataProvider>
  );
}

export default App;
