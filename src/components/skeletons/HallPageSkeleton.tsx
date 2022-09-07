import { Skeleton, Space } from 'antd';
import React from 'react'
import KanbanContainer from '../Containers/KanbanContainer';
import Header from '../Headers/Header'

interface Props {
    title: string;
}
const HallPageSkeleton = ({ title }: Props) => {
  return (
    <div style={{ overflow: "hidden" }}>
        <Header title={title}/>
        <Space style={{ display: "flex", justifyContent: "space-between", padding: "20px 50px", height: "90px", borderBottom: "1px solid #e0e0e064"}}>
            <Space direction='vertical'>
                <Skeleton.Input active />
                <Skeleton.Input active style={{ width: "300px" }}/>
            </Space>
            <Skeleton.Avatar active style={{ height: "70px", width: "70px" }}/>
        </Space>
        <KanbanContainer>
            <div style={{ display: "flex", padding: "10px 50px", justifyContent: "space-between" }}>
                <Skeleton.Button active style={{ width: "300px", height: "300px" }} />
                <Skeleton.Button active style={{ width: "300px", height: "100px" }} />
                <Skeleton.Button active style={{ width: "300px", height: "400px" }} />
                <Skeleton.Button active style={{ width: "300px", height: "200px" }} />
            </div>
            
        </KanbanContainer>
    </div>
  )
}

export default HallPageSkeleton