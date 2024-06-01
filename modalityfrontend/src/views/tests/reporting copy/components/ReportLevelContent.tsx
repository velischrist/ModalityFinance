import { useEffect } from 'react'
import classNames from 'classnames'
import GridItem from './GridItem'
import ListItem from './ListItem'
import Spinner from '@/components/ui/Spinner'
import { getList, useAppDispatch, useAppSelector } from '../store'

const ReportLevelContent = () => {
    const dispatch = useAppDispatch()

    const loading = useAppSelector((state) => state.reportLevel.data.loading)
    const reportLevel = useAppSelector(
        (state) => state.reportLevel.data.reportLevel,
    )
    const view = useAppSelector((state) => state.reportLevel.data.view)
    const { sort, search } = useAppSelector(
        (state) => state.reportLevel.data.query,
    )

    useEffect(() => {
        dispatch(getList({ sort, search }))
    }, [dispatch, sort, search])

    return (
        <div
            className={classNames(
                'mt-6 h-full flex flex-col',
                loading && 'justify-center',
            )}
        >
            {loading && (
                <div className="flex justify-center">
                    <Spinner size={40} />
                </div>
            )}
            {view === 'grid' && reportLevel.length > 0 && !loading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {reportLevel.map((report) => (
                        <GridItem key={report.id} data={report} />
                    ))}
                </div>
            )}
            {view === 'list' &&
                reportLevel.length > 0 &&
                !loading &&
                reportLevel.map((report) => (
                    <ListItem key={report.id} data={report} />
                ))}
        </div>
    )
}

export default ReportLevelContent
