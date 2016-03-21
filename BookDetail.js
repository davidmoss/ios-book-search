'use strict';

import React, {
    StyleSheet,
    Text,
    ScrollView,
    Component,
    Image
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    image: {
        width: 107,
        height: 165,
        padding: 10,
        marginTop: 10
    },
    description: {
        padding: 10,
        fontSize: 15,
        color: '#656565'
    }
});

class BookDetail extends Component {
    render() {
        var book = this.props.book;
        var imageURI = (typeof book.volumeInfo.imageLinks !== 'undefined') ? book.volumeInfo.imageLinks.thumbnail : '';
        var description = (typeof book.volumeInfo.description !== 'undefined') ? book.volumeInfo.description : '';
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Image style={styles.image} source={{uri: imageURI}} />
                <Text style={styles.description}>{description}</Text>
            </ScrollView>
        );
    }
}

export default BookDetail;
