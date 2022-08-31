import React, { createContext, useState, useEffect } from "react";
import { Hall } from "../models/hall";
import { HallResult } from "../models/result";

interface DataContextType {
  dataList: Hall[];
  isLoading: boolean;
  addDataToList: (hall: Hall) => void;
}

interface DataContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const DataContext = createContext<DataContextType>({
  isLoading: false,
  dataList: [],
  addDataToList: (hall: Hall) => {}
});

const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const [dataList, setDataList] = useState<Hall[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(
      "https://studyhall-io-api.web.app/halls?uid=Feo17UUTHDRzte0spE0V5QbUivE2"
    )
      .then((res) => res.json())
      .then((data: HallResult) => {
        setDataList(data.result as Hall[]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("ERROR: ", err);
        setIsLoading(false);
      });
  }, []);

  const addDataToList = (hall: Hall) => {
    setIsLoading(true)
    fetch("https://studyhall-io-api.web.app/halls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hall),
    })
      .then((res) => res.json())
      .then((data: HallResult) => {
        const hall: Hall = data.result as Hall;
        const tempList = [...dataList, hall];
        setDataList(tempList);
        setIsLoading(false)
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  };

  return (
    <DataContext.Provider value={{ dataList, isLoading, addDataToList }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
