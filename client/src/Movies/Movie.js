import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props,{ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push}= useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const handleDelete = (e)=>{
    e.preventDefault();

    axios
    .delete(`http://localhost:5000/api/movies/${params.id}`)
    .then((res)=>{
      props.setMov(res.data);
      push('/');
    })
    .catch((err)=>console.log("unable to delete",err));
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        
        Save
      </div>
      <button onClick={()=>{
        push(`/update-movie/${params.id}`)
      }}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
    
  );
}

export default Movie;
