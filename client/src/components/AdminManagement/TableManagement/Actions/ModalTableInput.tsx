import React, {FC, useEffect, useState} from 'react';
import {InputNumber, Modal, Switch} from "antd";
import {ITable} from "../../../../types/types";

interface InputProps{
    table:ITable | null
    setTable:(table:ITable)=>void
    visible:boolean
    setVisible:(visible:boolean) => void
    onOk:(table:ITable) => void
    isLoading:boolean
}
const ModalTableInput:FC<InputProps> = ({table,isLoading,setVisible,visible,onOk,setTable}) => {
    const [isAvailable,setAvailable] = useState( false)
    const [isInside,setInside] = useState(false)
    const [tableNum,setTableNum] = useState(1)
    const [capacity,setCapacity] = useState(1)
    useEffect(()=>{
        setAvailable(table?.isAvailable || false)
        setInside(table?.isInside || false)
        setTableNum(table?.tableNum || 1)
        setCapacity(table?.capacity || 1)
    },[table])
    const setTableLocally = ()=>{
        if(table){
            if(tableNum )
                table.tableNum = tableNum
            if(capacity)
                table.capacity = capacity
            table.isInside = isInside
            table.isAvailable = isAvailable
        }else{
            table = {
                tableNum,
                capacity,
                isInside,
                isAvailable
            }

        }
        setTable(table)
    }
    const onOkAction = () => {
        setTableLocally();
        onOk(table as ITable);
        clearInput();
    }
    const  clearInput= () => {
        setAvailable( true)
        setInside(false)
        setTableNum( 1)
        setCapacity(1)
    }
    return (
        <Modal
            title= {table?.tableNum || "Input New Table"}
            visible={visible}
            onOk={onOkAction}
            confirmLoading={isLoading}
            onCancel={()=>{setVisible(false)}}
            okText={"Save"}
        >


            <b>Table Number: </b><br/><InputNumber required={true} disabled={!!table} value={tableNum} step={1} min={1} onChange={(e)=>{ setTableNum(e)}} />
            <br/><b>Capacity: </b><br/><InputNumber required={true} value={capacity } min={1} max={1000} onChange={(e)=>{setCapacity(e)  }} />
            <br/><b>Is Available :</b><Switch checked={isAvailable} onChange={(e)=>{setAvailable(e)}} />
            <br/><b>Is Inside:</b><Switch checked={isInside} onChange={(e)=>{setInside(e)}} />
        </Modal>);
};

export default ModalTableInput;