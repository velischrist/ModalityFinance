import { useMemo, useState, useEffect, MouseEvent, ChangeEvent } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import InputGroup from '@/components/ui/InputGroup'
import Dialog from '@/components/ui/Dialog'
import { motion } from 'framer-motion'
import { HiChevronRight, HiChevronDown } from 'react-icons/hi'
import { RiAiGenerate } from 'react-icons/ri'
import Table from '@/components/ui/Table'
import { FiRefreshCw } from 'react-icons/fi'
import { Tooltip } from '@/components/ui'
import Select from '@/components/ui/Select'

import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    flexRender,
    ColumnDef,
    CellContext,
    RowData,
} from '@tanstack/react-table'

const { Tr, Th, Td, THead, TBody } = Table

type FinancialRow = {
    description: string
    q4_2023?: string
    q4_2022?: string
    fy_2023?: string
    fy_2022?: string
    sep_30_2023?: string
    sep_24_2022?: string
    standardizedValue?: string
    subRows?: FinancialRow[]
}

// Define standardized values for each statement type
const incomeStatementStandardizedValues = [
    'Net Sales',
    'Cost of Sales',
    'Gross Margin',
]
const balanceSheetStandardizedValues = [
    'Assets',
    'Liabilities',
    'Shareholders’ Equity',
]
const cashFlowStatementStandardizedValues = [
    'Operating Activities',
    'Investing Activities',
    'Financing Activities',
]

// Extend the TableMeta interface to include updateData
declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (
            description: string,
            columnId: string,
            value: string,
        ) => void
    }
}

// Define the EditableCell component
const EditableCell = ({
    getValue,
    row: { original },
    column: { id },
    table,
}: CellContext<FinancialRow, unknown>) => {
    const initialValue = getValue() as string
    const [value, setValue] = useState(initialValue)
    const [editing, setEditing] = useState(false)

    const onBlur = () => {
        table.options.meta?.updateData(original.description, id, value)
        setEditing(false)
    }

    const onClick = () => setEditing(true)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return editing ? (
        <Input
            className="border-transparent bg-transparent hover:border-gray-300 focus:bg-white"
            size="sm"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
        />
    ) : (
        <div onClick={onClick}>{value}</div>
    )
}

const StandardizedValueCell = ({
    getValue,
    row: { original },
    column: { id },
    table,
    standardizedValues,
}: CellContext<FinancialRow, unknown> & { standardizedValues: string[] }) => {
    const initialValue = getValue() as string
    const [value, setValue] = useState(initialValue)

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value
        setValue(newValue)
        table.options.meta?.updateData(original.description, id, newValue)
    }

    return (
        <Select value={value} onChange={onChange}>
            {standardizedValues.map((val) => (
                <option key={val} value={val}>
                    {val}
                </option>
            ))}
        </Select>
    )
}

const defaultColumn: Partial<ColumnDef<FinancialRow>> = {
    cell: EditableCell,
}

