import React from "react";
import './UsersList.css';
import UsersItem from "./UserItem";

const UsersList = props => {
    if (!props.items.length) {
        return <div className="center">
            <h2> No Users Found.</h2>
        </div>
    }

    return <ul className="users-lists">
        {props.items.map(user => {
            return (
                <UsersItem 
                key={user.id} 
                id={user.id} 
                image={user.image} 
                placeCount={user.places} 
            />
            )
        })}
    </ul>
};

export default UsersList;