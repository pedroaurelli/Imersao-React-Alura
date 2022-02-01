import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

//CHAVES QUE PEGUEI NO MEU SUPABASE!
const SUPABASE_ANNON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM0MjcxMSwiZXhwIjoxOTU4OTE4NzExfQ.G688L_k-ihPYxZlv_HUUyywG-nFZzB0p6rYLxLoqjYE'
const SUPABASE_URL = 'https://yehytgarfkgerkzszggo.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANNON_KEY)


function escutaMensagensEmTempoReal(adicionaMensagem){
    return supabaseClient
    .from('mensagens')
    .on('INSERT', (respostaLive)=>{
        adicionaMensagem(respostaLive.new)
    })
    .subscribe()
}


export default function ChatPage() {
    const roteamento = useRouter()
    const usuarioLogado = roteamento.query.username

    console.log(usuarioLogado)
    console.log('roteamente.query' + roteamento.query)

    const [mensagem, setMensagem] = React.useState('')

    //useState para a lista de mensagens

    //vou ter que criar no supabase o array que esta no useState com todos os campos que eu espero que ele tenha

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


    React.useEffect(()=>{
        supabaseClient
        //pegando meus dados no supabase, parece muito um select com sql
            .from('mensagens')
            .select('*')
            .order('id', {ascending: false})
            .then((dados) =>{
                console.log('Dados da consulta', dados)
                setListaDeMensagem(dados.data)
            })

            escutaMensagensEmTempoReal((novaMensagem)=>{

                setListaDeMensagem((valorAtualDaLista) => {
                    return[
                        novaMensagem,
                    ...valorAtualDaLista
                    ]
                })
            })
            //é como se fosse o observador do javascript
            //a função de useEffect só vai ser acionada quado a listaDeMensagem mudar
            
    }, [])

    function handleNovaMensagem (novaMensagem){
        const mensagem = {
            texto: novaMensagem,
            de: usuarioLogado
            // id: listaDeMensagem.length + 1
        }

        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(()=>{
                // console.log('Criando mensagem', data)
                // setListaDeMensagem([
                //     data[0],
                //     ...listaDeMensagem
                // ])
            })

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
                backgroundColor: appConfig.theme.colors.primary[600],
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
                    maxWidth: '65%',
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
                        width: 'auto',
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

                            <ButtonSendSticker
                                onStickerClick={(sticker)=>{
                                    console.log('salva sticker no banco')
                                    handleNovaMensagem(':sticker:' + sticker)
                                }}
                            />
                            
                            <Button 
                                label='Enviar'
                                onClick={() => handleNovaMensagem(mensagem)}
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["100"],
                                    mainColor: appConfig.theme.colors.primary[500],
                                    mainColorLight: appConfig.theme.colors.primary[400],
                                    mainColorStrong: appConfig.theme.colors.primary[600],
                                }}
                                styleSheet={{
                                    width: '100px',
                                    marginBottom: '7px',
                                    padding: '13px 0px'
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
                        src={`https://github.com/${mensagem.de}.png`}
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
                {mensagem.texto.startsWith(':sticker:') 
                ?(
                    <Image src={mensagem.texto.replace(':sticker:', '')}/>
                )
                :(
                    mensagem.texto
                )}



                {/* {mensagem.texto} */}
            </Text>
                )
            })}

            
        </Box>
    )
}