import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import DataTable from '@/components/shared/DataTable'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import {
    getCompanies,
    setTableData,
    setSelectedCompany,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import CompanyDeleteConfirmation from './CompanyDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'

type Company = {
    companyid: number
    companyname: string
    location: string
    industry: string
}

const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase() + '.'
}

const getRandomColorClass = () => {
    const colors = [
        'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100',
        // 'bg-emerald-500 text-white',
        // 'bg-blue-500 text-white',
        // 'bg-red-500 text-white',
        // 'bg-yellow-500 text-white',
        // 'bg-purple-500 text-white',
        // 'bg-pink-500 text-white',
        // 'bg-teal-500 text-white',
    ]
    const colorClass = colors[Math.floor(Math.random() * colors.length)]
    return colorClass
}

const ActionColumn = ({ row }: { row: Company }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/app/companies/company-edit/${row.companyid}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedCompany(row.companyid))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlineEye />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const CompanyColumn = ({ row }: { row: Company }) => {
    const initials = getInitials(row.companyname)
    const colorClass =
        'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100'

    return (
        <div className="flex items-center">
            <Avatar className={`mr-4 ${colorClass}`}>{initials}</Avatar>
            <span className={`ml-2 rtl:mr-2 font-semibold`}>
                {row.companyname}
            </span>
        </div>
    )
}

const CompanyTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.salesCompanyList.data.tableData,
    )

    const filterData = useAppSelector(
        (state) => state.salesCompanyList.data.filterData,
    )

    const loading = useAppSelector(
        (state) => state.salesCompanyList.data.loading,
    )

    const data = useAppSelector(
        (state) => state.salesCompanyList.data.companyList,
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

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
        dispatch(getCompanies({ pageIndex, pageSize, sort, query, filterData }))
    }

    const columns: ColumnDef<Company>[] = useMemo(
        () => [
            {
                header: 'Company Name',
                accessorKey: 'companyname',
                cell: (props) => {
                    const row = props.row.original
                    return <CompanyColumn row={row} />
                },
            },
            {
                header: 'Industry',
                accessorKey: 'industry',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.industry}</span>
                },
            },
            {
                header: 'Location',
                accessorKey: 'location',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.location}</span>
                },
            },
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
            <CompanyDeleteConfirmation />
        </>
    )
}

export default CompanyTable
