/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImagePreview from "@/components/ui/ImagePreview";
import { AddRestaurantSchema } from "@/schema/RestaurantSchema";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addnewrestaurant } from "../AdminAPI";
import { toast } from "@/components/ui/use-toast";

export default function AddRestaurant() {
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(null);
  const { mutate } = useMutation({
    mutationFn: addnewrestaurant,
    onSuccess: () => {
      toast({
        description: "Restaurant Added Sucessfully",
      });
      queryClient.invalidateQueries("restaurants");
    },
  });

  const form = useForm({
    resolver: zodResolver(AddRestaurantSchema),
    defaultValues: {
      image: new File([], ""),
      name: "",
      costForTwo: "",
      slaString: "",
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) form.setValue("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result.toString());
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data?.image);
    formData.append("name", data?.name);
    formData.append("slaString", data.slaString);
    formData.append("costForTwo", `₹${data?.costForTwo} for two`);
    mutate({ formData: formData });
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full flex ">
          <div className="w-1/2 flex flex-col px-4 space-y-4">
            <FormField
              name="image"
              control={form.control}
              render={() => (
                <FormItem className="w-full ">
                  <FormLabel htmlFor="image">Restaurant Logo</FormLabel>
                  <FormControl>
                    <Input
                      className="hidden"
                      accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                      type="file"
                      id="image"
                      onChange={(e) => handleImageChange(e)}
                    />
                  </FormControl>
                  <FormLabel htmlFor="image" className="w-full">
                    <ImagePreview imagePreview={imagePreview} />
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4 w-[50%] ">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restaurant Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="costForTwo"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost For Two {"(₹)"}</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="slaString"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Time in Mins</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0-0 mins"
                      type="text"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-center pt-10">
          <Button
            type="submit"
            className="inline-flex w-fit items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-green-700 hover:bg-green-800 transition ease-in-out duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Save</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