// Sample data
const incomeStatementData: FinancialRow[] = [
    {
        description: 'Net sales',
        q4_2023: '89,498',
        q4_2022: '90,146',
        fy_2023: '383,285',
        fy_2022: '394,328',
        subRows: [
            {
                description: 'Products',
                q4_2023: '67,184',
                q4_2022: '70,958',
                fy_2023: '298,085',
                fy_2022: '316,199',
            },
            {
                description: 'Services',
                q4_2023: '22,314',
                q4_2022: '19,188',
                fy_2023: '85,200',
                fy_2022: '78,129',
            },
        ],
    },
    {
        description: 'Cost of sales',
        q4_2023: '49,071',
        q4_2022: '52,051',
        fy_2023: '214,137',
        fy_2022: '223,546',
        subRows: [
            {
                description: 'Products (cost)',
                q4_2023: '42,586',
                q4_2022: '46,387',
                fy_2023: '189,282',
                fy_2022: '201,471',
            },
            {
                description: 'Services (cost)',
                q4_2023: '6,485',
                q4_2022: '5,664',
                fy_2023: '24,855',
                fy_2022: '22,075',
            },
        ],
    },
    {
        description: 'Gross margin',
        q4_2023: '40,427',
        q4_2022: '38,095',
        fy_2023: '169,148',
        fy_2022: '170,782',
    },
    {
        description: 'Operating expenses',
        q4_2023: '',
        q4_2022: '',
        fy_2023: '',
        fy_2022: '',
        subRows: [
            {
                description: 'Research and development',
                q4_2023: '7,307',
                q4_2022: '6,761',
                fy_2023: '29,915',
                fy_2022: '26,251',
            },
            {
                description: 'Selling, general and administrative',
                q4_2023: '6,151',
                q4_2022: '6,440',
                fy_2023: '24,932',
                fy_2022: '25,094',
            },
        ],
    },
    {
        description: 'Operating income',
        q4_2023: '26,969',
        q4_2022: '24,894',
        fy_2023: '114,301',
        fy_2022: '119,437',
    },
    {
        description: 'Other income/(expense), net',
        q4_2023: '29',
        q4_2022: '-237',
        fy_2023: '-565',
        fy_2022: '-334',
    },
    {
        description: 'Income before provision for income taxes',
        q4_2023: '26,998',
        q4_2022: '24,657',
        fy_2023: '113,736',
        fy_2022: '119,103',
    },
    {
        description: 'Provision for income taxes',
        q4_2023: '4,042',
        q4_2022: '3,936',
        fy_2023: '16,741',
        fy_2022: '19,300',
    },
    {
        description: 'Net income',
        q4_2023: '22,956',
        q4_2022: '20,721',
        fy_2023: '96,995',
        fy_2022: '99,803',
    },
    {
        description: 'Earnings per share',
        q4_2023: '',
        q4_2022: '',
        fy_2023: '',
        fy_2022: '',
        subRows: [
            {
                description: 'Basic',
                q4_2023: '1.47',
                q4_2022: '1.29',
                fy_2023: '6.16',
                fy_2022: '6.15',
            },
            {
                description: 'Diluted',
                q4_2023: '1.46',
                q4_2022: '1.29',
                fy_2023: '6.13',
                fy_2022: '6.11',
            },
        ],
    },
    {
        description: 'Shares used in computing earnings per share',
        q4_2023: '',
        q4_2022: '',
        fy_2023: '',
        fy_2022: '',
        subRows: [
            {
                description: 'Basic',
                q4_2023: '15,599,434',
                q4_2022: '16,030,382',
                fy_2023: '15,744,231',
                fy_2022: '16,215,963',
            },
            {
                description: 'Diluted',
                q4_2023: '15,672,400',
                q4_2022: '16,118,465',
                fy_2023: '15,812,547',
                fy_2022: '16,325,819',
            },
        ],
    },
]

