import { View, TextInput } from "react-native"
import { useState } from "react"

const LoginTwo = () => {
    const [text, setText] = useState('');
    return (
        <View>
            <TextInput 
                value={text}
                placeholder="Input text"
                onChangeText={(text) => setText(text)}
            />
        </View>
    )
}

export default LoginTwo