import { useEffect, useContext } from 'react';
import {ReactComponent as SpinnerSVG} from '../../assets/spinner.svg';
import UserItem from './UserItem';
import GitHubContext from '../../context/github/GitHubContext';

function UserResults() {
    const {users, loading, fetchUsers} = useContext(GitHubContext)

    useEffect(() => {
        fetchUsers();
    }, [])

    if (loading) {
        return( 
            <div align="center">
                <SpinnerSVG />
            </div>
        )
    }
    else {
        return(     
            // these class names make it responsive (xl, large and medium screens)       
            <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
                {users.map((user)=>(
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        )

    }
}

export default UserResults
