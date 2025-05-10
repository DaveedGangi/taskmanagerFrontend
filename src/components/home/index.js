import {Link} from "react-router-dom";


import "./index.css";


const Home=()=>{



    return(
 <div className="video-container">

      <video autoPlay muted loop playsInline className="background-video">
        <source src="https://videos.pexels.com/video-files/1943483/1943483-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay-content">
        <h1>Hello, I'm Daveed</h1>
        <p>Web Developer | Designer</p>


              <div>
                <Link to="/tasks">
                <button>Open Tasks</button>
                </Link>
                
               </div>


      </div>

      


    </div>
    )
}


export default Home;