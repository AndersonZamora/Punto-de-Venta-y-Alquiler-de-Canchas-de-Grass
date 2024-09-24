'use client';

import { useBodegaStore } from '@/store';
import { ItemSaleBodega } from './ItemSaleBodega';

export const ListSaleBodega = () => {

    const sales = useBodegaStore(state => state.saleB);
    const removeProductB = useBodegaStore(state => state.removeProductB);
    const updateProductQuantityB = useBodegaStore(state => state.updateProductQuantityB);

    return (
        <>
            {
                sales.map(sale => (
                    <ItemSaleBodega
                        key={sale.id}
                        saleProduct={sale}
                        removeItem={() => removeProductB(sale)}
                        quantityItem={quantity => updateProductQuantityB(sale, quantity)}
                    />
                ))
            }
        </>
    )
}
