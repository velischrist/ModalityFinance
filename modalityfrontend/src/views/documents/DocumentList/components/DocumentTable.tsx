import { useEffect, useMemo, useRef, useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    getDocuments,
    setTableData,
    setSelectedDocument,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import DocumentDeleteConfirmation from './DocumentDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'

type Document = {
    id: number
    documentname: string
    uploadedAt: string
    status: string
    type: string
    // companyid: number
}

type DocumentTableProps = {
    companyid: number | undefined // Define the companyId prop type
}

const ActionColumn = ({ row }: { row: Document }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/app/documents/document-edit/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedDocument(row.id))
    }

    const [horizontalOpen, setHorizontalOpen] = useState(false)

    const onHorizontalOpen = () => {
        setHorizontalOpen(true)
    }

    const onDrawerClose = () => {
        setHorizontalOpen(false)
    }

    const Title = (
        <div className="flex justify-between items-center w-full">
            <div>
                <h4 className="mb-2">Document Mapping</h4>
                <p>Map the document</p>
            </div>
            <div className="">
                <Button
                    className="ltr:mr-2 rtl:ml-2"
                    variant="plain"
                    onClick={() => onDrawerClose()}
                >
                    Cancel
                </Button>
                <Button variant="solid" onClick={() => onDrawerClose()}>
                    Okay
                </Button>
            </div>
        </div>
    )

    return (
        <div className="flex justify-end text-lg">
            <Button
                variant="solid"
                size="sm"
                onClick={() => onHorizontalOpen()}
            >
                Map
            </Button>
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>

            <Drawer
                title={Title}
                onClose={onDrawerClose}
                isOpen={horizontalOpen}
                placement="bottom"
                closable={false}
                height="100%"
            >
                <div className="flex">
                    <div className=" flex-1 max-h-screen sticky top-0 overflow-y-auto p-4">
                        {/* Left Side Content */}
                        <p>[Display data]</p>
                        {/* Add more content here to test scrolling */}
                    </div>
                    <div className="flex-1 w-1/2 h-full overflow-y-auto p-4">
                        {/* Right Side Content */}
                        <p>[Display raw PDF file]</p>
                        {/* Add more content here to test scrolling */}
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

const DocumentColumn = ({ row }: { row: Document }) => {
    // const avatar = row.img ? (
    //     <Avatar src={row.img} />
    // ) : (
    //     <Avatar icon={<FiPackage />} />
    // )

    return (
        <div className="flex items-center">
            {/* {avatar} */}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>
                {row.documentname}
            </span>
        </div>
    )
}
const DocumentTable: React.FC<DocumentTableProps> = ({ companyid }) => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.salesDocumentList.data.tableData,
    )

    const filterData = useAppSelector(
        (state) => state.salesDocumentList.data.filterData,
    )

    const loading = useAppSelector(
        (state) => state.salesDocumentList.data.loading,
    )

    const data = useAppSelector(
        (state) => state.salesDocumentList.data.documentList,
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort, companyid])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total],
    )

    const fetchData = () => {
        dispatch(
            getDocuments({
                pageIndex,
                pageSize,
                sort,
                query,
                filterData,
                companyid,
            }),
        )
    }

    const columns: ColumnDef<Document>[] = useMemo(
        () => [
            {
                header: 'Document Name',
                accessorKey: 'documentname',
                cell: (props) => {
                    const row = props.row.original

                    return <DocumentColumn row={row} />
                },
            },
            // {
            //     header: 'Status',
            //     accessorKey: 'status',
            //     cell: (props) => {
            //         const { status } = props.row.original

            //         return (
            //             <div className="flex items-center gap-2">
            //                 <Badge
            //                     className={
            //                         inventoryStatusColor[status].dotClass
            //                     }
            //                 />
            //                 <span
            //                     className={`capitalize font-semibold ${inventoryStatusColor[status].textClass}`}
            //                 >
            //                     {inventoryStatusColor[status].label}
            //                 </span>
            //             </div>
            //         )
            //     },
            // },
            {
                header: 'Type',
                accessorKey: 'type',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.type}</span>
                },
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.status}</span>
                },
            },
            // {
            //     header: 'Status',
            //     accessorKey: 'status',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return <span className="capitalize">{row.status}</span>
            //     },
            // },
            {
                header: 'Uploaded At',
                accessorKey: 'uploadedAt',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.uploadedAt}</span>
                },
            },
            // {
            //     header: 'Invested At',
            //     accessorKey: 'investedAt',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return <span className="capitalize">{row.investedAt}</span>
            //     },
            // },

            // {
            //     header: 'Amount Invested',
            //     accessorKey: 'amountInvested',
            //     cell: (props) => {
            //         const { amountInvested } = props.row.original
            //         return <span>${amountInvested}</span>
            //     },
            // },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        [],
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <DocumentDeleteConfirmation />
        </>
    )
}

export default DocumentTable
