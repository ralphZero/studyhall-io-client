import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import HallTitle from '../components/Headers/HallTitle';
import Header from '../components/Headers/Header';
import KanbanContainer from '../components/Containers/KanbanContainer';
import KanbanCol from '../components/Containers/KanbanCol';

import CreateTaskModal, { Values } from '../components/Modals/CreateTaskModal';
import { Task } from '../models/task';
import { Hall } from '../models/hall';
import { DataContext } from '../context/DataContext';
import TaskDrawer from '../components/Drawers/TaskDrawer';
import { PlanDate } from '../models/plandate';
import HallPageSkeleton from '../components/skeletons/HallPageSkeleton';
import { DataFilterContext } from '../context/DataFilterContext';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const HallPage = () => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);

  const [selectedCol, setSelectedCol] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<Task>();

  const [hall, setHall] = useState<Hall>();

  const hallId = useParams()['*'];

  const {
    prepareCurrentHall,
    createTaskInHall,
    updateTaskInHall,
    isLoading,
    updateDatesInHall,
  } = useContext(DataContext);

  const { isReady, dateFilter } = useContext(DataFilterContext);

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
      priority: 0,
    };
    createTaskInHall(hallId as string, task, () => {
      setVisibleModal(false);
    });
    setSelectedCol('');
  };

  const onUpdateTask = (values: Task) => {
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
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    // if dragged back to where it was
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (hall) {
      const start = hall.dates.find(
        (col) => col.id === source.droppableId
      ) as PlanDate;
      const finish = hall.dates.find(
        (col) => col.id === destination.droppableId
      ) as PlanDate;

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const colIndex = hall.dates.findIndex((col) => col.id === start.id);
        const updatedTaskIds = (hall.dates[colIndex].taskIds = newTaskIds);
        const dates = [...hall.dates, updatedTaskIds] as PlanDate[];

        updateDatesInHall(hallId as string, dates);

        return;
      }

      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);

      const startIndex = hall.dates.findIndex((col) => col.id === start.id);
      const endIndex = hall.dates.findIndex((col) => col.id === finish.id);

      const dates = [
        ...hall.dates,
        (hall.dates[startIndex].taskIds = startTaskIds),
        (hall.dates[endIndex].taskIds = finishTaskIds),
      ] as PlanDate[];

      updateDatesInHall(hallId as string, dates);
    }
  };

  useEffect(() => {
    const thisHall = prepareCurrentHall(hallId as string);
    setHall(thisHall);
  }, [hallId, prepareCurrentHall]);

  return hall && isReady ? (
    <>
      <header className='p-0 m-0 sticky top-0 z-50'>
        <Header title={hall.title} />
        <HallTitle
          title={hall.title}
          description={hall.description}
          progress={hall.progress}
        />
      </header>
      <div className='kanban-container py-2 px-12 overflow-x-hidden overflow-y-auto whitespace-nowrap'>
        <KanbanContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            <>
              {dateFilter &&
                dateFilter?.weeks.map((currentWeek, index) => {
                  const isNotLastElement: boolean =
                    index !== dateFilter.weeks.length - 1;
                  const spacing = isNotLastElement ? 'mb-2' : '';

                  const firstDate =
                    index === 0
                      ? dateFilter.minDate
                      : currentWeek[0].clone().startOf('week');
                  const lastDate = currentWeek[currentWeek.length - 1];

                  const weekFormat = 'MMM DD, yyyy';
                  const weekInfo = `${firstDate.format(
                    weekFormat
                  )} ---> ${lastDate.format(weekFormat)}`;

                  return (
                    <Collapse
                      key={index}
                      collapsible='header'
                      defaultActiveKey={[...[], index]}>
                      <Panel
                        className={spacing}
                        key={index}
                        header={`Week ${index + 1}: ${weekInfo}`}>
                        <div className='kanban-panel'>
                          {hall.dateIds.map((dateId) => {
                            const dateColumn = hall.dates.find(
                              (column) => column.id === dateId
                            ) as PlanDate;

                            const firstDate = currentWeek[0];

                            const lastDate =
                              currentWeek[currentWeek.length - 1];

                            const thisDate = moment(dateColumn.date);

                            if (
                              !thisDate.isBetween(
                                firstDate,
                                lastDate,
                                'week',
                                '[]'
                              )
                            ) {
                              return null;
                            }

                            const tasks = dateColumn.taskIds.map((taskId) =>
                              hall.tasks.find((task) => task.id === taskId)
                            ) as Task[];
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
                          })}
                        </div>
                      </Panel>
                    </Collapse>
                  );
                })}
            </>
          </DragDropContext>
        </KanbanContainer>
      </div>

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
    <HallPageSkeleton title='loading' />
  );
};

export default HallPage;
