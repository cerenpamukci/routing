import React from 'react';
import { Link } from 'react-router-dom';

export default function KaydedilenlerListesi(props) {
  return (
    <div className="saved-list">
      <h3>Kaydedilen Filmler:</h3>
      {props.list.map((movie, index) => (
        <span key={index} className="saved-movie">
          {movie.title}
        </span>
      ))}
      {/* Görev 4: Anasayfa butonu ana sayfayı açmalı */}
      <Link to="/">
        <div className="home-button">Anasayfa</div>
      </Link>
    </div>
  );
}
