import moment from 'moment';

export const ExtractWeeks = (startTimestamp: string, endTimestamp: string) => {
  const formattedDate = (dateString: string) => dateString + 'T12:00:00.000Z';

  const startDate = moment(formattedDate(startTimestamp));
  const endDate = moment(formattedDate(endTimestamp));

  const firstDateOfStartWeek = moment(startDate.toISOString()).startOf('week');
  const firstDateOfEndWeek = moment(endDate.toISOString()).startOf('week');

  const weeksCount = firstDateOfEndWeek.diff(firstDateOfStartWeek, 'weeks');

  let dateList = [];

  let dateToStartAt = startDate;
  let dateToFinishAt = startDate.clone().endOf('week');

  for (let week = 0; week <= weeksCount; week++) {
    const innerList = [];
    innerList.push(dateToStartAt);

    let i = dateToStartAt.weekday();

    while (i < dateToFinishAt.weekday()) {
      const thisDate = dateToStartAt.add(1, 'day');
      innerList.push(thisDate);
      i++;
    }

    dateList.push(innerList);

    dateToStartAt = dateToFinishAt.add(1, 'day');

    dateToFinishAt =
      week !== weeksCount - 1
        ? dateToStartAt.clone().endOf('week').set('hour', 11)
        : endDate;
  }

  return dateList;
};
