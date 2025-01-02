"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function projectform() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [moneyrequired, setMoneyRequired] = useState<number>(0);
  const [image, setImages] = useState("");
  const [location, setLocation] = useState(""); 
  const [ngo, setNgo] = useState("");
  const [eventDate, setEventDate] = useState(""); // New state for event date

  useEffect(() => {
    const savedToken = localStorage.getItem("ngoname");
    if (savedToken) {
      setNgo(savedToken);
    }
  }, []);

  const router = useRouter();

  const handleCreate = async () => {
    try {
      const payload = {
        name,
        description,
        ngo,
        moneyrequired,
        image,
        location,
        eventDate, // Include event date in payload
      };
      console.log(payload);

      const response = await axios.post(
        "https://eventmanagementbackend-o7k8.onrender.com/api/createproject",
        payload
      );

      if (response.status === 200) {
        alert("Created Project successfully!");
      } else {
        alert(response.data.message || "Failed to register");
      }
      console.log(response.data);
    } catch (err) {
      console.log(err);
      alert("Error during Creating Project. Please try again.");

    }
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setImages(result);
        }
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Register a New Event</CardTitle>
        <CardDescription>
          Share details about your Upcoming Event.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Event Name</Label>
              <Input
                id="name"
                placeholder="Rebuild the community center"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Provide details about the project..."
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Name of Organiser</Label>
              <Input
                id="location"
                placeholder="Abc Singh (club secretary)"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="funding">Prize Pool</Label>
              <Input
                id="funding"
                type="number"
                placeholder="50000"
                onChange={(e) =>
                  setMoneyRequired(parseFloat(e.target.value) || 0)
                }
              />
            </div>
            <div>
              <Label htmlFor="status">Event Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Event Date</Label>
              <Input
                id="date"
                type="date"
                onChange={(e) => setEventDate(e.target.value)} // Update eventDate state
              />
            </div>
            <div>
              <Label htmlFor="image">Poster</Label>
              <Input id="image" type="file" onChange={handleImageUpload} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit" onClick={handleCreate}>
          Register Event
        </Button>
      </CardFooter>
    </Card>
  );
}
