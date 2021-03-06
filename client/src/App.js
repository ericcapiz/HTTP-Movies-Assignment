import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';

import UpdateForm from './components/UpdateForm';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [mov, setMov] = useState([]);//new state

  const getMovieList = () => {
    
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
      console.log(movieList);
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
    
  }, [mov]);//dependancy
  console.log('dependancy',mov);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>
      
      <Route path="/update-movie/:id"
      render={(props)=> <UpdateForm {...props} setMov={setMov} />}/>
      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} setMov={setMov} />
      </Route>
    </>
  );
};

export default App;
