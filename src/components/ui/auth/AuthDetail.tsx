'use client';

import  { useEffect } from 'react';
import { useUserStore } from '@/store';
import { IUserd } from '@/interfaces';

interface Props {
    user: IUserd
}

export const AuthDetail = ({ user }: Props) => {

    const setUser = useUserStore(state => state.setUser);

    useEffect(() => {
        setUser(user);
    }, [])

    return (
        <></>
    )
}
