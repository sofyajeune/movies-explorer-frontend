import './SavedMovies.css';
import React from "react";
import Movies from "../Movies/Movies";
import {useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function SavedMovies({onOpenBurger, movies, isLoading, resetCondition}) {
  const {state, setSavedMovies} = useContext(CurrentUserContext);
  return (
    <Movies onOpenBurger={ onOpenBurger }
            allMovies={ state.savedMovies }
            isLoading={ isLoading }
            resetCondition={resetCondition}
            tbDelete={true}
            previewEnabled={true}
            statefulFilters={false}
      // searchFilter={ useSearchFilter }
      // filterDuration={ toggleShortMovies }
      // filterEnabled={ filterEnabled }
    />
  );
}

export default SavedMovies;
