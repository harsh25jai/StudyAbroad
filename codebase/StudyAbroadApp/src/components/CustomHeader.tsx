import React, { FC, ReactNode } from 'react';
import { StyleSheet, Text, StyleProp, TextStyle, NativeSyntheticEvent, NativeTouchEvent, View, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';
import { colors, fontSize, fonts } from '../core';

interface CustomHeaderProps {
    title?: string;
    iconName?: IconSource;
    onPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
    titleOnPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
    iconOnPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
    accessibilityLabel?: string;
    disabled?: boolean;

    /**
     * Used to locate this header in end-to-end tests.
     */
    testID?: string;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    iconStyle?: StyleProp<TextStyle>;
    width?: number | string;
    dark?: boolean;
    hideIcon?: boolean;
    right?: ReactNode;
    leftStyle?: StyleProp<ViewStyle>;
}

const CustomHeader: FC<CustomHeaderProps> = ({ title, titleStyle, titleOnPress, iconName = 'chevron-left', iconStyle, iconOnPress, accessibilityLabel, disabled, testID, style, dark, hideIcon = false, right, leftStyle, ...props }) => {
    const textColor = colors.app_color;
    return (
        <View style={[styles.headerContainer, style]} accessibilityLabel={accessibilityLabel} testID={testID} {...props}>
            <View style={[{ flexDirection: 'row', alignItems: 'center' }, leftStyle]}>
                {!hideIcon &&
                    <IconButton
                        icon={iconName}
                        iconColor={textColor}
                        style={[{ margin: 0 }, iconStyle]}
                        onPress={iconOnPress} />}
                <Text style={[styles.text, { color: textColor }, titleStyle]} onPress={titleOnPress}>{title}</Text>
            </View>
            {right}
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 50,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        padding: 20,
        borderRadius: 40,
        alignItems: 'center',
    },
    text: {
        fontSize: fontSize[24],
        color: colors.white,
        fontFamily: fonts?.Laila_Regular
    }
});

export default CustomHeader;