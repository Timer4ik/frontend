import {v4} from "uuid"
export const useDebounce = (query, secs) => {

    let timer = useState(v4(), () => null)

    const fn = async (...params) => {

        clearTimeout(timer.value)

        timer.value = setTimeout(async () => {
            await query(...params)
        }, secs)
    }

    return fn
}