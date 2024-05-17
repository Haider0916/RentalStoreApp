import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, SafeAreaView, ScrollView, Button, FlatList, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { CATEGORIES } from "../utils/categories";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Iimage = {
    images: string[];
    title: string;
    price: string;
    category: string;
    description: string;
}

function Home({ navigation }: any) {

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [ImageData, setImageData] = useState<Iimage[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const stringifiedData = await AsyncStorage.getItem('RentalItems');
                if (!!!stringifiedData) return;
                const data = JSON.parse(stringifiedData)
                setImageData(data)
            } catch (e) {
                console.log({ e })
            }
        })()
    }, []);

    const addNewItem = async (item: Iimage) => {
        if (!item) return;
        const newData = [...ImageData, item]
        try {
            await AsyncStorage.removeItem('RentalItems');
            await AsyncStorage.setItem('RentalItems', JSON.stringify(newData));
            setImageData(newData)
        } catch (e) {
            console.log({ e })
        }
    }

    const handleChangeCategory = async (category: string) => {
        try {
            setSelectedCategory(category)
            const stringifiedData = await AsyncStorage.getItem('RentalItems');
            if (!!!stringifiedData) return;
            const data = JSON.parse(stringifiedData)
            if (category.toLowerCase() === "all") {
                setImageData(data)
                return;
            }
            const categoryWiseFilteredItems = data.filter((imageData: any) => imageData.category.toLowerCase() === category.toLowerCase())
            setImageData(categoryWiseFilteredItems)
        } catch (e) {
            console.log({ e })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TouchableOpacity onPress={() => { navigation.navigate("RentalItemPost") }}>
                    <View style={{ padding: 10 }}>
                        <FlatList
                            data={["All", ...CATEGORIES]}
                            renderItem={({ item }) => <Text onPress={() => handleChangeCategory(item)} style={{ padding: 3, color: selectedCategory === item ? "white" : "black", backgroundColor: selectedCategory === item ? "#878f99" : "white", width: 100, height: 30, borderRadius: 16, display: "flex", justifyContent: "center", marginLeft: 5 }}>{item}</Text>}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            initialNumToRender={9}
                        />
                    </View>
                    {/* <View style={{ marginHorizontal: 24, marginVertical: 12, width: 300, alignSelf: "center" }}>
                        <Button
                            onPress={() => navigation.navigate("RentalItemPost", { addNewItem })}
                            title="Add New Item"
                            color={"#d64161"}
                        />
                    </View> */}
                    <View style={styles.posts}>
                        {
                            ImageData.length === 0
                                ? <Text style={{ display: "flex", justifyContent: "center", height: 280, alignItems: "center", fontSize: 20 }}>No Items Found</Text>
                                : <FlashList
                                    data={ImageData}
                                    renderItem={({ item }) => <View style={styles.post}>
                                        <Image style={styles.postImg} source={item.images[0]} />
                                        <View style={styles.imgTextContainer}>
                                            <Text style={{ fontWeight: 500 }}>{item.title}</Text>
                                            <Text style={{ color: "#d64161" }}>{item.price}</Text>
                                        </View>
                                    </View>}
                                    showsVerticalScrollIndicator={false}
                                />
                        }
                    </View>
                </TouchableOpacity>
            </ScrollView >
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    posts: {
    },
    post: {
        display: "flex",
        alignItems: "center",
        marginBottom: 10,
    },
    postImg: {
        width: 300,
        height: 200,
        resizeMode: "stretch",
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    imgTextContainer: {
        backgroundColor: "white",
        padding: 10,
        fontWeight: "bold",
        borderBottomLeftRadius: 9,
        borderBottomRightRadius: 9,
        width: 300,
    },
})

export default Home;
