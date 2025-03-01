'use client';

import clsx from 'clsx';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface Props {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const PaginationModal = ({ totalPages, onPageChange, currentPage }: Props) => {

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex text-center justify-center mt-10 mb-5">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    <li className="page-item disabled">
                        <button
                            type='button'
                            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            <IoChevronBackOutline size={30} />
                        </button>
                    </li>
                    {
                        [...Array(totalPages)].map((_, index) => (
                            <li key={index} className="page-item">
                                <button
                                    className={
                                        clsx(
                                            'page-link relative block py-1.5 px-3  border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none',
                                            {
                                                'bg-blue-600 shadow-sm text-white hover:text-white hover:bg-blue-700': currentPage === index + 1
                                            }
                                        )
                                    }
                                    type='button'
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))
                    }
                    <li className="page-item">
                        <button
                            type='button'
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        >
                            <IoChevronForwardOutline size={30} />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
