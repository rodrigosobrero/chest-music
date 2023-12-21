import axios from "axios"
import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { apiUrl } from "utils/api"
import { auth } from "utils/firebase"

const useSearch = (lengthToStartSearch, listeners) => {
    const [input, setInput] = useState('')
    const [filteredArtists, setFilteredArtists] = useState([])
    const [selected, setSelected] = useState({})
    const [checked, setChecked] = useState(false)

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleCheck = () => {
        setChecked(true)
    }

    const handleOptionSelect = (i) => {
        setSelected(filteredArtists[i])
        setFilteredArtists([])
        setInput('')
    }

    const handleDeleteSelected = () => {
        setSelected({})
        setChecked(false)
    }

    const reset = () => {
        setChecked(false);
        setSelected({})
        setInput('')
        setFilteredArtists([])
    }

    useEffect(() =>{
        if(input.length < lengthToStartSearch) {
            if(filteredArtists.length > 0) setFilteredArtists([])
            return;
        }
        axios.get(apiUrl + 'user/?search=' + input, { headers: { 'TEST-USER-ID': 'f1' }})
        .then((response) =>  {
            let artists = response.data;
            artists = response.data.filter(artist => artist.type !== 'fan')
            if (listeners && listeners.length > 0) {
                artists = artists.filter(artist => !listeners.some(listener => listener.user_id === artist.id));
            }
            setFilteredArtists(artists)
        })
        .catch(({response}) => {
            if(response.data.code === 'firebase-expired-token') {
                signOut(auth)
              } 
        })
        // eslint-disable-next-line
    }, [input, lengthToStartSearch, listeners])
    return {
        handleChange,
        input,
        filteredArtists,
        handleOptionSelect,
        handleDeleteSelected,
        selected,
        checked,
        handleCheck,
        reset
    }
}

export { useSearch }