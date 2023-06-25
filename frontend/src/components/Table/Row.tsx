import React from 'react'
import { DraggableProvided } from 'react-beautiful-dnd';
import { ITaskData } from './Table';
import { useDispatch } from 'react-redux';
import { setCount, setEditValue, setTask } from '../../redux/slice/taskSlice';
import { deleteTodo, editTodo, getAllTodo } from '../../https/apis';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
interface IRowProp {
    provider: DraggableProvided,
    task: ITaskData,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,

}

function Row({ provider, task, setShow }: IRowProp) {
    const navigate = useNavigate();
    const { queryData } = useSelector((state: RootState) => state.taskSlice)
    const [animate, setAnimate] = React.useState(false);
    const dispatch = useDispatch()


    const handleDeleteTask = async (id: string) => {
        try {
            const res = await deleteTodo(id)
            console.log(res);
            if (res.status === 200) {
                setShow(false)
                const query = `page=${queryData.page}&sortType=${queryData.sortType}&limit=${queryData.limit}&filter=${queryData.filter}`
                const res = await getAllTodo(query)
                if (res.status === 200) {
                    dispatch(setTask(res.data.data))
                }
                return toast.success("Task deleted")
            }


        } catch (error) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data.message)
            }
            console.error(error);

        }
    }


    const handleComplete = async (id: string) => {
        try {
            const res = await editTodo(id, "complete")
            if (res.status === 200) {
                // let idx = -1;
                // for (let i = 0; i < tasks.length; i++) {
                //     if (tasks[i]._id === id) {
                //         idx = i;
                //         break;
                //     }

                // }

                // if (idx > -1) {

                //     tasks[idx] = {
                //         _id: id,
                //         title: task.title,
                //         description: task.description,
                //         status: "DONE"
                //     }
                // }
                // dispatch(setTask([...tasks]))

                const query = `page=${queryData.page}&sortType=${queryData.sortType}&limit=${queryData.limit}&filter=${queryData.filter}`
                const res = await getAllTodo(query)
                if (res.status === 200) {
                    dispatch(setCount(res.data.count))
                    dispatch(setTask(res.data.data))
                }
                return toast.success("Todo Completed.")
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data.message)
            }
            console.log(error);
        }
    }

    return (
        <tr
            {...provider.draggableProps} {...provider.dragHandleProps} ref={provider.innerRef}
            className={`cursor-pointer border-b transition-all ease-in-out ${"delay-100"} ${animate ? "translate-x-0" : "translate-x-0"} dark:bg-gray-800 dark:border-gray-700`}>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {task.title}
            </th>
            <td className="px-6 py-4 w-[45%]">
                {task.description.length > 65 ? task.description.substring(0, 60) + "......" : task.description}
            </td>
            <td className="px-6 py-4">
                {task.status === "ACTIVE" ? <span className='bg-yellow-400 py-1 px-2 text-white rounded-sm'>ACTIVE</span> : <span className='bg-green-400 py-1 px-2 text-white rounded-sm'>DONE</span>}
            </td>

            <td className="px-6 py-4 flex  justify-center">
                <div className='w-10 h-10 rounded-full border bottom-1 flex justify-center items-center mx-2'>

                    <span className="material-symbols-outlined text-2xl"
                        onClick={() => navigate("/details", { state: { title: task.title, description: task.description, status: task.status } })}
                    >
                        visibility
                    </span>
                </div>

                <div className='w-10 h-10 rounded-full border bottom-1 flex justify-center items-center mx-2'>

                    <span className="material-symbols-outlined text-2xl"
                        onClick={() => {
                            // setFunc.editData(true)
                            // setFunc.edit({ _id: task._id, title: task.title, description: task.description })
                            // setFunc.
                            // setFunc.show(true)
                            setShow(true)
                            dispatch(setEditValue(task));
                        }}
                    >
                        edit_square
                    </span>
                </div>
                <div className='w-10 h-10 rounded-full border bottom-1 flex justify-center items-center mx-2'>

                    <span className="material-symbols-outlined text-2xl"
                        onClick={() => handleDeleteTask(task._id!)}
                    >
                        delete
                    </span>
                </div>
                <div className='w-10 h-10 rounded-full border bottom-1 flex justify-center items-center mx-2'>

                    <span className="material-symbols-outlined text-2xl"
                        onClick={() => handleComplete(task._id!)}
                    >
                        done
                    </span>
                </div>

            </td>
        </tr>
    )
}

export default Row