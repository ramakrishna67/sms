import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { School, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            School Management System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage and discover schools with our comprehensive platform. Add new
            schools or browse existing institutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-slate-200 transition-colors">
                <School className="w-8 h-8 text-gray-500" />
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Add School
              </CardTitle>
              <CardDescription className="text-gray-600">
                Register a new school with complete information and upload
                school images
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/smsform">
                <Button className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 text-lg font-medium transition-colors">
                  Add New School
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                <Users className="w-8 h-8 text-gray-600" />
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                View Schools
              </CardTitle>
              <CardDescription className="text-gray-600">
                Browse and discover schools in your area with detailed
                information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/schooldata">
                <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 text-lg font-medium transition-colors">
                  Browse Schools
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
