import React, { useState } from 'react';
import { useFavorites, useBadis } from "./store/index"
import './App.css';
import { Badi } from './models/Badi';

type BadiListProps = {
  badis: any[]
}

const BadiList: React.FC<BadiListProps> = ({ badis }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const toggleFavorite = (id: number) => {
    isFavorite(id) ? removeFavorite(id) : addFavorite(id)
  }

  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [favoritedBadis, setFavoritedBadis] = useState<Badi[]>([])
  const toggleFavoritesOnly = () => {
    if(favoritesOnly) {
      setFavoritesOnly(false)
      setFavoritedBadis([])
    } else {
      setFavoritesOnly(true)
      setFavoritedBadis(badis.filter(badi => isFavorite(badi.badid)))
    }
  }

  const badisToRender = favoritesOnly ? favoritedBadis : badis
  return (
    <ul>
      <button onClick={(e) => toggleFavoritesOnly()}>Toggle favorites only</button>
      { 
        badisToRender.map((badi) => {
          return (
            <li key={badi.badid} onClick={e => toggleFavorite(badi.badid)}>
              <h4>{badi.badname}, 
                <span>
                  { isFavorite(badi.badid) ? "★" : "☆"}
                </span>
              </h4>
            </li>
          )
        })
      }
    </ul>
  )
}

function App() {
  const { isLoading, error, badis } = useBadis()

  return (
    <div className="app">
      <h1>Badis</h1>
      { isLoading && <h1>Loading badis...</h1> }
      <BadiList badis={badis}/>
    </div>
  );
}

export default App;
