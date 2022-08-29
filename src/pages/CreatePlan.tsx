import React, { useEffect, useState } from "react";
import Header from "../components/Headers/Header";
import TitleHeader from "../components/Headers/TitleHeader";
import CreateHallModal, { Values } from "../components/Modals/CreateHallModal";
import { Hall } from "../models/hall";
import { HallResult } from "../models/result";
import { Moment } from "moment";
import HallCard from "../components/Cards/HallCard";
import { Col, Row } from "antd";
import CreateHallCardBtn from "../components/Buttons/CreateHallCardBtn";

const CreatePlan = () => {
  const [dataList, setDataList] = useState<Hall[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch(
      "https://studyhall-io-api.web.app/halls?uid=Feo17UUTHDRzte0spE0V5QbUivE2"
    )
      .then((res) => res.json())
      .then((data: HallResult) => setDataList(data.result as Hall[]))
      .catch(console.error);
  }, []);

  const onCreate = (values: Values) => {
    setVisible(false);

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
      dates: [],
    };

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
      })
      .catch(console.error);
  };

  return (
    <>
      <Header />
      <TitleHeader />
      <Row
        style={{ paddingInline: 50 }}
        gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}
      >
        <Col span={6}>
          <CreateHallCardBtn setVisible={setVisible} />
        </Col>
        {dataList.map((data) => (
          <Col key={data._id} span={6}>
            <HallCard
              id={data._id as string}
              title={data.title}
              description={data.description}
              progress={data.progress}
            />
          </Col>
        ))}
      </Row>

      <CreateHallModal
        visible={visible}
        onCreate={onCreate}
        onCancel={() => setVisible(false)}
      />
    </>
  );
};

export default CreatePlan;
