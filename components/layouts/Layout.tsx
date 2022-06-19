import Head from "next/head"
import { FC, PropsWithChildren } from "react"
import { Navbar } from '../ui/Navbar';



interface Props {
  title?: string
}


const origin = ( typeof window === 'undefined' ) ? '' : window.location.origin


export const Layout: FC <PropsWithChildren <Props> > = ({ children, title }) => {


  console.log({origin});



  return (
    <>
        <Head>
            <title>{ title || 'Pokemon App' }</title>
            <meta name="author" content="Marcelo Gareis" />
            <meta name="description" content={`Informacion sobre el pokemon ${ title }`} />
            <meta name="keywords" content={`${ title }, pokemon, pokedex`} />

            <meta property="og:title" content={`Informacion sobre ${ title }`}/>
            <meta property="og:description" content={`Esta es la pagina sobre ${ title }`} />
            <meta property="og:image" content={ `${ origin }/img/banner.png` } />
        </Head>

        <Navbar />

        <main style = {{
          padding:'5px 20px'
        }}>
            { children }
        </main>

    </>
  )
}
