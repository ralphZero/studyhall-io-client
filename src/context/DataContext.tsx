import React, { createContext, useState, useEffect, useContext } from "react";
import { Hall } from "../models/hall";
import { PlanDate } from "../models/plandate";
import { HallResult } from "../models/result";
import { Task } from "../models/task";
import {UserContext} from './UserContext';

interface DataContextType {
  dataList: Hall[];
  currentHall: Hall;
  isLoading: boolean;
  prepareCurrentHall: (hallId: string) => Hall | undefined;
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
  currentHall: {} as Hall,
  dataList: [],
  prepareCurrentHall: (hallId: string) => {return {} as Hall},
  addDataToList: (hall: Hall) => {},
  createTaskInHall: (hallId: string, task: Task) => {},
  updateTaskInHall: (hallId: string, task: Task) => {},
  updateDatesInHall: (hallId: string, dates: PlanDate[]) => {},
  deleteHall: (hallId: string) => {},
});

const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const [dataList, setDataList] = useState<Hall[]>([]);
  const [currentHall, setCurrentHall] = useState<Hall>({} as Hall);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if(user) {
        const token = await user.getIdToken();
        fetch(
          `https://studyhall-io-api.web.app/halls?uid=${user?.uid}`, {
            headers: {
              "Authorization": token
            }
          }
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
    }
    fetchData();
  }, [user]);

  const prepareCurrentHall = (hallId: string) => {
    const hall: Hall = dataList.filter((data) => data._id === hallId)[0];
    if (hall) {
      setCurrentHall(hall);
      return hall;
    }
  };

  const addDataToList = async (hall: Hall, callback: () => void) => {
    if(!user) return;
    setIsLoading(true)
    const token = await user.getIdToken();
    fetch("https://studyhall-io-api.web.app/halls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
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

  const createTaskInHall = async (hallId: string, task: Task, callback: () => void) => {
    if(!user) return;
    setIsLoading(true)
    const token = await user.getIdToken();
    fetch(`https://studyhall-io-api.web.app/halls/${hallId}/tasks`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token
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

  const updateTaskInHall = async (hallId: string, task: Task) => {
    if(!user) return;
    setIsLoading(true)
    const token = await user.getIdToken();
    fetch(`https://studyhall-io-api.web.app/halls/${hallId}/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
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

  const updateDatesInHall = async (hallId: string, dates: PlanDate[]) => {
    if(!user) return;
    setIsLoading(true)
    const token = await user.getIdToken();

    const tempList = [...dataList];
    const hallIndex = tempList.findIndex((data) => data._id === hallId);
    tempList[hallIndex].dates = dates;
    setDataList(tempList);

    // talk to the database
    fetch(`https://studyhall-io-api.web.app/halls/${hallId}/dates`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
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

  const deleteHall = async (hallId: string) => {
    if(!user) return;
    setIsLoading(true)
    const token = await user.getIdToken();

    const hallIndex = dataList.findIndex(hall => hall._id === hallId);
    const tempList = [...dataList];
    tempList.splice(hallIndex, 1);
    
    setDataList(tempList);

    fetch(`https://studyhall-io-api.web.app/halls/${hallId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
    })
    .then(res => res.json())
    .then((data: HallResult) => console.log(data))
    .catch(err => {
      console.error("Error - Delete hall");
    });
  }

  return (
    <DataContext.Provider value={{ dataList, isLoading, addDataToList, createTaskInHall, updateTaskInHall, updateDatesInHall, deleteHall, prepareCurrentHall, currentHall}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
