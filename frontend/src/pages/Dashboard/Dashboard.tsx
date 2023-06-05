import React from 'react'
import Layout from '../../components/Layout/Layout'
import Card from './components/Card'
import Chard from './components/Chard'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getAnalytics } from '../../https/apis';

function Dashboard() {
    const [analytics, setAnalytics] = React.useState({
        done: 0, active: 0
    });
    React.useEffect(() => {
        const fetchData = async () => {
            try {

                const res = await getAnalytics();
                setAnalytics(res.data.data)

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    return toast.error(error.response?.data.message)
                }
                console.log(error);
            }
        }

        fetchData()
    }, [])
    return (
        <Layout>
            <div className='w-full h-full p-4 g-gray-200'>
                <h1 className='text-5xl'>
                    DashBoard
                </h1>
                <div className='flex justify-evenly mt-10'>

                    <Card title='Pending Task' number={analytics.active} statusColor="bg-yellow-400" />
                    <Card title='Completed Task' number={analytics.done} statusColor="bg-green-400" />
                    <Card title='Deleted Task (Under Beta)' number={40} statusColor="bg-red-400" />

                </div>
                <div>
                    <Chard />
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard