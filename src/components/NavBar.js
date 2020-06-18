import React from 'react';
import { Flex, Text, Box, Button } from 'rebass';
import { GiPaintBucket } from 'react-icons/gi';

export default class NavBar extends React.Component {
    
    render() {
        return (
            <Flex px={2} alignItems='center'>
                <Text p={2} fontWeight='bold'>Horus Party</Text>
                <Box mx='auto' />
                <Button mt={2} p={2} pt={2} pb={1} onClick={this.props.themeHandler}>
                    <GiPaintBucket />
                </Button>
            </Flex>
        );  
    }
}