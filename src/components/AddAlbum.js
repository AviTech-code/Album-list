import React from "react";
import "../index.css"
import { useState } from "react";
// Below function for adding new album in the list
const AddAlbum = (props) => {

    // console.log(props.update);

    const [albumNum, setAlbumNum] = useState(0);
    const [albumTitle, setAlbumTitle] = useState('');
    const { addAlbum, update, setUpdate, addAlbumBtn, setAddAlbumBtn } = props;
    const handleSubmit = (e) => {
        // e.preventDefault();
        addAlbum(albumNum, albumTitle);
    }

    return (
        <>
            <div className="addAlbumForm">
                <form onSubmit={() => { handleSubmit(setUpdate(!update), setAddAlbumBtn(!addAlbumBtn)) }} className="">
                    <div className="">
                        <input placeholder="Add Album Number" name="albumNum" onChange={(e) => { setAlbumNum(e.target.value) }} />
                        <br />
                        <input placeholder="Add Album Title" name="albumTitle" onChange={(e) => { setAlbumTitle(e.target.value) }} />
                    </div>

                    <button type='submit'>Submit</button>
                </form >
            </div>
        </>
    )
}
export default AddAlbum;