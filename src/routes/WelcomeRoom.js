import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { Box, Heading, Flex, Card, Link, Text } from 'rebass';
import { Input, Label } from '@rebass/forms';
import { FaPencilAlt } from 'react-icons/fa';
import { RiShareBoxLine } from 'react-icons/ri';
import storage from 'local-storage-fallback';
import RainbowText from 'react-rainbow-text';


export default function WelcomeRoom (props) {

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
    
    var nameInput, roomName;

    useEffect(() => {
        storage.setItem('userName', name);
    });

    const join = () => {
        const joinRoomName = roomName.value || btoa(uuid()).slice(0, 6).toUpperCase();
        props.history.push(`/room/${joinRoomName}`);
    }   

    return (
        <Box p={4} textAlign='center'>
            
            <Heading> Olá,
                <Input textAlign='center' name='name' display='inline' sx={inputStyles} width={[1/2, 2/6, 2/8, 1/5]} defaultValue={name} placeholder='pessoa' 
                    onChange={ e => setName(e.target.value) }
                    ref={(input) => { nameInput = input; }}
                />
                <Link sx={linkStyles} href='#'><FaPencilAlt onClick={ e => nameInput.focus()}/></Link> 
            </Heading>


            <Flex>
                <Box width={[0, 1/7, 2/8, 3/12]}/>

                <Box width={[1, 5/6, 4/8, 6/12]} p={1}>

                    <Card sx={cardStyles} p={4}>
                        
                        <Heading fontSize={5} mb={4}>
                            <RainbowText p={2} fontWeight={"bold"}> Faça videochamadas instantâneas</RainbowText>
                        </Heading>
                        
                        <Text fontWeight={"bold"}>
                            Crie uma nova sala de reunião ou preencha abaixo o nome da sala para entrar.
                        </Text>
                    </Card>
                    
                    <Card sx={cardStyles} p={4}>
                        
                        <Heading>
                            Nome da sala de reunião: 
                        </Heading>
                        
                        <Label htmlFor='roomName' p={0}>
                            <Input textAlign='center' name='roomName' sx={inputStyles} placeholder='se vazio, será gerado automaticamente' ref={(input) => { roomName = input; }}/>
                        </Label>
                        
                        <Link href='#' sx={linkStyles} onClick={join}> 
                            <Heading>
                                Entrar <RiShareBoxLine />
                            </Heading>
                        </Link>
                    </Card>
                
                </Box>
                
                <Box width={[0, 1/7, 2/8, 3/12]}/>
                
            </Flex>
        </Box>
    );
}
