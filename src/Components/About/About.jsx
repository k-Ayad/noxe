import React from 'react'

export default function About(props) {
  
  return (
    <> 
       <div className=' container'>
        <div className="row">
          <div className=' offset-md-2 col-md-8'>
            <div className=' d-flex flex-wrap justify-content-center align-items-center py-5'>
              <div className=' text-center py-5'>
                <p>This project is for educational uses </p>
                <p>I developed this project using the react.js framework </p>
                <p>And I use CSS and SCSS preprocessing, Bootstrap, jQuery, and restful APIs with implementing authentication and validation concepts </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className=' position-fixed bottom-0 start-0 w-100 text-center '>
            <p> Developed by Kerllos Ayad (kerllos.ayad@gmail.com) </p>
      </footer>
    </>
  )
}
