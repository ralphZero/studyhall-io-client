import React, { createContext, useContext, useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import { ExtractWeeks } from '../utils/weeks-extractor';
import { DataContext } from './DataContext';

type DateFilter = {
  weeks: Moment[][];
  currentWeek: Moment[];
  weekIndex: number;
  minDate: Moment;
  maxDate: Moment;
};

type DataFilterContextType = {
  isReady: boolean;
  dateFilter: DateFilter | undefined;
  changeDateFilter: (value: Moment | null) => void;
};

type DataFilterContextProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const DataFilterContext = createContext<DataFilterContextType>({
  isReady: false,
  dateFilter: undefined,
  changeDateFilter: (value: Moment | null) => {}
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

  const changeDateFilter = (value: Moment | null) => {
    if (value) {
        const weekIndex = dateFilter.weeks.findIndex(
            (weekList) => weekList[0].isoWeek() === value.isoWeek()
        );
        const currentWeek = dateFilter.weeks[weekIndex];
        
        if (weekIndex !== -1) {
            setDateFilter({...dateFilter, weekIndex, currentWeek})
        }
    }
  }

  return (
    <DataFilterContext.Provider value={{ isReady, dateFilter, changeDateFilter }}>
      {children}
    </DataFilterContext.Provider>
  );
};

export default DataFilterContextProvider;
