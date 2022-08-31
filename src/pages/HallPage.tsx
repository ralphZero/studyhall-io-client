import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import HallTitle from '../components/Headers/HallTitle';
import Header from '../components/Headers/Header';
import KanbanContainer from '../components/Containers/KanbanContainer';
import KanbanCol from '../components/Containers/KanbanCol';
import TaskCard from '../components/Cards/TaskCard';
import CreateTaskModal, { Values } from '../components/Modals/CreateTaskModal';
import { Task } from '../models/task';
import { Hall } from '../models/hall';
import { DataContext } from '../context/DataContext';

const HallPage = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedCol, setSelectedCol] = useState<string>('');
  const [hall, setHall] = useState<Hall>();

  const { hallId } = useParams();

  const { dataList, updateTaskFromHall } = useContext(DataContext);

  useEffect(() => {
    const thisHall = dataList.filter((data) => data._id === hallId)[0];
    setHall(thisHall);
  }, [hallId, dataList]);

  

  const onCreate = (values: Values) => {
    const selectedDateId = selectedCol;

    // Create Task to send to API
    const task: Task = {
      dateId: selectedDateId,
      label: values.label,
      task: values.task,
      isComplete: false
    }
    updateTaskFromHall(hallId as string, task);
    setVisible(false);
    setSelectedCol('');
  }

  return (
    hall ?
    <>
      <Header />
      <HallTitle />
      <KanbanContainer>
      {
          hall.dates.map((date) => {
            return (
              <KanbanCol key={date.id} id={date.id} title={date.title} selectedCol={setSelectedCol} onToggleModal={setVisible}>
                {
                  hall.tasks.map((task) => {
                    if( task.dateId === date.id) {
                      return (
                        <TaskCard key={task.id} task={task} />
                      )
                    } else {
                      return null;
                    }
                  })
                }
              </KanbanCol>
            )
          })
      }
      </KanbanContainer>
      <CreateTaskModal visible={visible} onCancel={() => setVisible(false)} onCreate={onCreate} />
      
    </>
    : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw" }}><Spin/></div>
  )
}

export default HallPage