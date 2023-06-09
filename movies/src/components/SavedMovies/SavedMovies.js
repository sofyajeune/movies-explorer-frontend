import './SavedMovies.css';
import React from "react";
import Movies from "../Movies/Movies";
import {useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function SavedMovies({onOpenBurger, movies, isLoading}) {
  const {state, setSavedMovies} = useContext(CurrentUserContext);
  return (
    <Movies onOpenBurger={ onOpenBurger }
            allMovies={ state.savedMovies }
            isLoading={ isLoading }
            tbDelete={true}
            previewEnabled={true}
      // searchFilter={ useSearchFilter }
      // filterDuration={ toggleShortMovies }
      // filterEnabled={ filterEnabled }
    />
  );
}

export default SavedMovies;
