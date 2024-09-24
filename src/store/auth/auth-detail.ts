import { IUserd } from '@/interfaces';
import { create } from 'zustand';

interface State {
    user: IUserd | undefined;
    setUser: (user: IUserd) => void;
}

export const useUserStore = create<State>()((set) => ({
    user: undefined,
    setUser: (user: IUserd) => set({ user: user })
}));
