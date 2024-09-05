import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import './Tasks.css';
import './Common.css';
import { Switch } from '@headlessui/react'
import Themes from '../components/Themes';


const Tasks = () => {
    const activeTheme = localStorage.getItem("theme");
    const [theme, setTheme] = useState(activeTheme ? activeTheme : 0);
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [showFinished, setShowFinished] = useState(true);
    const [edit, setEdit] = useState(false);
    const [activeTask, setActiveTask] = useState({});
    const reservedColors = true;

    useEffect(() => {
        let tasksString = localStorage.getItem("tasks");
        if (tasksString) {
            let tasks = JSON.parse(localStorage.getItem("tasks"));
            if (tasks.length !== 0) {
                setTasks(tasks);
            }
        }
    }, [])

    useEffect(() => {
        saveToLS();
    }, [tasks])

    const saveToLS = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const handleAdd = () => {
        if (task.length >= 1) {
            setTasks([...tasks, { id: uuidv4(), task, completed: false }]);
            setTask("");
        }
    }

    const handleEnterKeyOnAdd = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    }
    
    const handleEdit = (id) => {
        let item = tasks.filter(i => i.id === id);
        setTask(item[0].task);
        setActiveTask(item[0]);
    }

    const insertEdit = () => {
        let index = tasks.findIndex(item => {
            return item.id === activeTask.id;
        })
        let newTask = { id: uuidv4(), task, completed: false };
        let newTasks = tasks.filter(item => {
            return item.id !== activeTask.id;
        });
        newTasks.splice(index, 0, newTask);
        setTasks(newTasks);
        setEdit(!edit);
        setTask("");
    };
    
    const handleEnterKeyOnEdit = (e) => {
        if (e.key === 'Enter') {
            insertEdit();
        }
    }

    const toggleEdit = (id) => {
        setEdit(!edit)
        if (edit === false) {
            handleEdit(id)
        } else {
            setTask("");
        }
    }

    const handleDelete = (id) => {
        if (confirm("Are you sure!") == true) {
            let newTasks = tasks.filter(item => item.id !== id);
            setTasks(newTasks);
        }
    }

    const handleChange = (e) => {
        setTask(e.target.value);
    }

    const handleCheckbox = (e) => {
        let id = e.target.name;
        let index = tasks.findIndex(item => {
            return item.id === id;
        })
        let newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    }

    const toggleFinished = (e) => {
        setShowFinished(!showFinished)
    }
    

    return (
        <>
            {reservedColors ? ("") : (
                <div className="from-[#575656] to-[#062e3f] bg-[#1a1b1b] bg-[#b1a4a1] bg-[#f7e2df] text-[#f7e2df] text-[#ffffff80] text-[#000000]
                                from-[#055351] to-[#707070] bg-[#909090] bg-[#5e6369] bg-[#000000] text-[#000000] text-[#00000080] text-[#ffffff]
                                from-[#001214] to-[#001f29] bg-[#01394c] bg-[#002837] bg-[#ffffff] text-[#ffffff] text-[#ffffff80]">
                </div>
            )}

            <Navbar theme={theme} setTheme={setTheme} />


            <div className={`min-h-screen max-h-full w-full bg-gradient-to-r from-[${Themes[theme].fromGradient}] to-[${Themes[theme].toGradient}] flex flex-col items-center pt-40 lg:pt-32 z-10`}>
                <div className='box'>
                    <div className='wave -one'></div>
                    <div className='wave -two'></div>
                </div>

                <div className={`tasks-heading text-[${Themes[theme].color1}] text-7xl sm:text-8xl lg:text-9xl font-My-Font tasks-typewriter leading-non mb-6`}>
                    Just do it.
                </div>
                {edit ? (
                    <div className="edit-task flex justify-center items-center mb-5">
                        <button className={`bg-[${Themes[theme].buttons}] ml-[-40px] mr-[5px] rounded-full hover:opacity-85`} onClick={toggleEdit} title="cancel">
                            <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none">
                                <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill={Themes[theme].icon} />
                            </svg>
                        </button>
                        <input size="35" className={`w-[60%] sm:w-[80%] lg:w-[100%] bg-[${Themes[theme].bg}] focus:outline-none p-[10px] text-[${Themes[theme].color1}] text-lg leading-none font-normal rounded-s-2xl placeholder:text-base placeholder-current`} onChange={handleChange} type="text" placeholder="Edit a task" value={task} autoFocus onKeyDown={handleEnterKeyOnEdit} />
                        <button title={task.length > 0 && "add"} onClick={insertEdit} disabled={task.length <= 0} className={`disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-85 bg-[${Themes[theme].buttons}] px-[5px] flex items-center rounded-e-2xl`}>
                            <svg fill={Themes[theme].icon} width="40px" height="40px" viewBox="0 0 24 24"><path id="primary" d="M21.71,11.29l-3-3a1,1,0,0,0-1.42,1.42L18.59,11H3a1,1,0,0,0,0,2H18.59l-1.3,1.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l3-3A1,1,0,0,0,21.71,11.29Z"></path></svg>
                        </button>
                    </div>) :
                    (<div className="add-task flex justify-center items-center mb-5">
                        <input size="35" className={`w-[60%] sm:w-[80%] lg:w-[100%] bg-[${Themes[theme].bg}] focus:outline-none p-[10px] text-[${Themes[theme].color1}] text-lg leading-none font-normal rounded-s-2xl placeholder:text-base placeholder-current`} onChange={handleChange} type="text" placeholder="Add a task" value={task} onKeyDown={handleEnterKeyOnAdd} />
                        <button title={task.length > 0 && "add"} onClick={handleAdd} disabled={task.length <= 0} className={`disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-85 bg-[${Themes[theme].buttons}] px-[5px] flex items-center rounded-e-2xl`}>
                            <svg fill={Themes[theme].icon} width="40px" height="40px" viewBox="0 0 24 24"><path id="primary" d="M21.71,11.29l-3-3a1,1,0,0,0-1.42,1.42L18.59,11H3a1,1,0,0,0,0,2H18.59l-1.3,1.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l3-3A1,1,0,0,0,21.71,11.29Z"></path></svg>
                        </button>
                    </div>)
                }
                <div className={`flex justify-between items-center w-[77%] sm:w-[57%] lg:w-[42%] px-4 sm:px-8 lg:px-12 pb-3 mb-4 border-[${Themes[theme].bg}] border-b-[1px]`}>
                    <div className="switch flex items-center gap-2 cursor-pointer">
                        <Switch
                            checked={showFinished}
                            onChange={toggleFinished}
                            className={`group inline-flex h-4 w-9 items-center rounded-full transition bg-[${Themes[theme].bg}] opacity-50 transition data-[checked]:bg-[${Themes[theme].bg}] data-[checked]:opacity-100 data-[checked]:hover:opacity-85`}
                        >
                            <span className={`size-5 rounded-full bg-[${Themes[theme].color1}] transition group-data-[checked]:translate-x-[16px]`} />
                        </Switch>
                        <span className={`select-none font-normal text-[${Themes[theme].color1}]`} onClick={toggleFinished}>Finished ?</span>
                    </div>
                    <div className={`select-none font-normal text-[${Themes[theme].color1}]`}>Total Tasks: {tasks.length}</div>
                </div>
                <div className="tasks w-[80%] sm:w-[60%] lg:w-[45%] text-slate-600 flex flex-col gap-4 mb-5">
                    {tasks.length === 0 && <div className="text-black m-auto">There is no tasks</div>}
                    {tasks.map(item => {
                        return (
                            (showFinished || !item.completed) && <div className={item.completed ? `task z-10 bg-[${Themes[theme].bg}] flex justify-between items-center text-[${Themes[theme].color1}] rounded-[30px] py-[6px] px-4 duration-200 opacity-50` : `task z-10 bg-[${Themes[theme].bg}] flex justify-between items-center text-[${Themes[theme].color1}] rounded-[30px] py-[6px] px-4`} key={item.id}>
                                <div className="content flex gap-2 w-[86%] text-pretty">
                                    <input className="cursor-pointer transition" onChange={handleCheckbox} type="checkbox" name={item.id} checked={item.completed} />
                                    <div className={item.completed ? "task-text line-through text-xl break-all" : "task-text text-xl break-all"}>{item.task}</div>
                                </div>
                                <div className="buttons flex items-center gap-2">
                                    <button title="edit" onClick={() => toggleEdit(item.id)} className={`edit-task h-[35px] w-[35px] rounded-full transition bg-[${Themes[theme].buttons}] flex justify-center items-center hover:opacity-85`}>
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575" stroke={Themes[theme].icon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <button title="delete" onClick={() => handleDelete(item.id)} className={`delete-task h-[35px] w-[35px] rounded-full transition bg-[${Themes[theme].buttons}] flex justify-center items-center hover:opacity-85`}>
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" fill={Themes[theme].icon}>
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                            <g id="SVGRepo_iconCarrier"><g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="System" transform="translate(-576.000000, -192.000000)" fillRule="nonzero"> <g id="delete_2_line" transform="translate(576.000000, 192.000000)"> <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fillRule="nonzero"> </path> <path d="M14.2792,2 C15.1401,2 15.9044,2.55086 16.1766,3.36754 L16.7208,5 L20,5 C20.5523,5 21,5.44772 21,6 C21,6.55227 20.5523,6.99998 20,7 L19.9975,7.07125 L19.9975,7.07125 L19.1301,19.2137 C19.018,20.7837 17.7117,22 16.1378,22 L7.86224,22 C6.28832,22 4.982,20.7837 4.86986,19.2137 L4.00254,7.07125 C4.00083,7.04735 3.99998,7.02359 3.99996,7 C3.44769,6.99998 3,6.55227 3,6 C3,5.44772 3.44772,5 4,5 L7.27924,5 L7.82339,3.36754 C8.09562,2.55086 8.8599,2 9.72076,2 L14.2792,2 Z M17.9975,7 L6.00255,7 L6.86478,19.0712 C6.90216,19.5946 7.3376,20 7.86224,20 L16.1378,20 C16.6624,20 17.0978,19.5946 17.1352,19.0712 L17.9975,7 Z M10,10 C10.51285,10 10.9355092,10.386027 10.9932725,10.8833761 L11,11 L11,16 C11,16.5523 10.5523,17 10,17 C9.48715929,17 9.06449214,16.613973 9.00672766,16.1166239 L9,16 L9,11 C9,10.4477 9.44771,10 10,10 Z M14,10 C14.5523,10 15,10.4477 15,11 L15,16 C15,16.5523 14.5523,17 14,17 C13.4477,17 13,16.5523 13,16 L13,11 C13,10.4477 13.4477,10 14,10 Z M14.2792,4 L9.72076,4 L9.38743,5 L14.6126,5 L14.2792,4 Z" id="形状" fill={Themes[theme].icon}> </path> </g> </g> </g> </g>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Tasks