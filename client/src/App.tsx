import React from 'react'
import './App.css'
import {
    extendTheme,
    ChakraProvider,
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionPanel,
    AccordionIcon,
    Spacer,
    HStack,
    useRadioGroup,
    Flex,
    Container,
} from '@chakra-ui/react'

import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import ValueSlider from './components/ValueSlider'
import CustomRadio from './components/CustomRadio'
import DoughnutChart from './components/DoughnutChart'

import theme from './theme'
const defaultTheme = extendTheme(theme)

function App() {
    const formatAsGBP = (val: any) => '£' + val
    const formatAsPercent = (val: any) => val + '%'
    function formatAsMonths(val: any) {
        if (val === 1 || val === '1') {
            return '1 month'
        }
        return val + ' months'
    }
    function periodToMonths(val: any) {
        if (val === 'Months') {
            return 1
        } else if (val === 'Years') {
            return 12
        } else {
            return 120
        }
    }

    const durationPeriodOptions = ['Months', 'Years', 'Decades']
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'Years',
        onChange: handleDurationPeriodChange,
    })
    const group = getRootProps()

    const [initialDepositValue, setInitialDepositValue] = React.useState(100)
    const [monthlyDepositValue, setMonthlyDepositValue] = React.useState(5)
    const [maxMonthlyDepositValue, setMaxMonthlyDepositValue] = React.useState(10)
    const [stepMonthlyDepositValue, setStepMonthlyDepositValue] = React.useState(1)
    const [interestRateValue, setInterestRateValue] = React.useState(1)
    const [depositPeriodValue, setDepositPeriodValue] = React.useState(1)
    const [interestPeriodValue, setInterestPeriodValue] = React.useState(1)
    const [durationValue, setDurationValue] = React.useState(1)
    const [durationPeriodValue, setDurationPeriodValue] = React.useState('Years')

    const [xAxis, setXAxis] = React.useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    const [yAxis, setYAxis] = React.useState([
        100, 106, 113, 121, 131, 141, 153, 167, 182, 200, 219, 240, 264,
    ])
    const [compData, setCompData] = React.useState([160, 19])
    const backgrounds = ['red', 'blue']

    function setData({
        isa = initialDepositValue,
        d = monthlyDepositValue,
        ir = interestRateValue,
        dp = depositPeriodValue,
        irp = interestPeriodValue,
        dur = durationValue * periodToMonths(durationPeriodValue),
    }) {
        var url =
            'http://localhost:3001/sot/' +
            isa.toString() +
            '/' +
            d.toString() +
            '/' +
            dp.toString() +
            '/' +
            ir.toString() +
            '/' +
            irp.toString() +
            '/' +
            dur.toString()
        console.log(url)
        fetch(url).then((response) => {
            return response
                .json()
                .then((data) => {
                    setXAxis(data['x'])
                    setYAxis(data['y'])
                    setCompData(data['pie'])
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    }

    function handleInitialDepositChange(value: any) {
        setInitialDepositValue(value)
        setMaxMonthlyDepositValue(value * 0.3)
        setStepMonthlyDepositValue(value * 0.01)
        setData({ isa: value })
    }
    function handleMonthlyDepositChange(value: any) {
        setMonthlyDepositValue(value)
        setData({ d: value })
    }
    function handleInterestRateChange(value: any) {
        setInterestRateValue(value)
        setData({ ir: value })
    }
    function handleDepositPeriodChange(value: any) {
        setDepositPeriodValue(value)
        setData({ dp: value })
    }
    function handleInterestPeriodChange(value: any) {
        setInterestPeriodValue(value)
        setData({ irp: value })
    }
    function handleDurationPeriodChange(value: any) {
        setDurationPeriodValue(value)
        handleDurationChange(durationValue, value)
    }
    function handleDurationChange(value: any, period = durationPeriodValue) {
        console.log(period)
        console.log(value)
        var toSend = value * periodToMonths(period)
        setDurationValue(value)
        setData({ dur: toSend })
    }
    return (
        <ChakraProvider theme={defaultTheme}>
            <DefaultLayout>
                <Container pt={6} marginX={'22%'}>
                    <Flex>
                        <LineChart
                            title="Savings Over time"
                            xAxisData={xAxis}
                            yAxisData={yAxis}
                            xLabel="Months"
                            yLabel="Amount"
                        />
                        <Spacer />
                        <DoughnutChart
                            title="Deposits vs Interest"
                            data={compData}
                            backgroundColor={backgrounds}
                            labels={['Deposits', 'Interest']}
                        />
                    </Flex>
                </Container>

                <Container maxW="container.lg" pt={6} maxH={'60vh'} overflowY={'scroll'}>
                    <ValueSlider
                        label="Initial Deposit"
                        helperText="The starting amount in your savings"
                        value={initialDepositValue}
                        formatter={formatAsGBP}
                        min={0}
                        max={100000}
                        step={100}
                        precision={0}
                        changeHandler={handleInitialDepositChange}
                        marginTop={5}
                        sliderWidth={'590px'}
                        pickerWidth={'110px'}
                        radio={<></>}
                    />

                    <ValueSlider
                        label="Regular Deposits"
                        helperText="The amount you will regularly add to your savings"
                        value={monthlyDepositValue}
                        formatter={formatAsGBP}
                        min={0}
                        max={maxMonthlyDepositValue}
                        step={stepMonthlyDepositValue}
                        precision={0}
                        changeHandler={handleMonthlyDepositChange}
                        marginTop={5}
                        sliderWidth={'590px'}
                        pickerWidth={'110px'}
                        radio={<></>}
                    />

                    <ValueSlider
                        label="Interest rate"
                        helperText="The rate at which interest is given on your savings at regular intervals"
                        value={interestRateValue}
                        formatter={formatAsPercent}
                        min={0}
                        max={50}
                        step={0.1}
                        precision={1}
                        changeHandler={handleInterestRateChange}
                        marginTop={5}
                        sliderWidth={'590px'}
                        pickerWidth={'110px'}
                        radio={<></>}
                    />

                    <Accordion allowToggle borderColor={'white'} marginTop={5} marginBottom={20}>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1">Advanced</Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel padding={0}>
                                <ValueSlider
                                    label="Deposit Period"
                                    helperText="The period with which you make regular deposits"
                                    value={depositPeriodValue}
                                    formatter={formatAsMonths}
                                    min={0}
                                    max={durationValue * periodToMonths(durationPeriodValue)}
                                    step={1}
                                    precision={0}
                                    changeHandler={handleDepositPeriodChange}
                                    marginTop={1}
                                    sliderWidth={'590px'}
                                    pickerWidth={'110px'}
                                    radio={<></>}
                                />
                                <ValueSlider
                                    label="Interest Rate Period"
                                    helperText="The period with which you earn interest"
                                    value={interestPeriodValue}
                                    formatter={formatAsMonths}
                                    min={0}
                                    max={durationValue * periodToMonths(durationPeriodValue)}
                                    step={1}
                                    precision={0}
                                    changeHandler={handleInterestPeriodChange}
                                    marginTop={5}
                                    sliderWidth={'590px'}
                                    pickerWidth={'110px'}
                                    radio={<></>}
                                />
                                <ValueSlider
                                    label="Duration"
                                    helperText="The period over which you earn savings"
                                    value={durationValue}
                                    formatter={(val: any) => val}
                                    min={0}
                                    max={100}
                                    step={1}
                                    precision={0}
                                    changeHandler={(value: any) => handleDurationChange(value)}
                                    marginTop={5}
                                    sliderWidth={'590px'}
                                    pickerWidth={'80px'}
                                    radio={
                                        <>
                                            <Spacer />
                                            <HStack {...group}>
                                                {durationPeriodOptions.map((value) => {
                                                    const radio = getRadioProps({ value })
                                                    return (
                                                        <CustomRadio key={value} {...radio}>
                                                            {value}
                                                        </CustomRadio>
                                                    )
                                                })}
                                            </HStack>
                                        </>
                                    }
                                />
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Container>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
