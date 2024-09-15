import { useParams } from 'react-router-dom';
import NavBar from './navbar';
import axios from "axios"
import Carousel from './carousel';
import React, { useState , useEffect} from "react";
import { Add} from '@mui/icons-material';

function AnimeDetails() {
  const [animeList, setAnimeList] = useState([]);
  const [toggle,setToggle] = useState(false);
  const [review,setReview]  = useState("");
  const handleReview = () => {
    setToggle(!toggle);
  };

  const handleReviewSend= async (e) => {
     e.preventDefault();
     try{
      const response1 = await axios.post('http://localhost:8000/review', {review,naam});
      console.log(response1);

     }catch(error){
        console.log(error);
     }

  };

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get('http://localhost:8000/animes'); // Replace '/api/animes' with your API endpoint to retrieve anime data
        setAnimeList(response.data);
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    };
  
    fetchAnime();
  }, []);
  
  {/*const pictures = animeList.map(anime => anime.pictures[0]);
const names = animeList.map(anime => anime.name);*/}

    const { encodedName } = useParams();
    const nameA = decodeURIComponent(encodedName);
    const desiredObject = animeList.find(obj => obj.name === nameA);
    const naam = desiredObject?desiredObject.name : "";
    const pics = desiredObject?desiredObject.pictures : [];
    const description = desiredObject?desiredObject.desc : "";
    const imdb = desiredObject?desiredObject.ratings : 0;
    const genre = desiredObject?desiredObject.genre : [];
    const revs = desiredObject?desiredObject.userReviews : [];
  return (
    <div style = {{backgroundColor:"black" ,color: "white", paddingBottom:"20px"}}>
      <NavBar bgCol = "bg-warning" textCol= "black" />
      <div style = {{fontFamily : "Righteous" , backgroundColor : "black", marginBottom:"20px" }} class= "p-3 text-warning content"><center><h1 style = {{fontSize : "50px"}}>{naam}</h1></center></div>
      <Carousel pics = {pics} />
      <center><div>
        <p style = {{paddingLeft : "30%" ,paddingRight : "30%" ,paddingTop:"20px"}}><h4 class = "text-warning">Description :</h4> {description}</p>
        <p><h4 class = "text-warning">Genre :</h4> {genre.map((gen,index) =>  (<React.Fragment key={index}>
          {gen}
          {index !== genre.length - 1 && ", "}
        </React.Fragment>) )}</p>
        <p><h4 class = "text-warning">Imdb :</h4> {imdb}</p>
      </div>
      </center>
      <div style = {{paddingLeft:"20px", paddingTop : "20px"}}><h3 class = "text-warning">User Reviews<button onClick={handleReview} style ={{color:"white", background:"none", border:"none"}}><Add /></button></h3>
        <p><ul>{revs.map(rev => <li><p>{rev}</p></li>)}</ul></p>
        
        {toggle && (<div class="input-group mb-3">
          <form onSubmit = {handleReviewSend}>
            <div class="input-group mb-3">
            <input class="form-control" type = "text" value = {review} placeholder='Add your review here...' onChange= {(e) => setReview(e.target.value)} />
            <button class="btn btn-outline-secondary" type = "submit">Add</button></div>
          </form>
        </div>)}
        </div>
      {/* Display anime details */}
    </div>
  );
}

export default AnimeDetails;
