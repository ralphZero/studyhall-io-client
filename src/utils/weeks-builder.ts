import moment from 'moment';

export interface WeekObject {
  startDate: number;
  endDate: number;
  formattedDateRange: string;
  dates: number[];
}

export const getWeeksInRange = (
  startDate: number,
  endDate: number
): WeekObject[] => {
  const weeks: WeekObject[] = [];
  let currentDate = moment(startDate).startOf('week');
  const lastDate = moment(endDate).endOf('week');

  while (currentDate <= lastDate) {
    const weekStartDate = currentDate.clone();
    const weekEndDate = currentDate.clone().endOf('week');

    const formattedStartDate = weekStartDate.format('MMM Do');
    const formattedEndDate = weekEndDate.format('MMM Do');
    const formattedDateRange = `${formattedStartDate} → ${formattedEndDate}`;

    const week: WeekObject = {
      startDate: weekStartDate.valueOf(),
      endDate: weekEndDate.valueOf(),
      formattedDateRange,
      dates: [],
    };

    let currentWeekDate = weekStartDate.clone();

    while (currentWeekDate <= weekEndDate) {
      week.dates.push(currentWeekDate.valueOf());
      currentWeekDate.add(1, 'day');
    }

    weeks.push(week);

    currentDate.add(1, 'week');
  }

  return weeks;
};
