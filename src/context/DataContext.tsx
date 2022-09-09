import React, { createContext, useState, useEffect, useContext } from "react";
import { Hall } from "../models/hall";
import { PlanDate } from "../models/plandate";
import { HallResult } from "../models/result";
import { Task } from "../models/task";
import {UserContext} from './UserContext';

interface DataContextType {
  dataList: Hall[];
  isLoading: boolean;
  addDataToList: (hall: Hall, callback: () => void) => void;
  createTaskInHall: (hallId: string, task: Task, callback: () => void) => void;
  updateTaskInHall: (hallId: string, task: Task) => void;
  updateDatesInHall: (hallId: string, dates: PlanDate[]) => void;
  deleteHall: (hallId: string) => void;
}

interface DataContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const DataContext = createContext<DataContextType>({
  isLoading: false,
  dataList: [],
  addDataToList: (hall: Hall) => {},
  createTaskInHall: (hallId: string, task: Task) => {},
  updateTaskInHall: (hallId: string, task: Task) => {},
  updateDatesInHall: (hallId: string, dates: PlanDate[]) => {},
  deleteHall: (hallId: string) => {},
});

const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const [dataList, setDataList] = useState<Hall[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    if(user) {
      fetch(
        `http://52.90.64.141:4043/halls?uid=${user?.uid}`
      )
        .then((res) => res.json())
        .then((data: HallResult) => {
          setDataList(data.result as Hall[]);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error - Fetching halls -: ", err);
          setIsLoading(false);
        });
    }
  }, [user]);

  const addDataToList = (hall: Hall, callback: () => void) => {
    setIsLoading(true)
    fetch("http://52.90.64.141:4043/halls", {
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
      .then(() => callback())
      .catch(err => {
        console.error("Error - Adding hall -",err);
        setIsLoading(false);
      });
  };

  const createTaskInHall = (hallId: string, task: Task, callback: () => void) => {
    setIsLoading(true);
    fetch(`http://52.90.64.141:4043/halls/${hallId}/tasks`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    }).then(res => res.json())
    .then((data: HallResult) => {
        const hall: Hall = data.result as Hall;

        const tempList = [...dataList];

        const indexOfHallToReplace = dataList.findIndex((hall) => hall._id === hallId);

        tempList[indexOfHallToReplace] = hall;
        
        setDataList(tempList);
        setIsLoading(false);
      }
    ).then(() => callback())
    .catch(err => {
      console.error("Error - Update task -", err);
      setIsLoading(false);
    });
  }

  const updateTaskInHall = (hallId: string, task: Task) => {
    setIsLoading(true);
    fetch(`http://52.90.64.141:4043/halls/${hallId}/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task),
    }).then(res => res.json())
    .then((data: HallResult) => {
      const hall: Hall = data.result as Hall;

        const tempList = [...dataList];

        const indexOfHallToReplace = dataList.findIndex((hall) => hall._id === hallId);

        tempList[indexOfHallToReplace] = hall;
        
        setDataList(tempList);
        
        setIsLoading(false);
    });
  }

  const updateDatesInHall = (hallId: string, dates: PlanDate[]) => {
    const tempList = [...dataList];
    const hallIndex = tempList.findIndex((data) => data._id === hallId);
    tempList[hallIndex].dates = dates;
    setDataList(tempList);
    // talk to the database
    fetch(`http://52.90.64.141:4043/halls/${hallId}/dates`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dates)
    }).then(res => res.json())
    .then((data) => {
      const hall: Hall = data.result as Hall;

        const tempList = [...dataList];

        const indexOfHallToReplace = dataList.findIndex((hall) => hall._id === hallId);

        tempList[indexOfHallToReplace] = hall;
        
        setDataList(tempList);
        
        setIsLoading(false);
    })
    .catch(err => {
      console.error("Error - Update dates in hall -", err);
      setIsLoading(false);
    });
  }

  const deleteHall = (hallId: string) => {
    const hallIndex = dataList.findIndex(hall => hall._id === hallId);
    const tempList = [...dataList];
    tempList.splice(hallIndex, 1);
    
    setDataList(tempList);

    fetch(`http://52.90.64.141:4043/halls/${hallId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then((data: HallResult) => console.log(data))
    .catch(err => {
      console.error("Error - Delete hall");
    });
  }

  return (
    <DataContext.Provider value={{ dataList, isLoading, addDataToList, createTaskInHall, updateTaskInHall, updateDatesInHall, deleteHall }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
