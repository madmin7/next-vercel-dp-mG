import NextLink from 'next/link'
import { Spacer, Text, useTheme, Link } from "@nextui-org/react"
import Image from "next/image"


export const Navbar = () => {


    const { theme } = useTheme()


    return (
        <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '0x 20px',
            backgroundColor: theme?.colors.gray100.value
        }}>

            <Image 
                src= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
                alt="icono de la app"
                width={ 70 }
                height={ 70 }
            />
            <NextLink href='/' passHref>
                <Link>
                    <Text color="white" h2>P</Text>
                    <Text color="white" h3>okémon!</Text>
                </Link>
            </NextLink>
            
            <Spacer css={{
                flex:1
            }} />
            <NextLink href='/favoritos' passHref>
                <Link css={{ marginRight: '10px' }}>
                    <Text color="white">Favoritos</Text>
                </Link>
            </NextLink>



        </div>
    )
}
