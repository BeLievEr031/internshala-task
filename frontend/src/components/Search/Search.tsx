import React from 'react'

interface ISerachProp {
    setText: React.Dispatch<React.SetStateAction<string>>
}

function Search({ setText }: ISerachProp) {
    return (
        <div className="relative mr-6 my-2">
            <input type="search" className="bg-purple-white shadow rounded border-0 p-3" placeholder="Search by name..." onChange={(e)=>setText(e.target.value)}/>

        </div>
    )
}

export default Search