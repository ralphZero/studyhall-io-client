import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import HallTitle from "../components/Headers/HallTitle";
import Header from "../components/Headers/Header";
import KanbanContainer from "../components/Containers/KanbanContainer";
import KanbanCol from "../components/Containers/KanbanCol";

import CreateTaskModal, { Values } from "../components/Modals/CreateTaskModal";
import { Task } from "../models/task";
import { Hall } from "../models/hall";
import { DataContext } from "../context/DataContext";
import TaskDrawer from "../components/Drawers/TaskDrawer";
import { PlanDate } from "../models/plandate";

const HallPage = () => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);

  const [selectedCol, setSelectedCol] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<Task>();

  const [hall, setHall] = useState<Hall>();

  const { hallId } = useParams();

  const { dataList, createTaskInHall, updateTaskInHall, isLoading } =
    useContext(DataContext);

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
      progress: 0,
    };
    createTaskInHall(hallId as string, task, () => {
      setVisibleModal(false);
    });
    setSelectedCol("");
  };

  const onUpdateTask = (values: Task) => {
    // do stuff
    console.log(values);

    updateTaskInHall(hallId as string, values);
    setSelectedTask(undefined);
    setVisibleDrawer(false);
  };

  const handleCardClick = (e: any, task: Task) => {
    setSelectedTask(task);
    setVisibleDrawer(true);
  };

  const onCloseDrawerTask = () => {
    setVisibleDrawer(false);
    setSelectedTask(undefined);
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result.draggableId);
  };

  // console.log("Hall -->",hall);

  return hall ? (
    <>
      <Header title={hall.title} />
      <HallTitle
        title={hall.title}
        description={hall.description}
        progress={hall.progress}
      />
      <KanbanContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          {hall.dateIds.map((dateId) => {
            const dateColumn = hall.dates.find(
              (column) => column.id === dateId
            ) as PlanDate;

            const tasks = dateColumn.taskIds.map((taskId) =>
              hall.tasks.find((task) => task.id === taskId)
            ) as Task[];
            // console.log("TASKS--->",tasks, dateId);
            return (
              <KanbanCol
                handleCardClick={handleCardClick}
                date={dateColumn}
                tasks={tasks}
                selectedCol={setSelectedCol}
                onToggleModal={setVisibleModal}
                key={dateColumn.id}
              />
            );
            // return <div key={dateId}>Hi there </div>
          })}
        </DragDropContext>
      </KanbanContainer>

      <CreateTaskModal
        isLoading={isLoading}
        visible={visibleModal}
        onCancel={() => setVisibleModal(false)}
        onCreate={onCreateTask}
      />
      <TaskDrawer
        task={selectedTask}
        visible={visibleDrawer}
        onClose={onCloseDrawerTask}
        onUpdate={onUpdateTask}
      />
    </>
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Spin />
    </div>
  );
};

export default HallPage;
