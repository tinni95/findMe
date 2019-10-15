import React from "react";
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from "react-native";
import { width } from "../../constants/Layout"
class SearchBarComponent extends React.Component {

    state = {
        search: ""
    }

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;

        return (
            <Searchbar
                style={styles.container}
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={search}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginTop: 50,
        width: width - 20
    }
});

export default SearchBarComponent;