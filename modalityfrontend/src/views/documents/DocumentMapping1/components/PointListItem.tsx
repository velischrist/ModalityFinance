import Card from '@/components/ui/Card'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import Tooltip from '@/components/ui/Tooltip'
import { IoCopyOutline } from 'react-icons/io5'
import {
    FaLightbulb,
    FaQuestionCircle,
    FaExclamationTriangle,
} from 'react-icons/fa'

import classNames from 'classnames'

export type PointListItemData = {
    id: number
    type: string
    desc: string
    status: string
}

type PointListItemProps = {
    data: PointListItemData
    cardBorder?: boolean
}

const EventIcon = ({ type }: { type: string }) => {
    const baseClass =
        'rounded-lg h-10 w-10 text-lg flex items-center justify-center min-w-[40px]'

    switch (type) {
        case 'Insight':
            return (
                <div
                    className={classNames(
                        baseClass,
                        'text-indigo-600 bg-indigo-100 dark:text-indigo-100 dark:bg-indigo-500/20',
                    )}
                >
                    <FaLightbulb />
                </div>
            )
        case 'Question':
            return (
                <div
                    className={classNames(
                        baseClass,
                        'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100',
                    )}
                >
                    <FaQuestionCircle />
                </div>
            )
        case 'Risk':
            return (
                <div
                    className={classNames(
                        baseClass,
                        'text-amber-600 bg-amber-100 dark:text-amber-100 dark:bg-amber-500/20',
                    )}
                >
                    <FaExclamationTriangle />
                </div>
            )
        default:
            return null
    }
}

const PointListItem = ({ data, cardBorder }: PointListItemProps) => {
    const { type, desc } = data

    const handleCopyClick = (address = '') => {
        navigator.clipboard.writeText(address)
        toast.push(
            <Notification title="Copied" type="success" duration={1000} />,
            {
                placement: 'top-center',
            },
        )
    }

    return (
        <div className="mb-4">
            <Card
                bordered={cardBorder}
                bodyClass="h-full hover:shadow-lg rounded-lg dark:bg-gray-700 bg-gray-50 cursor-pointer user-select-none"
            >
                <div className="grid gap-x-4 grid-cols-1">
                    <div className="flex items-left gap-3">
                        <EventIcon type={type} />
                        <div className="my-1 sm:my-0 col-span-12 sm:col-span-2 md:col-span-3 lg:col-span-3 md:flex md:items-center">
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                                    {type}
                                </span>
                                <span>{desc}</span>
                            </div>
                        </div>
                        <div className="my-1 sm:my-0 col-span-12 sm:col-span-1 flex md:items-center justify-end">
                            <Tooltip title="Copy">
                                <IoCopyOutline
                                    className="cursor-pointer text-xl"
                                    onClick={() => handleCopyClick(data.desc)}
                                />
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default PointListItem
