import React from 'react'

const SearchFilter = ({searchName, handleSearchName}) => {
    return (
        <div>
            search contact by name: <input value={searchName} onChange={handleSearchName} />
        </div>
    )
}

export default SearchFilter