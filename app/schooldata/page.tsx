import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { supabase } from "@/lib/supabaseClient";

export default async function SchoolData() {
  // Sample data for demonstration
  const { data: schools, error } = await supabase.from("schools").select("*");

  console.log("schools:", schools);

  if (error) {
    return <p className="text-red-500">Failed to fetch schools</p>;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="mx-auto max-w-6xl min-h-screen px-4 py-10">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center ">Schools Data</h1>
          <p className="text-center text-gray-600 mt-2">
            View schools information
          </p>
        </header>
        <section className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-6 p-3">
          {schools.map((s) => (
            <Card key={s.id} className="overflow-hidden">
              <div className="aspect-[4/3] w-full bg-muted">
                {s.image_url ? (
                  <img
                    src={s.image_url}
                    alt={`${s.school_name}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
                    No Image Available
                  </div>
                )}
              </div>
              <div>
                <CardHeader>
                  <CardTitle className="text-lg">{s.school_name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    <strong>Address:</strong> {s.address}
                  </p>
                  <p>
                    <strong>Contact Number:</strong> {s.phone_number}
                  </p>
                  <p>
                    <strong>Email:</strong> {s.email}
                  </p>
                </CardContent>
              </div>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
