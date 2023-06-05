import SideBar from '../SideBar/SideBar'

interface ILayoutProp {
    children: any
}


function Layout({ children }: ILayoutProp) {
    return (
        <div>

            <div className='flex'>
                <div className='w-[20%]'>
                    <div className='w-full'>
                        <SideBar />
                    </div>
                </div>
                <div className=''>
                    <div className='p-2 absolute w-[80%] -z-10'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout