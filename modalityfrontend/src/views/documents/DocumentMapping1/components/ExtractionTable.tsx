import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ExtractionGrid from './ExtractionGrid'
import { motion } from 'framer-motion'
import { HiChevronRight, HiChevronDown } from 'react-icons/hi'

const ExtractionTable = () => {
    const [collapse, setCollapse] = useState(false)
    const onCollapse = () => {
        setCollapse(!collapse)
    }
    const cardFooter = (
        <div className="flex">
            <Button size="sm" className="ltr:mr-2 rtl:ml-2">
                Save
            </Button>
            <Button size="sm" variant="solid">
                New Post
            </Button>
        </div>
    )

    return (
        <div className="mb-6">
            <div className="flex items-center justify-between">
                <div
                    className="flex items-center gap-1 cursor-pointer select-none"
                    onClick={onCollapse}
                >
                    <span className="text-lg">
                        {collapse ? <HiChevronRight /> : <HiChevronDown />}
                    </span>
                    <h5>Table</h5>
                    <span>25</span>
                </div>
                <hr className="mx-3 w-full" />
            </div>
            <motion.div
                className="grid grid-flow-row auto-rows-max gap-4"
                initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                animate={{
                    opacity: collapse ? 0 : 1,
                    height: collapse ? 0 : 'auto',
                }}
                transition={{ duration: 0.15 }}
            >
                <div>
                    <Card
                        header={<span>Analysis</span>}
                        headerClass="font-semibold text-lg text-indigo-600"
                        bodyClass="text-center"
                        footerClass="flex justify-end"
                        footer={cardFooter}
                    >
                        <ExtractionGrid />
                    </Card>
                </div>
            </motion.div>
        </div>
    )
}

export default ExtractionTable
