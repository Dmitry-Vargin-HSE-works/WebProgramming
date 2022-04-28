import React, {useState} from "react";
import './index.css';

function Board() {

    return (
        <div className={"Board"}>
            <Column id={1} title={"ToDo"} tasks={[]}/>
            <Column id={2} title={"In work"} tasks={[]}/>
            <Column id={2} title={"Done"} tasks={[]}/>
        </div>
    )
}

const Column = ({id, title, tasks, ...props}) => {
    const [Id] = useState(id)
    const [Title, setTitle] = useState(title)
    let [Tasks, setTasks] = useState(tasks)
    return (
        <div className={"Column"}>
            <h1>{Title}</h1>
            <Task id={1} index={1} text={"Some ToDo"}/>
            <Task id={2} index={2} text={"Some ToDo"}/>
        </div>
    )
}

const Task = ({id, index, text, ...props}) => {
    const [Id, setId] = useState(id)
    const [Index, setIndex] = useState(index)
    const [Text, setText] = useState(text)

    return (
        <div className={"Task"}>
            <div className={"TaskButton"}>
                <button className={"innerTaskButton"}>{"<"}</button>
            </div>
            <div className={"TaskInput"}>
                <textarea className={"innerTaskInput"}
                    maxLength={520}
                    value={Text}
                    onChange={((e) => {
                        setText(e.target.value);
                        // e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight+'px';
                    })}
                />
            </div>
            <div className={"TaskButton"}>
                <button className={"innerTaskButton"}>{">"}</button>
            </div>
        </div>
    )
}

export default Board