import React, {createContext, useState, useEffect} from 'react';
import { Hall } from '../models/hall';
import { HallResult } from '../models/result';

export const DataContext = createContext<any>(null);

interface DataContextProviderProps {
    children: JSX.Element | JSX.Element[]
}

const DataContextProvider = ({ children }: DataContextProviderProps) => {
    const [dataList, setDataList] = useState<Hall[]>([]);

    useEffect(() => {
        fetch('https://studyhall-io-api.web.app/halls?uid=Feo17UUTHDRzte0spE0V5QbUivE2')
        .then(res => res.json())
        .then((data: HallResult) => setDataList(data.result as Hall[]))
        .catch(console.error)
    }, []);

    return (
        <DataContext.Provider value={{ dataList }}>
            { children }
        </DataContext.Provider>
    )
}

export default DataContextProvider;