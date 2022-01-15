import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { Box, Heading, Flex, Card, Link, Text } from 'rebass';
import { Input, Label } from '@rebass/forms';
import { FaPencilAlt } from 'react-icons/fa';
import { RiShareBoxLine } from 'react-icons/ri';
import storage from 'local-storage-fallback';

export default function CreateRoom (props) {

    const inputStyles = {
        border: 0,
        borderBottom: '2px solid',
        outline: 'none',
        transition: '.2s ease-in-out',
        boxSizing: 'border-box',
    }

    const cardStyles = {
        p: 2,
        my: 3,
        boxShadow: '0 0 4px rgba(145, 145, 145, .500)',
        borderRadius: '10px',
    };

    const linkStyles = { display: 'inline-block', fontWeight: 'bold', px: 2, py: 1, color: 'inherit', mt:1, p:2, pt:2, pb:1 };

    const [name, setName] = useState(props.name); 
    
    var nameInput, roomName, roomLink;

    useEffect(() => {
        storage.setItem('userName', name);
    });

    const create = () => {
        const createRoomName = roomName.value || uuid();
        props.history.push(`/room/${createRoomName}`);
    }   

    const join = (e) => {
        const joinRoomLink = roomLink.value.split('/room/')[1];
        props.history.push(`/room/${joinRoomLink}`);
    }   

    return (
        <Box p={4} textAlign='center'>
            
            <Heading> Olá,
                <Input name='name' display='inline' sx={inputStyles} width={1/8} defaultValue={name} placeholder='pessoa' 
                    onChange={ e => setName(e.target.value) }
                    ref={(input) => { nameInput = input; }}
                />
                <Link sx={linkStyles} href='#'><FaPencilAlt onClick={ e => nameInput.focus()}/></Link> 
            </Heading>

            <Flex p={4}>
                <Box width={1/4}></Box>
                
                <Box width={1/4}></Box>
            </Flex>

            <Flex>
                <Box width={1/6}/>
                <Box width={1/3} p={3}>
                    <Card sx={cardStyles} textAlign='left' p={4}>
                        <Heading fontSize={5} mb={4}>Horus é um app de vídeo conferências instantâneas.</Heading>
                        <Text fontSize={3}>Para utilizar é simples, basta criar uma nova sala e enviar o link para seus convidados!</Text>
                    </Card>
                </Box>
                <Box width={1/3} p={3}>
                    <Card sx={cardStyles}>
                        <Label htmlFor='roomName' p={4}>
                            <Heading>Nome da sala: </Heading>
                            <Input name='roomName' display='inline' sx={inputStyles} width={3/5} defaultValue={name} placeholder='deixe vazio para um nome aleatório' ref={(input) => { roomName = input; }}/>
                        </Label>
                        <Link href='#' sx={linkStyles} onClick={create}> <Heading>Criar nova sala <RiShareBoxLine /></Heading> </Link>
                    </Card>
                    <Card sx={cardStyles}>
                        <Label htmlFor='roomLink' p={4}>
                            <Heading>Link: </Heading>
                            <Input name='roomLink' display='inline' sx={inputStyles} width={4/5} defaultValue={name} placeholder='insira o link para a sala' ref={(input) => { roomLink = input; }}/>
                        </Label>
                        <Link href='#' sx={linkStyles} onClick={join}> <Heading>Entrar com link <RiShareBoxLine /></Heading> </Link>
                        
                    </Card>
                </Box>
                <Box width={1/6}/>
            </Flex>
        </Box>
    );
}
