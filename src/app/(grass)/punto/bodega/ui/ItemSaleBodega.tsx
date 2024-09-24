import { IoTrashOutline } from 'react-icons/io5';
import { Quantity } from '@/components';
import { IBodegaProduct } from '@/interfaces'
import { currencyFormat } from '@/utils';

interface Props {
    saleProduct: IBodegaProduct;
    removeItem: () => void;
    quantityItem: (value: number) => void;
}

export const ItemSaleBodega = ({ saleProduct, removeItem, quantityItem }: Props) => {

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 mt-2">
                <div className="flex flex-row justify-center text-center w-fit md:w-2/5">
                    <span className="ml-1 font-semibold text-xl md:text-base">
                        {currencyFormat(saleProduct.salePrice)} - {saleProduct.description}
                    </span>
                </div>

                <Quantity
                    quantity={saleProduct.quantity}
                    onQuantityChange={quantityItem}
                    stock={saleProduct.stock}
                    values={true}
                />
                <div className="mb-1 mt-2 md:mt-0 md:mb-0 ml-0 md:ml-1.5  font-semibold text-lg  w-fit text-center">
                    {currencyFormat(saleProduct.salePrice * saleProduct.quantity)}
                </div>
                <button
                    onClick={() => removeItem()}
                    className="ml-1.5 w-fit flex justify-center"
                >
                    <IoTrashOutline className="w-6 h-6 text-red-600" />
                </button>
            </div>
            <div className="border-b-2 border-b-gray-700"></div>
        </>
    )
}
