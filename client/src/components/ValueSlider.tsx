import React from 'react'

import { FormControl } from '@chakra-ui/react'
import { FormLabel } from '@chakra-ui/react'
import { FormHelperText } from '@chakra-ui/react'

import { Flex } from '@chakra-ui/react'
import { Spacer } from '@chakra-ui/react'

import { NumberInput } from '@chakra-ui/react'
import { NumberInputField } from '@chakra-ui/react'
import { NumberInputStepper } from '@chakra-ui/react'
import { NumberIncrementStepper } from '@chakra-ui/react'
import { NumberDecrementStepper } from '@chakra-ui/react'

import { Slider } from "@chakra-ui/react"
import { SliderTrack } from "@chakra-ui/react"
import { SliderFilledTrack } from "@chakra-ui/react"
import { SliderThumb } from "@chakra-ui/react"

type Props = {
    label: string
    helperText: string
    value: number
    formatter: (val: any) => string
    min: number
    max: number
    step: number
    precision: number
    changeHandler: any
    marginTop: any
    sliderWidth: any
    pickerWidth: any
    radio: any
}

const ValueSlider = ({ label, helperText, value, formatter, min, max, step, precision, changeHandler, marginTop, sliderWidth, pickerWidth, radio }: Props) => {
    var id = label.toLowerCase().split(' ').join('_')


    return (
        <FormControl mt={marginTop}>
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <Flex>
                <NumberInput
                    size='sm'
                    maxW={pickerWidth}
                    value={formatter(value)}
                    onChange={changeHandler}
                    clampValueOnBlur={true}
                    max={max}
                    min={min}
                    step={step}
                    precision={precision}>
                    <NumberInputField />
                    <NumberInputStepper height={'2rem'}>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                {radio}

                <Spacer />
                <Slider
                    id={id}
                    w={sliderWidth}
                    focusThumbOnChange={false}
                    value={value}
                    onChange={changeHandler}
                    max={max}
                    min={min}
                    step={step}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb boxSize='20px' />
                </Slider>
            </Flex>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl >
    )
}

export default ValueSlider
