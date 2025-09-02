"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { CiTrophy } from "react-icons/ci";

type FormData = {
  schoolName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  image: FileList;
};

export default function SMSForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      let imageUrl: string | null = null;

      if (data.image && data.image[0]) {
        const file = data.image[0];
        // const filePath = `school-images/${Date.now()}-${file.name}`;

        // const { error: uploadError } = await supabase.storage
        //   .from("school-images")
        //   .upload(filePath, file);
        // if (uploadError) {
        //   throw uploadError;
        // }
        // const { data: publicUrlData } = supabase.storage
        //   .from("school-images")
        //   .getPublicUrl(filePath);
        // imageUrl = publicUrlData?.publicUrl || null;

        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/uploadsImages", {
          method: "POST",
          body: formData,
        });
        const resData = await res.json();
        if (res.ok) {
          imageUrl = resData.url;
        } else {
          throw new Error(resData.error || "Image upload failed");
        }
      }

      const { error: insertError } = await supabase.from("schools").insert([
        {
          school_name: data.schoolName,
          email: data.email,
          phone_number: data.phoneNumber,
          address: data.address,
          city: data.city,
          state: data.state,
          image_url: imageUrl,
        },
      ]);
      if (insertError) {
        throw insertError;
      }
      alert("School added successfully!");
      reset();
      setPreview(null);
    } catch (error: any) {
      console.error("Error adding school:", error?.message || error);
      alert("Failed to add school. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <main className="flex min-h-[calc(100svh-64px)] items-center justify-center p-4 ">
        <Card className="w-full max-w-xl ">
          <CardHeader>
            <CardTitle className="text-pretty">Add a school</CardTitle>
            <CardDescription>
              Enter the school details and upload a photo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              {/* School Name*/}

              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="schoolName" className="font-medium">
                  School Name
                </label>
                <input
                  id="schoolName"
                  {...register("schoolName", {
                    required: "School Name is required",
                  })}
                  className="border p-2 rounded"
                />
                {errors.schoolName && (
                  <p className="text-red-500">
                    {errors.schoolName.message as string}
                  </p>
                )}
              </div>

              {/*Email*/}

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="border p-2 rounded"
                />
                {errors.email && (
                  <p className="text-red-500">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

              {/* Phone Number*/}
              <div className="flex flex-col gap-2">
                <label htmlFor="phoneNumber" className="font-medium">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                  })}
                  className="border p-2 rounded"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500">
                    {errors.phoneNumber.message as string}
                  </p>
                )}
              </div>

              {/* Address*/}

              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="address" className="font-medium">
                  Address
                </label>
                <input
                  id="address"
                  {...register("address", { required: "Address is required" })}
                  className="border p-2 rounded"
                />
                {errors.address && (
                  <p className="text-red-500">
                    {errors.address.message as string}
                  </p>
                )}
              </div>

              {/* City*/}
              <div className="flex flex-col gap-2">
                <label htmlFor="city" className="font-medium">
                  City
                </label>
                <input
                  id="city"
                  {...register("city", { required: "City is required" })}
                  className="border p-2 rounded"
                />
              </div>

              {/* State*/}
              <div className="flex flex-col gap-2">
                <label htmlFor="state" className="font-medium">
                  State
                </label>
                <input
                  id="state"
                  {...register("state", { required: "State is required" })}
                  className="border p-2 rounded"
                />
              </div>

              {/* Photo Upload*/}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="image" className="font-medium">
                  Upload Photo
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  {...register("image", { required: "Image is required" })}
                  onChange={handleFileChange}
                  className="border p-2 rounded"
                />
                {preview ? (
                  <img
                    src={preview}
                    alt="Image Preview"
                    className="mt-2 max-h-48 object-cover"
                  />
                ) : (
                  <p className="text-gray-500">No image selected</p>
                )}
                {errors.image && (
                  <p className="text-red-500">
                    {errors.image.message as string}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="md:col-span-2 rounded bg-blue-600 p-2 text-white hover:bg-blue-700 cursor-pointer"
              >
                Submit
              </button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
