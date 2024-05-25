import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import EditKeyPoints from './EditKeyPoints'
import DeleteKeyPoints from './DeleteKeyPoints'
// import {
//     openDeletePaymentMethodDialog,
//     openEditPaymentMethodDialog,
//     updateSelectedCard,
//     useAppDispatch,
//     useAppSelector,
//     PaymentMethod,
// } from '../store'
// import isLastChild from '@/utils/isLastChild'
import classNames from 'classnames'
import { HiPencilAlt } from 'react-icons/hi'

const KeyPoints = () => {
    // const dispatch = useAppDispatch()

    // const data = useAppSelector(
    //     (state) => state.crmCustomerDetails.data.paymentMethodData,
    // )

    // const onEditPaymentMethodDialogOpen = (card: PaymentMethod) => {
    //     dispatch(updateSelectedCard(card))
    //     dispatch(openEditPaymentMethodDialog())
    // }

    // const onDeletePaymentMethodDialogOpen = (card: PaymentMethod) => {
    //     dispatch(updateSelectedCard(card))
    //     dispatch(openDeletePaymentMethodDialog())
    // }

    return (
        <>
            {/* {data.length > 0 && ( */}
            <div>
                {/* <h6 className="mb-4">Payment Methods</h6> */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-600">
                    <div
                        // key={card.last4Number}
                        className={classNames(
                            'flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4',
                            // !isLastChild(data, index) &&
                            'border-b border-gray-200 dark:border-gray-600',
                        )}
                    >
                        <div className="flex items-center gap-2">
                            {/* {card.cardType === 'VISA' && ( */}
                            <img
                                src="/img/others/exclamation-32.png"
                                alt="visa"
                            />
                            {/* )} */}
                            {/* {card.cardType === 'MASTER' && (
                                    <img
                                        src="/img/others/img-9.png"
                                        alt="master"
                                    />
                                )} */}
                        </div>
                        {/* <h5>Card title</h5> */}
                        <p>
                            Some quick example text to build on the card title
                            and make up the bulk of the card&apos;s content.
                        </p>

                        <div className="flex">
                            <Button
                                className="mr-2 rtl:ml-2"
                                variant="plain"
                                size="sm"
                                // onClick={() =>
                                //     onDeletePaymentMethodDialogOpen(
                                //         card,
                                //     )
                                // }
                            >
                                Ignore
                            </Button>
                            <Button
                                icon={<HiPencilAlt />}
                                size="sm"
                                // onClick={() =>
                                //     onEditPaymentMethodDialogOpen(card)
                                // }
                            >
                                Resolve
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* )} */}
            {/* <EditPaymentMethod />
            <DeletePaymentMethod /> */}
        </>
    )
}

export default KeyPoints
