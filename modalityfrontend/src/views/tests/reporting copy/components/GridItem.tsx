import Card from '@/components/ui/Card'
// import ItemDropdown from './ItemDropdown'
// import ProgressionBar from './ProgressionBar'
import { HiExternalLink } from 'react-icons/hi'
import { Link } from 'react-router-dom'
// import { Button } from '@/components/ui'
export type GridItemProps = {
    data: {
        id: number
        name: string
        // category: string
        desc: string
        // attachmentCount: number
        // totalTask: number
        // completedTask: number
        // progression: number
        // dayleft: number
        // status: string
    }
}

const GridItem = ({ data }: GridItemProps) => {
    const { name, desc } = data

    return (
        <Card bodyClass="h-full hover:shadow-lg rounded-lg dark:bg-gray-700 bg-gray-50 mb-4 card-border cursor-pointer user-select-none">
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between">
                    <Link to="/app/scrum-board">
                        <h6>{name}</h6>
                    </Link>
                </div>
                <p className="mt-4">{desc}</p>
                <div className="mt-3">
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center rounded-full font-semibold text-xs">
                            <HiExternalLink className="text-base" />
                            <span className="ml-1 rtl:mr-1 whitespace-nowrap">
                                OPEN
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default GridItem
