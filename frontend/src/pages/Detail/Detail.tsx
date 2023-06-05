import React from 'react'
import { useLocation } from 'react-router-dom'
import Layout from '../../components/Layout/Layout';

function Detail() {
    // const navigate = useNavigate()
    const { state } = useLocation();
    const { title, description, status } = state;

    return (
        <Layout>
            <div className='w-full pt-8 flex justify-center'>
                <div className="w-full max-w-lg">
                    <h1 className='mb-8 text-3xl'>Details Of Task</h1>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Title
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="title" type="text" name='title'
                                value={title}
                                readOnly
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
                                value={description}
                                readOnly
                            ></textarea>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Detail