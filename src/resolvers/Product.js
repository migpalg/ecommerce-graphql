exports.Product = {
  category: ({ categoryId }, _, { data: { categories } }) => {
    if (!categoryId) return null;

    return categories.find(({ id }) => id === categoryId);
  },

  reviews: ({ id: parentId }, _, { data: { reviews } }) =>
    reviews.filter(({ productId }) => productId === parentId),
};
