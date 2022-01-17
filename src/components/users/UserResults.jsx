import { useEffect, useState } from 'react';
import {ReactComponent as SpinnerSVG} from '../../shared/spinner.svg';
import UserItem from './UserItem';

function UserResults() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchUsers();

    }, [])

    const fetchUsers = async () => {
        const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
            // headers: {
            //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            // }
        });

        const data = await response.json();
        setUsers(data);
        setLoading(false);
    }

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
