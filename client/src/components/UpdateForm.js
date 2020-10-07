import React, { useEffect, useState } from 'react';
import {useParams, useHistory} from "react-router-dom";
import axios from 'axios';

const initialItem = {
    title:"",
    director:"",
    metascore:""
};

const UpdateForm = (props)=>{
    const [movie, setMovie] = useState(initialItem);
    const {id} = useParams();
    const {push} = useHistory();

    useEffect(()=>{
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res)=>{
            setMovie(res.data);
        })
        .catch((err)=>console.log('Unable to get selected movie',err));
    },[id]);

    const changeHandler = (ev) =>{
        ev.persist();
        let value = ev.target.value;
        if(ev.target.name === "metascore"){
            value = parseInt(value,10);
        }

        setMovie({
            ...movie,
            [ev.target.name]: value
        });
    };

    const handleSubmit = (e)=>{
        e.preventDefault();

        axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then((res)=>{
            props.setMov(res.data);
            push(`/movies/${movie.id}`);
        })
        .catch((err)=> console.log('unable to update', err));
    };

    return (
        <>
        <h2>Update Item</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                onChange={changeHandler}
                placeholder="title"
                value={movie.title}
            />

            <input
                type="text"
                name="director"
                onChange={changeHandler}
                placeholder="director"
                value={movie.director}
            />

            <input
                type="number"
                name="metascore"
                onChange={changeHandler}
                placeholder="metascore"
                value={movie.metascore}
            />

            <button>Update</button>

        </form>
        </>
    )

}

export default UpdateForm;