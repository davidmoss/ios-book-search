'use strict';

import React, {
    ActivityIndicatorIOS,
    Image,
    StyleSheet,
    Text,
    View,
    Component,
    ListView,
    TouchableHighlight
} from 'react-native';
import BookDetail from './BookDetail';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      padding: 10
  },
  thumbnail: {
      width: 53,
      height: 81,
      marginRight: 10
  },
  rightContainer: {
      flex: 1
  },
  separator: {
      height: 1,
      backgroundColor: '#dddddd'
  },
  title: {
      fontSize: 20,
      marginBottom: 8
  },
  author: {
      color: '#656565'
  },
  listView: {
      backgroundColor: '#F5FCFF',
      marginTop: 65,
      marginBottom: 50
  },
  loading: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
});

const REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction';

class BookList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        dataSource: new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        })
      }
    }

    componentDidMount() {
      this.fetchData();
    }

    fetchData() {
      fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          isLoading: false,
          dataSource : this.state.dataSource.cloneWithRows(responseData.items)
        });
      })
      .done();
    }

    showBookDetail(book) {
      this.props.navigator.push({
        title: book.volumeInfo.title,
        component: BookDetail,
        passProps: {book}
      });
    }

    renderBook(book) {
       return (
            <TouchableHighlight onPress={() => this.showBookDetail(book)} underLayColor='#dddddd'>
                <View>
                    <View style={styles.container}>
                        <Image
                            source={{uri: book.volumeInfo.imageLinks.thumbnail}}
                            style={styles.thumbnail} />
                        <View style={styles.rightContainer}>
                            <Text style={styles.title}>{book.volumeInfo.title}</Text>
                            <Text style={styles.author}>{book.volumeInfo.authors}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
       );
    }

    renderLoadingView() {
      return (
        <View style={styles.loading}>
          <ActivityIndicatorIOS
            size='large'/>
          <Text>Loading Books...</Text>
        </View>
      );
    }

    render() {
        if (this.state.isLoading) {
          return this.renderLoadingView();
        }

        return (
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderBook.bind(this)}
              style={styles.listView}
              />
        );
    }
}

export default BookList;
