import React, { useState } from 'react'
import Row from './Row'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Search from '../Search/Search';
import Pop from '../Pop/Pop';
import { getAllTodo } from '../../https/apis';
import { useDebounce } from 'use-debounce';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { setCount, setEditValue, setQueryData, setTask } from '../../redux/slice/taskSlice';

export interface ITaskData {
    _id?: string,
    title: string,
    description: string,
    status?: string
}


export interface ISetStateFunc {
    editData: React.Dispatch<React.SetStateAction<ITaskData>>,
    show: React.Dispatch<React.SetStateAction<boolean>>,
    eEdit: React.Dispatch<React.SetStateAction<boolean>>,
    task: React.Dispatch<React.SetStateAction<ITaskData[] | undefined>>,
}

function Table() {
    const { tasks, queryData, count } = useSelector((state: RootState) => state.taskSlice)
    const dispatch = useDispatch()

    const [show, setShow] = React.useState(false)

    const [text, setText] = useState('');
    const [value] = useDebounce(text, 1000);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const query = `page=${queryData.page}&sortType=${queryData.sortType}&limit=${queryData.limit}&filter=${queryData.filter}&keyword=${value}`
                const res = await getAllTodo(query)
                if (res.status === 200) {
                    dispatch(setCount(res.data.count))
                    dispatch(setTask(res.data.data))
                }

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    return toast.error(error.response?.data.message)
                }
                console.log(error);
            }
        }
        fetchData();
    }, [queryData, value])



    const handleDragEnd = (e: any) => {
        if (!e.destination) return;
        let tempData = Array.from(tasks!);
        let [source_data] = tempData.splice(e.source.index, 1);
        tempData.splice(e.destination.index, 0, source_data);
        dispatch(setTask(tempData))

    };


    const handlePrev = () => {
        if (queryData.page === 1) {
            return toast.error("You are on first Page");
        }

        dispatch(setQueryData({
            ...queryData,
            page: queryData.page - 1,
        }))
    };

    const handleNext = () => {
        if (queryData.page < Math.ceil(count / queryData.limit)) {
            dispatch(setQueryData({
                ...queryData,
                page: queryData.page + 1,
            }))
        } else {
            toast.error("No more Task");
        }
    };


    return (
        <>

            <div className="Table w-full mt-4 select-none">
                <div className='flex justify-between'>
                    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none  font-medium rounded-lg text-sm px-5 text-center ml-2 h-10 mt-2"
                        onClick={() => {
                            dispatch(setEditValue({ _id: "", title: "", description: "" }))
                            setShow(true)
                        }}
                    >ADD TASK</button>
                    <Search setText={setText} />
                </div>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <Droppable droppableId="droppable-1">
                            {(provider) => (

                                <tbody
                                    className="text-capitalize "
                                    ref={provider.innerRef}
                                    {...provider.droppableProps}
                                >
                                    {tasks?.map((task, index) => (
                                        <Draggable
                                            key={task._id}
                                            draggableId={task._id!}
                                            index={index}
                                        >
                                            {(provider) => (
                                                <Row provider={provider} task={task} setShow={setShow} />
                                            )}
                                        </Draggable>
                                    ))}
                                    {provider.placeholder}
                                </tbody>

                            )}
                        </Droppable>
                    </table>
                </DragDropContext>
                {show && <Pop setShow={setShow} show={show} />}
            </div>
            <div className="fixed right-4  bottom-0">
                <div className="flex flex-col items-center">

                    <div className="inline-flex mt-2 xs:mt-0">
                        <button
                            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            onClick={handlePrev}
                        >
                            Prev
                        </button>
                        <div className="flex w-10 h-10 justify-center items-center">
                            {queryData.page}
                        </div>
                        <button
                            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Table