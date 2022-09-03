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
import TaskDrawer from '../components/Drawers/TaskDrawer';

const HallPage = () => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);

  const [selectedCol, setSelectedCol] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<Task>();

  const [hall, setHall] = useState<Hall>();

  const { hallId } = useParams();

  const { dataList, createTaskInHall, updateTaskInHall, isLoading } = useContext(DataContext);

  useEffect(() => {
    const thisHall = dataList.filter((data) => data._id === hallId)[0];
    setHall(thisHall);
  }, [hallId, dataList]);

  

  const onCreateTask = (values: Values) => {
    const selectedDateId = selectedCol;
    // Create Task to send to API
    const task: Task = {
      dateId: selectedDateId,
      label: values.label,
      task: values.task,
      isComplete: false,
      subtasks: [],
      subtasksCount: 0,
      subtasksCompletedCount: 0,
      progress: 0
    }
    createTaskInHall(hallId as string, task, () => {
      setVisibleModal(false);
    });
    setSelectedCol('');
  }

  const onUpdateTask = (values: Task) => {
    // do stuff
    console.log(values);
    
    updateTaskInHall(hallId as string, values);
    setSelectedTask(undefined);
    setVisibleDrawer(false);
  }

  const handleCardClick = (e:any, task: Task) => {
    setSelectedTask(task);
    setVisibleDrawer(true);
  }

  const onCloseDrawerTask = () => {
    setVisibleDrawer(false);
    setSelectedTask(undefined);
  }

  return (
    hall ?
    <>
      <Header />
      <HallTitle title={hall.title} description={hall.description}  progress={hall.progress} />
      <KanbanContainer>
      {
          hall.dates.map((date) => {
            return (
              <KanbanCol key={date.id} id={date.id} title={date.title} selectedCol={setSelectedCol} onToggleModal={setVisibleModal}>
                {
                  hall.tasks.map((task) => {
                    if( task.dateId === date.id) {
                      return (
                        <TaskCard onClick={handleCardClick} key={task.id} task={task} />
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
      <CreateTaskModal isLoading={isLoading} visible={visibleModal} onCancel={() => setVisibleModal(false)} onCreate={onCreateTask} />
      <TaskDrawer task={selectedTask} visible={visibleDrawer} onClose={onCloseDrawerTask} onUpdate={onUpdateTask} />
      
    </>
    : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw" }}><Spin/></div>
  )
}

export default HallPage