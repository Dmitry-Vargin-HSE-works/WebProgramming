import React, {useRef, useState} from "react";
import './index.css';
// import {v4 as uuid} from 'uuid'

let last_task_id = 0;
let f_addTask = {};
let f_popTask = {};

function Board() {
    const [Columns, setColumns] = useState([
        <Column id={0} title={"ToDo"} tasks={[]} key={0}/>,
        <Column id={1} title={"In work"} tasks={[]} key={1}/>,
        <Column id={2} title={"Done"} tasks={[]} key={2}/>
    ])
    return (
        <div className={"Board"}>
            {Columns}
        </div>
    )
}

const Column = ({id, title, tasks, ...props}) => {
    const [Id, setId] = useState(id)
    let [Title, setTitle] = useState(title)
    let [Tasks, setTasks] = useState(tasks)

    const addEmptyTask = () => {
        console.log(`last_task_id=${last_task_id}`)
        setTasks([...Tasks,
            <Task
                id={last_task_id+1}
                index={Tasks.length}
                text={""}
                columnId={Id}
                key={last_task_id+1}
            ></Task>
        ])
        last_task_id += 1
    }
    const addTask = (task) => {
        console.log('addTask')
        console.log(task)
        setTasks([...Tasks, <Task
            id={task.id}
            index={Tasks.length}
            text={task.text}
            columnId={Id}
            key={task.id}
        ></Task>])
    }
    const popTask = (taskId, text_) => {
        console.log(`taskId=${taskId}\ntext_=${text_}`)
        console.log(Tasks.map((x) => x.props.id))
        let task = Tasks.find((x) => x.props.id === taskId);
        setTasks(Tasks.filter(value => {
            console.log(value.props.id)
            return value.props.id !== taskId
        }));
        return {
            id: task.props.id,
            text: text_,
            index: task.props.index,
            columnId: task.props.columnId
        };
    }

    f_addTask[Id] = addTask;
    f_popTask[Id] = popTask;

    return (
        <div className={"Column"}>
            <h1>{Title}</h1>
            {Tasks}
            <button
                className={"AddButton"}
                onClick={addEmptyTask}>
                +
            </button>
        </div>
    )
}

const Task = ({id, index, text, columnId, ...props}) => {
    const [Id, setId] = useState(id)
    const [ColumnId, setColumnId] = useState(columnId)
    const [Index, setIndex] = useState(index)
    const [Text, setText] = useState(text)

    const moveLeftItem = () => {
        if (ColumnId !== 0) {
            f_addTask[ColumnId - 1](f_popTask[ColumnId](Id, Text))
        }
    }
    const moveRightItem = () => {
        if (ColumnId !== 2) {
            f_addTask[ColumnId + 1](f_popTask[ColumnId](Id, Text))
        }
    }


    return (
        <div className={"Task"}>
            <div className={"leftTaskButton"}>
                <button className={"innerTaskButton"}
                        onClick={moveLeftItem}
                >{"<"}</button>
            </div>

            <div className={"TaskInput"}>
                <textarea className={"innerTaskInput"}
                    maxLength={520}
                    value={Text}
                    placeholder={"Type your ToDo here..."}
                    onChange={((e) => {
                        setText(e.target.value);
                        // e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight+'px';
                    })}
                />
            </div>

            <div className={"rightTaskButton"}>
                <button
                    className={"innerTaskButton"}
                    onClick={moveRightItem}
                >{">"}</button>
            </div>
        </div>
    )
}

export default Board