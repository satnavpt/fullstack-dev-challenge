import React from "react"
import { Box, useRadio } from "@chakra-ui/react"

function CustomRadio(props: any) {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                boxShadow='md'
                _checked={{
                    bg: 'blue.600',
                    color: 'white',
                    borderColor: 'blue.600',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                px={3}
                py={1}
            >
                {props.children}
            </Box>
        </Box>
    )
}

export default CustomRadio