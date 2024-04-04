import { useState } from 'react'

const useSort = (tracks) => {
    const [data, setData] = useState(tracks)
    const [method, setMethod] = useState('')
    const [tagOrdered, setTagOrdered] = useState('')

    const normalize = (value) => {
        return typeof value === 'string' ? value.toLowerCase() : value


    }

    const orderToTop = (tagToSort) => {
        const ordered = [...data].sort(function (a, b) {
            if (normalize(a[tagToSort]) > normalize(b[tagToSort])) {
                return 1;
            }
            if (normalize(a[tagToSort]) <  normalize(b[tagToSort])) {
                return -1;
            }
            return 0;
        })

        setData(ordered)
        setMethod('asc')
        setTagOrdered(tagToSort)
    }

    const orderToBottom = (tagToSort) => {
        const ordered = [...data].sort(function (a, b) {
            if (normalize(a[tagToSort]) > normalize(b[tagToSort])) {
                return -1;
            }
            if (normalize(a[tagToSort]) <  normalize(b[tagToSort])) {
                return 1;
            }
            return 0;
        })

        setData(ordered)
        setMethod('des')
        setTagOrdered(tagToSort)
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

    return { data, method, sortBy: orderData, tagOrdered, orderToBottom, orderToTop, customOrderData }
}

export default useSort