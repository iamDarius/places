import React from "react";
import './UsersList.css';
import UsersItem from "./UserItem";

const UsersList = props => {
    if (!props.items.length) {
        return <div className="center">
            <h2> No Users Found.</h2>
        </div>
    }

    return <ul>
        {props.items.map(user => {
            return (
                <UsersItem 
                key={user.id} 
                id={user.id} 
                imageSrc={user.image} 
                placeCount={user.places.length} 
            />
            )
        })}
    </ul>
};

export default UsersList;