import React, {useEffect, useState} from "react";

export const CurrentUserContext = React.createContext();

export const defaultState = {
  user: {},
  savedMovies: [],
  searchResult: [],
  shortMoviesFilter: false,
  searchFilter: null,
  isAuthenticated: false,
};

export const CurrentUserContextProvider = (props) => {

  const [state, setState] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : defaultState;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("CurrentUserContext")
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      console.log("GOT DATA FROM STORAGE", storedUser);
      setState(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);


  useEffect(() => {
    if (state) {
      console.log("Saving data to storage", state);
      localStorage.setItem("currentUser", JSON.stringify(state));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [state]);

  const removeCurrentUser = () => {
    localStorage.removeItem("currentUser");
  }

  const setSavedMovies = (savedMovies) => {
    setState(prevState => ({...prevState, savedMovies: savedMovies}));
  };

  const setSearchResult = (searchResult) => {
    setState(prevState => ({...prevState, searchResult: searchResult}));
  };

  const updateState = (newState) => {
    setState(prevState => ({...prevState, ...newState}));
  };

  if (isLoading) {
    return <p>Loading...</p>; // or show a loading spinner
  }

  return (
    <CurrentUserContext.Provider value={ {state, setSavedMovies, updateState, removeCurrentUser, setSearchResult} }>
      { props.children }
    </CurrentUserContext.Provider>
  );
};
