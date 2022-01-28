import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState } from 'react';
import appConfig from '../config.json';

export default function ChatPage() {

    const [mensagem, setMensagem] = React.useState('')

    //useState para a lista de mensagens
    const [listaDeMensagem, setListaDeMensagem] = React.useState([])
    // Sua lógica vai aqui
    //USUARIO
    // - Usuario digita no campo textarea
    // - aperta enter para enviar
    // - tem que adicionar o texto na listagem


    //DEV
    // [X] - campo criado
    // [X] - usar onChange e usar useState (condição para caso seja enter)
    // [X] - lista de mensagens

    function handleNovaMensagem (novaMensagem){
        const mensagem = {
            texto: novaMensagem,
            de: 'Pedro Aureliano',
            id: listaDeMensagem.length + 1
        }
        setListaDeMensagem([

            mensagem, ...listaDeMensagem 
            
        ])
        
        setMensagem('')
    }
    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                   
                    <MessageList mensagens={listaDeMensagem}/>
                    {/* mapeando/ transformando a mensagem atual em uma li */}
                    {/* {listaDeMensagem.map(mensagemAtual => {
                        console.log(mensagemAtual)
                        return(
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
                    {/* <MessageList mensagens={[]} /> */}
                  
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                        //pegando a mensagem do textArea aqui
                            value={mensagem}

                            //onChange sempre recebe uma function
                            onChange={(e) => {
                                const valor = e.target.value
                                setMensagem(valor)
                            }}

                            //onKeyPress para visualizar qual foi a tecla pressionada!
                            onKeyPress={(event) => {
                                //passando uma condição
                                if(event.key === 'Enter'){
                                    //previnindo default do enter quebrar linha
                                    event.preventDefault()
                                    console.log(event)

                                    handleNovaMensagem(mensagem)

                                }
             
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                            {/* LUGAR ONDE VAI FICAR O MEU BTN DE ENVIAR */}

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    
    console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem)=>{
                return(
                    <Text
                key={mensagem.id}
                tag="li"
                styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }
                }}
            >
                <Box
                    styleSheet={{
                        marginBottom: '8px',
                    }}
                >
                    <Image
                        styleSheet={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/vanessametonini.png`}
                    />
                    <Text tag="strong">
                        {mensagem.de}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '10px',
                            marginLeft: '8px',
                            color: appConfig.theme.colors.neutrals[300],
                        }}
                        tag="span"
                    >
                        {(new Date().toLocaleDateString())}
                    </Text>
                </Box>
                {mensagem.texto}
            </Text>
                )
            })}

            
        </Box>
    )
}