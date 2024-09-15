import React, { useState } from 'react';
import AnimeDetails from './animeDetails';
import { BrowserRouter as Router, Link,Routes, Route, Params } from 'react-router-dom';


const AnimeGrid = (props) => {
  // Dummy data for anime pictures
  const animePictures = props.pictures===null?[]:props.pictures;
  const names = props.name===null?"":props.name;

  const combinedEle = names.map((name, index) => ({
    name: name,
    picture: animePictures[index]
  }));
  const elename = "demon"
  const encodedName = encodeURIComponent(elename);
  return (
    <div className= {props.bgCol} style = {{paddingBottom:"50px"}}>
    {props.board==="1"?<center><h3 className='bg-danger text-light' style={{fontFamily : "Righteous"}}>{props.heading}</h3></center>:null}
    <div  style={{ overflowX: 'scroll' }}>
    <div style={{ display: 'flex' }}>
      {combinedEle.map((ele, index) => (
        <div key={index} style={{ marginRight: '10px' }}>
          <div style = {{marginLeft:"10px" , marginRight: "10px"}} ><img
            src={ele.picture}
            alt={`Anime ${index + 1}`}
            style={{ width: '300px', height: '200px' , marginBottom:'10px'}}
          /></div>
          <div className='bg-warning' ><center><h5  style = {{fontFamily : "Jost"}}><Link to={`/components/animeDetails/${encodeURIComponent(ele.name)}`} className='text-light' style = {{textDecoration:"none" ,fontFamily : "Jost"}}>{ele.name}</Link></h5></center></div>
        </div>
      ))}
    </div>
  </div>
  </div>
  );
};

export default AnimeGrid;
