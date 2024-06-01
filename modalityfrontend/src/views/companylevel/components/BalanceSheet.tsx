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

const BalanceSheet: React.FC<Props> = ({ companyId }) => {
    const [reportingPeriod, setReportingPeriod] = useState<string>('Annual')
    const [periods, setPeriods] = useState<string[]>(['2022'])

    const data: CompanyData = {
        Apple: {
            Annual: {
                2022: [
                    { item: 'Total Assets', value: '351.00B' },
                    { item: 'Total Liabilities', value: '287.91B' },
                    { item: 'Shareholders Equity', value: '63.09B' },
                    { item: 'Cash and Cash Equivalents', value: '37.12B' },
                    { item: 'Total Current Assets', value: '135.39B' },
                    { item: 'Total Current Liabilities', value: '127.96B' },
                ],
                2021: [
                    { item: 'Total Assets', value: '323.89B' },
                    { item: 'Total Liabilities', value: '258.55B' },
                    { item: 'Shareholders Equity', value: '65.34B' },
                    { item: 'Cash and Cash Equivalents', value: '34.94B' },
                    { item: 'Total Current Assets', value: '130.63B' },
                    { item: 'Total Current Liabilities', value: '125.48B' },
                ],
            },
            Quarterly: {
                'Q1 2023': [
                    { item: 'Total Assets', value: '360.45B' },
                    { item: 'Total Liabilities', value: '295.23B' },
                    { item: 'Shareholders Equity', value: '65.22B' },
                    { item: 'Cash and Cash Equivalents', value: '38.56B' },
                    { item: 'Total Current Assets', value: '137.50B' },
                    { item: 'Total Current Liabilities', value: '130.12B' },
                ],
                'Q4 2022': [
                    { item: 'Total Assets', value: '350.11B' },
                    { item: 'Total Liabilities', value: '288.30B' },
                    { item: 'Shareholders Equity', value: '61.81B' },
                    { item: 'Cash and Cash Equivalents', value: '36.45B' },
                    { item: 'Total Current Assets', value: '134.78B' },
                    { item: 'Total Current Liabilities', value: '128.90B' },
                ],
            },
        },
        Microsoft: {
            Annual: {
                2022: [
                    { item: 'Total Assets', value: '364.84B' },
                    { item: 'Total Liabilities', value: '183.01B' },
                    { item: 'Shareholders Equity', value: '181.83B' },
                    { item: 'Cash and Cash Equivalents', value: '25.45B' },
                    { item: 'Total Current Assets', value: '169.20B' },
                    { item: 'Total Current Liabilities', value: '72.23B' },
                ],
                2021: [
                    { item: 'Total Assets', value: '333.78B' },
                    { item: 'Total Liabilities', value: '176.12B' },
                    { item: 'Shareholders Equity', value: '157.66B' },
                    { item: 'Cash and Cash Equivalents', value: '20.08B' },
                    { item: 'Total Current Assets', value: '155.45B' },
                    { item: 'Total Current Liabilities', value: '71.12B' },
                ],
            },
            Quarterly: {
                'Q1 2023': [
                    { item: 'Total Assets', value: '368.45B' },
                    { item: 'Total Liabilities', value: '184.12B' },
                    { item: 'Shareholders Equity', value: '184.33B' },
                    { item: 'Cash and Cash Equivalents', value: '26.56B' },
                    { item: 'Total Current Assets', value: '170.23B' },
                    { item: 'Total Current Liabilities', value: '73.45B' },
                ],
                'Q4 2022': [
                    { item: 'Total Assets', value: '360.12B' },
                    { item: 'Total Liabilities', value: '180.34B' },
                    { item: 'Shareholders Equity', value: '179.78B' },
                    { item: 'Cash and Cash Equivalents', value: '25.34B' },
                    { item: 'Total Current Assets', value: '168.45B' },
                    { item: 'Total Current Liabilities', value: '72.89B' },
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

export default BalanceSheet
