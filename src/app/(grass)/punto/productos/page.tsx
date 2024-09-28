import { getStockProducts } from '@/actions';
import { TablaProductsPun } from './ui/TablaProductsPun';

export default async function ProductosPunPage() {

  const { products, totalPages } = await getStockProducts();

  return (
    <div
      className="transition-all duration-300 bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600">
      <TablaProductsPun products={products} totalPages={totalPages} />
    </div>
  );
}
