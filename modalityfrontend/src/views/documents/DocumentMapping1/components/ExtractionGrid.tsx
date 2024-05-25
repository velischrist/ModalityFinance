import { useMemo, useEffect, useState, useRef, useCallback } from 'react'
import Table from '@/components/ui/Table'
import Input from '@/components/ui/Input'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table'
import type { ColumnDef, CellContext, RowData } from '@tanstack/react-table'

// Define the structure of a Person
type Person = {
    value: string
    item: string
    adjustment: string
}

// Generate some fake data
const generateFakeData = (numRows: number): Person[] => {
    const fakeData = []
    for (let i = 0; i < numRows; i++) {
        fakeData.push({
            item: `First${i}`,
            value: `Last${i}`,
            adjustment: `first${i}.last${i}@example.com`,
        })
    }
    return fakeData
}

const data10: Person[] = generateFakeData(10)

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (
            rowIndex: number,
            columnId: string,
            value: unknown,
            dataPlaceHolder?: TData,
        ) => void
    }
}

type EditablePerson = Person

const { Tr, Th, Td, THead, TBody } = Table

const EditableCell = ({
    getValue,
    row: { index },
    column: { id },
    table,
}: CellContext<EditablePerson, unknown>) => {
    const initialValue = getValue()
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
        table.options.meta?.updateData(index, id, value)
    }

    // If the initialValue is changed externally, sync it up with our state
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

const defaultColumn: Partial<ColumnDef<EditablePerson>> = {
    cell: EditableCell,
}

function useSkipper() {
    const shouldSkipRef = useRef(true)
    const shouldSkip = shouldSkipRef.current

    // Wrap a function with this to skip a pagination reset temporarily
    const skip = useCallback(() => {
        shouldSkipRef.current = false
    }, [])

    useEffect(() => {
        shouldSkipRef.current = true
    })

    return [shouldSkip, skip]
}

function ExtractionGrid() {
    const columns = useMemo(
        () => [
            { header: 'Item', accessorKey: 'item' },
            { header: 'Value', accessorKey: 'aalue' },
            { header: 'Adjustment', accessorKey: 'adjustment' },
        ],
        [],
    )

    const [data, setData] = useState(() => data10)

    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

    const table = useReactTable({
        data,
        columns,
        defaultColumn,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        autoResetPageIndex: autoResetPageIndex as boolean,
        // Provide our updateData function to our table meta
        meta: {
            updateData: (
                rowIndex: number,
                columnId: string,
                value: unknown,
            ) => {
                // Skip page index reset until after next rerender
                if (typeof skipAutoResetPageIndex === 'function') {
                    skipAutoResetPageIndex()
                }
                setData((old) =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex],
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
        <>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
        </>
    )
}

export default ExtractionGrid
