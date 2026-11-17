"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import supabase from "@/config/supabaseClient";
import { NewShake, Shakes } from "@/types/types";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { TextField, CircularProgress, Card, CardContent } from "@mui/material";
import { Button } from "@/components/ui/button";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  method: Yup.string().required("Method is required"),
  rating: Yup.number()
    .required("Rating is required")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
});

const createShake = async (data: NewShake): Promise<Shakes> => {
  const { title, method, rating } = data;
  const { data: inserted, error } = await supabase
    .from("shakes")
    .insert([{ title, method, rating }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return inserted as Shakes;
};

const CreateShakeForm: React.FC = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewShake>({
    resolver: yupResolver(validationSchema),
  });

  const mutation = useMutation<Shakes, Error, NewShake>({
    mutationFn: createShake,
    onSuccess: () => {
      setSuccessMessage("Shake created successfully!");
      setTimeout(() => {
        router.push("/showshakes");
      }, 1000);
    },
    onError: (error) => {
      setSubmitError(error.message);
    },
  });

  const onSubmit: SubmitHandler<NewShake> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4">
      <Card className="w-full max-w-lg shadow-2xl rounded-3xl">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
            Create New Shake
          </h2>

          {successMessage && (
            <div className="bg-green-200 text-green-800 p-3 rounded my-3 text-center font-medium">
              {successMessage}
            </div>
          )}
          {submitError && (
            <div className="bg-red-200 text-red-800 p-3 rounded my-3 text-center font-medium">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Title */}
            <div className="form-group">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-purple-700 mb-1"
              >
                Title
              </label>
              <TextField
                {...register("title")}
                variant="outlined"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </div>

            {/* Method */}
            <div className="form-group">
              <label
                htmlFor="method"
                className="block text-sm font-semibold text-purple-700 mb-1"
              >
                Method
              </label>
              <TextField
                {...register("method")}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                error={!!errors.method}
                helperText={errors.method?.message}
              />
            </div>

            {/* Rating */}
            <div className="form-group">
              <label
                htmlFor="rating"
                className="block text-sm font-semibold text-purple-700 mb-1"
              >
                Rating
              </label>
              <TextField
                {...register("rating", { valueAsNumber: true })}
                variant="outlined"
                fullWidth
                type="number"
             inputProps={{ min: 1, max: 5 }}
                error={!!errors.rating}
                helperText={errors.rating?.message}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl flex justify-center items-center"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <CircularProgress size={24} />
              ) : (
                "Create Shake"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateShakeForm;

// import React, { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import * as Yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import supabase from "@/config/supabaseClient";
// import { NewShake } from "@/types/types";
// import {
//   Button,
//   TextField,
//   CircularProgress,
//   Card,
//   CardContent,
// } from "@mui/material";

// // Validation schema for the form
// const validationSchema = Yup.object().shape({
//   title: Yup.string().required("Title is required"),
//   method: Yup.string().required("Method is required"),
//   rating: Yup.number()
//     .required("Rating is required")
//     .min(1, "Rating must be at least 1")
//     .max(5, "Rating must be at most 5"),
// });

// // Function to upload image to Supabase Storage
// const uploadImage = async (file: File): Promise<string | null> => {
//   const fileName = `${Date.now()}-${file.name}`;

//   try {
//     const { data, error } = await supabase.storage
//       .from("shakes-images") // Your bucket name
//       .upload(fileName, file);

//     if (error) {
//       throw error;
//     }

//     const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.path}`;
//     return publicUrl;
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     return null;
//   }
// };

// const CreateShakeForm: React.FC = () => {
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imageUrl, setImageUrl] = useState<string | null>(null); // To store the URL of the uploaded image
//   const [submitError, setSubmitError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<NewShake>({
//     resolver: yupResolver(validationSchema),
//   });

//   const onSubmit: SubmitHandler<NewShake> = async (data) => {
//     try {
//       if (imageFile) {
//         const uploadedImageUrl = await uploadImage(imageFile); // Upload image and get the URL
//         if (uploadedImageUrl) {
//           data.image_url = uploadedImageUrl; // Add image URL to the form data
//         }
//       }

//       // Insert new shake data including the image URL (if available) into the database
//       const { data: inserted, error } = await supabase
//         .from("shakes")
//         .insert([data]);

//       if (error) {
//         setSubmitError(error.message);
//       } else {
//         setSuccessMessage("Shake created successfully!");
//       }
//     } catch (error) {
//       setSubmitError("Failed to create shake: " + error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4">
//       <Card className="w-full max-w-lg shadow-2xl rounded-3xl">
//         <CardContent className="p-8">
//           <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
//             Create New Shake
//           </h2>

//           {successMessage && (
//             <div className="bg-green-200 text-green-800 p-3 rounded my-3 text-center font-medium">
//               {successMessage}
//             </div>
//           )}
//           {submitError && (
//             <div className="bg-red-200 text-red-800 p-3 rounded my-3 text-center font-medium">
//               {submitError}
//             </div>
//           )}

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//             {/* Title */}
//             <div className="form-group">
//               <label
//                 htmlFor="title"
//                 className="block text-sm font-semibold text-purple-700 mb-1"
//               >
//                 Title
//               </label>
//               <TextField
//                 {...register("title")}
//                 variant="outlined"
//                 fullWidth
//                 error={!!errors.title}
//                 helperText={errors.title?.message}
//               />
//             </div>

//             {/* Method */}
//             <div className="form-group">
//               <label
//                 htmlFor="method"
//                 className="block text-sm font-semibold text-purple-700 mb-1"
//               >
//                 Method
//               </label>
//               <TextField
//                 {...register("method")}
//                 variant="outlined"
//                 fullWidth
//                 multiline
//                 rows={4}
//                 error={!!errors.method}
//                 helperText={errors.method?.message}
//               />
//             </div>

//             {/* Rating */}
//             <div className="form-group">
//               <label
//                 htmlFor="rating"
//                 className="block text-sm font-semibold text-purple-700 mb-1"
//               >
//                 Rating
//               </label>
//               <TextField
//                 {...register("rating", { valueAsNumber: true })}
//                 variant="outlined"
//                 fullWidth
//                 type="number"
//                 inputProps={{ min: 1, max: 5 }}
//                 error={!!errors.rating}
//                 helperText={errors.rating?.message}
//               />
//             </div>

//             {/* Image Upload */}
//             <div className="form-group">
//               <label
//                 htmlFor="image"
//                 className="block text-sm font-semibold text-purple-700 mb-1"
//               >
//                 Image
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) =>
//                   setImageFile(e.target.files ? e.target.files[0] : null)
//                 }
//                 className="border border-gray-300 p-2 rounded w-full"
//               />
//             </div>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl flex justify-center items-center"
//             >
//               Create Shake
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default CreateShakeForm;
