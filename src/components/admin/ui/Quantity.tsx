import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
    quantity: number;
    values?: boolean;
    stock: number;
    onQuantityChange: (value: number) => void;
}

export const Quantity = ({ quantity, onQuantityChange, values = false, stock }: Props) => {

    const onValueChanged = (value: number) => {
        if (quantity + value < 1) return;
        
        if (values) {
            if (quantity + value > stock) return;
        }

        onQuantityChange(quantity + value)
    }

    return (
        <div className="mb-1 md:mb-0 ml-0 md:ml-1.5 mt-2 w-fit flex justify-between">
            <button
                type='button'
                onClick={() => onValueChanged(-1)}
                className="px-3 py-1 rounded-md bg-gray-300 "
            >
                <IoRemoveCircleOutline size={20} />
            </button>
            <span className="font-semibold mx-4">{quantity}</span>
            <button
                type='button'
                onClick={() => onValueChanged(+1)}
                className="px-3 py-1 rounded-md bg-gray-300 ">
                <IoAddCircleOutline size={20} />
            </button>
        </div>
    )
}
