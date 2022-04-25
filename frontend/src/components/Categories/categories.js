import React from "react";

const categories = (props) => {

    return (
        <table className={"table table-striped"}>
            <thead>
                <tr>
                    <th>Category Name</th>
                </tr>
            </thead>
            <tbody>
            {props.categories.map((term) => {
                return(
                    <tr><td>{term}</td></tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default categories;