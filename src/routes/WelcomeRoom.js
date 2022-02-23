import React, { useState, useRef, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { Box, Heading, Flex, Card, Link, Text, Button } from 'rebass';
import { Input, Label } from '@rebass/forms';
import { FaPencilAlt } from 'react-icons/fa';
import io from "socket.io-client";
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

    const buttonStyles = { display: 'inline-block', fontWeight: 'bold', color: 'white', backgroundColor: 'black', cursor: 'pointer', border: '1px solid white', px: 2, py: 1, mt:1, p:2, pt:2, pb:1 };

    const [name, setName] = useState(props.name); 
    const [roomCount, setRoomCount] = useState(props.roomCount); 
    
    var nameInput, roomName;

    const socketRef = useRef();
    socketRef.current = io.connect(process.env.REACT_APP_SERVER_URL);
    
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
                <Input textAlign='center' name='name' display='inline' sx={inputStyles} width={[1/2, 2/6, 2/10, 1/5]} defaultValue={name} placeholder='pessoa' 
                    onChange={ e => setName(e.target.value) }
                    ref={(input) => { nameInput = input; }}
                />
                <Link sx={linkStyles} href='#'><FaPencilAlt onClick={ e => nameInput.focus()}/></Link> 
            </Heading>
            <Box height={[10, 25, 35, 50]}/>

            <Flex>
                <Box width={[0, 1/7, 2/10, 3/12]}/>

                <Box width={[1, 5/6, 6/10, 6/12]} p={1}>

                    <Card sx={cardStyles} p={4}>
                        
                        <Heading fontSize={5} mb={4}>
                            <RainbowText p={2} fontWeight={"bold"}> Faça videochamadas instantâneas</RainbowText>
                        </Heading>
                        
                        <Text fontWeight={"bold"}>
                            Horus é uma ferramenta de código aberto.<br></br>
                            Sinta-se livre para contribuir e sugerir melhorias.
                        </Text>
                    </Card>
                    
                    <Card sx={cardStyles} p={4}>
                        
                        <Heading>
                            Crie uma nova sala de reunião<br></br>
                            Ou entre pelo código
                        </Heading>
                        
                        <Label htmlFor='roomName' p={0}>
                            <Input textAlign='center' name='roomName' sx={inputStyles} placeholder='código da sala. vazio para gerar um código aleatório' ref={(input) => { roomName = input; }}/>
                        </Label>
                        
                        <br></br>
                        <Button sx={buttonStyles} onClick={join}>
                            
                            <Heading>
                                Entrar
                            </Heading>
                            
                        </Button>
                    </Card>
                </Box>
                
                <Box width={[0, 1/7, 2/10, 3/12]}></Box>
                
            </Flex>
            <Box height={[10, 25, 35, 50]}> 
                <Heading>
                     {/* Usuários ativos: {roomCount ?? 0} */}
                </Heading>
            </Box>

        </Box>
    );
}
