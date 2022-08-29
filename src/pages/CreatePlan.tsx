import React, { useEffect, useState } from "react";
import Header from "../components/Headers/Header";
import TitleHeader from "../components/Headers/TitleHeader";
import CreateHallModal, { Values } from "../components/Modals/CreateHallModal";
import { Hall } from "../models/hall";
import { HallResult } from "../models/result";
import { Moment } from "moment";

const CreatePlan = () => {
  const [dataList, setDataList] = useState<Hall[]>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch(
      "https://studyhall-io-api.web.app/halls?uid=Feo17UUTHDRzte0spE0V5QbUivE2"
    )
      .then((res) => res.json())
      .then((data: HallResult) => setDataList(data.result))
      .catch(console.error);
  }, []);

  const onCreate = (values: Values) => {
    const start: Moment = values.timeframe.at(0) as Moment;
    const end: Moment = values.timeframe.at(1) as Moment;

    const hall: Hall = {
      userId: "Feo17UUTHDRzte0spE0V5QbUivE2",
      startTimeStamp: start.format("YYYY-DD-MM"),
      endTimeStamp: end.format("YYYY-DD-MM"),
      title: values.title,
      description: values.description,
      progress: 0,
      tasks: [],
      dates: []
    };

    fetch("https://studyhall-io-api.web.app/halls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(hall)
    }).then(res => res.json())
    .then(data => console.log(data));
  }

  return (
    <>
      <Header />
      <TitleHeader />
      <button onClick={() => setVisible(true)}>add</button>
      {dataList &&
        dataList.map((data) => (
          <div key={data._id}>
            <div hidden>{data._id}</div>
            <div>{data.title}</div>
            <div>{data.progress}</div>
          </div>
        ))}
      <CreateHallModal
        visible={visible}
        onCreate={onCreate}
        onCancel={() => setVisible(false)}
      />
    </>
  );
};

export default CreatePlan;
