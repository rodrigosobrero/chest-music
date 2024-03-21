import React, { useState } from 'react'

const useSort = (tracks) => {
    const [data, setData] = useState(tracks)
    const [method, setMethod] = useState('')
    const [tagOrdered, setTagOrdered] = useState('')

    const orderData = (tagToSort) => {
        const ordered = [...data].sort(function (a, b) {
            if (a[tagToSort] > b[tagToSort]) {
                return method === 'des' ? -1 : 1;
            }
            if (a[tagToSort] < b[tagToSort]) {
                return method === 'des' ? 1 : -1;
            }
            return 0;
        })

        setData(ordered)
        setMethod(method === 'des' ? 'asc' : 'des')
        setTagOrdered(tagToSort)
    }
    
    return { data, method, sortBy: orderData, tagOrdered }
}

export default useSort