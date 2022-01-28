import appConfig from '../config.json';
import {Box, Button, Text, TextField, Image} from '@skynexui/components';
import React from 'react';
import {useRouter} from 'next/router'
// criando um reset de css



//componente react Titulo!!!
function Titulo (props){
  console.log(props)
  //props é como se fosse um prototype, posso criar varias propriedades para o meu componente e chamar ela
  const Tag = props.tag

  return(
    //para não retornar apenas uma div usamos <> e </>
    <>
      <Tag>{props.children}</Tag>


      {/* estilos próprios do componente de Titulo */}
      <style jsx>{`
      ${Tag}{
        color: ${appConfig.theme.colors.primary[400]};
        font-size: 28px;
        font-weight: 600;
      }
      `}</style>
    </>
  );
}

// function HomePage() {
//     return (

// <div>

// {/* GlobalStyle é um componente para dar o css reset na minha aplicação */}
//       <GlobalStyle/>
// {/* não faz sentido todo titulo ser um h1, então eu posso criar uma props chamada tag */}
//     <Titulo tag="p">Boa vindas de volta!</Titulo>
//     <h2>Discord - Alura Matrix</h2>
 
// </div>
//     )
//   }
  
//   export default HomePage

export default function PaginaInicial() {
  // a variavel nao pode ser só um texto!
  //tem que ser um valor que muda de estado no react
  // const username = 'pedroaurelli';

  //use state me retorna duas coisas
  //o username e o setUsername
  //o setUserName que é a "const" que ger apra mim a nova "foto" da pagina
  //o setuserName é uma função onde eu posso colocar um parametro dentro dela, 
  //que serám o valor atualizado!
  const [username, setUserName] = React.useState('pedroaurelli')
  
  
  //Hooks de roteamento de pagina do next {importar o hook router}
  //para trocar a a pagina sem "atualizar" ela
  const roteamento = useRouter()

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://data.whicdn.com/images/331884903/original.gif)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: 'rgb(36 45 54 / 90%)',
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            //devo evitar o maximo esse refresh da pagina com react 
            //e atualizar somento o necessario
            onSubmit={function(e){
              //para isso deve previnir o evento do botao como default
              e.preventDefault()
              console.log('enviou', username)

              //não faz mais o refresh, só muda os pedaços que precisava
              roteamento.push('/chat')
              
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            {/* <input 
            type="text"
            value={username}
            onChange={function handler(e){
              //onde ta o evento??
              const valor = e.target.value
              //trocar o valor da variavel ao digitar!
              setUserName(valor)
            }}
            /> */}
            <TextField
            value={username}
            onChange={function handler(e){
              //onde ta o evento??
              const valor = e.target.value
              //trocar o valor da variavel ao digitar!
              setUserName(valor)
            }}

              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}