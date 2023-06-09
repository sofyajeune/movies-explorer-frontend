import React, {useEffect, useState} from "react";

export const CurrentUserContext = React.createContext();

const defaultState = {
  user: {},
  savedMovies: [],
  shortMoviesFilter: false,
  searchFilter: null,
  isAuthenticated: false,
};

export const CurrentUserContextProvider = (props) => {

  const [state, setState] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setState(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);


  useEffect(() => {
    if (state) {
      localStorage.setItem('currentUser', JSON.stringify(state));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [state.user]);

  const setSavedMovies = (savedMovies) => {
    setState(prevState => ({...prevState, savedMovies: savedMovies}));
  };

  const updateState = (newState) => {
    setState(prevState => ({...prevState, ...newState}));
  };

  if (isLoading) {
    return <p>Loading...</p>; // or show a loading spinner
  }

  return (
    <CurrentUserContext.Provider value={ {state, setSavedMovies, updateState} }>
      { props.children }
    </CurrentUserContext.Provider>
  );
};
