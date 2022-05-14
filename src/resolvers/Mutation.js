const { v4: uuid } = require("uuid");

exports.Mutation = {
  addCategory: (_, { input }, { data: { categories } }) => {
    const { name } = input;

    const newCategory = {
      id: uuid(),
      name,
    };

    categories.push(newCategory);

    return newCategory;
  },

  addProduct: (_, { input }, { data: { products, categories } }) => {
    const newProduct = {
      ...input,
      id: uuid(),
    };

    products.push(newProduct);

    return newProduct;
  },

  addReview: (_, { input }, { data: { reviews } }) => {
    const newReview = {
      id: uuid(),
      date: new Date().toISOString(),
      ...input,
    };

    reviews.push(newReview);

    return newReview;
  },

  deleteCategory: (_, { categoryId }, { data: { categories, products } }) => {
    const categoryIndex = categories.findIndex(
      (category) => category.id === categoryId
    );

    if (categoryIndex < 0) return false;

    products = products.map((product) =>
      product.categoryId === categoryId
        ? { ...product, categoryId: null }
        : product
    );

    categories.splice(categoryIndex, 1);

    return true;
  },

  deleteProduct: (_, { productId }, { data: { products, reviews } }) => {
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );

    if (productIndex < 0) return false;

    reviews = reviews.filter((review) => review.productId !== productId);

    products.splice(productIndex, 1);

    return true;
  },

  deleteReview: (_, { reviewId }, { data: { reviews } }) => {
    const reviewIndex = reviews.findIndex((review) => review.id === reviewId);

    if (reviewIndex < 0) return false;

    reviews.splice(reviewIndex, 1);

    return true;
  },

  updateCategory: (_, { categoryId, input }, { data: { categories } }) => {
    const foundIndex = categories.findIndex(
      (category) => category.id === categoryId
    );

    // If found index is -1 is because doesn't found an index
    if (foundIndex < 0) {
      throw new Error("Category not found");
    }

    categories[foundIndex] = {
      ...categories[foundIndex],
      ...input,
    };

    return categories[foundIndex];
  },

  updateProduct: (_, { productId, input }, { data: { products } }) => {
    const foundIndex = products.findIndex(
      (product) => product.id === productId
    );

    // If found index is -1 is because doesn't found an index
    if (foundIndex < 0) {
      throw new Error("Product not found");
    }

    products[foundIndex] = {
      ...products[foundIndex],
      ...input,
    };

    return products[foundIndex];
  },

  updateReview: (_, { reviewId, input }, { data: { reviews } }) => {
    const foundIndex = reviews.findIndex((review) => review.id === reviewId);

    // If found index is -1 is because doesn't found an index
    if (foundIndex < 0) {
      throw new Error("Review not found");
    }

    reviews[foundIndex] = {
      ...reviews[foundIndex],
      ...input,
    };

    return reviews[foundIndex];
  },
};
