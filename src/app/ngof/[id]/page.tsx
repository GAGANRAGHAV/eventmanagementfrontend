"use client";

import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import Link from "next/link";

import axios from "axios";
import { useParams } from "next/navigation"; // Use this hook for accessing params
import { useState, useEffect } from "react";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
interface Project {
  name: string;
  description: string;
  image: string;
  moneyAllocated: string;
  moneyrequired: string;
  eventDate: string;
  participants: { name: string; email: string }[];

  // Add other fields you expect in the project object
}

export default function indi() {
  const { id } = useParams(); // Use useParams to get the 'id' from the URL
  const [project, setProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    moneyAllocated: "",
    eventDate: "",
  });

  useEffect(() => {
    if (id) {
      fetchProjectDetails();
    }
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(
        `https://eventmanagementbackend-o7k8.onrender.com/api/getprojectbyid/${id}`
      );
      console.log(response.data.project);
      setProject(response.data.project);
      setEditData({
        name: response.data.project.name,
        description: response.data.project.description,
        moneyAllocated: response.data.project.moneyAllocated,
        eventDate: response.data.project.eventDate,
      });
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(
        `https://eventmanagementbackend-o7k8.onrender.com/api/updateproject/${id}`,
        editData
      );
      console.log("Project updated:", response.data);
      setProject(response.data.project); // Update UI
      setIsDialogOpen(false); // Close dialog
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <div className="absolute top-4 right-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Edit Project</DialogHeader>
            <div className="space-y-4">
              <Input
                name="name"
                value={editData.name}
                onChange={handleInputChange}
                placeholder="Project Name"
              />
              <Input
                name="description"
                value={editData.description}
                onChange={handleInputChange}
                placeholder="Description"
              />
              <Input
                name="moneyAllocated"
                value={editData.moneyAllocated}
                onChange={handleInputChange}
                placeholder="Money Allocated"
              />
              <Input
                name="eventDate"
                value={editData.eventDate}
                onChange={handleInputChange}
                placeholder="Event Date"
              />
            </div>
            <DialogFooter>
              <Button onClick={handleEditSubmit}>Save</Button>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <section className="w-full pt-12 md:pt-24 lg:pt-32 border-b">
        <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                {project.name}
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                {project.description}
              </p>
            </div>
            <img
              src={project.image}
              width="550"
              height="550"
              alt="Project Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 grid gap-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 bg-muted rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                  <CurrencyIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Prize Pool</h3>
                  <p className="text-muted-foreground">
                    Rs {project.moneyrequired}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-muted rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                  <CurrencyIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Event Type</h3>
                  <p className="text-muted-foreground">Tech,Cult,Sports</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-muted rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                  <BuildingIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Event Date</h3>
                  <p className="text-muted-foreground">{project.eventDate}</p>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About the Project
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our Event is a hub for tech enthusiasts to explore, innovate,
              and connect. From workshops to competitions, we aim to inspire and
              empower with the latest in technology. Join us to learn, share,
              and shape the future!
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Registered Participants{" "}
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Participate in this Event to win amazing goodies and collaborate
                with other participants to make this event a success.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border border-gray-300">Name</th>
                      <th className="px-4 py-2 border border-gray-300">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* 
              {project.participants.length > 0 ? (
                        project.participants.map((participant, i) => (
                          <p key={i} className="text-muted-foreground">
                            {participant.name || "Participant Name"}
                          </p>
                        ))
                      ) : (
                        <p className="text-muted-foreground">
                          No participants yet
                        </p>
                      )} */}
                    {project.participants.map((participant, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border border-gray-300">
                          {participant.name}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {participant.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Donate $50
              </Link> */}
              {/* <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Register
              </Button> */}
              {/* <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Donate Other Amount
              </Link> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function BuildingIcon(props: any) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function CurrencyIcon(props: any) {
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
      <circle cx="12" cy="12" r="8" />
      <line x1="3" x2="6" y1="3" y2="6" />
      <line x1="21" x2="18" y1="3" y2="6" />
      <line x1="3" x2="6" y1="21" y2="18" />
      <line x1="21" x2="18" y1="21" y2="18" />
    </svg>
  );
}
