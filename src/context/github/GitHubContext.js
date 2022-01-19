import { createContext, useReducer } from 'react';
import GitHubReducer from './GitHubReducer';

const GitHubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GitHubProvider = ({children}) => {

    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        isNoResult: false,
    }

    const [state, dispatch] = useReducer(GitHubReducer, initialState);

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

    // Get a single user by username (=login)
    const getUser = async (login) => {
        setLoading()

        const response =  await fetch(`${GITHUB_URL}/users/${login}`, {
                                    headers: {
                                        Authorization: `token ${GITHUB_TOKEN}`
                                    }
                                });

        if (response.status === 404) {
            window.location = '/notfound'
        } else {
            // {items} is from the response
            const data = await response.json();

            dispatch({
                type: 'GET_USER',
                payload: data,
            })

            if (data.length === 0){
                dispatch({
                    type: 'NO_RESULT',
                })
            }
        }
    }

    
    // Get a single user repos
    const getUserRepos = async (login) => {
        setLoading()

        const params = new URLSearchParams({
            sort: "created",
            per_page: 10,
        })

        const response =  await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
                                    headers: {
                                        Authorization: `token ${GITHUB_TOKEN}`
                                    }
                                });

        const data = await response.json();

        dispatch({
            type: 'GET_REPOS',
            payload: data,
        })
    }


    // Set loading spinner
    const setLoading = () => dispatch({type: 'SET_LOADING'});

    return <GitHubContext.Provider value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        isNoResult: state.isNoResult,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
    }}>
        {children}
    </GitHubContext.Provider>
}

export default GitHubContext;