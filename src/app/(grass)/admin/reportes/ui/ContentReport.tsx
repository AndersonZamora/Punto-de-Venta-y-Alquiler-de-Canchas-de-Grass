'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { CustomTabPanel } from './CustomTabPanel';
import { DailyReport, WeeklyReport, MonthlyReport } from '@/components';

export const ContentReport = () => {

    const [openTab, setOpenTab] = useState(1);

    return (
        <>
            <div className="max-w-2xl mx-auto mt-5">
                <div className="mb-4 flex space-x-4 p-2 bg-white rounded-lg shadow-md">
                    <button
                        onClick={() => setOpenTab(1)}
                        className={
                            clsx(
                                'flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300',
                                {
                                    'bg-blue-600 text-white': openTab === 1
                                }
                            )
                        }
                    >
                        Semanal
                    </button>
                    <button
                        onClick={() => setOpenTab(2)}
                        className={
                            clsx(
                                'flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300',
                                {
                                    'bg-blue-600 text-white': openTab === 2
                                }
                            )
                        }
                    >
                        Mensual
                    </button>
                </div>
            </div>
            <CustomTabPanel title={'Reporte semanal'} index={openTab} value={1}>
                <WeeklyReport />
            </CustomTabPanel>
            <CustomTabPanel title={'Reporte mensual'} index={openTab} value={2}>
                <MonthlyReport />
            </CustomTabPanel>
        </>
    )
}
