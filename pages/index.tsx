import { NextPage, GetStaticProps } from 'next'
import {  Grid } from '@nextui-org/react';

import { pokeApi } from '../api';
import { Layout } from '../components/layouts'
import { PokemonListResponse } from '../interfaces';
import { SmallPokemon } from '../interfaces/pokemons-list';
import { PokemonCard } from '../components/pokemon';


interface Props {
  pokemons: SmallPokemon[]
}



const HomePage: NextPage < Props > =({ pokemons }) => {

  return (
    <Layout title='Listado Pokemon' >

      <Grid.Container gap={ 2 }>
        {
          pokemons.map( p =>(
            <PokemonCard pokemon={ p } key={ p.id }/>
          ))
        }
      </Grid.Container>

    </Layout>
  )
}


//!

export const getStaticProps: GetStaticProps = async( ctx ) =>{

  const { data } = await pokeApi.get< PokemonListResponse >('/pokemon?limit=151')

  const pokemons: SmallPokemon[] = data.results.map(( poke, i ) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ i + 1}.svg`
  }))

  return {
    props: {
      pokemons
    }
  }
}


export default HomePage
