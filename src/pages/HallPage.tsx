import React, { useEffect, useState } from 'react';
import HallTitle from '../components/Headers/HallTitle';
import Header from '../components/Headers/Header';
import KanbanContainer from '../components/Containers/KanbanContainer';
import { Hall } from '../models/hall';
import { HallResult } from '../models/result';
import KanbanCol from '../components/Containers/KanbanCol';
import TaskCard from '../components/Cards/TaskCard';
import CreateTaskModal, { Values } from '../components/Modals/CreateTaskModal';
import { Task } from '../models/task';

const HallPage = () => {
  const [dataList, setDataList] = useState<Hall[]>([])
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedCol, setSelectedCol] = useState<string>('');

  useEffect(() => {
    fetch('https://studyhall-io-api.web.app/halls?uid=Feo17UUTHDRzte0spE0V5QbUivE2')
    .then(res => res.json())
    .then((data: HallResult) => setDataList(data.result as Hall[]))
    .catch(console.error)
  }, []);

  const onCreate = (values: Values) => {
    setVisible(false);
    const isComplete = false;
    const selectedDateId = selectedCol;

    // Create Task to send to API
    const task: Task = {
      dateId: selectedDateId,
      label: values.label,
      task: values.task,
      isComplete: isComplete
    }

    fetch('https://studyhall-io-api.web.app/halls/630ed4ff3309aeaf7449bb8b/tasks', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    }).then(res => res.json())
    .then((data: HallResult) => console.log(data.result as Hall[]))
    .catch(console.error);

    setSelectedCol('');
  }

  return (
    <>
      <Header />
      <HallTitle />
      <KanbanContainer>
      {
        dataList.map((data) => {
          return data.dates.map((date) => {
            return (
              <KanbanCol key={date.id} id={date.id} title={date.title} selectedCol={setSelectedCol} onToggleModal={setVisible}>
                {
                  data.tasks.map((task) => {
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
        })
      }
      </KanbanContainer>
      <CreateTaskModal visible={visible} onCancel={() => setVisible(false)} onCreate={onCreate} />
      
    </>
  )
}

export default HallPage