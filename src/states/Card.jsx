import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCardStore = create(
    persist(
        (set, get) => ({
            productsSize: 0,
            products: "",

            addProduct: (productId) => {
                const products = get().products
                const productsSize = get().productsSize

                if (products.length > 0) {
                    const existingProduct = products.filter((product) => product.productId == productId)

                    if (existingProduct.length > 0) {
                        const filtredProduct = products.filter((product) => product.productId != productId)
                        const updatedProductPiece = existingProduct[0].piece + 1

                        set({
                            products: [...filtredProduct, { productId: productId, piece: updatedProductPiece }],
                            productsSize: productsSize + 1
                        })
                    } else {
                        set({
                            products: [...products, { productId: productId, piece: 1 }],
                            productsSize: productsSize + 1
                        })
                    }
                } else {
                    set({
                        products: [...products, { productId: productId, piece: 1 }],
                        productsSize: productsSize + 1
                    })
                }
            },
            removeProduct: (productId) => {
                const products = get().products
                const productsSize = get().productsSize
                const productPiece = products.find((product) => product.productId == productId).piece

                set({
                    products: products.filter((product) => product.productId != productId),
                    productsSize: productsSize - productPiece
                })
            },
            editPiece: (productId, increase) => {
                const products = get().products
                const productsSize = get().productsSize
                const existingProduct = products.find((product) => product.productId == productId)
                const filtredProduct = products.filter((product) => product.productId != productId)

                if (increase) {
                    set({
                        products: [...filtredProduct, { productId: productId, piece: existingProduct.piece + 1 }],
                        productsSize: productsSize + 1
                    })
                } else {
                    set({
                        products: [...filtredProduct, { productId: productId, piece: existingProduct.piece > 1 ? existingProduct.piece - 1 : 1 }],
                        productsSize: productsSize > 1 ? productsSize - 1 : 0
                    })
                }
            },
        }),
        {
            name: "cardProducts",
        }
    )
);
