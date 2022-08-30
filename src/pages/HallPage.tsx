import React, { useEffect, useState } from 'react';
import HallTitle from '../components/Headers/HallTitle';
import Header from '../components/Headers/Header';
import KanbanContainer from '../components/Containers/KanbanContainer';
import { Hall } from '../models/hall';
import { HallResult } from '../models/result';
import KanbanCol from '../components/Containers/KanbanCol';

const HallPage = () => {
  const [dataList, setDataList] = useState<Hall[]>([])

  useEffect(() => {
    fetch('https://studyhall-io-api.web.app/halls?uid=Feo17UUTHDRzte0spE0V5QbUivE2')
    .then(res => res.json())
    .then((data: HallResult) => setDataList(data.result as Hall[]))
    .catch(console.error)
  }, [])

  return (
    <>
      <Header />
      <HallTitle />
      <KanbanContainer>
      {
        dataList.map((data) => {
          return data.dates.map((date) => {
            return (
              <KanbanCol key={date.id} title={date.title}>
                {
                  data.tasks.map((task) => {
                    if( task.dateId === date.id) {
                      return (
                        <div key={task.id}>{task.title}</div>
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
      
    </>
  )
}

export default HallPage