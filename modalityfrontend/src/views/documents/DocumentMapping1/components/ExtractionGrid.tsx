import { useMemo, useEffect, useState, useRef, useCallback } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { motion } from 'framer-motion'
import { HiChevronRight, HiChevronDown } from 'react-icons/hi'
import Table from '@/components/ui/Table'
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

// Define types for financial data rows
type FinancialRow = {
    id: number // Add unique identifier
    description: string
    q4_2023?: string
    q4_2022?: string
    fy_2023?: string
    fy_2022?: string
    sep_30_2023?: string
    sep_24_2022?: string
    subRows?: FinancialRow[]
}

// Extend the TableMeta interface to include updateData
declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (rowId: number, columnId: string, value: unknown) => void
    }
}

// Editable Cell Component
const EditableCell = ({
    getValue,
    row: { original },
    column: { id },
    table,
}: CellContext<FinancialRow, unknown>) => {
    const initialValue = getValue()
    const [value, setValue] = useState(initialValue)

    const onBlur = () => {
        table.options.meta?.updateData(original.id, id, value)
    }

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return (
        <Input
            className="border-transparent bg-transparent hover:border-gray-300 focus:bg-white"
            size="sm"
            value={value as string}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
        />
    )
}

const defaultColumn: Partial<ColumnDef<FinancialRow>> = {
    cell: EditableCell,
}

