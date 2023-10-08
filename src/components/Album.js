import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
import AddAlbum from './AddAlbum';




const Album = () => {
    const [album, setAlbum] = useState([]);
    const [update, setUpdate] = useState(false);
    const [boolValue, setBoolValue] = useState(false);
    const [addAlbumBtn, setAddAlbumBtn] = useState(true);
    const [id, setId] = useState(0);
    const [iD, setID] = useState(13);

    // Calling an API for the first time to load the data
    useEffect(() => {
        console.log(iD);
        axios.get(`https://jsonplaceholder.typicode.com/albums?_limit=${iD}`)
            .then(res => {
                console.log("response", res);
                setAlbum(res.data);
                console.log("response", album);
            })
            .catch(error => {
                console.log({ error });
            });


    }, []);
    // Whenever user modifies any particular then this updateAlbum function will be called. 
    const updateAlbum = (id, update, titleUpdated) => {
        // e.preventdefault();
        setUpdate(!update);
        // console.log(id);
        // console.log(titleUpdated);
        // console.log(update);
        setBoolValue(!boolValue);
        //while modifying if user does not enter anything then this will called
        if (titleUpdated === '') {
            alert("No Value Entered");
        }
        // if user enters the value then this function will be called. Put request is called
        else {
            const albums = { userId: Math.floor((id - 1) / 10) + 1, title: titleUpdated, id: id }
            axios.put(`https://jsonplaceholder.typicode.com/albums/${id}`, albums)
                .then((response) => {
                    console.log(response.data);
                    setAlbum(album.map((a) => a.id === id ? a[id] = albums : a));

                })
                .catch((error) => console.log(error));
        }
    };
    // The below function will be called whne user clicks addAlbum Button. POSt request is called
    const addAlbum = (num, title) => {
        setID(num);

        // console.log(iD);
        // console.log(num);
        // console.log(title);
        const newAlbum = { userId: Math.floor((num - 1) / 10) + 1, id: num, title: title };
        console.log('new', newAlbum.id);
        axios.post(`https://jsonplaceholder.typicode.com/albums?_limit=${iD}`, newAlbum)
            .then((response) => {
                setAlbum([...album, newAlbum]);
                console.log(response);
                console.log(response.data)
            })
            .catch((error) => console.log(error));

        // console.log(album);

    };

    //This function is called when user try to delete a particular album.

    const deleteAlbum = (albums) => {
        axios.delete(`https://jsonplaceholder.typicode.com/albums/${albums.id}`)
            .then(() => {
                setAlbum(album.filter((a, index) => a.id !== albums.id));
            })
            .catch((error) => console.log(error));
        // setBoolValue(!boolValue);
    };
    // console.log(album);
    return (
        <>
            {/* This is a navbar */}
            <nav className='navbar'>
                <div className='albumHeading'><h1>Album-List</h1></div>
                <div className='addAlbum' onClick={() => { setUpdate(!update); setAddAlbumBtn(!addAlbumBtn) }}><button>{addAlbumBtn ? "Add Album" : "Home"}</button></div>
            </nav>
            {/* Below code is for the table which displays all the data from json file*/}
            {/* If user does not want to update any album then !update value is false which is true which will display the list of albums  */}
            {!update ?
                <div className='albumList'>
                    {
                        album.map((data) => {
                            return (
                                <>

                                    <div className='albumCard' key={data.id}>
                                        <div className='albumNumber'><p>Album {data.id}</p></div>
                                        <div className='albumTitle'>{data.title}</div>
                                        <div className='btnSection'>
                                            <button className='modifyBtn' onClick={() => { setUpdate(!update); setId(data.id); setBoolValue(!boolValue); }}>
                                                Modify
                                            </button>
                                            <button className='deleteBtn' onClick={() => { deleteAlbum(data) }}><i className="fa-solid fa-trash"></i></button>
                                        </div>
                                    </div>


                                </>
                            )
                        })
                    }
                </div>
                // Else if user wants to update any album then update value will be true and below code will called
                :
                (
                    // if boolValue is true then the update form will come else add newAlbum form will be called.
                    boolValue ?
                        <form className='updateValue' onSubmit={(event) => { updateAlbum(id, update, event.target.username.value); }}>
                            <input type="text" placeholder="Update Album Title" name='username' />
                            <br />
                            <button onClick={() => { setUpdate(!update); setBoolValue(!boolValue) }}>Cancel</button>
                            <button >Save Changes</button>
                        </form>
                        :
                        <AddAlbum addAlbum={addAlbum} update={update} setUpdate={setUpdate} addAlbumBtn={addAlbumBtn} setAddAlbumBtn={setAddAlbumBtn} />)


            }
        </>
    )
}

export default Album;
