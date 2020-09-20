export interface ProductsModel {
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    imageId: string;
    type: string;
    variant: Array<VariantModel>;
    subcategory?: string;
    filePath?: string;
};

export interface VariantModel {
    enable: boolean;
    productstock: number;
    unit: string;
    price: number;
}
