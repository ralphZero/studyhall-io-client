import moment from 'moment';

export const ExtractWeeks = (startTimestamp: string, endTimestamp: string) => {

  const startDate = moment(startTimestamp).set('hour', 11);
  const endDate = moment(endTimestamp).set('hour', 11);
  const weeksCount = moment.duration(endDate.diff(startDate)).weeks();

  let dateList = [];

  let dateToStartAt = startDate;
  let dateToFinishAt = startDate.clone().endOf('week').set('hour', 11);

  for (let week = 0; week <= weeksCount; week++) {
    const innerList = [];
    innerList.push(dateToStartAt.toDate().toISOString());

    let i = dateToStartAt.weekday();

    while (i < dateToFinishAt.weekday()) {
      const thisDate = dateToStartAt.add(1, 'day').toDate().toISOString();
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
