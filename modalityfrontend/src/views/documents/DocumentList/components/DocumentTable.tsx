import React, { useEffect, useMemo, useRef, useState } from 'react'
import { HiOutlinePencil, HiOutlineTrash, HiOutlineEye } from 'react-icons/hi'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import DataTable from '@/components/shared/DataTable'
import DocumentTools from '../../DocumentMapping1/components/DocumentTools'
import PDFViewer from '../../DocumentMapping1/components/PdfPreview'
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
    documentpath?: string
    companyid: number
}

type DocumentTableProps = {
    companyid: number
}

const ActionColumn = ({
    row,
    companyid,
}: {
    row: Document
    companyid: number
}) => {
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
                <h4 className="mb-2">Document Analysis</h4>
            </div>
            <div className="">
                <Button variant="solid" onClick={() => onDrawerClose()}>
                    Close
                </Button>
            </div>
        </div>
    )

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={() => onHorizontalOpen()}
            >
                <HiOutlineEye />
            </span>
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
                    <div className="flex-1 max-h-screen sticky top-0 overflow-y-auto p-4 flex-col min-w-[360px] ltr:border-r rtl:border-l border-gray-200 dark:border-gray-600 ">
                        <DocumentTools document={row} companyid={companyid} />
                    </div>
                    <div className="flex-1 w-1/2 h-full overflow-y-auto p-4">
                        <PDFViewer document={row} companyid={companyid} />
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

const DocumentColumn = ({ row }: { row: Document }) => {
    return (
        <div className="flex items-center">
            <div
                className="flex items-center justify-center bg-gray-200 p-1 rounded"
                style={{ width: '24px', height: '24px' }}
            >
                <img
                    src="/img/avatars/pdf-icon.69d008c4.svg"
                    alt="PDF Icon"
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
            <span className="ml-2 font-semibold">{row.documentname}</span>
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
            {
                header: 'Uploaded At',
                accessorKey: 'uploadedAt',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.uploadedAt}</span>
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        row={props.row.original}
                        companyid={companyid}
                    />
                ),
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
