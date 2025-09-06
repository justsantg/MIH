export interface ProductFormData {
  name: string;
  description: string;
  unitPrice: string;
  wholesalePrice: string;
  stock: string;
  categoryId: string;
  imageFile?: File | null;
}
