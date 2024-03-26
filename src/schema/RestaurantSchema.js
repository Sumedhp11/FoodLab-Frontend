import { z } from "zod";

export const EditRestaurantSchema = z.object({
  name: z.string(),
  image: z.instanceof(File),
  costForTwo: z.string(),
});
export const AddRestaurantSchema = z.object({
  name: z.string(),
  image: z.instanceof(File),
  slaString: z.string(),
  costForTwo: z.string(),
});
