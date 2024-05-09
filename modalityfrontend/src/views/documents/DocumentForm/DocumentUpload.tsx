import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { FcFile } from 'react-icons/fc'

const UploadDocument = () => {
    return (
        <div>
            <div className="mb-4">
                <Upload>
                    <Button variant="solid" icon={<HiOutlineCloudUpload />}>
                        Upload your financial document here...
                    </Button>
                </Upload>
            </div>
            <div>
                <Upload draggable>
                    <div className="my-16 text-center">
                        <div className="text-6xl mb-4 flex justify-center">
                            <FcFile />
                        </div>
                        <p className="font-semibold">
                            <span className="text-gray-800 dark:text-white">
                                Drop your files here, or{' '}
                            </span>
                            <span className="text-blue-500">browse</span>
                        </p>
                        <p className="mt-1 opacity-60 dark:text-white">
                            Support: pdf, xlsx, ppt, csv
                        </p>
                    </div>
                </Upload>
            </div>
        </div>
    )
}

export default UploadDocument