const balanceSheetData: FinancialRow[] = [
    {
        description: 'ASSETS',
        sep_30_2023: '',
        sep_24_2022: '',
        subRows: [
            {
                description: 'Current assets',
                sep_30_2023: '',
                sep_24_2022: '',
                subRows: [
                    {
                        description: 'Cash and cash equivalents',
                        sep_30_2023: '29,965',
                        sep_24_2022: '23,646',
                    },
                    {
                        description: 'Marketable securities',
                        sep_30_2023: '31,590',
                        sep_24_2022: '24,658',
                    },
                    {
                        description: 'Accounts receivable, net',
                        sep_30_2023: '29,508',
                        sep_24_2022: '28,184',
                    },
                    {
                        description: 'Vendor non-trade receivables',
                        sep_30_2023: '31,477',
                        sep_24_2022: '32,748',
                    },
                    {
                        description: 'Inventories',
                        sep_30_2023: '6,331',
                        sep_24_2022: '4,946',
                    },
                    {
                        description: 'Other current assets',
                        sep_30_2023: '14,695',
                        sep_24_2022: '21,223',
                    },
                ],
            },
            {
                description: 'Total current assets',
                sep_30_2023: '143,566',
                sep_24_2022: '135,405',
            },
            {
                description: 'Non-current assets',
                sep_30_2023: '',
                sep_24_2022: '',
                subRows: [
                    {
                        description: 'Marketable securities',
                        sep_30_2023: '100,544',
                        sep_24_2022: '120,805',
                    },
                    {
                        description: 'Property, plant and equipment, net',
                        sep_30_2023: '43,715',
                        sep_24_2022: '42,117',
                    },
                    {
                        description: 'Other non-current assets',
                        sep_30_2023: '64,758',
                        sep_24_2022: '54,428',
                    },
                ],
            },
            {
                description: 'Total non-current assets',
                sep_30_2023: '209,017',
                sep_24_2022: '217,350',
            },
            {
                description: 'Total assets',
                sep_30_2023: '352,583',
                sep_24_2022: '352,755',
            },
        ],
    },
    {
        description: 'LIABILITIES AND SHAREHOLDERS’ EQUITY',
        sep_30_2023: '',
        sep_24_2022: '',
        subRows: [
            {
                description: 'Current liabilities',
                sep_30_2023: '',
                sep_24_2022: '',
                subRows: [
                    {
                        description: 'Accounts payable',
                        sep_30_2023: '62,611',
                        sep_24_2022: '64,115',
                    },
                    {
                        description: 'Other current liabilities',
                        sep_30_2023: '58,829',
                        sep_24_2022: '60,845',
                    },
                    {
                        description: 'Deferred revenue',
                        sep_30_2023: '8,061',
                        sep_24_2022: '7,912',
                    },
                    {
                        description: 'Commercial paper',
                        sep_30_2023: '5,985',
                        sep_24_2022: '9,982',
                    },
                    {
                        description: 'Term debt',
                        sep_30_2023: '9,822',
                        sep_24_2022: '11,128',
                    },
                ],
            },
            {
                description: 'Total current liabilities',
                sep_30_2023: '145,308',
                sep_24_2022: '153,982',
            },
            {
                description: 'Non-current liabilities',
                sep_30_2023: '',
                sep_24_2022: '',
                subRows: [
                    {
                        description: 'Term debt',
                        sep_30_2023: '95,281',
                        sep_24_2022: '98,959',
                    },
                    {
                        description: 'Other non-current liabilities',
                        sep_30_2023: '49,848',
                        sep_24_2022: '49,142',
                    },
                ],
            },
            {
                description: 'Total non-current liabilities',
                sep_30_2023: '145,129',
                sep_24_2022: '148,101',
            },
            {
                description: 'Total liabilities',
                sep_30_2023: '290,437',
                sep_24_2022: '302,083',
            },
            {
                description: 'Shareholders’ equity',
                sep_30_2023: '',
                sep_24_2022: '',
                subRows: [
                    {
                        description:
                            'Common stock and additional paid-in capital',
                        sep_30_2023: '73,812',
                        sep_24_2022: '64,849',
                    },
                    {
                        description: 'Accumulated deficit',
                        sep_30_2023: '-214',
                        sep_24_2022: '-3,068',
                    },
                    {
                        description: 'Accumulated other comprehensive loss',
                        sep_30_2023: '-11,452',
                        sep_24_2022: '-11,109',
                    },
                ],
            },
            {
                description: 'Total shareholders’ equity',
                sep_30_2023: '62,146',
                sep_24_2022: '50,672',
            },
            {
                description: 'Total liabilities and shareholders’ equity',
                sep_30_2023: '352,583',
                sep_24_2022: '352,755',
            },
        ],
    },
]

const cashFlowStatementData: FinancialRow[] = [
    {
        description:
            'Cash, cash equivalents and restricted cash, beginning balances',
        fy_2023: '24,977',
        fy_2022: '35,929',
    },
    {
        description: 'Operating activities',
        fy_2023: '',
        fy_2022: '',
        subRows: [
            {
                description: 'Net income',
                fy_2023: '96,995',
                fy_2022: '99,803',
            },
            {
                description: 'Depreciation and amortization',
                fy_2023: '11,519',
                fy_2022: '11,104',
            },
            {
                description: 'Deferred income tax expense/(benefit)',
                fy_2023: '75',
                fy_2022: '-2,874',
            },
            {
                description: 'Changes in operating assets and liabilities',
                fy_2023: '',
                fy_2022: '',
                subRows: [
                    {
                        description: 'Accounts receivable, net',
                        fy_2023: '-1,324',
                        fy_2022: '122',
                    },
                    {
                        description: 'Inventories',
                        fy_2023: '-1,578',
                        fy_2022: '396',
                    },
                    {
                        description: 'Vendor non-trade receivables',
                        fy_2023: '1,271',
                        fy_2022: '-1,669',
                    },
                    {
                        description: 'Other current and non-current assets',
                        fy_2023: '3,789',
                        fy_2022: '1,724',
                    },
                ],
            },
        ],
    },
    {
        description: 'Investing activities',
        fy_2023: '',
        fy_2022: '',
        subRows: [
            {
                description: 'Purchases of marketable securities',
                fy_2023: '-109,767',
                fy_2022: '-127,877',
            },
            {
                description:
                    'Proceeds from maturities of marketable securities',
                fy_2023: '121,418',
                fy_2022: '128,215',
            },
            {
                description:
                    'Payments for acquisition of property, plant, and equipment',
                fy_2023: '-11,059',
                fy_2022: '-11,086',
            },
        ],
    },
    {
        description: 'Financing activities',
        fy_2023: '',
        fy_2022: '',
        subRows: [
            {
                description: 'Proceeds from issuance of term debt',
                fy_2023: '10,000',
                fy_2022: '14,000',
            },
            {
                description: 'Repayments of term debt',
                fy_2023: '-8,750',
                fy_2022: '-9,000',
            },
            {
                description: 'Cash dividends paid',
                fy_2023: '-14,103',
                fy_2022: '-14,405',
            },
            {
                description:
                    'Payments for taxes related to net share settlement of equity awards',
                fy_2023: '-3,850',
                fy_2022: '-3,412',
            },
        ],
    },
    {
        description:
            'Cash, cash equivalents and restricted cash, ending balances',
        fy_2023: '27,299',
        fy_2022: '24,977',
    },
]

