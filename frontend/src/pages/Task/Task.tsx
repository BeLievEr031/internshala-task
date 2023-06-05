import Layout from '../../components/Layout/Layout'
import Table from '../../components/Table/Table'

function Task() {
    return (
        // <div>Task</div>
        <Layout>
            <div className='w-full h-full p-4 g-gray-200'>
                <h1 className='text-5xl'>
                    Task Manager
                </h1>
                <div className='flex justify-evenly'>
                    <Table />
                </div>
                <div>
                </div>
            </div>
        </Layout>
    )
}

export default Task