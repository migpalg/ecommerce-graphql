exports.Query = {
  products: (_, { filter }, { data: { products, reviews } }) => {
    let filtered = [...products];

    if (filter?.onSale) {
      filtered = filtered.filter(({ onSale }) => onSale === filter.onSale);
    }

    if (filter?.average && filter.average >= 1 && filter.average <= 5) {
      filtered = filtered.filter(({ id }) => {
        const productReviews = reviews.filter(
          ({ productId }) => productId === id
        );

        if (!productReviews?.length) return false;

        const sum = productReviews.reduce((sum, obj) => obj.rating + sum, 0);

        return sum / productReviews.length >= filter.average;
      });
    }

    return filtered;
  },
  product: (_, { id }, { data: { products } }) =>
    products.find(({ id: productId }) => productId === id) || null,
  categories: (_, __, { data: { categories } }) => categories,
  category: (_, { id }, { data: { categories } }) =>
    categories.find(({ id: categoryId }) => id === categoryId) || null,
};
