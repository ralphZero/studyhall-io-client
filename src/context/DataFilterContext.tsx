import React, { createContext, useContext, useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import { ExtractWeeks } from '../utils/weeks-extractor';
import { DataContext } from './DataContext';

type DateFilter = {
  weeks: string[][];
  currentWeek: string[];
  weekIndex: number;
  minDate: Moment;
  maxDate: Moment;
};

type DataFilterContextType = {
  isReady: boolean;
  dateFilter: DateFilter | undefined;
};

type DataFilterContextProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const DataFilterContext = createContext<DataFilterContextType>({
  isReady: false,
  dateFilter: undefined,
});

const DataFilterContextProvider = ({
  children,
}: DataFilterContextProviderProps) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [dateFilter, setDateFilter] = useState<DateFilter>({} as DateFilter);
  const { currentHall } = useContext(DataContext);

  useEffect(() => {
    if (currentHall._id) {
      const dates = ExtractWeeks(currentHall.startTimeStamp, currentHall.endTimeStamp);
      const currentWeek = dates[0];

      const dateFilter: DateFilter = {
        weeks: dates,
        weekIndex: 0,
        minDate: moment(currentHall.startTimeStamp).set('hour', 11),
        maxDate: moment(currentHall.endTimeStamp).set('hour', 11),
        currentWeek,
      };

      setDateFilter(dateFilter);

      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [currentHall]);

  return (
    <DataFilterContext.Provider value={{ isReady, dateFilter }}>
      {children}
    </DataFilterContext.Provider>
  );
};

export default DataFilterContextProvider;
