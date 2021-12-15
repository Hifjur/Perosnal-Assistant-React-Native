import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'

export default function Home() {
    return (
        <View>
            <Link to="/todoList"><Text style={styles.nav}>Todo List</Text></Link>
        </View>
    )
}

const styles= StyleSheet.create({
    nav:{
        color: 'white',
        marginTop:100
    }
})