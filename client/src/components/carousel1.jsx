import React from "react";

function CarouselOne(){
    return <div id="carouselExampleRide" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://c4.wallpaperflare.com/wallpaper/295/163/719/anime-anime-boys-picture-in-picture-kimetsu-no-yaiba-kamado-tanjir%C5%8D-hd-wallpaper-preview.jpg" class="d-block w-100" alt="..." />
      </div>
      <div class="carousel-item">
        <img src="https://c4.wallpaperflare.com/wallpaper/470/652/917/anime-naruto-naruto-uzumaki-sasuke-uchiha-wallpaper-preview.jpg" class="d-block w-100" alt="..." />
      </div>
      <div class="carousel-item">
        <img src="https://c4.wallpaperflare.com/wallpaper/751/338/401/anime-anime-girls-white-hair-long-hair-wallpaper-preview.jpg" class="d-block w-100" alt="..." />
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
}
export default CarouselOne;