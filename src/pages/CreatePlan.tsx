import React, { useContext, useState } from "react";
import { Moment } from "moment";
import Header from "../components/Headers/Header";
import TitleHeader from "../components/Headers/TitleHeader";
import CreateHallModal, { Values } from "../components/Modals/CreateHallModal";
import { Hall } from "../models/hall";
import HallCard from "../components/Cards/HallCard";
import { Card, Col, Row, Skeleton } from "antd";
import CreateHallCardBtn from "../components/Buttons/CreateHallCardBtn";
import { DataContext } from "../context/DataContext";
import { UserContext } from "../context/UserContext";

const CreatePlan = () => {
  const [visible, setVisible] = useState(false);
  const { dataList, isLoading, addDataToList } = useContext(DataContext);

  const { user } = useContext(UserContext);

  const onCreate = (values: Values) => {
    const start: Moment = values.timeframe.at(0) as Moment;
    const end: Moment = values.timeframe.at(1) as Moment;

    const hall: Hall = {
      userId: `${user?.uid}`,
      startTimeStamp: start.format("YYYY-DD-MM"),
      endTimeStamp: end.format("YYYY-DD-MM"),
      title: values.title,
      description: values.description,
      progress: 0,
      tasks: [],
      dates: [],
    };

    addDataToList(hall, () => {
      setVisible(false);
    });
  };

  return (
    <>
      <Header />
      <TitleHeader>
        <CreateHallCardBtn setVisible={setVisible} />
      </TitleHeader>
      <div>
        <Row
          style={{ paddingInline: 50, paddingBottom: 50, marginInline: 0 }}
          gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}
        >
          {isLoading
            ? Array.from(Array(8).keys()).map((item: number) => (
                <Col span={6} key={item}>
                  <Card style={{ width: "100%" }} loading={isLoading}>
                    <div>
                      <Skeleton active />
                    </div>
                  </Card>
                </Col>
              ))
            : dataList.map((data) => (
                <Col key={data._id} span={6}>
                  <HallCard
                    id={data._id as string}
                    title={data.title}
                    description={data.description}
                    progress={data.progress}
                    startDate={data.startTimeStamp}
                    endDate={data.endTimeStamp}
                  />
                </Col>
              ))}
        </Row>
      </div>

      <CreateHallModal
        visible={visible}
        isLoading={isLoading}
        onCreate={onCreate}
        onCancel={() => setVisible(false)}
      />
    </>
  );
};

export default CreatePlan;
