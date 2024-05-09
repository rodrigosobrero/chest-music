import { useState } from 'react'

const useSort = (tracks) => {
    const [data, setData] = useState(tracks)
    const [method, setMethod] = useState('')
    const [tagOrdered, setTagOrdered] = useState('')

    const normalize = (value) => {
        return typeof value === 'string' ? value.toLowerCase() : value
    }


    const customOrderData = (tagToSort, customMethod) => {

        const ordered = [...data].sort(function (a, b) {
            if (normalize(a[tagToSort]) > normalize(b[tagToSort])) {
                return customMethod === 'des' ? -1 : 1;
            }
            if (normalize(a[tagToSort]) <  normalize(b[tagToSort])) {
                return customMethod === 'des' ? 1 : -1;
            }
            return 0;
        })

        setData(ordered)
        setMethod(customMethod)
        setTagOrdered(tagToSort)
    }

    const orderData = (tagToSort) => {
        const ordered = [...data].sort(function (a, b) {
            if (normalize(a[tagToSort]) > normalize(b[tagToSort])) {
                return method === 'des' ? -1 : 1;
            }
            if (normalize(a[tagToSort]) <  normalize(b[tagToSort])) {
                return method === 'des' ? 1 : -1;
            }
            return 0;
        })

        setData(ordered)
        setMethod(method === 'des' ? 'asc' : 'des')
        setTagOrdered(tagToSort)
    }

    return { data, method, sortBy: orderData, tagOrdered, customOrderData }
}

export default useSort