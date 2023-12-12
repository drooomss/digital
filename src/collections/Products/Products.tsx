
import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";

export const Products: CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "name"
    },
    access: {},
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: () => false
            }
        },
        {
            name: "name",
            label: "Label",
            type: "text",
            required: true,
        },
        {
            name: "descripcion",
            type: "textarea",
            label: "Detalles del producto"

        },
        {
            name: 'price',
            label: "Precio en dolares",
            min: 0,
            max: 2000,
            type: "number",
            required: true,
        },
        {
            name: 'Categoria',
            label: "Categoria",
            type: "select",
            options: PRODUCT_CATEGORIES.map(({label, value}) => ({label, value})
            ),
            required: true,
        },
        {
            name: "product_files",
            label: "product_file(s)",
            type: "relationship",
            required: true,
            relationTo: "product_files",
            hasMany: false,
        },
        {
            name: "approvedForSale",
            label: "Product_Status",
            type: "select",
            defaultValue: "pending",
            access: {
                create: ({req}) => req.user.role === "admin" ,
                read: ({req}) => req.user.role === "admin", 
                update: ({req}) => req.user.role === "admin",
            },
            options: [
                {
                    label: "Verificacion pendiente",
                    value: "pendiente"
                },
                {
                    label: "Aprobado",
                    value: "approved"
                },
                {
                    label: "Denegado",
                    value: "denegado"
                }
            ]
        },
        {
            name: "priceId",
            access: {
                create: () => false,
                read: () => false,
                update: () => false,
            },
            type: "text",
            admin: {
                hidden: true,
            },
        },
        {
            name: "stripeId",
            access: {
                create: () => false,
                read: () => false,
                update: () => false,
            },
            type: "text",
            admin: {
                hidden: true,
            },
        },
        {
            name: "images",
            type: "array",
            label: "Product Images",
            minRows: 1,
            maxRows: 4,
            required: true,
            labels: {
                singular: "Image",
                plural: "Images",
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                }
            ]
        }
    ],
}