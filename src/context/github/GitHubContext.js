import { createContext, useReducer } from 'react';
import GitHubReducer from './GitHubReducer';

const GitHubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GitHubProvider = ({children}) => {

    const initialState = {
        users: [],
        loading: false,
        isNoResult: false,
    }

    const [state, dispatch] = useReducer(GitHubReducer, initialState);

    // Get initial users - just for testing purposes
    // const fetchUsers = async () => {
    //     setLoading()
    //     const response = await fetch(`${GITHUB_URL}/users`, {
    //         headers: {
    //             Authorization: `token ${GITHUB_TOKEN}`
    //         }
    //     });

    //     const data = await response.json();
    //     dispatch({
    //         type: 'GET_USERS',
    //         payload: data,
    //     })
    // }

    // Search users
    const searchUsers = async (text) => {
        setLoading()
        const params =  new URLSearchParams({
            q: text,
        })

        const response =  await fetch(`${GITHUB_URL}/search/users?${params}`, {
                                    headers: {
                                        Authorization: `token ${GITHUB_TOKEN}`
                                    }
                                });

        // {items} is from the response
        const {items} = await response.json();

        dispatch({
            type: 'GET_USERS',
            payload: items,
        })

        if (items.length === 0){
            dispatch({
                type: 'NO_RESULT',
            })
        }
    }

    // clear users
    const clearUsers = async () => {
        dispatch({
            type: 'CLEAR_USERS',
        })
    }

    // Set loading spinner
    const setLoading = () => dispatch({type: 'SET_LOADING'});

    return <GitHubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        isNoResult: state.isNoResult,
        searchUsers,
        clearUsers,
    }}>
        {children}
    </GitHubContext.Provider>
}

export default GitHubContext;