import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

import { Grid, Card, Text, Button, Container } from '@nextui-org/react';
import localFavorites from '../../utils/localFavorites';
import { useEffect, useState } from 'react';
import { Pokemon, PokemonListResponse } from '../../interfaces';
import confetti from 'canvas-confetti';
import { Layout } from '../../components/layouts';
import { pokeApi } from '../../api';
import { getPokemonInfo } from '../../utils';
import { redirect } from 'next/dist/server/api-utils';



interface Props {
    pokemon: Pokemon
}



const PokemonByNamePage: NextPage < Props >= ({ pokemon }) => {

    const [ isInFavorites, setIsInFavorites ] = useState( false )

    useEffect
    (() => {

        setIsInFavorites( localFavorites.existeEnFavoritos(pokemon.id) );

        }, [ pokemon.id ]);

    const handleClick = () => {

        localFavorites.toggleFavorites( pokemon.id );
        setIsInFavorites( !isInFavorites );

        if ( !isInFavorites ){
            confetti({
                zIndex: 999,
                particleCount: 100,
                spread: 160,
                angle: -100,
                origin: { y: 0, x: 1 } 
              });
        }


    }


    return (
        <Layout title={ pokemon.name } >
            <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
                <Grid xs={ 12 } sm={ 4 }>
                    <Card
                        isHoverable css={{ padding: '30px' }}
                    >
                        <Card.Body>
                            <Card.Image 
                                src={ pokemon.sprites.other?.dream_world.front_default || 'no-image.png' }
                                alt={ pokemon.name }
                                width= { 170 }
                                height={ 200 }
                            />
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={ 12 } sm={ 8 }>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/* <Card.Header css={{ display: 'flex', justifyContent:'space-between' }}> */}
                            <Text h1 transform='capitalize'>
                                { pokemon.name }
                            </Text>

                            <Button
                                color="gradient"
                                ghost= { !isInFavorites }
                                onPress={ handleClick }
                            >
                                {

                                    ( isInFavorites ) ? 'En Favoritos' : 'Guardar En Favoritos'

                                }
                            </Button>
                        </Card.Header>

                        <Card.Body>

                            <Text size={ 30 }> Sprites: </Text>

                            <Container direction='row' display='flex' gap={ 10 } >
                                <Image 
                                    src={ pokemon.sprites.front_default }
                                    alt={ pokemon.name }
                                    width={ 130 }
                                    height={ 120 }
                                />
                                <Image 
                                    src={ pokemon.sprites.back_default }
                                    alt={ pokemon.name }
                                    width={ 130 }
                                    height={ 120 }
                                />
                                <Image 
                                    src={ pokemon.sprites.front_shiny }
                                    alt={ pokemon.name }
                                    width={ 130 }
                                    height={ 120 }
                                />
                                <Image 
                                    src={ pokemon.sprites.back_shiny }
                                    alt={ pokemon.name }
                                    width={ 130 }
                                    height={ 120 }
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )    
};

//? se ejecuta unicamente del lado del servidor
export const getStaticPaths: GetStaticPaths = async ( ctx ) => {
    
    const { data } = await pokeApi.get < PokemonListResponse>(`/pokemon?limit=151`)

    const pokemonNames: string[] = data.results.map( pokemon => pokemon.name )

    return {
        paths: pokemonNames.map( name => ({
            params: { name }
        })),
        fallback: 'blocking'
    };
  
}


//! hay que tener cuidado con el objeto que se devuelve
export const getStaticProps: GetStaticProps = async( { params } ) =>{

    const { name } = params as { name:string };

    const pokemon = await getPokemonInfo( name );

    if ( !pokemon ) {
        return {
            redirect:{
                destination: '/',
                permanent: false
            }
        }
    }

  
    return {
      props: {
        pokemon
      },
      revalidate: 86400,
    }
  }



export default PokemonByNamePage;