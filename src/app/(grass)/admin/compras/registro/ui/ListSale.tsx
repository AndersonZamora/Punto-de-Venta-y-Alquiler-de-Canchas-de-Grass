'use client';

import { useSaleStore } from '@/store';
import { ItemSale } from './ItemSale';

export const ListSale = () => {

    const sales = useSaleStore(state => state.sale);
    const removeProduct = useSaleStore(state => state.removeProduct);
    const updateProductQuantity = useSaleStore(state => state.updateProductQuantity);
 
    return (
        <>
            {
                sales.map(sale => (
                    <ItemSale
                        key={sale.id}
                        saleProduct={sale}
                        removeItem={() => removeProduct(sale)}
                        quantityItem={quantity => updateProductQuantity(sale, quantity)}
                    />
                ))
            }
        </>
    )
}
