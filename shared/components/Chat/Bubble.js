/* eslint-disable no-underscore-dangle, no-use-before-define */

import PropTypes from "prop-types";
import React from "react";
import {
  Text,
  Clipboard,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Platform
} from "react-native";
import moment from "moment/min/moment-with-locales";
import { MessageText, MessageImage } from "react-native-gifted-chat";
import { Light } from "../StyledText";
moment.locale("it");
export default class Bubble extends React.Component {
  constructor(props) {
    super(props);
    this.onLongPress = this.onLongPress.bind(this);
  }

  onLongPress() {
    if (this.props.onLongPress) {
      this.props.onLongPress(this.context, this.props.currentMessage);
    } else {
      if (this.props.currentMessage.text) {
        const options = ["Copy Text", "Cancel"];
        const cancelButtonIndex = options.length - 1;
        this.context.actionSheet().showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex
          },
          buttonIndex => {
            switch (buttonIndex) {
              case 0:
                Clipboard.setString(this.props.currentMessage.text);
                break;
            }
          }
        );
      }
    }
  }

  renderMessageText() {
    if (this.props.currentMessage.text) {
      const {
        containerStyle,
        wrapperStyle,
        messageTextStyle,
        ...messageTextProps
      } = this.props;
      if (this.props.renderMessageText) {
        return this.props.renderMessageText(messageTextProps);
      }
      return <MessageText {...messageTextProps} />;
    }
    return null;
  }

  renderMessageImage() {
    if (this.props.currentMessage.image) {
      const { containerStyle, wrapperStyle, ...messageImageProps } = this.props;
      if (this.props.renderMessageImage) {
        return this.props.renderMessageImage(messageImageProps);
      }
      return (
        <MessageImage
          {...messageImageProps}
          imageStyle={[styles.slackImage, messageImageProps.imageStyle]}
        />
      );
    }
    return null;
  }

  renderTicks() {
    const { currentMessage } = this.props;
    if (this.props.renderTicks) {
      return this.props.renderTicks(currentMessage);
    }
    if (currentMessage.user._id !== this.props.user._id) {
      return null;
    }
    if (currentMessage.sent || currentMessage.received) {
      return (
        <View style={[styles.headerItem, styles.tickView]}>
          {currentMessage.sent && (
            <Text
              style={[styles.standardFont, styles.tick, this.props.tickStyle]}
            >
              ✓
            </Text>
          )}
          {currentMessage.received && (
            <Text
              style={[styles.standardFont, styles.tick, this.props.tickStyle]}
            >
              ✓
            </Text>
          )}
        </View>
      );
    }
    return null;
  }

  renderTime() {
    if (this.props.currentMessage.createdAt) {
      const { containerStyle, wrapperStyle, ...timeProps } = this.props;
      if (this.props.renderTime) {
        return this.props.renderTime(timeProps);
      }
      return (
        <Light style={styles.time}>
          {moment(this.props.currentMessage.createdAt).format("HH:mm")}
        </Light>
      );
    }
    return null;
  }

  renderCustomView() {
    if (this.props.renderCustomView) {
      return this.props.renderCustomView(this.props);
    }
    return null;
  }

  render() {
    const messageHeader = (
      <View style={styles.headerView}>
        {this.renderTime()}
        {this.renderTicks()}
      </View>
    );

    return (
      <View
        style={[
          styles.container,
          this.props.containerStyle,
          {
            alignItems:
              this.props.currentMessage.user._id == 1
                ? "flex-start"
                : "flex-end"
          }
        ]}
      >
        <TouchableOpacity
          onLongPress={this.onLongPress}
          accessibilityTraits="text"
          {...this.props.touchableProps}
        >
          <View style={[styles.wrapper, this.props.wrapperStyle]}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              {this.renderMessageImage()}
              {this.renderMessageText()}
              {messageHeader}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

// Note: Everything is forced to be "left" positioned with this component.
// The "right" position is only used in the default Bubble.
const styles = StyleSheet.create({
  standardFont: {
    fontSize: 15
  },
  slackMessageText: {
    marginLeft: 0,
    marginRight: 0
  },
  container: {
    flex: 1
  },
  wrapper: {
    marginRight: 10,
    minHeight: 20,
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    padding: 5,
    maxWidth: 300,
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 5
      }
    })
  },
  username: {
    fontWeight: "bold"
  },
  timeContainer: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  },
  headerItem: {
    marginRight: 10
  },
  headerView: {
    // Try to align it better with the avatar on Android.
    marginTop: Platform.OS === "android" ? -2 : 0,
    flexDirection: "row",
    alignItems: "baseline"
  },
  time: {
    fontSize: 10,
    textAlign: "left",
    color: "#707070"
  },
  /* eslint-disable react-native/no-color-literals */
  tick: {
    backgroundColor: "transparent",
    color: "white"
  },
  /* eslint-enable react-native/no-color-literals */
  tickView: {
    flexDirection: "row"
  },
  slackImage: {
    borderRadius: 3,
    marginLeft: 0,
    marginRight: 0
  }
});

Bubble.contextTypes = {
  actionSheet: PropTypes.func
};

Bubble.defaultProps = {
  touchableProps: {},
  onLongPress: null,
  renderMessageImage: null,
  renderMessageText: null,
  renderCustomView: null,
  renderTime: null,
  currentMessage: {
    text: null,
    createdAt: null,
    image: null
  },
  nextMessage: {},
  previousMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  tickStyle: {},
  containerToNextStyle: {},
  containerToPreviousStyle: {}
};

Bubble.propTypes = {
  touchableProps: PropTypes.object,
  onLongPress: PropTypes.func,
  renderMessageImage: PropTypes.func,
  renderMessageText: PropTypes.func,
  renderCustomView: PropTypes.func,
  renderUsername: PropTypes.func,
  renderTime: PropTypes.func,
  renderTicks: PropTypes.func,
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  user: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  wrapperStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  messageTextStyle: Text.propTypes.style,
  usernameStyle: Text.propTypes.style,
  tickStyle: Text.propTypes.style,
  containerToNextStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  containerToPreviousStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  })
};
