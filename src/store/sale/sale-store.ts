import type { IProduct, ISaleProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {

    sale: ISaleProduct[];
    productView: IProduct | undefined;

    getProductView: () => IProduct | undefined;
    setProductView: (product: IProduct) => void;

    getSummaryInformation: () => {
        subsTotal: number;
        tax: number;
        total: number;
    }
    addProductTocart: (product: ISaleProduct) => void;
    updateProductQuantity: (product: ISaleProduct, quantity: number) => void;
    removeProduct: (product: ISaleProduct) => void;
    clearCart: () => void;
}

export const useSaleStore = create<State>()(
    persist(
        (set, get) => ({
            productView: undefined,

            sale: [],

            getProductView: () => {
                const { productView } = get();

                return productView;
            },

            setProductView: (product: IProduct) => {
                set({ productView: product })
            },

            getTotalItems: () => {
                const { sale } = get();
                return sale.reduce((total, item) => total + item.quantity, 0);
            },

            getSummaryInformation: () => {

                const { sale } = get();

                const subsTotal = sale.reduce((subTotal, product) => (product.quantity * product.purchasePrice) + subTotal, 0)

                const taxRate = 0.18;
                const IGV = 1.198;

                let subsTotalC = subsTotal / IGV;

                return {
                    subsTotal: subsTotal / 1.18,
                    tax: subsTotalC * taxRate,
                    total: subsTotal
                }
            },

            addProductTocart: (product: ISaleProduct) => {
                const { sale } = get();

                const productInCart = sale.some(
                    (item) => item.id === product.id
                )

                if (!productInCart) {
                    set({ sale: [...sale, product] });
                    return;
                }

                // se que el producto existe por talla ... incrementar
                const updatedCartProducts = sale.map((item) => {
                    if (item.id === product.id) {
                        return {
                            ...item,
                            quantity: item.quantity + product.quantity,
                            purchasePrice: product.purchasePrice
                        }
                    }
                    return item;
                })

                set({ sale: updatedCartProducts })
            },
            updateProductQuantity: (product: ISaleProduct, quantity: number) => {

                const { sale } = get();

                const productInCart = sale.some(
                    (item) => item.id === product.id
                )

                if (!productInCart) return;

                const updatedCartProducts = sale.map((item) => {
                    if (item.id === product.id) {
                        return {
                            ...item,
                            quantity: quantity
                        }
                    }
                    return item;
                })

                set({ sale: updatedCartProducts })
            },

            removeProduct: (product: ISaleProduct) => {

                const { sale } = get();

                const productInCart = sale.some(
                    (item) => item.id === product.id
                )

                if (!productInCart) return;

                const productRemoveCart = sale.filter(
                    (item) => item.id !== product.id
                )

                set({ sale: productRemoveCart })

            },

            clearCart: () => {
                set({
                    sale: [],
                    productView: undefined,
                })
            }
        }),
        {
            name: 'sale-cart'
        }
    )
);
