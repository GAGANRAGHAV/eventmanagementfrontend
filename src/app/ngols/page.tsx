"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function login() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clubName, setClubName] = useState("");
  const [logo, setLogo] = useState<File | null>(null);

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogo(e.target.files[0]);
    } else {
      setLogo(null); // Optionally handle the case when no file is selected
    }
  };

  const handleRegister = async () => {
    if (logo) {
      try {
        const imageRef = ref(storage, `images/${logo.name}`);

        // Upload the file to Firebase Storage
        await uploadBytes(imageRef, logo);

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(imageRef);
        console.log(downloadURL);

        // const formData = new FormData();
        // formData.append("name", name);
        // formData.append("email", email);
        // formData.append("password", password);
        // formData.append("clubName", clubName);
        // if (logo) formData.append("logo", logo);

        // console.log(name, email, password, clubName, logo);

        const payload = {
          name,
          email,
          password,
          clubName,
          logo: downloadURL,
          // Include event date in payload
        };
        console.log(payload);

        const response = await axios.post(
          "https://eventmanagementbackend-o7k8.onrender.com/api/ngoregister",
          payload
        );

        localStorage.setItem("ngoname", response.data.newNgo._id);

        router.push("/ngof");
      } catch (err) {
        console.log("error registering:", err);
      }
    } else {
      alert("Please upload a file");
    }
  };

  const handleLogin = async () => {
    try {
      console.log(email, password); 
      const response = await axios.post("https://eventmanagementbackend-o7k8.onrender.com/api/ngologin", {
        email,
        password
      });

      localStorage.setItem("ngoname", response.data.user._id);
      console.log(response.data);
      router.push("/ngof");
    } catch (err) {
      console.log("error logging in:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-primary text-primary-foreground">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <MountainIcon className="size-6" />
          <span className="sr-only">Acme NGO</span>
        </Link>
      </header>
      <main className="flex-1 flex justify-center items-center px-4 md:px-6">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">
                {isLoginForm ? "Login" : "Sign Up"}
              </CardTitle>
              <Button
                variant={isLoginForm ? "secondary" : "default"}
                onClick={() => setIsLoginForm(!isLoginForm)}
              >
                {isLoginForm ? "Sign Up" : "Login"}
              </Button>
            </div>
            <CardDescription>
              {isLoginForm
                ? "Enter your credentials to access your account"
                : "Create a new account as an Organiser"}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {isLoginForm ? (
              <div className="grid gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email/Username</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="Enter your email or username"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full" onClick={handleLogin}>
                  Login
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="clubName">Club Name</Label>
                  <Input
                    id="clubName"
                    type="text"
                    placeholder="Enter your club name"
                    onChange={(e) => setClubName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="logo">Club Logo</Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogo(e.target.files?.[0] || null)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  onClick={handleRegister}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
