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

const ShareholdersEquity: React.FC<Props> = ({ companyId }) => {
    const [reportingPeriod, setReportingPeriod] = useState<string>('Annual')
    const [periods, setPeriods] = useState<string[]>(['2022'])

    const data: CompanyData = {
        Apple: {
            Annual: {
                2022: [
                    { item: 'Common Stock', value: '57.60B' },
                    { item: 'Retained Earnings', value: '14.17B' },
                    { item: 'Total Equity', value: '63.09B' },
                    { item: 'Treasury Stock', value: '-8.68B' },
                    {
                        item: 'Accumulated Other Comprehensive Income',
                        value: '1.00B',
                    },
                    { item: 'Total Shareholders Equity', value: '63.09B' },
                ],
                2021: [
                    { item: 'Common Stock', value: '50.00B' },
                    { item: 'Retained Earnings', value: '15.34B' },
                    { item: 'Total Equity', value: '65.34B' },
                    { item: 'Treasury Stock', value: '-7.50B' },
                    {
                        item: 'Accumulated Other Comprehensive Income',
                        value: '1.50B',
                    },
                    { item: 'Total Shareholders Equity', value: '65.34B' },
                ],
            },
            Quarterly: {
                'Q1 2023': [
                    { item: 'Common Stock', value: '58.34B' },
                    { item: 'Retained Earnings', value: '13.45B' },
                    { item: 'Total Equity', value: '65.22B' },
                    { item: 'Treasury Stock', value: '-8.45B' },
                    {
                        item: 'Accumulated Other Comprehensive Income',
                        value: '1.50B',
                    },
                    { item: 'Total Shareholders Equity', value: '65.22B' },
                ],
                'Q4 2022': [
                    { item: 'Common Stock', value: '57.12B' },
                    { item: 'Retained Earnings', value: '12.23B' },
                    { item: 'Total Equity', value: '61.81B' },
                    { item: 'Treasury Stock', value: '-8.00B' },
                    {
                        item: 'Accumulated Other Comprehensive Income',
                        value: '1.45B',
                    },
                    { item: 'Total Shareholders Equity', value: '61.81B' },
                ],
            },
        },
        Microsoft: {
            Annual: {
                2022: [
                    { item: 'Common Stock', value: '89.60B' },
                    { item: 'Retained Earnings', value: '21.17B' },
                    { item: 'Total Equity', value: '101.09B' },
                    { item: 'Treasury Stock', value: '-10.68B' },
                    {
                        item: 'Accumulated Other Comprehensive Income',
                        value: '2.00B',
                    },
                    { item: 'Total Shareholders Equity', value: '101.09B' },
                ],
                2021: [
                    { item: 'Common Stock', value: '75.00B' },
                    { item: 'Retained Earnings', value: '18.34B' },
                    { item: 'Total Equity', value: '95.34B' },
                    { item: 'Treasury Stock', value: '-9.50B' },
                    {
                        item: 'Accumulated Other Comprehensive Income',
                        value: '2.50B',
                    },
                    { item: 'Total Shareholders Equity', value: '95.34B' },
                ],
            },
            Quarterly: {
                'Q1 2023': [
                    { item: 'Common Stock', value: '90.34B' },
                    { item: 'Retained Earnings', value: '20.45B' },
                    { item: 'Total Equity', value: '110.22B' },
                    { item: 'Treasury Stock', value: '-11.45B' },
                    {
                        item: 'Accumulated Other Comprehensive Income',
                        value: '3.50B',
                    },
                    { item: 'Total Shareholders Equity', value: '110.22B' },
                ],
                'Q4 2022': [
                    { item: 'Common Stock', value: '88.12B' },
                    { item: 'Retained Earnings', value: '19.23B' },
                    { item: 'Total Equity', value: '107.81B' },
                    { item: 'Treasury Stock', value: '-10.00B' },
                    {
                        item: 'Accumulated Other Comprehensive Income',
                        value: '3.45B',
                    },
                    { item: 'Total Shareholders Equity', value: '107.81B' },
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

export default ShareholdersEquity
