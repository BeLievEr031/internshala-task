import React from 'react'
import { createTodo, editTodo, getAllTodo } from '../../https/apis'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { ITaskData } from '../Table/Table'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { setCount,  setTask } from '../../redux/slice/taskSlice'

interface IPopProp {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
}



function Pop({ show, setShow }: IPopProp) {
    const dispatch = useDispatch()
    const { editTask, queryData } = useSelector((state: RootState) => state.taskSlice)
    const [currTask, setCurrTask] = React.useState<ITaskData>({
        _id: editTask._id ? editTask._id : "",
        title: editTask.title ? editTask.title : "",
        description: editTask.description ? editTask.description : "",
        status: editTask.status ? editTask.status : "ACTIVE",
    })

    const [animate, setAnimate] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => {
            setAnimate(!animate);
        }, 0);

    }, [show])

    const handleAddNew = async () => {
        try {
            delete currTask._id
            const res = await createTodo(currTask)
            console.log(res);
            if (res.status === 200) {
                setShow(false)
                const query = `page=${queryData.page}&sortType=${queryData.sortType}&limit=${queryData.limit}&filter=${queryData.filter}`
                const res = await getAllTodo(query)
                if (res.status === 200) {
                    dispatch(setCount(res.data.count))
                    dispatch(setTask(res.data.data))
                }
                return toast.success("Task created.")
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data.message)
            }
            console.log(error);
        }
    }

    const handleUpdate = async () => {
        try {
            console.log(editTask)
            const editData = { ...currTask };
            console.log(editData)
            const id = editData._id!;
            delete editData._id
            const res = await editTodo(id, "edit", editData)
            console.log(res);
            if (res.status === 200) {
                setShow(false)
                const query = `page=${queryData.page}&sortType=${queryData.sortType}&limit=${queryData.limit}&filter=${queryData.filter}`
                const res = await getAllTodo(query)
                if (res.status === 200) {
                    dispatch(setCount(res.data.count))
                    dispatch(setTask(res.data.data))
                }
                return toast.success("Task updated")
            }


        } catch (error) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data.message)
            }
            console.error(error);

        }
    }

    return (
        <div>

            <div
                className={`flex justify-center items-center transition-all ${animate ? "opacity-100 scale-100" : "opacity-0 scale-0"} overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
            >
                <div className="w-[80%] relative  my-6 mx-auto max-w-3xl flex justify-center">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full items-center bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                {editTask._id === "" ? "ADD NEW TASK" : "UPDATE THE TASK"}
                            </h3>

                        </div>

                        {/*body*/}
                        <div className="w-full max-w-lg flex justify-center flex-col">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                        Title
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="title" type="text" name='title'
                                        value={currTask.title}

                                        onChange={(e) => setCurrTask({
                                            ...currTask,
                                            [e.target.name]: e.target.value
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                        Description
                                    </label>
                                    <textarea
                                        className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                                        name='description'
                                        id="description"
                                        value={currTask.description}
                                        onChange={(e) => setCurrTask({
                                            ...currTask,
                                            [e.target.name]: e.target.value
                                        })}
                                    ></textarea>
                                </div>
                            </div>

                        </div>

                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                    setShow(false)
                                }}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => editTask._id === "" ? handleAddNew() : handleUpdate()}
                            >
                                {editTask._id === "" ? "ADD" : "UPDATE"}

                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>


        </div>
    )
}

export default Pop