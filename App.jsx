import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import KaydedilenlerListesi from './components/KaydedilenlerListesi';
import { movies } from './sahteVeri.js';
import Film from './components/Film';
import FilmListesi from './components/FilmListesi';

export default function App() {
  /* Görev: 1
  kaydedilmiş filmler ve film listesi için 2 tane state tanımlayın.
  film listesini sahteVeri'den alın.
  */
  const [savedMovies, setSavedMovies] = useState([]);
  const [filmler, setFilmler] = useState(movies);

  /* Görev: 2
    kaydedilmiş film listesine eklemek için bir click handle fonksiyonu yazın.
    aynı filmi 2. kez eklememeli.
    Kaydet butonunun olduğu component'e prop olarak gönderin.
    */

  const KaydedilenlerListesineEkle = (movie) => {
    const savedMovie = savedMovies.find((item) => item.id === movie.id);
    if (!savedMovie) {
      setSavedMovies([...savedMovies, movie]);
    }
  };

  return (
    <div>
      <KaydedilenlerListesi list={savedMovies} />
      <Switch>
        <Route exact path="/">
          <FilmListesi
            movies={filmler}
            KaydedilenlerListesineEkle={KaydedilenlerListesineEkle}
          />
        </Route>
        <Route path="/filmler/:id">
          <Film KaydedilenlerListesineEkle={KaydedilenlerListesineEkle} />
        </Route>
      </Switch>
    </div>
  );
}
