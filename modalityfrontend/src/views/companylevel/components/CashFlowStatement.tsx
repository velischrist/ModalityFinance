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

const CashFlowStatement: React.FC<Props> = ({ companyId }) => {
    const [reportingPeriod, setReportingPeriod] = useState<string>('Annual')
    const [periods, setPeriods] = useState<string[]>(['2022'])

    const data: CompanyData = {
        Apple: {
            Annual: {
                2022: [
                    {
                        item: 'Net Cash from Operating Activities',
                        value: '104.04B',
                    },
                    {
                        item: 'Net Cash used in Investing Activities',
                        value: '-46.61B',
                    },
                    {
                        item: 'Net Cash used in Financing Activities',
                        value: '-93.22B',
                    },
                    { item: 'Net Change in Cash', value: '-35.79B' },
                    { item: 'Cash at Beginning of Period', value: '37.12B' },
                    { item: 'Cash at End of Period', value: '1.33B' },
                ],
                2021: [
                    {
                        item: 'Net Cash from Operating Activities',
                        value: '99.80B',
                    },
                    {
                        item: 'Net Cash used in Investing Activities',
                        value: '-41.24B',
                    },
                    {
                        item: 'Net Cash used in Financing Activities',
                        value: '-86.60B',
                    },
                    { item: 'Net Change in Cash', value: '-28.04B' },
                    { item: 'Cash at Beginning of Period', value: '34.94B' },
                    { item: 'Cash at End of Period', value: '6.90B' },
                ],
            },
            Quarterly: {
                'Q1 2023': [
                    {
                        item: 'Net Cash from Operating Activities',
                        value: '28.56B',
                    },
                    {
                        item: 'Net Cash used in Investing Activities',
                        value: '-12.78B',
                    },
                    {
                        item: 'Net Cash used in Financing Activities',
                        value: '-25.67B',
                    },
                    { item: 'Net Change in Cash', value: '-9.89B' },
                    { item: 'Cash at Beginning of Period', value: '38.56B' },
                    { item: 'Cash at End of Period', value: '28.67B' },
                ],
                'Q4 2022': [
                    {
                        item: 'Net Cash from Operating Activities',
                        value: '25.34B',
                    },
                    {
                        item: 'Net Cash used in Investing Activities',
                        value: '-11.23B',
                    },
                    {
                        item: 'Net Cash used in Financing Activities',
                        value: '-22.45B',
                    },
                    { item: 'Net Change in Cash', value: '-8.34B' },
                    { item: 'Cash at Beginning of Period', value: '36.45B' },
                    { item: 'Cash at End of Period', value: '28.11B' },
                ],
            },
        },
        Microsoft: {
            Annual: {
                2022: [
                    {
                        item: 'Net Cash from Operating Activities',
                        value: '89.04B',
                    },
                    {
                        item: 'Net Cash used in Investing Activities',
                        value: '-24.61B',
                    },
                    {
                        item: 'Net Cash used in Financing Activities',
                        value: '-49.22B',
                    },
                    { item: 'Net Change in Cash', value: '15.21B' },
                    { item: 'Cash at Beginning of Period', value: '20.04B' },
                    { item: 'Cash at End of Period', value: '35.25B' },
                ],
                2021: [
                    {
                        item: 'Net Cash from Operating Activities',
                        value: '81.10B',
                    },
                    {
                        item: 'Net Cash used in Investing Activities',
                        value: '-21.14B',
                    },
                    {
                        item: 'Net Cash used in Financing Activities',
                        value: '-45.60B',
                    },
                    { item: 'Net Change in Cash', value: '14.36B' },
                    { item: 'Cash at Beginning of Period', value: '19.50B' },
                    { item: 'Cash at End of Period', value: '33.86B' },
                ],
            },
            Quarterly: {
                'Q1 2023': [
                    {
                        item: 'Net Cash from Operating Activities',
                        value: '25.12B',
                    },
                    {
                        item: 'Net Cash used in Investing Activities',
                        value: '-8.56B',
                    },
                    {
                        item: 'Net Cash used in Financing Activities',
                        value: '-12.34B',
                    },
                    { item: 'Net Change in Cash', value: '4.22B' },
                    { item: 'Cash at Beginning of Period', value: '28.10B' },
                    { item: 'Cash at End of Period', value: '32.32B' },
                ],
                'Q4 2022': [
                    {
                        item: 'Net Cash from Operating Activities',
                        value: '23.45B',
                    },
                    {
                        item: 'Net Cash used in Investing Activities',
                        value: '-7.89B',
                    },
                    {
                        item: 'Net Cash used in Financing Activities',
                        value: '-11.23B',
                    },
                    { item: 'Net Change in Cash', value: '4.33B' },
                    { item: 'Cash at Beginning of Period', value: '25.34B' },
                    { item: 'Cash at End of Period', value: '29.67B' },
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

export default CashFlowStatement
