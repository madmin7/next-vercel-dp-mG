import { Grid } from "@nextui-org/react";
import { PropsWithChildren, FC } from "react";
import { FavoriteCard } from "./FavoriteCard";

interface Props {
    pokemon: number[];
}



export const FavoritesPokemons: FC <PropsWithChildren <Props>>= ({ pokemon }) => {
 
    return (
    
        <Grid.Container gap={ 2 } direction='row' justify="flex-start">
        {

            pokemon.map( id => (
                <FavoriteCard id={ id } key={ id }/>
        ))


        }
        </Grid.Container>
  )
}
