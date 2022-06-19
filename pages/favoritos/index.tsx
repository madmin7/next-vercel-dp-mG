
import { Layout } from "../../components/layouts"
import { NoFavorites } from "../../components/ui";
import { useState, useEffect } from 'react';
import localFavorites from '../../utils/localFavorites';
import { Card, Grid } from "@nextui-org/react";
import { FavoritesPokemons } from "../../components/pokemon";



const FavoritosPage = () => {
  
  const [ favPokemons, setFavoritesPokemons ] = useState < number[] >([])
  
  useEffect(() => {

    setFavoritesPokemons( localFavorites.pokemons() )

  }, [])
  
  
  return (
    <Layout title="Pokemons Favoritos">
      

      {
        favPokemons.length === 0
          ? ( <NoFavorites /> )
          : ( <FavoritesPokemons  pokemon={ favPokemons } /> )
      }
    </Layout>
  )
}


export default FavoritosPage;