import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text, Button, Image, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import SelectDropdown from 'react-native-select-dropdown'
import plusIcon from "../assets/plus.png"
import { CATEGORIES } from "../utils/categories";

type Iimages = {
    uri: string;
    id: string;
}

function PostItemToRent({ route, navigation }: any) {

    const [images, setImages] = useState<Iimages[]>([]);
    const [error, setError] = useState<string>("");

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const handlePress = () => {
        if (!title || !category || !price || !description || !!!images.length) {
            if (error !== "") return;
            if (!title || !category || !price || !description) {
                setError("All fields are required");
                setTimeout(() => {
                    setError("")
                }, 3000);
                return;
            }
            if (!!!images.length) {
                setError("Atleast post 1 image of the product");
                setTimeout(() => {
                    setError("")
                }, 3000);
                return;
            }
        }

        route.params.addNewItem({
            title,
            category,
            price,
            description,
            images: [images[0].uri]
        })
        navigation.goBack();
    }

    const handleCameraAccess = async () => {

        if (images.length === 3) return;

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        const id = (Math.random() * 10000).toFixed(0);

        if (!result.canceled) {
            setImages(prevState => {
                return [
                    ...prevState,
                    {
                        uri: result.assets[0].uri,
                        id
                    }
                ]
            })
        }
    }

    const handleImageRemoval = (id: string) => {
        const newImages = images.filter(image => image.id !== id)
        setImages(newImages)
    }

    return <SafeAreaView style={styles.container}>
        <ScrollView>
            <div style={styles.main}>
                {error && <Text style={{ marginBottom: 9, backgroundColor: "#d64161", color: "white", padding: 9, width: "100%", borderRadius: 16 }}>{error}</Text>}
                <View style={{ display: "flex", flexDirection: "row", marginBottom: 16 }}>
                    {
                        images.map((imgData, i) => <View style={styles.imageList} key={i}>
                            <Image style={styles.image} source={imgData.uri} alt={`plus image`} />
                            <Text onPress={() => handleImageRemoval(imgData.id)} style={{ position: "absolute", top: 0, left: "80%" }}>X</Text>
                        </View>)
                    }
                    <TouchableOpacity onPress={handleCameraAccess}>
                        {images.length < 3 && <Image style={styles.image} source={plusIcon} alt={`plus image`} />}
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setTitle(text)}
                    value={title}
                    placeholder="Title"

                />
                <View style={styles.selectInput}>
                    <SelectDropdown
                        data={CATEGORIES}
                        defaultValue={category}
                        onSelect={(selectedItem, index) => {
                            if (!selectedItem) return;
                            setCategory(selectedItem)
                        }}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                                <View>
                                    <Text style={styles.textInput}>
                                        {selectedItem || 'Category'}
                                        {
                                            isOpened
                                                ? <View style={styles.icon}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" /></svg>
                                                </View>
                                                : <View style={styles.icon}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                                                </View>
                                        }
                                    </Text>
                                </View>
                            );
                        }}
                        renderItem={(item, index, isSelected) => {
                            return (
                                <View>
                                    <Text>{item}</Text>
                                </View>
                            );
                        }}
                    />
                </View>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setPrice(text)}
                    value={price}
                    placeholder="Price"
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setDescription(text)}
                    value={description}
                    placeholder="Description"
                    multiline={true}
                    numberOfLines={3}
                />
                <View style={styles.submitBtn}>
                    <Button color={"#d64161"} onPress={handlePress} title="submit" />
                </View>
            </div >
        </ScrollView >
    </SafeAreaView >
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
    },
    heading: {
        fontSize: 24,
        marginVertical: 9,
        marginBottom: 16
    },
    textInput: {
        padding: 9,
        backgroundColor: "#e6e6e6",
        borderRadius: 10,
        marginBottom: 5
    },
    selectInput: {
        backgroundColor: "#e6e6e6",
        borderRadius: 10,
        marginBottom: 5,
        maxWidth: 300
    },
    submitBtn: {
        fontSize: 24,
        marginVertical: 9,
        width: "30%",
    },
    imageList: {
        position: "relative"
    },
    image: {
        width: 70,
        height: 70,
        backgroundColor: "lightgray",
        marginLeft: 5
    },
    icon: {
        height: 9,
        width: 9,
        marginLeft: 5
    }
});

export default PostItemToRent;
