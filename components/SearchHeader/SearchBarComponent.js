import React from "react";
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from "react-native";
import { width } from "../../constants/Layout"
import PropTypes from "prop-types";
class SearchBarComponent extends React.Component {
    static propTypes = {
        setSearch: PropTypes.func.isRequired,
        search: PropTypes.string.isRequired,
    };
    updateSearch = search => {
        this.props.setSearch(search);
    };

    render() {
        return (
            <Searchbar
                style={styles.container}
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={this.props.search}
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