const FinancialTable: React.FC<{
    data: FinancialRow[]
    standardizedValues: string[]
}> = ({ data, standardizedValues }) => {
    const columns = useMemo<ColumnDef<FinancialRow>[]>(() => {
        const headers: ColumnDef<FinancialRow>[] = [
            {
                id: 'expander',
                header: ({ table }) => (
                    <div className="flex items-center gap-2">
                        <button
                            className="text-xl"
                            onClick={table.getToggleAllRowsExpandedHandler()}
                        >
                            {table.getIsAllRowsExpanded() ? (
                                <HiChevronDown />
                            ) : (
                                <HiChevronRight />
                            )}
                        </button>
                    </div>
                ),
                cell: ({ row, getValue }) => (
                    <>
                        {row.getCanExpand() ? (
                            <div className="flex items-center gap-2">
                                <button
                                    className="text-xl"
                                    onClick={row.getToggleExpandedHandler()}
                                >
                                    {row.getIsExpanded() ? (
                                        <HiChevronDown />
                                    ) : (
                                        <HiChevronRight />
                                    )}
                                </button>
                            </div>
                        ) : null}
                        {getValue()}
                    </>
                ),
            },
            { header: 'Description', accessorKey: 'description' },
        ]

        // Identify columns dynamically
        const sampleRow = data.find((row) => row)
        if (sampleRow) {
            Object.keys(sampleRow).forEach((key) => {
                if (
                    key !== 'description' &&
                    key !== 'subRows' &&
                    key !== 'standardizedValue' &&
                    data.some((row) => row[key as keyof FinancialRow])
                ) {
                    headers.push({
                        header: key.toUpperCase(),
                        accessorKey: key,
                    })
                }
            })
        }

        headers.push({
            header: 'Standardized Value',
            accessorKey: 'standardizedValue',
            cell: (props) => (
                <StandardizedValueCell
                    {...props}
                    standardizedValues={standardizedValues}
                />
            ),
        })

        return headers
    }, [data, standardizedValues])

    const [expanded, setExpanded] = useState({})
    const [tableData, setTableData] = useState(data)

    const table = useReactTable({
        data: tableData,
        columns,
        defaultColumn,
        state: {
            expanded,
        },
        onExpandedChange: setExpanded,
        getSubRows: (row) => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        meta: {
            updateData: (description, columnId, value) => {
                setTableData((old) =>
                    old.map((row) => {
                        if (row.description === description) {
                            return {
                                ...row,
                                [columnId]: value,
                            }
                        }
                        return row
                    }),
                )
            },
        },
    })

    return (
        <div className="overflow-x-auto">
            <Table compact>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <Th key={header.id} colSpan={header.colSpan}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr
                            key={row.id}
                            className={
                                row.depth === 0 ? 'bg-gray-50' : undefined
                            }
                        >
                            {row.getVisibleCells().map((cell) => (
                                <Td
                                    key={cell.id}
                                    className={
                                        cell.column.id === 'description'
                                            ? 'text-left'
                                            : 'text-center'
                                    }
                                    style={{
                                        paddingLeft:
                                            cell.column.id === 'description'
                                                ? `${row.depth * 20}px`
                                                : undefined,
                                    }}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}

const AIGenerateButton: React.FC<{ onGenerate: (input: string) => void }> = ({
    onGenerate,
}) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [generatedTable, setGeneratedTable] = useState<React.ReactNode>(null)

    const openDialog = () => {
        setDialogIsOpen(true)
    }

    const onDialogClose = () => {
        setDialogIsOpen(false)
        setGeneratedTable(null)
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const handleGenerate = () => {
        onGenerate(inputValue)
        setInputValue('')
        setGeneratedTable(
            <FinancialTable
                data={incomeStatementData}
                standardizedValues={incomeStatementStandardizedValues}
            />,
        )
    }

    const handleDiscard = () => {
        setGeneratedTable(null)
    }

    return (
        <>
            <div className="flex">
                <Tooltip title="Generate Table again">
                    {' '}
                    <FiRefreshCw className="text-xl text-indigo-600 cursor-pointer ml-4" />{' '}
                </Tooltip>

                <Tooltip title="Customize table">
                    {' '}
                    <RiAiGenerate
                        className="text-xl text-indigo-600 cursor-pointer ml-4"
                        onClick={(e) => {
                            e.stopPropagation()
                            openDialog()
                        }}
                    />
                </Tooltip>
            </div>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <div className="flex flex-col h-full justify-between">
                    <h5 className="mb-4">AI Commands</h5>
                    <div className="max-h-96 overflow-y-auto">
                        <div className="px-6 pb-6 w-full">
                            <InputGroup className="mb-4">
                                <Input
                                    placeholder="Ask virtual analyst to help"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                                <Button
                                    variant="solid"
                                    className="ml-2"
                                    onClick={handleGenerate}
                                >
                                    Generate
                                </Button>
                            </InputGroup>
                        </div>

                        <div className="px-6 pb-6 w-full overflow-auto">
                            <h5 className="mb-4">Preview Suggested Table</h5>
                            {generatedTable ? (
                                <>
                                    <div className="overflow-auto">
                                        {generatedTable}
                                    </div>
                                    <div className="text-right mt-4">
                                        <Button
                                            variant="solid"
                                            onClick={handleDiscard}
                                        >
                                            Discard
                                        </Button>
                                        <Button
                                            variant="solid"
                                            className="ml-2"
                                            onClick={onDialogClose}
                                        >
                                            Keep
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <p>No preview available</p>
                            )}
                        </div>
                    </div>{' '}
                </div>
            </Dialog>
        </>
    )
}

const ExtractionGrid: React.FC = () => {
    const handleGenerate = (input: string) => {
        console.log('User input:', input)
    }

    return (
        <div className="space-y-4">
            <CollapsibleCard
                title="Income Statement"
                onGenerate={handleGenerate}
            >
                <FinancialTable
                    data={incomeStatementData}
                    standardizedValues={incomeStatementStandardizedValues}
                />
            </CollapsibleCard>
            <CollapsibleCard title="Balance Sheet" onGenerate={handleGenerate}>
                <FinancialTable
                    data={balanceSheetData}
                    standardizedValues={balanceSheetStandardizedValues}
                />
            </CollapsibleCard>
            <CollapsibleCard
                title="Cash Flow Statement"
                onGenerate={handleGenerate}
            >
                <FinancialTable
                    data={cashFlowStatementData}
                    standardizedValues={cashFlowStatementStandardizedValues}
                />
            </CollapsibleCard>
        </div>
    )
}

const CollapsibleCard: React.FC<{
    title: string
    children: React.ReactNode
    onGenerate: (input: string) => void
}> = ({ title, children, onGenerate }) => {
    const [collapse, setCollapse] = useState(false)
    const onCollapse = () => {
        setCollapse(!collapse)
    }

    return (
        <div className="mb-4">
            <div className="flex items-center justify-between cursor-pointer">
                <h5 className="flex items-center gap-1" onClick={onCollapse}>
                    {collapse ? <HiChevronDown /> : <HiChevronRight />}
                    {title}
                </h5>
                <AIGenerateButton onGenerate={onGenerate} />
            </div>
            <motion.div
                initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                animate={{
                    opacity: collapse ? 1 : 0,
                    height: collapse ? 'auto' : 0,
                }}
                transition={{ duration: 0.15 }}
            >
                <div className="mt-2">
                    <Card>{children}</Card>
                </div>
            </motion.div>
        </div>
    )
}

const ExtractionTable1: React.FC = () => {
    return (
        <div className="mb-6">
            <ExtractionGrid />
        </div>
    )
}

export default ExtractionTable1
