import Link from 'next/link';

interface Props {
    title: string;
    linkHref: string;
    linkTitle: string;
    icon: JSX.Element;
}

export const TitleAdmin = ({ title, linkHref, linkTitle, icon }: Props) => {
    return (
        <div className="px-1 relative overflow-hidden text-slate-700 rounded-none bg-clip-border">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
                </div>
                <div className="flex  mt-2 md:mt-0 flex-col gap-2 shrink-0 sm:flex-row">
                    <Link
                        className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-md font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        href={linkHref}
                    >
                        {icon}
                        {linkTitle}
                    </Link>
                </div>
            </div>
        </div>
    )
}
