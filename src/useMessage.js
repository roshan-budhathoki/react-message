import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from './features/messageSlice';


export default function useMessage(pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const messages = useSelector((state) => state.message.value);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
                method: 'GET',
                url: 'https://gorest.co.in/public/v1/users',
                params: { page: pageNumber },
                cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(res => {
                const userId = res.data.data.reverse();
                userId.map(user => dispatch(addMessage(user)));
                setHasMore(res.data.meta.page > 0)
                setLoading(false)
            }).catch(e => {
                if (axios.isCancel(e)) return
                setError(true)
            })
            return () => cancel()
        }, [ pageNumber]);

    return { loading, error, messages, hasMore }
}
