"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Weight, Palette, Share2 } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ImageGallery } from "./ImageGallery";
import { FavouriteButton } from "../widgets/FavouriteButton";
import { AddToCartButton } from "../widgets/AddToCartButton";
import { LivestockList } from "@/infrastructure/marketplace/dto/listed.livestock";
import { ShareButton } from "./ShareButton";

interface Props {
  listedAnmals: LivestockList[];
}

export const LivestockDetailPage: React.FC<Props> = ({ listedAnmals }) => {
  const { id } = useParams();

  const livestock = listedAnmals.find((item) => item.recordId === id);

  if (!livestock) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Animal not found
          </h1>
          <Link href={"/viewlisting"}  className="flex gap-2 items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to listings
          </Link>
        </div>
      </div>
    );
  }

  const age =
    new Date().getFullYear() - new Date(livestock.dateOfBirth).getFullYear();
  const purchaseDate = new Date(livestock.purchaseDate).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href={"/viewlisting"}  className="flex items-center p-2 hover:text-white font-semibold rounded hover:bg-red-500 w-fit">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to listings
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <ImageGallery
              images={livestock.imageUrl}
              animalName={livestock.name}
            />
          </div>

          {/* Animal Details */}
          <div className="space-y-6">
            {/* Title and Status */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {livestock.name}
                  </h1>
                  <p className="text-lg text-gray-600 mb-2">
                    {livestock.breed}
                  </p>
                  <p className="text-sm text-gray-500">
                    Tag: {livestock.tagNumber}
                  </p>
                </div>

                <div className="flex gap-2">
                  <FavouriteButton livestock={livestock} className="" />
                  <ShareButton/>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Badge
                  variant={
                    livestock.status === "Available" ? "default" : "secondary"
                  }
                  className="px-3 py-1"
                >
                  {livestock.status}
                </Badge>
                <Badge
                  variant={
                    livestock.healthStatus === "Healthy"
                      ? "default"
                      : "destructive"
                  }
                  className="px-3 py-1"
                >
                  {livestock.healthStatus}
                </Badge>
              </div>

              <div className="text-3xl font-bold text-green-600 mb-6">
                ${livestock.purchasePrice.toLocaleString()}
              </div>

              <div className="flex gap-3">
                <AddToCartButton livestock={livestock} />
              </div>
            </div>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-medium">{age} years old</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">{livestock.gender}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Weight className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-medium">{livestock.weight} kg</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Color</p>
                    <p className="font-medium">{livestock.color}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">{livestock.type}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">
                    {new Date(livestock.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Purchase Information */}
            <Card>
              <CardHeader>
                <CardTitle>Purchase Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Purchase Date</p>
                    <p className="font-medium">{purchaseDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Health Status</p>
                    <p className="font-medium">{livestock.healthStatus}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            {livestock.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {livestock.notes}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Member Access Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="font-semibold text-green-800">
                  Members Access
                </span>
              </div>
              <p className="text-sm text-green-700">
                This listing is available to verified members. Login for more
                information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
