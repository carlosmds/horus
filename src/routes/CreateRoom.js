import React from "react";
import { v1 as uuid } from "uuid";
import { Button, Box, Heading, Text } from 'rebass';
import { AiFillGithub } from 'react-icons/ai';


export default function CreateRoom (props) {

    const create = () => {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

    return (
        <Box p={4}>
            <Heading variant='display'>Olá!</Heading>
            <Text mb={4}>Horus é um app de vídeo conferênias instantâneas, basta criar uma nova sala de conferência e enviar o link para seus convidados!</Text>
            <Button mr={1}>
                Abrir no GitHub<AiFillGithub />
            </Button>
            <Button onClick={create}>Criar nova sala</Button>
        </Box>
    );
}
