import type { IBodegaProduct, IProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {

    saleB: IBodegaProduct[];
    productViewB: IBodegaProduct | undefined;

    getProductViewB: () => IBodegaProduct | undefined;
    setProductViewB: (product: IBodegaProduct) => void;

    getSummaryInformationB: () => {
        totalB: number;
    }
    addProductTocartB: (product: IBodegaProduct) => void;
    updateProductQuantityB: (product: IBodegaProduct, quantity: number) => void;
    removeProductB: (product: IBodegaProduct) => void;
    clearSale: () => void;
}

export const useBodegaStore = create<State>()(
    persist(
        (set, get) => ({
            productViewB: undefined,

            saleB: [],
            clearSale: () => {
                set({
                    saleB: [],
                    productViewB: undefined,
                })
            },
            getProductViewB: () => {
                const { productViewB } = get();

                return productViewB;
            },

            setProductViewB: (product: IBodegaProduct) => {
                set({ productViewB: product })
            },

            getTotalItemsB: () => {
                const { saleB } = get();
                return saleB.reduce((total, item) => total + item.quantity, 0);
            },

            getSummaryInformationB: () => {

                const { saleB } = get();

                const totalB = saleB.reduce((subTotal, product) => (product.quantity * product.salePrice) + subTotal, 0)

                return {
                    totalB: totalB
                }
            },

            addProductTocartB: (product: IBodegaProduct) => {
                const { saleB } = get();

                const productInCart = saleB.some(
                    (item) => item.id === product.id
                )

                if (!productInCart) {
                    set({ saleB: [...saleB, product] });
                    return;
                }

                const updatedCartProducts = saleB.map((item) => {

                    if (item.id === product.id) {
                        if (item.quantity + product.quantity <= product.stock) {
                            return {
                                ...item,
                                quantity: item.quantity + product.quantity
                            }
                        }
                        return item;
                    }
                    return item;
                })

                set({ saleB: updatedCartProducts })
            },
            updateProductQuantityB: (product: IBodegaProduct, quantity: number) => {

                const { saleB } = get();

                const productInCart = saleB.some(
                    (item) => item.id === product.id
                )

                if (!productInCart) return;

                const updatedCartProducts = saleB.map((item) => {
                    if (item.id === product.id) {
                        if (quantity <= product.stock) {
                            return {
                                ...item,
                                quantity: quantity
                            }
                        }
                        return item;
                    }
                    return item;
                })

                set({ saleB: updatedCartProducts })
            },

            removeProductB: (product: IBodegaProduct) => {

                const { saleB } = get();

                const productInCart = saleB.some(
                    (item) => item.id === product.id
                )

                if (!productInCart) return;

                const productRemoveCart = saleB.filter(
                    (item) => item.id !== product.id
                )

                set({ saleB: productRemoveCart })

            },
        }),
        {
            name: 'bodega-cart'
        }
    )
);
