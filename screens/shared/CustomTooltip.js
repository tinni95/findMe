import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Platform
} from 'react-native';
import { Tooltip as RNETooltip } from 'react-native-elements';

const TOOLTIP_WIDTH = 250;
const TOOLTIP_PADDING = 10;

function getPopover(tooltipText) {
    return (
        <Text>
            {tooltipText}
        </Text>
    );
}

class CustomTooltip extends Component {
    state = { tooltipHeight: 0 };

    renderHiddenBoxToGetHeight = () => {
        const { tooltipText } = this.props;

        return (
            <View
                style={[
                    { width: TOOLTIP_WIDTH, padding: TOOLTIP_PADDING },
                    styles.tooltipHiddenBox,
                ]}
                onLayout={(event) => {
                    const { height } = event.nativeEvent.layout;
                    this.setState({
                        tooltipHeight: height,
                    });
                }}
            >
                <Text style={styles.tooltipHiddenText}>
                    {tooltipText}
                </Text>
            </View>
        );
    }

    render() {
        const {
            tooltipText,
        } = this.props;

        const {
            tooltipHeight,
        } = this.state;

        return (
            <RNETooltip
                containerStyle={styles.container}
                backgroundColor={"#EBEBEB"}
                width={TOOLTIP_WIDTH}
                height={tooltipHeight}
                withOverlay={true}
                popover={getPopover(tooltipText)}
            >
                <View>
                    {this.props.questionMark()}
                </View>
                {this.renderHiddenBoxToGetHeight()}
            </RNETooltip>
        );
    }
}

const styles = StyleSheet.create({
    tooltipHiddenBox: {
        position: 'absolute',
        right: 10000000000,
    },
    tooltipHiddenText: {
        color: 'transparent',
    },
    container: {
        borderRadius: 0,
        backgroundColor: "white",
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOpacity: 0.2,
                shadowOffset: { height: 3 },
            },
            android: {
                elevation: 5
            },
            web: {
                borderBottomColor: '#EBEBEB',
                borderBottomWidth: 4,
                width: "80%",
            }
        })
    }
});

export default CustomTooltip;
