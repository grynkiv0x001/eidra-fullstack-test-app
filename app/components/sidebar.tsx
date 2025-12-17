import { getCategories } from '@/lib/categories';
import { getDeliveryTimes, getPriceRanges } from '@/lib/restaurants';

export const Sidebar = async () => {
  const categories = await getCategories();
  const deliveryTimes = await getDeliveryTimes();
  const priceRanges = await getPriceRanges();

  return (
    <aside className="p-4 md:p-6">
      <div className="md:hidden bg-white dark:bg-gray-800 rounded-lg border border-black/10 dark:border-white/10 p-4 mb-4">
        <h4 className="font-semibold mb-3 text-sm uppercase text-gray-500 dark:text-gray-400">
          Delivery Time
        </h4>

        <ul className="flex gap-2 overflow-x-auto pb-2">
          {deliveryTimes?.map((time: number) => (
            <li
              key={time}
              className="bg-white dark:bg-gray-700 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm dark:text-gray-100 whitespace-nowrap shrink-0"
            >
              {time} min
            </li>
          ))}
          <li className="bg-white dark:bg-gray-700 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm dark:text-gray-100 whitespace-nowrap shrink-0">
            60+ min
          </li>
        </ul>
      </div>

      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg border border-black/10 dark:border-white/10 p-4">
        <h3 className="font-semibold mb-4 text-lg dark:text-gray-100">
          Filter
        </h3>

        <div className="mb-6">
          <h4 className="font-medium mb-3 text-sm uppercase text-gray-500 dark:text-gray-400">
            Food Category
          </h4>

          <ul className="flex flex-wrap gap-2">
            {categories?.map((category) => (
              <li
                key={category.id}
                className="bg-white dark:bg-gray-700 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm dark:text-gray-100"
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-3 text-sm uppercase text-gray-500 dark:text-gray-400">
            Delivery Time
          </h4>

          <ul className="flex flex-wrap gap-2">
            {deliveryTimes?.map((time: number) => (
              <li
                key={time}
                className="bg-white dark:bg-gray-700 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm dark:text-gray-100"
              >
                {time} minutes
              </li>
            ))}

            <li className="bg-white dark:bg-gray-700 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm dark:text-gray-100">
              60+ minutes
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-3 text-sm uppercase text-gray-500 dark:text-gray-400">
            Price Range
          </h4>

          <ul className="flex flex-wrap gap-2">
            {priceRanges && Array.isArray(priceRanges) && (priceRanges as number[]).length > 0 ? (
              (priceRanges as number[]).map((range: number) => (
                <li
                  key={range}
                  className="bg-white dark:bg-gray-700 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm dark:text-gray-100"
                >
                  {range}
                </li>
              ))
            ) : (
              <li className="bg-white dark:bg-gray-700 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400">
                No price ranges available
              </li>
            )}
          </ul>
        </div>
      </div>
    </aside>
  );
};
