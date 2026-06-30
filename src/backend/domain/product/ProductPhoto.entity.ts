// Re-exported from Product.entity.ts to break circular dependency.
// Both Product and ProductPhoto live in the same file so the bidirectional
// TypeORM relationship can reference both classes at decoration time.
export { ProductPhoto } from "./Product.entity"
