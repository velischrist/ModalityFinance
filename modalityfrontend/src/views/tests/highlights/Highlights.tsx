import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import KeyPoints from './KeyPoints'
import { motion } from 'framer-motion'
import { HiChevronRight, HiChevronDown } from 'react-icons/hi'

const Highlights = () => {
    const [collapse, setCollapse] = useState(false)
    const onCollapse = () => {
        setCollapse(!collapse)
    }

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
                    <h5>Insights</h5>
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
                    <KeyPoints />
                </div>
            </motion.div>
        </div>
    )
}

export default Highlights
