import { View, StyleSheet } from "react-native";

const Indicator = ({ page }) => {
    return (
        <View style={styles.indicatorContainer}>
            <View
                style={[
                    styles.indicator,
                    page == 1 && styles.activeIndicator,
                ]}
            />
            <View
                style={[
                    styles.indicator,
                    page == 2 && styles.activeIndicator,
                ]}
            />
            <View
                style={[
                    styles.indicator,
                    page == 3 && styles.activeIndicator,
                ]}
            />
        </View>
    )
}

export default Indicator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    indicatorContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        marginHorizontal: 5,
    },
    activeIndicator: {
        backgroundColor: '#fff',
        width: 20,
    },
    nextButton: {
        marginTop: 40,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});