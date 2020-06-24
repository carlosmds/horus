import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { Button, Box, Heading, Flex, Card, Link } from 'rebass';
import { Input } from '@rebass/forms';
import { FaPencilAlt } from 'react-icons/fa';
import { RiShareBoxLine } from 'react-icons/ri';
import storage from 'local-storage-fallback';

export default function CreateRoom (props) {

    const [name, setName] = useState(props.name);    

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
                <> </><Input display='inline' width={1/6} defaultValue={name} onChange={ e => setName(e.target.value) }/> <FaPencilAlt/> 
            </Heading>

            <Box p={5}>
                <Heading>Horus é um app de vídeo conferênias instantâneas.</Heading>
                <Heading>Para utilizar é simples, basta criar uma nova sala de conferência e enviar o link para seus convidados!</Heading>
            </Box>

            <Flex>
                <Box width={1/2} p={3}>
                    <Card sx={{p: 2, boxShadow: '0 0 4px rgba(145, 145, 145, .500)'}}>
                        <Link onClick={create}> <RiShareBoxLine /></Link>
                        <Heading>Criar nova sala</Heading>
                    </Card>
                </Box>

                <Box width={1/2} p={3}>
                    <Card sx={{p: 2, boxShadow: '0 0 4px rgba(145, 145, 145, .500)'}}>
                    <Link> <RiShareBoxLine /></Link>
                        <Heading>Entrar em sala já existente</Heading>
                    </Card>
                </Box>
            </Flex>
        </Box>
    );
}
