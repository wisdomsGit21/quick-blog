import { slugify } from "@/utilities/slugify";
import { CollectionConfig } from "payload";

const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.name) {
              return slugify(data.name);
            }
            return data?.slug;
          },
        ],
      },
    },
  ],
};

export default Categories;
