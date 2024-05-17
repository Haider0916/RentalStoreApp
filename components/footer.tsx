import React from "react";
import { StyleSheet, View } from 'react-native';


function Footer() {
    return <View style={styles.header}>footer</View>;
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        backgroundColor: '#8d9db6',
        color: "white",
        flexDirection: 'row',
        padding: 10,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
    },
});

export default Footer;
