import { createContext, useReducer } from 'react';
import GitHubReducer from './GitHubReducer';

const GitHubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GitHubProvider = ({children}) => {

    const initialState = {
        users: [],
        loading: true
    }

    const [state, dispatch] = useReducer(GitHubReducer, initialState);

    const fetchUsers = async () => {
        const response = await fetch(`${GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        });

        const data = await response.json();
        dispatch({
            type: 'GET_USERS',
            payload: data,
        })
        // setUsers(data);
        // setLoading(false);
    }

    return <GitHubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
    }}>
        {children}
    </GitHubContext.Provider>
}

export default GitHubContext;