// Example data for each table
const incomeStatementData: FinancialRow[] = [
    {
        id: 1,
        description: 'Net sales',
        q4_2023: '89,498',
        q4_2022: '90,146',
        fy_2023: '383,285',
        fy_2022: '394,328',
        subRows: [
            {
                id: 2,
                description: 'Products',
                q4_2023: '67,184',
                q4_2022: '70,958',
                fy_2023: '298,085',
                fy_2022: '316,199',
            },
            {
                id: 3,
                description: 'Services',
                q4_2023: '22,314',
                q4_2022: '19,188',
                fy_2023: '85,200',
                fy_2022: '78,129',
            },
        ],
    },
    {
        id: 4,
        description: 'Cost of sales',
        q4_2023: '49,071',
        q4_2022: '52,051',
        fy_2023: '214,137',
        fy_2022: '223,546',
        subRows: [
            {
                id: 5,
                description: 'Products (cost)',
                q4_2023: '42,586',
                q4_2022: '46,387',
                fy_2023: '189,282',
                fy_2022: '201,471',
            },
            {
                id: 6,
                description: 'Services (cost)',
                q4_2023: '6,485',
                q4_2022: '5,664',
                fy_2023: '24,855',
                fy_2022: '22,075',
            },
        ],
    },
    {
        id: 7,
        description: 'Gross margin',
        q4_2023: '40,427',
        q4_2022: '38,095',
        fy_2023: '169,148',
        fy_2022: '170,782',
    },
    {
        id: 8,
        description: 'Operating expenses',
        q4_2023: '',
        q4_2022: '',
        fy_2023: '',
        fy_2022: '',
        subRows: [
            {
                id: 9,
                description: 'Research and development',
                q4_2023: '7,307',
                q4_2022: '6,761',
                fy_2023: '29,915',
                fy_2022: '26,251',
            },
            {
                id: 10,
                description: 'Selling, general and administrative',
                q4_2023: '6,151',
                q4_2022: '6,440',
                fy_2023: '24,932',
                fy_2022: '25,094',
            },
        ],
    },
    {
        id: 11,
        description: 'Operating income',
        q4_2023: '26,969',
        q4_2022: '24,894',
        fy_2023: '114,301',
        fy_2022: '119,437',
    },
    {
        id: 12,
        description: 'Other income/(expense), net',
        q4_2023: '29',
        q4_2022: '-237',
        fy_2023: '-565',
        fy_2022: '-334',
    },
    {
        id: 13,
        description: 'Income before provision for income taxes',
        q4_2023: '26,998',
        q4_2022: '24,657',
        fy_2023: '113,736',
        fy_2022: '119,103',
    },
    {
        id: 14,
        description: 'Provision for income taxes',
        q4_2023: '4,042',
        q4_2022: '3,936',
        fy_2023: '16,741',
        fy_2022: '19,300',
    },
    {
        id: 15,
        description: 'Net income',
        q4_2023: '22,956',
        q4_2022: '20,721',
        fy_2023: '96,995',
        fy_2022: '99,803',
    },
    {
        id: 16,
        description: 'Earnings per share',
        q4_2023: '',
        q4_2022: '',
        fy_2023: '',
        fy_2022: '',
        subRows: [
            {
                id: 17,
                description: 'Basic',
                q4_2023: '1.47',
                q4_2022: '1.29',
                fy_2023: '6.16',
                fy_2022: '6.15',
            },
            {
                id: 18,
                description: 'Diluted',
                q4_2023: '1.46',
                q4_2022: '1.29',
                fy_2023: '6.13',
                fy_2022: '6.11',
            },
        ],
    },
    {
        id: 19,
        description: 'Shares used in computing earnings per share',
        q4_2023: '',
        q4_2022: '',
        fy_2023: '',
        fy_2022: '',
        subRows: [
            {
                id: 20,
                description: 'Basic',
                q4_2023: '15,599,434',
                q4_2022: '16,030,382',
                fy_2023: '15,744,231',
                fy_2022: '16,215,963',
            },
            {
                id: 21,
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
        id: 1,
        description: 'ASSETS',
        sep_30_2023: '',
        sep_24_2022: '',
        subRows: [
            {
                id: 2,
                description: 'Current assets',
                sep_30_2023: '',
                sep_24_2022: '',
                subRows: [
                    {
                        id: 3,
                        description: 'Cash and cash equivalents',
                        sep_30_2023: '29,965',
                        sep_24_2022: '23,646',
                    },
                    {
                        id: 4,
                        description: 'Marketable securities',
                        sep_30_2023: '31,590',
                        sep_24_2022: '24,658',
                    },
                    {
                        id: 5,
                        description: 'Accounts receivable, net',
                        sep_30_2023: '29,508',
                        sep_24_2022: '28,184',
                    },
                    {
                        id: 6,
                        description: 'Vendor non-trade receivables',
                        sep_30_2023: '31,477',
                        sep_24_2022: '32,748',
                    },
                    {
                        id: 7,
                        description: 'Inventories',
                        sep_30_2023: '6,331',
                        sep_24_2022: '4,946',
                    },
                    {
                        id: 8,
                        description: 'Other current assets',
                        sep_30_2023: '14,695',
                        sep_24_2022: '21,223',
                    },
                ],
            },
            {
                id: 9,
                description: 'Total current assets',
                sep_30_2023: '143,566',
                sep_24_2022: '135,405',
            },
            {
                id: 10,
                description: 'Non-current assets',
                sep_30_2023: '',
                sep_24_2022: '',
                subRows: [
                    {
                        id: 11,
                        description: 'Marketable securities',
                        sep_30_2023: '100,544',
                        sep_24_2022: '120,805',
                    },
                    {
                        id: 12,
                        description: 'Property, plant and equipment, net',
                        sep_30_2023: '43,715',
                        sep_24_2022: '42,117',
                    },
                    {
                        id: 13,
                        description: 'Other non-current assets',
                        sep_30_2023: '64,758',
                        sep_24_2022: '54,428',
                    },
                ],
            },
            {
                id: 14,
                description: 'Total non-current assets',
                sep_30_2023: '209,017',
                sep_24_2022: '217,350',
            },
            {
                id: 15,
                description: 'Total assets',
                sep_30_2023: '352,583',
                sep_24_2022: '352,755',
            },
        ],
    },
    {
        id: 16,
        description: 'LIABILITIES AND SHAREHOLDERS’ EQUITY',
        sep_30_2023: '',
        sep_24_2022: '',
        subRows: [
            {
                id: 17,
                description: 'Current liabilities',
                sep_30_2023: '',
                sep_24_2022: '',
                subRows: [
                    {
                        id: 18,
                        description: 'Accounts payable',
                        sep_30_2023: '62,611',
                        sep_24_2022: '64,115',
                    },
                    {
                        id: 19,
                        description: 'Other current liabilities',
                        sep_30_2023: '58,829',
                        sep_24_2022: '60,845',
                    },
                    {
                        id: 20,
                        description: 'Deferred revenue',
                        sep_30_2023: '8,061',
                        sep_24_2022: '7,912',
                    },
                    {
                        id: 21,
                        description: 'Commercial paper',
                        sep_30_2023: '5,985',
                        sep_24_2022: '9,982',
                    },
                    {
                        id: 22,
                        description: 'Term debt',
                        sep_30_2023: '9,822',
                        sep_24_2022: '11,128',
                    },
                ],
            },
            {
                id: 23,
                description: 'Total current liabilities',
                sep_30_2023: '145,308',
                sep_24_2022: '153,982',
            },
            {
                id: 24,
                description: 'Non-current liabilities',
                sep_30_2023: '',
                sep_24_2022: '',
                subRows: [
                    {
                        id: 25,
                        description: 'Term debt',
                        sep_30_2023: '95,281',
                        sep_24_2022: '98,959',
                    },
                    {
                        id: 26,
                        description: 'Other non-current liabilities',
                        sep_30_2023: '49,848',
                        sep_24_2022: '49,142',
                    },
                ],
            },
            {
                id: 27,
                description: 'Total non-current liabilities',
                sep_30_2023: '145,129',
                sep_24_2022: '148,101',
            },
            {
                id: 28,
                description: 'Total liabilities',
                sep_30_2023: '290,437',
                sep_24_2022: '302,083',
            },
            {
                id: 29,
                description: 'Shareholders’ equity',
                sep_30_2023: '',
                sep_24_2022: '',
                subRows: [
                    {
                        id: 30,
                        description:
                            'Common stock and additional paid-in capital',
                        sep_30_2023: '73,812',
                        sep_24_2022: '64,849',
                    },
                    {
                        id: 31,
                        description: 'Accumulated deficit',
                        sep_30_2023: '-214',
                        sep_24_2022: '-3,068',
                    },
                    {
                        id: 32,
                        description: 'Accumulated other comprehensive loss',
                        sep_30_2023: '-11,452',
                        sep_24_2022: '-11,109',
                    },
                ],
            },
            {
                id: 33,
                description: 'Total shareholders’ equity',
                sep_30_2023: '62,146',
                sep_24_2022: '50,672',
            },
            {
                id: 34,
                description: 'Total liabilities and shareholders’ equity',
                sep_30_2023: '352,583',
                sep_24_2022: '352,755',
            },
        ],
    },
]

const cashFlowStatementData: FinancialRow[] = [
    {
        id: 1,
        description:
            'Cash, cash equivalents and restricted cash, beginning balances',
        fy_2023: '24,977',
        fy_2022: '35,929',
    },
    {
        id: 2,
        description: 'Operating activities',
        fy_2023: '',
        fy_2022: '',
        subRows: [
            {
                id: 3,
                description: 'Net income',
                fy_2023: '96,995',
                fy_2022: '99,803',
            },
            {
                id: 4,
                description: 'Depreciation and amortization',
                fy_2023: '11,519',
                fy_2022: '11,104',
            },
            // More data...
        ],
    },
    // More data...
]

const FinancialTable: React.FC<{ data: FinancialRow[] }> = ({ data }) => {
    const columns = useMemo<ColumnDef<FinancialRow>[]>(() => {
        const headers: ColumnDef<FinancialRow>[] = [
            {
                id: 'expander',
                header: ({ table }) => (
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
                ),
                cell: ({ row, getValue }) => (
                    <>
                        {row.getCanExpand() ? (
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
                    key !== 'id' &&
                    key !== 'description' &&
                    key !== 'subRows' &&
                    data.some((row) => row[key as keyof FinancialRow])
                ) {
                    headers.push({
                        header: key.toUpperCase(),
                        accessorKey: key,
                    })
                }
            })
        }

        return headers
    }, [data])

    const [expanded, setExpanded] = useState({})
    const [tableData, setTableData] = useState(data) // Renamed to avoid conflict

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
            updateData: (rowId, columnId, value) => {
                setTableData((old) =>
                    old.map((row) => {
                        if (row.id === rowId) {
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
                                row.depth === 0
                                    ? 'bg-gray-100'
                                    : row.depth === 1
                                      ? 'bg-gray-200'
                                      : 'bg-gray-300'
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
                                        fontWeight:
                                            row.depth === 0 &&
                                            cell.column.id !== 'expander'
                                                ? 'bold'
                                                : 'normal',
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

const ExtractionGrid: React.FC = () => {
    return (
        <div className="space-y-4">
            <CollapsibleCard title="Income Statement">
                <FinancialTable data={incomeStatementData} />
            </CollapsibleCard>
            <CollapsibleCard title="Balance Sheet">
                <FinancialTable data={balanceSheetData} />
            </CollapsibleCard>
            <CollapsibleCard title="Cash Flow Statement">
                <FinancialTable data={cashFlowStatementData} />
            </CollapsibleCard>
        </div>
    )
}

const CollapsibleCard: React.FC<{
    title: string
    children: React.ReactNode
}> = ({ title, children }) => {
    const [collapse, setCollapse] = useState(false)
    const onCollapse = () => {
        setCollapse(!collapse)
    }

    return (
        <div className="mb-4">
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={onCollapse}
            >
                <h5 className="flex items-center gap-1">
                    {collapse ? <HiChevronDown /> : <HiChevronRight />}
                    {title}
                </h5>
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

const ExtractionTable: React.FC = () => {
    return (
        <div className="mb-6">
            <Card
                header={<span>Analysis</span>}
                headerClass="font-semibold text-lg text-indigo-600"
                bodyClass="text-center"
                footerClass="flex justify-end"
                footer={
                    <div className="flex">
                        {/* <Button size="sm" className="ltr:mr-2 rtl:ml-2">
                            Save
                        </Button> */}
                        <Button size="sm" variant="solid">
                            Save Changes
                        </Button>
                    </div>
                }
            >
                <ExtractionGrid />
            </Card>
        </div>
    )
}

export default ExtractionTable
