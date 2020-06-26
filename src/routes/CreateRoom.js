import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { Box, Heading, Flex, Card, Link } from 'rebass';
import { Input } from '@rebass/forms';
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
        boxShadow: '0 0 4px rgba(145, 145, 145, .500)',
        borderRadius: '10px',
    };

    const linkStyles = { display: 'inline-block', fontWeight: 'bold', px: 2, py: 1, color: 'inherit', mt:1, p:2, pt:2, pb:1 };

    const [name, setName] = useState(props.name); 
    
    var nameInput;

    useEffect(() => {
        storage.setItem('userName', name);
    });

    const create = () => {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }   

    return (
        <Box p={4} textAlign='center'>
            
            <Heading> Olá,
                <Input name='name' display='inline' sx={inputStyles} width={1/8} defaultValue={name} placeholder='seu nome, queridx' 
                    onChange={ e => setName(e.target.value) }
                    ref={(input) => { nameInput = input; }}
                />
                <Link sx={linkStyles} href='#'><FaPencilAlt onClick={ e => nameInput.focus()}/></Link> 
            </Heading>

            <Flex p={4}>
                <Box width={1/4}></Box>
                <Card width={1/2} sx={cardStyles} p={4}>
                    <Heading>Horus é um app de vídeo conferências instantâneas.</Heading>
                    <Heading>Para utilizar é simples, basta criar uma nova sala e enviar o link para seus convidados!</Heading>
                </Card>
                <Box width={1/4}></Box>
            </Flex>

            <Flex>
                <Box width={1/2} p={3}>
                    <Card sx={cardStyles}>
                        <Link onClick={create}> <RiShareBoxLine /></Link>
                        <Heading>Criar nova sala</Heading>
                    </Card>
                </Box>

                <Box width={1/2} p={3}>
                    <Card sx={cardStyles}>
                    <Link> <RiShareBoxLine /></Link>
                        <Heading>Entrar em sala já existente</Heading>
                    </Card>
                </Box>
            </Flex>
        </Box>
    );
}
