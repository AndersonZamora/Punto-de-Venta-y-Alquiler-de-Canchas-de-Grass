import clsx from 'clsx';

interface Props {
    children?: React.ReactNode;
    title: string;
    index: number;
    value: number;
}

export const CustomTabPanel = ({ value, index, children, title }: Props) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            className={
                clsx(
                    'transition-all duration-300 bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600',
                )
            }
        >
            <h2 className="text-2xl font-semibold mb-2 text-blue-600">{title}</h2>

            {children}
        </div>
    )
}
