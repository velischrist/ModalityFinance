import { useState, useEffect } from 'react'
import classNames from 'classnames'
import PointListItem from './PointListItem'
import Spinner from '@/components/ui/Spinner'
import reducer from '../store'
import { getList, useAppDispatch, useAppSelector } from '../store'
import { injectReducer } from '@/store'

injectReducer('pointList', reducer)

const PointListContent = () => {
    const dispatch = useAppDispatch()
    const loading = useAppSelector((state) => state.pointList.data.loading)
    const pointList = useAppSelector((state) => state.pointList.data.pointList)
    const { sort, search } = useAppSelector(
        (state) => state.pointList.data.query,
    )

    const [filter, setFilter] = useState<string | null>(null)

    useEffect(() => {
        dispatch(getList({ sort, search }))
    }, [dispatch, sort, search])

    const handleFilterChange = (type: string | null) => {
        setFilter(type)
    }

    const filteredList = filter
        ? pointList.filter((points) => points.type === filter)
        : pointList

    return (
        <div className="mt-6 h-full flex flex-col   p-4">
            <div className="flex justify-center mb-4">
                <div
                    className="inline-flex left border-2 rounded-md shadow-sm"
                    role="group"
                >
                    <button
                        onClick={() => handleFilterChange(null)}
                        className={classNames(
                            'px-4 py-2 text-sm font-medium border border-black',
                            filter === null
                                ? 'bg-black text-white'
                                : 'bg-white text-black',
                            'hover:bg-gray-800 hover:text-white',
                        )}
                    >
                        All
                    </button>
                    <button
                        onClick={() => handleFilterChange('Insight')}
                        className={classNames(
                            'px-4 py-2 text-sm font-medium border border-black',
                            filter === 'Insight'
                                ? 'bg-black text-white'
                                : 'bg-white text-black',
                            'hover:bg-gray-800 hover:text-white',
                        )}
                    >
                        Insights
                    </button>
                    <button
                        onClick={() => handleFilterChange('Question')}
                        className={classNames(
                            'px-4 py-2 text-sm font-medium border border-black',
                            filter === 'Question'
                                ? 'bg-black text-white'
                                : 'bg-white text-black',
                            'hover:bg-gray-800 hover:text-white',
                        )}
                    >
                        Questions
                    </button>
                    <button
                        onClick={() => handleFilterChange('Risk')}
                        className={classNames(
                            'px-4 py-2 text-sm font-medium border border-black',
                            filter === 'Risk'
                                ? 'bg-black text-white'
                                : 'bg-white text-black',
                            'hover:bg-gray-800 hover:text-white',
                        )}
                    >
                        Risks
                    </button>
                </div>
            </div>
            {loading && (
                <div className="flex justify-center">
                    <Spinner size={40} />
                </div>
            )}
            {filteredList.length > 0 &&
                !loading &&
                filteredList.map((points) => (
                    <PointListItem key={points.id} data={points} />
                ))}
        </div>
    )
}

export default PointListContent
