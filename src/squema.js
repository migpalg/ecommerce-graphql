const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    products(filter: ProductsFilterInput): [Product!]!
    product(id: String!): Product
    categories: [Category!]!
    category(id: String!): Category
  }

  type Mutation {
    addCategory(input: AddCategoryInput!): Category!
    addProduct(input: AddProductInput!): Product!
    addReview(input: AddReviewInput!): Review!
    deleteCategory(categoryId: ID!): Boolean!
    deleteProduct(productId: ID!): Boolean!
    deleteReview(reviewId: ID!): Boolean!
    updateCategory(categoryId: ID!, input: UpdateCategoryInput!): Category!
    updateProduct(productId: ID!, input: UpdateProductInput!): Product!
    updateReview(reviewId: ID!, input: UpdateReviewInput!): Review!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    category: Category
    reviews: [Review!]
  }

  type Category {
    id: ID!
    name: String
    products(filter: ProductsFilterInput): [Product!]!
  }

  # Inputs
  input ProductsFilterInput {
    onSale: Boolean
    average: Int
  }

  input AddCategoryInput {
    name: String!
  }

  input UpdateCategoryInput {
    name: String
  }

  input AddProductInput {
    name: String!
    description: String!
    quantity: Int!
    image: String!
    price: Float!
    onSale: Boolean!
    categoryId: String!
  }

  input UpdateProductInput {
    name: String
    description: String
    quantity: Int
    image: String
    price: Float
    onSale: Boolean
    categoryId: String
  }

  input AddReviewInput {
    title: String!
    comment: String!
    rating: Int!
    productId: String!
  }

  input UpdateReviewInput {
    title: String
    comment: String
    rating: Int
    productId: String
  }
`;
