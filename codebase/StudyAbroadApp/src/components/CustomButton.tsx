import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, Text, StyleProp, ImageStyle, TextStyle, NativeSyntheticEvent, NativeTouchEvent, DimensionValue } from 'react-native';
import { colors, fontSize, fonts } from '../core';

interface CustomButtonProps {
    title: string;
    onPress?: (event: NativeSyntheticEvent<NativeTouchEvent>) => void;
    accessibilityLabel?: string;
    disabled?: boolean;

    /**
     * Used to locate this button in end-to-end tests.
     */
    testID?: string;
    style?: StyleProp<ImageStyle>;
    titleStyle?: StyleProp<TextStyle>;
    width?: DimensionValue | undefined;
    dark?: boolean;
    secondary?: boolean;
    left?: React.ReactNode;
    right?: React.ReactNode;
    backgroundColor?: string;

}

const CustomButton: FC<CustomButtonProps> = ({ title, onPress, accessibilityLabel, disabled, testID, style, titleStyle, width = '80%', dark, backgroundColor, secondary, left, right, ...props }) => {

    const buttonBackgroundColor = dark ? colors.dark_gradient : (secondary ? colors.secondary_color : colors.app_color);
    const textColor = (dark || secondary) ? colors.black : colors.white;

    return (
        <TouchableOpacity
            style={[styles.button, { width: width, backgroundColor: buttonBackgroundColor }, style]}
            onPress={onPress} disabled={disabled}
            accessibilityLabel={accessibilityLabel}
            testID={testID}
            {...props}>
            {left}
            <Text style={[styles.text, { color: textColor }, titleStyle]}>
                {title}
            </Text>
            {right}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 20,
        borderRadius: 16,
        elevation: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: fontSize[16],
        fontFamily: fonts?.Quicksand_Bold,
        textTransform: 'uppercase'
    }
});

export default CustomButton;