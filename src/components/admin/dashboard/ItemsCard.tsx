import Link from 'next/link';
import clsx from 'clsx';

interface Props {
    title: string;
    quantity: string;
    rederi?: string;
    classNa?: string;
    bgIcon?: string;
    icon: JSX.Element;
}

export const ItemsCard = ({ title, quantity, classNa, bgIcon = 'bg-indigo-600', icon, rederi = '/admin' }: Props) => {
    return (
        <Link className={clsx(
            'w-full px-6 sm:w-1/2 xl:w-1/3',
            `${classNa}`
        )} href={rederi}>
            <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                <div className={
                    clsx(
                        'p-3 bg-opacity-75 rounded-full',
                        `${bgIcon}`
                    )
                }>
                    {icon}
                </div>

                <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">{quantity}</h4>
                    <div className="text-gray-500">{title}</div>
                </div>
            </div>
        </Link>
    )
}
