import { Card, Grid, Row, Text } from '@nextui-org/react';

import { FC, PropsWithChildren } from "react"
import { SmallPokemon } from "../../interfaces"
import { useRouter } from 'next/router';

interface Props {
    pokemon: SmallPokemon
}



export const PokemonCard: FC <PropsWithChildren <Props>>= ({ pokemon }) => {

    const { id, img, name } = pokemon;

    const router = useRouter();

    const onPokemonClick = () =>{
        router.push(`/name/${ name }`)
    }



    return (
        <Grid xs={ 6 } sm={ 3 } md={ 2 } xl={ 1 } key={ id }>
            <Card 
                isHoverable 
                isPressable 
                onClick={ onPokemonClick } 
            >
                <Card.Body css={{ p:1 }}>
                <Card.Image 
                    src={ img }
                    width="100%"
                    height={ 140}
                />
                <Card.Footer>
                    <Row className='row-content'>
                    <Text transform='capitalize'>{ name }</Text>
                    <Text>#{ id }</Text>
                    </Row>
                </Card.Footer>
                </Card.Body>
            </Card>
        </Grid>
    )
}
