import React from 'react';
import { Flex, Text, Box, Button, Link } from 'rebass';
import { GiPaintBucket, GiBrazil } from 'react-icons/gi';
import RainbowText from 'react-rainbow-text';
import { useColorMode } from 'theme-ui'
import { AiFillGithub } from 'react-icons/ai';

export default function NavBar (props) {

    const [colorMode, setColorMode] = useColorMode();

    const textProps = { fontWeight:'bold', textAlign:'center' };
    const linkProps = { display: 'inline-block', fontWeight: 'bold', px: 2, py: 1, color: 'inherit', mt:1, p:2, pt:2, pb:1 };

    return (
        <Flex px={2} alignItems='center'>
            <Box width={1/3}>
                <Link sx={linkProps} href={props.homeLink} fontWeight='bold'>Horus</Link>
            </Box>
            <Box width={1/3}>
                <Text sx={{ p:2, ...textProps}}> 
                    <RainbowText lightness={0.5} saturation={1}> Feito com Amor no Brasil </RainbowText><> </><GiBrazil />
                </Text>
            </Box>
            <Box mx='auto' />
            <Link href='https://github.com/carlosmds/horus' target='_blank' sx={linkProps}>
                Abrir no GitHub <AiFillGithub />
            </Link>
            <Link href='#' sx={linkProps} onClick={e => { setColorMode(colorMode === 'default' ? 'dark' : 'default') }}>
                Tema {colorMode === 'default' ? 'escuro' : 'claro'} <GiPaintBucket />
            </Link>
        </Flex>
    );  
}