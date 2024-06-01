import Card from '@/components/ui/Card'
// import ItemDropdown from './ItemDropdown'
// import Members from './Members'
// import ProgressionBar from './ProgressionBar'
import {
    HiExternalLink,
    HiVideoCamera,
    HiDocumentText,
    HiChatAlt2,
} from 'react-icons/hi'
import { Link } from 'react-router-dom'
// import { Button } from '@/components/ui'
import classNames from 'classnames'

export type ListItemData = {
    id: number
    name: string
    desc: string
    // attachmentCount: number
    // totalTask: number
    // completedTask: number
    // progression: number
    // dayleft: number
    // status: string
    // member: {
    //     name: string
    //     img: string
    // }[]
}

type ListItemProps = {
    data: ListItemData
    cardBorder?: boolean
}

const EventIcon = ({ name }: { name: string }) => {
    const baseClass =
        'rounded-lg h-10 w-10 text-lg flex items-center justify-center'

    switch (name) {
        case 'Report 1':
            return (
                <div
                    className={classNames(
                        baseClass,
                        'text-indigo-600 bg-indigo-100 dark:text-indigo-100 dark:bg-indigo-500/20',
                    )}
                >
                    <HiVideoCamera />
                </div>
            )
        case 'Report 2':
            return (
                <div
                    className={classNames(
                        baseClass,
                        'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100',
                    )}
                >
                    <HiDocumentText />
                </div>
            )
        case 'Report 3':
            return (
                <div
                    className={classNames(
                        baseClass,
                        'text-amber-600 bg-amber-100 dark:text-amber-100 dark:bg-amber-500/20',
                    )}
                >
                    <HiChatAlt2 />
                </div>
            )
        default:
            return null
    }
}

const ListItem = ({ data, cardBorder }: ListItemProps) => {
    const { name, desc } = data

    return (
        <div className="mb-4">
            <Card
                bordered={cardBorder}
                bodyClass=" h-full hover:shadow-lg rounded-lg dark:bg-gray-700 bg-gray-50  cursor-pointer user-select-none"
            >
                <div className="grid gap-x-4 grid-cols-1">
                    <div className="flex items-left gap-3">
                        <EventIcon name={name} />
                        <div className="my-1 sm:my-0 col-span-12 sm:col-span-2 md:col-span-3 lg:col-span-3 md:flex md:items-center">
                            <div className="flex flex-col">
                                <h6 className="font-bold">
                                    <Link to="/app/project/scrum-board">
                                        {name}
                                    </Link>
                                </h6>

                                <span>{desc}</span>
                            </div>
                        </div>
                        <div className="my-1 sm:my-0 col-span-12 sm:col-span-1 flex md:items-center justify-end">
                            {/* <ItemDropdown /> */}
                            {/* <HiExternalLink className="text-base" />
                            <span className="ml-1 rtl:mr-1 whitespace-nowrap">
                                OPEN
                            </span> */}
                            {/* <Button className="mr-2" icon={<HiExternalLink />}>
                            <span>Open Reports</span>
                        </Button> */}
                        </div>
                    </div>
                    <div className="my-1 sm:my-0 col-span-12 sm:col-span-2 md:col-span-2 lg:col-span-2 md:flex md:items-center md:justify-end">
                        <HiExternalLink className="text-base" />
                        <span className="ml-1 rtl:mr-1 whitespace-nowrap">
                            OPEN
                        </span>
                    </div>
                    <div className="my-1 sm:my-0 col-span-12 md:col-span-2 lg:col-span-3 md:flex md:items-center">
                        {/* <ProgressionBar progression={progression} /> */}
                    </div>
                    <div className="my-1 sm:my-0 col-span-12 md:col-span-3 lg:col-span-3 md:flex md:items-center">
                        {/* <Members members={member} /> */}
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ListItem
