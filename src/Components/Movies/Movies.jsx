import axios from 'axios';

import React, { useState } from 'react'

export default function Movies() {

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loadingFlag, setLoadingFlag] = useState(true);

  async function getMovies() {
    const { data } = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=84a42fd6bcec010af98d933fb04769ab');
    setTrendingMovies(data.results);
    setLoadingFlag(false);
  }

  getMovies();

  return (
    <>
    {loadingFlag?<>
        <div className=' position-fixed vh-100 w-100 d-flex justify-content-center align-items-center'>
          <i className="fa-solid fa-spinner fa-spin fs-1"></i>
        </div>
    </> : <>
    <div className="container">
        <div className="row">
          <div className=' col-md-3 my-2'>
            <div className='h-100 d-flex align-items-center'>
              <div className=' movies-header position-relative py-3 my-4'>
                <h3>Trending Movies this week </h3>
              </div>
            </div>
          </div>

          {trendingMovies.map((movie , index) => <div key={index} className=' col-md-3'>
              <div className='py-3 mb-4'>
                <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt="" />
                <h5>{movie.title} </h5>
                <p className=' text-muted py-0 my-0'> Vote Avarage: {movie.vote_average}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>}
      
    </>
  )
}
