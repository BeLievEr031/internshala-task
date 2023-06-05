import React from 'react'

interface ICardProp {
    title: string,
    number: number,
    statusColor: string
}




function Card({ title, number, statusColor }: ICardProp) {
    const [animate, setAnimate] = React.useState(false)
    React.useEffect(() => {
        setTimeout(() => {
            setAnimate(true)
        }, 100)
    }, [])
    return (
        <div className={`pl-1 w-96 h-20 ${statusColor} rounded-lg shadow-md ${animate ? "opacity-1 transition ease-in-out delay-150" : "opacity-0 -translate-x-10"}`} >
            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                <div className="my-auto">
                    <p className="font-bold">{title}</p>
                    <p className="text-lg">{number}</p>
                </div>
                <div className="my-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Card