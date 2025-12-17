import { getCategories } from '@/lib/categories';
import { getDeliveryTimes, getPriceRanges } from '@/lib/restaurants';

export const Sidebar = async () => {
  const categories = await getCategories();
  const deliveryTimes = await getDeliveryTimes();
  const priceRanges = await getPriceRanges();

  return (
    <aside>
      <h3>Filter</h3>

      <h4>Food Category</h4>
      <ul>
        {categories?.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>

      <h4>Delivery Time</h4>
      <ul>
        {deliveryTimes?.map((time: number) => (
          <li key={time}>{time} minutes</li>
        ))}

        <li>60+ minutes</li>
      </ul>

      <h4>Price Range</h4>
      <ul>
        {priceRanges?.map((range: number) => (
          <li key={range}>{range}</li>
        ))}
      </ul>
    </aside>
  );
};
