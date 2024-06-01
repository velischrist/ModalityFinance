import React, { useState } from 'react'
import Table from '@/components/ui/Table'
import Select from '@/components/ui/Select'

const { Tr, Th, Td, THead, TBody } = Table

type FinancialData = {
    item: string
    value: string
}

type DataStructure = {
    [key: string]: {
        [key: string]: FinancialData[]
    }
}

type CompanyData = {
    [key: string]: DataStructure
}

type Props = {
    companyId: string
}

const IncomeStatement: React.FC<Props> = ({ companyId }) => {
    const [reportingPeriod, setReportingPeriod] = useState<string>('Annual')
    const [periods, setPeriods] = useState<string[]>(['2022'])

    const data: CompanyData = {
        Apple: {
            Annual: {
                2022: [
                    { item: 'Revenue', value: '394.33B' },
                    { item: 'Cost of Revenue', value: '212.98B' },
                    { item: 'Gross Profit', value: '181.35B' },
                    { item: 'Operating Expenses', value: '47.69B' },
                    { item: 'Operating Income', value: '133.66B' },
                    { item: 'Net Income', value: '94.68B' },
                ],
                2021: [
                    { item: 'Revenue', value: '365.82B' },
                    { item: 'Cost of Revenue', value: '213.13B' },
                    { item: 'Gross Profit', value: '152.69B' },
                    { item: 'Operating Expenses', value: '41.60B' },
                    { item: 'Operating Income', value: '111.09B' },
                    { item: 'Net Income', value: '81.55B' },
                ],
            },
            Quarterly: {
                'Q1 2023': [
                    { item: 'Revenue', value: '111.44B' },
                    { item: 'Cost of Revenue', value: '60.14B' },
                    { item: 'Gross Profit', value: '51.30B' },
                    { item: 'Operating Expenses', value: '11.85B' },
                    { item: 'Operating Income', value: '39.45B' },
                    { item: 'Net Income', value: '28.76B' },
                ],
                'Q4 2022': [
                    { item: 'Revenue', value: '95.35B' },
                    { item: 'Cost of Revenue', value: '54.12B' },
                    { item: 'Gross Profit', value: '41.23B' },
                    { item: 'Operating Expenses', value: '10.50B' },
                    { item: 'Operating Income', value: '30.73B' },
                    { item: 'Net Income', value: '22.39B' },
                ],
            },
        },
        Microsoft: {
            Annual: {
                2022: [
                    { item: 'Revenue', value: '198.27B' },
                    { item: 'Cost of Revenue', value: '75.76B' },
                    { item: 'Gross Profit', value: '122.51B' },
                    { item: 'Operating Expenses', value: '52.20B' },
                    { item: 'Operating Income', value: '70.31B' },
                    { item: 'Net Income', value: '61.27B' },
                ],
                2021: [
                    { item: 'Revenue', value: '168.09B' },
                    { item: 'Cost of Revenue', value: '62.10B' },
                    { item: 'Gross Profit', value: '105.99B' },
                    { item: 'Operating Expenses', value: '44.05B' },
                    { item: 'Operating Income', value: '61.94B' },
                    { item: 'Net Income', value: '55.31B' },
                ],
            },
            Quarterly: {
                'Q1 2023': [
                    { item: 'Revenue', value: '50.12B' },
                    { item: 'Cost of Revenue', value: '19.54B' },
                    { item: 'Gross Profit', value: '30.58B' },
                    { item: 'Operating Expenses', value: '12.96B' },
                    { item: 'Operating Income', value: '17.62B' },
                    { item: 'Net Income', value: '16.04B' },
                ],
                'Q4 2022': [
                    { item: 'Revenue', value: '48.12B' },
                    { item: 'Cost of Revenue', value: '18.94B' },
                    { item: 'Gross Profit', value: '29.18B' },
                    { item: 'Operating Expenses', value: '12.50B' },
                    { item: 'Operating Income', value: '16.68B' },
                    { item: 'Net Income', value: '15.12B' },
                ],
            },
        },
    }

    const periodOptions = Object.keys(data[companyId][reportingPeriod]).map(
        (p) => ({ value: p, label: p }),
    )

    const handlePeriodChange = (selected: any) =>
        setPeriods(selected ? selected.map((s: any) => s.value) : [])
    const handleReportingPeriodChange = (selected: any) => {
        setReportingPeriod(selected.value)
        setPeriods([Object.keys(data[companyId][selected.value])[0]])
    }

    const reportingPeriodOptions = [
        { value: 'Annual', label: 'Annual' },
        { value: 'Quarterly', label: 'Quarterly' },
    ]

    const allItems = Array.from(
        new Set(
            Object.values(data[companyId][reportingPeriod])
                .flat()
                .map((item) => item.item),
        ),
    )

    return (
        <div>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                    <label>Reporting Period:</label>
                    <Select
                        value={reportingPeriodOptions.find(
                            (option) => option.value === reportingPeriod,
                        )}
                        onChange={handleReportingPeriodChange}
                        options={reportingPeriodOptions}
                    />
                </div>
                <div style={{ flex: 2 }}>
                    <label>Periods:</label>
                    <Select
                        isMulti
                        value={periodOptions.filter((option) =>
                            periods.includes(option.value),
                        )}
                        onChange={handlePeriodChange}
                        options={periodOptions}
                    />
                </div>
            </div>
            <Table compact className="w-full">
                <THead>
                    <Tr>
                        <Th></Th>
                        {periods.map((period) => (
                            <Th key={period}>{period}</Th>
                        ))}
                    </Tr>
                </THead>
                <TBody>
                    {allItems.map((item) => (
                        <Tr key={item}>
                            <Td>{item}</Td>
                            {periods.map((period) => {
                                const periodData = data[companyId][
                                    reportingPeriod
                                ][period].find((data) => data.item === item)
                                return (
                                    <Td key={period}>
                                        {periodData ? periodData.value : '-'}
                                    </Td>
                                )
                            })}
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}

export default IncomeStatement
