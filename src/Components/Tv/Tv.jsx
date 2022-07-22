import axios from 'axios';
import React, { useState } from 'react'


export default function Tv(props) {
  
  const [trendingTv, setTrendingTv] = useState([]);
  const [loadingFlag, setLoadingFlag] = useState(true);

  async function getTv() {
    const { data } = await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=84a42fd6bcec010af98d933fb04769ab');
    setTrendingTv(data.results);
    setLoadingFlag(false);
  }

  getTv();

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
                <h3>Trending Tv shows this week </h3>
              </div>
            </div>
          </div>

          {trendingTv.map((show , index) => <div key={index} className=' col-md-3'>
              <div className='py-3 mb-4'>
                <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + show.poster_path} alt="" />
                <h5>{show.name} </h5>
                <p className=' text-muted py-0 my-0'> Vote Avarage: {show.vote_average}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>}
      
    </>
  )
}
