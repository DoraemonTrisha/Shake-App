"use client";

import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import supabase from "@/config/supabaseClient";
import { Shakes } from "@/types/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const deleteShake = async (shakeId: number) => {
  const { error } = await supabase.from("shakes").delete().eq("id", shakeId);
  if (error) {
    throw new Error(error.message);
  }
  return shakeId;
};

const fetchShakes = async (): Promise<Shakes[]> => {
  const { data, error } = await supabase
    .from("shakes")
    .select("*")
    .order("id", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data as Shakes[];
};

const ShowShakes: React.FC = () => {
  const { data, isLoading, error } = useQuery<Shakes[]>({
    queryKey: ["shakes"],
    queryFn: fetchShakes,
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [shakeToDelete, setShakeToDelete] = useState<number | null>(null);

  const handleEdit = (shakeId: number) => {
    router.push(`/editshake/${shakeId}`);
  };

  const { mutate } = useMutation({
    mutationFn: deleteShake,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shakes"] });
      setOpen(false);
    },
    onError: (error) => {
      alert(`Error deleting shake: ${(error as Error).message}`);
    },
    onSettled: () => {
      console.log("Delete operation settled (either success or failure).");
    },
    onMutate: async (variables) => {
      console.log("Mutation started with variables:", variables);
    },
  });

  const handleDelete = () => {
    if (shakeToDelete !== null) {
      mutate(shakeToDelete);
    }
  };

  const handleDeleteClick = (shakeId: number) => {
    setShakeToDelete(shakeId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-6">
        <Alert severity="error">Failed to load shakes: {error.message}</Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        className="text-purple-800 font-bold mb-8"
      >
        All Shakes
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center">
        {data && data.length > 0 ? (
          data.map((shake) => (
            <Card
              key={shake.id}
              className="shadow-lg rounded-3xl transition-transform transform hover:-translate-y-2 hover:shadow-2xl w-full flex flex-col"
            >
              <CardContent className="flex flex-col justify-between w-full">
                <div className="text-center">
                  <Typography
                    variant="h6"
                    component="div"
                    className="font-bold mb-2 text-purple-900"
                  >
                    {shake.title}
                  </Typography>
                  <Typography variant="body2" className="mb-2 text-gray-700">
                    {shake.method}
                  </Typography>
                </div>

                <Typography
                  variant="body1"
                  className="mt-auto font-semibold text-purple-700 text-center"
                >
                  ⭐ {shake.rating}/5
                </Typography>

                <div className="mt-4 flex justify-center gap-4">
                  <IconButton
                    onClick={() => handleEdit(shake.id)}
                    className="text-purple-500 hover:text-purple-700"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(shake.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-1 flex justify-center w-full">
            <Alert severity="info" className="w-full max-w-md text-center">
              No shakes found. Create one!
            </Alert>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this shake?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShowShakes;

// "use client";

// import { useQuery } from "@tanstack/react-query";
// import supabase from "@/config/supabaseClient";
// import { Shakes } from "@/types/types";
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Alert,
// } from "@mui/material";

// const fetchShakes = async (): Promise<Shakes[]> => {
//   const { data, error } = await supabase
//     .from("shakes")
//     .select("*")
//     .order("id", { ascending: false });
//   if (error) {
//     throw new Error(error.message);
//   }
//   return data as Shakes[];
// };

// const ShowShakes: React.FC = () => {
//   const { data, isLoading, error } = useQuery<Shakes[]>({
//     queryKey: ["shakes"],
//     queryFn: fetchShakes,
//   });

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-lg mx-auto mt-6">
//         <Alert severity="error">Failed to load shakes: {error.message}</Alert>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
//       <Typography
//         variant="h4"
//         align="center"
//         gutterBottom
//         className="text-purple-800 font-bold mb-8"
//       >
//         All Shakes
//       </Typography>

//       <Grid container spacing={4} justifyContent="center">
//         {data && data.length > 0 ? (
//           data.map((shake) => (
//             <Grid
//               item
//               xs={12}
//               sm={6}
//               md={4}
//               key={shake.id}
//             >
//               <Card
//                 className="shadow-lg rounded-3xl transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
//                 sx={{
//                   minHeight: 300,
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "flex-start",
//                   backgroundColor: "#f5f3ff",
//                   color: "#4c1d95",
//                 }}
//               >
//                 <CardContent className="flex flex-col flex-grow">
//                   {/* Show Image if it exists */}
//                   {shake.image_url && (
//                     <img
//                       src={shake.image_url}
//                       alt={shake.title}
//                       className="w-full h-48 object-cover rounded-t-lg"
//                     />
//                   )}

//                   <Typography
//                     variant="h6"
//                     component="div"
//                     className="font-bold mb-2 text-purple-900"
//                   >
//                     {shake.title}
//                   </Typography>

//                   <Typography variant="body2" className="mb-2 text-gray-700">
//                     {shake.method}
//                   </Typography>

//                   <Typography
//                     variant="body1"
//                     className="mt-auto font-semibold text-purple-700"
//                   >
//                     ⭐ {shake.rating}/5
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Grid item xs={12}>
//             <Alert severity="info">No shakes found. Create one!</Alert>
//           </Grid>
//         )}
//       </Grid>
//     </div>
//   );
// };

// export default ShowShakes;
