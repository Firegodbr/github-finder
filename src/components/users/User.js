import React, { Component, Fragment } from 'react'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export class User extends Component {
    componentDidMount(){
        this.props.getUser(this.props.match.params.login);
    }
    static propTypes = {
        getUser: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        loading: PropTypes.bool
    }
    render() {
        const {
            name,
            avatar_url,
            company,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable} = this.props.user;

        const {loading} = this.props;
        
        if (loading) return <Spinner />
        
        return (
            <Fragment>
                <Link className='btn btn-light' to={'/'}>Back to search</Link>
                Hireable: {' '}
                {hireable ? <i className="fa fa-check text-success" aria-hidden="true"></i> : <i className="fa fa-times-circle text-danger" aria-hidden="true"></i>}
                <div className="card grid-2">
                    <div className="all-center">
                        <img className='round-img' src={avatar_url} alt="" style={{width: '150px'}}/>
                        <h1>{name}</h1>
                        <p>Location:{' '}{location}</p>
                    </div>
                    <div>
                        {bio && <Fragment> <h3>Bio</h3><p>{bio}</p></Fragment>}
                        <a href={html_url} className="btn btn-dark my-1">Visit Github Account</a>
                        <ul>
                            <li>{login && <Fragment>
                                <strong>Username: </strong>{''}{login}</Fragment>}
                            </li>
                            <li>{company && <Fragment>
                                <strong>Website: </strong>{''}{company}</Fragment>}
                            </li>
                            <li>{blog && <Fragment>
                                <strong>Website: </strong>{''}{blog}</Fragment>}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                            <div className="badge badge-primary">Followers: {followers}</div>
                            <div className="badge badge-success">Following: {following}</div>
                            <div className="badge badge-light">Public Repos: {public_repos}</div>
                            <div className="badge badge-dark">Public Gists: {public_gists}</div>
                </div>
            </Fragment>
        )
    }
}

export default User
