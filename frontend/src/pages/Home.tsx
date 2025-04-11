// import { Center, Heading, Text } from "@chakra-ui/react";
import "./Home.css"

const Home = () => {

  return (
    <div>   
        <div className="container">
            <div className="content">
                <h1 className="title">Adept AI Agent</h1>
                <h2 className="sub-title">An intelligent personal tutor, that is designed to be every student’s personal academic GURU that will transform a student’s digital learning library into a unique systematic roadmap.</h2>
                {/* <p>Adept is an AI agent that will transform a student’s digital learning library into a systematic roadmap which will be uniquely fabricated for each student</p> */}
                <a href="/inputNotes" id="get-started-btn">Get Started Now</a>
                <a id="about-us-btn">About Us</a>
            </div>
            <img src="../../public/home-img.png" alt="Man Holding computer" />
        </div>
    </div>
  );
};
export default Home;