import axios from "axios"
export const apiUrl = 'https://chest-api-stg.cexar.io/web/v1/'

export const patchData = async (path, body) => {
    const {data} = await axios.patch(apiUrl + path, body, { headers: { 'TEST-USER-ID': 'f1' }, })
    return data
}