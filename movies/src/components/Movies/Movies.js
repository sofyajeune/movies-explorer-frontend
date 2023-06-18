import "./Movies.css";
import React, { useEffect, useContext } from 'react';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import Layout from "../Layout/Layout";
import { useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function Movies({
  onOpenBurger,
  allMovies,
  isLoading,
  resetCondition,
  tbDelete = false,
  previewEnabled = false,
  statefulFilters = true,
}) {
  // const shortMovies = false;

  // console.log(allMovies)
  const { state, updateState, setSearchResult } = useContext(CurrentUserContext);

  const [movies, setMovies] = useState([]);
  const [preview, setPreview] = useState(previewEnabled);

  const [filterEnabled, setFilterEnabled] = useState(statefulFilters ? state.shortMoviesFilter : null);
  const [searchFilter, setSearchFilter] = useState(statefulFilters ? state.searchFilter : null);

  useEffect(() => {
    if (resetCondition) {
      setMovies([]);
      setPreview(false);
      setFilterEnabled(false);
      setSearchFilter(null);
    }
  }, [resetCondition]);

  useEffect(() => {
    if (statefulFilters) {
      setFilterEnabled(state.shortMoviesFilter);
      setSearchFilter(state.searchFilter);
    }
  }, [state]);


  const { width } = useWindowDimensions();

  // const defaultDisplayableMovies = 12;
  // const defaultStep = 3;
  const defaultDisplayableMovies = getFirstBatchSize(width);
  const defaultStep = getStepSize(width);

  const [step, setStep] = useState(defaultStep);

  function getFirstBatchSize(width) {
    return width >= 1200 ? 12 : width >= 768 ? 9 : width >= 500 ? 4 : 7;
  }

  function getStepSize(width) {
    return width >= 1200 ? 4 : width >= 768 ? 3 : width >= 500 ? 2 : 5;
  }

  // function getRowSize(width) {
  //   return width >= 1200 ? 4 : width >= 768 ? 3 : width >= 500 ? 2 : 1;
  // }

  // console.log(width, rowSize)




  const [showMovies, setShowMovies] = useState(statefulFilters ? state.searchResult || [] : []);
  const [displayMoreButton, setDisplayMoreButton] = useState(true);

  const [displayableMovies, setDisplayableMovies] = useState(defaultDisplayableMovies);


  function filterMovieShort(movies, isShort) {
    // console.log(movies)
    if (movies.length > 0) {
      return isShort
        ? movies.filter(card => card.duration <= 40)
        : movies; //movies.filter(card => card.duration > 40);
    }
    return [];
  }

  function resetFilters(e) {
    e.preventDefault();
    setPreview(true);
    updateState({ searchFilter: null });

    setSearchFilter(null);
    setFilterEnabled(false);
    setSearchResult([]);
  }

  function toggleShortMovies() {
    if (statefulFilters) {
      updateState({ shortMoviesFilter: !filterEnabled });
    }
    setFilterEnabled(!filterEnabled);
    filterMovieShort(allMovies, filterEnabled);
  }

  function applySearchFilter(event) {
    const search = event.target[0].value;
    if (statefulFilters) {
      updateState({ searchFilter: search });
    }
    event.preventDefault();
    setSearchFilter(search);
  }

  function filterSearchMovies(movies, search) {
    return search && search.length > 0 ? movies.filter(card =>
      card.nameRU.toLowerCase().includes(search.toLowerCase())
      || card.nameEN.toLowerCase().includes(search.toLowerCase())
      || card.description.toLowerCase().includes(search.toLowerCase()))
      : movies;
  }

  // let movies

  // useEffect(() => {
  //    movies = filterSearchMovies(filterMovieShort(allMovies, filterEnabled), searchFilter);
  // }, [allMovies, state.savedMovies]);

  // console.log(filterMovieShort(allMovies, filterEnabled), filterEnabled)

  function getMoviesWithFilters() {
    resetPaginations();

    return filterSearchMovies(filterMovieShort(allMovies, filterEnabled), searchFilter);
  }

  function resetPaginations() {
    setDisplayableMovies(defaultDisplayableMovies);
    setStep(defaultStep);
  }

  function addStep() {
    setDisplayableMovies(displayableMovies + step);
  }

  function updateDisplayableMovies() {
    setShowMovies(movies.slice(0, displayableMovies));
  }

  useEffect(() => {
    setStep(getStepSize(width));
    setDisplayableMovies(getFirstBatchSize(width));
  }, []);

  useEffect(() => {

    if (searchFilter) {
      setPreview(true);
    }
  }, [searchFilter]);

  useEffect(() => {

    setStep(getStepSize(width));
    setDisplayableMovies(getFirstBatchSize(width));
  }, [width]);

  useEffect(() => {
    resetPaginations();
    const mwf = getMoviesWithFilters();
    // setTimeout(() => {}, 30);
    if (statefulFilters) {
      setSearchResult(mwf);
    }

    setMovies(mwf);
  }, [filterEnabled, searchFilter, allMovies]);

  useEffect(() => {
    updateDisplayableMovies();
  }, [movies, displayableMovies]);

  useEffect(() => {
    setDisplayMoreButton(showMovies.length < movies.length);
  }, [showMovies]);


  // console.log(showMovies)

  return (
    <Layout className="header header_white" isLoggedIn page onOpenBurger={onOpenBurger}>
      <main className="movies">
        <SearchForm filterDuration={toggleShortMovies} filterEnabled={filterEnabled}
          searchFilter={searchFilter} applySearchFilter={applySearchFilter} />

        {isLoading ? <Preloader /> : null}
        < MoviesCardList tbDelete={tbDelete}
          movies={showMovies}
          isLoading={isLoading}
          displayMoreButton={displayMoreButton}
          addStep={addStep}
          resetFilters={resetFilters}
          previewEnabled={preview}
        />
      </main>
    </Layout>
  );
}

export default Movies;
