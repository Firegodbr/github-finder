import React, { useContext } from 'react'
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';



const Users = () => {
    const githubContext = useContext(GithubContext);

    const {users, loading, searched} = githubContext;
    
    if (loading) {
        return <Spinner/>
    }
    if (searched && users.length === 0) {
        return(
            <div>
                <h1>No results...</h1>
            </div>
        )
    }
    else{
        return(
            <div style={userStyle}>
                {users.map(user => (
                    <UserItem key={user.id} user={user}/>
                ))}
            </div>
        )
    }
}

const userStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "1rem"
}

export default Users
