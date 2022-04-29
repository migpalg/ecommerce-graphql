exports.Category = {
  products: ({ id: parentId }, { filter }, { data: { products, reviews } }) => {
    let filtered = products.filter(({ categoryId }) => categoryId === parentId);

    if (filter?.onSale) {
      filtered = filtered.filter(({ onSale }) => onSale === filter.onSale);
    }

    if (filter?.average && filter.average >= 1 && filter.average <= 5) {
      filtered = filtered.filter(({ id }) => {
        const productReviews = reviews.filter(
          ({ productId }) => productId === id
        );

        if (!productReviews?.length) return false;

        const sum = productReviews.reduce(
          (ratingSum, { rating }) => rating + ratingSum,
          0
        );

        return sum / productReviews.length >= filter.average;
      });
    }

    return filtered;
  },
};
