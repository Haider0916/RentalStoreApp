import React from "react";
import { StyleSheet, View } from 'react-native';

function Header() {
    return <View style={styles.header}>Rental App</View>;
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        backgroundColor: '#8d9db6',
        flexDirection: 'row',
        padding: 10,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif ',
        color: 'white'
    },
});

export default Header;
