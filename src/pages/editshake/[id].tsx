"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import supabase from "@/config/supabaseClient";
import { Shakes } from "@/types/types";
import { TextField, Button, CircularProgress, Alert } from "@mui/material";

// Function to fetch a single shake by its ID from Supabase
const fetchShakeById = async (id: number): Promise<Shakes | null> => {
  const { data, error } = await supabase
    .from("shakes")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data as Shakes;
};

// Function to update the shake in Supabase
const updateShake = async (shake: Shakes) => {
  const { data, error } = await supabase
    .from("shakes")
    .update({
      title: shake.title,
      method: shake.method,
      rating: shake.rating,
    })
    .eq("id", shake.id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const EditShake: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the ID from the URL

  const [shake, setShake] = useState<Shakes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the shake data when the component mounts
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const shakeData = await fetchShakeById(Number(id));
          setShake(shakeData);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch shake: " + (error as Error).message);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShake((prevShake) =>
      prevShake ? { ...prevShake, [name]: value } : null
    );
  };

  // Mutation hook to handle the update
  const {
    mutate,
    isPending: isMutating,
    isError,
  } = useMutation({
    mutationFn: updateShake,
    onSuccess: () => {
      router.push("/showshakes"); // Redirect to the home page or shakes list after successful update
    },
    onError: (error) => {
      setError("Failed to update shake: " + (error as Error).message);
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shake) {
      mutate(shake); // Pass the shake data to the mutate function
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-6">
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <h2 className="text-4xl font-bold text-purple-800 mb-8">Edit Shake</h2>

      {isError && (
        <Alert severity="error" className="mb-4">
          Failed to update shake. Please try again.
        </Alert>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full bg-white shadow-xl rounded-lg p-8 space-y-6"
      >
        <div>
          <TextField
            label="Title"
            variant="outlined"
            name="title"
            value={shake?.title || ""}
            onChange={handleChange}
            fullWidth
            required
            className="rounded-lg shadow-sm"
            inputProps={{
              className: "p-3 text-lg",
            }}
          />
        </div>

        <div>
          <TextField
            label="Method"
            variant="outlined"
            name="method"
            value={shake?.method || ""}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={4}
            className="rounded-lg shadow-sm"
            inputProps={{
              className: "p-3 text-lg",
            }}
          />
        </div>

        <div>
          <TextField
            label="Rating"
            variant="outlined"
            name="rating"
            type="number"
            value={shake?.rating || ""}
            onChange={handleChange}
            fullWidth
            required
            className="rounded-lg shadow-sm"
            inputProps={{
              min: 1,
              max: 5,
              className: "p-3 text-lg",
            }}
          />
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isMutating}
            fullWidth
            className="rounded-full py-3 text-lg font-semibold"
          >
            {isMutating ? "Updating..." : "Update Shake"}
          </Button>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.push("/showshakes")}
            fullWidth
            className="rounded-full py-3 text-lg font-semibold"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditShake;
