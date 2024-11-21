'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, MoreVertical, LinkIcon } from 'lucide-react'

export default function Component() {
  const columns = [
    {
      title: "To Do",
      tasks: [
        {
          title: "Design Wireframes",
          description: "Create wireframes for the new project dashboard",
          status: "10 days left",
          statusColor: "text-green-600",
          assignees: ["/placeholder.svg", "/placeholder.svg"]
        }
      ]
    },
    {
      title: "In Progress",
      tasks: [
        {
          title: "Deploy App",
          description: "Release the TaskFlow app to production servers",
          status: "Tomorrow",
          statusColor: "text-yellow-600",
          assignees: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
        }
      ]
    },
    {
      title: "Done",
      tasks: [
        {
          title: "Develop Backend",
          description: "Implement backend functionalities for task management",
          status: "undefined in Progress",
          assignees: ["/placeholder.svg"]
        }
      ]
    }
  ]

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{column.title}</h2>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {column.tasks.map((task, taskIndex) => (
                <Card key={taskIndex}>
                  <CardHeader className="space-y-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base font-medium">{task.title}</CardTitle>
                      <Button variant="ghost" size="icon">
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {task.assignees.map((avatar, i) => (
                          <Avatar key={i} className="border-2 border-background">
                            <AvatarImage src={avatar} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      {task.status && (
                        <span className={`text-xs ${task.statusColor || 'text-muted-foreground'}`}>
                          {task.status}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add new card
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Group Chat */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Group Chat</h2>
        <Card>
          <CardContent className="p-6 space-y-6">
            <Input className="h-24" placeholder="Write a comment..." />
            <Button>Post comment</Button>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-medium">Alice</span>
                      <span className="text-sm text-muted-foreground ml-2">2 days ago</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  The task card modals should include a section for adding comments to facilitate team communication and collaboration.
                </p>
                <Button variant="ghost" size="sm">Reply</Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>B</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-medium">Bob</span>
                      <span className="text-sm text-muted-foreground ml-2">1 day ago</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  It would be helpful to have a section in the task card modals for attaching files related to the task, such as design mockups or documents.
                </p>
                <Button variant="ghost" size="sm">Reply</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Task Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Add Task</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Task</CardTitle>
              <p className="text-sm text-muted-foreground">
                Quickly add tasks to your project with all the necessary details.
              </p>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Add Task
                <Plus className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assign Team Members</CardTitle>
              <p className="text-sm text-muted-foreground">
                Effortlessly assign team members to each task for better collaboration.
              </p>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Assign Members</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Set Deadlines</CardTitle>
              <p className="text-sm text-muted-foreground">
                Stay organized by setting deadlines for each task to track progress effectively.
              </p>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Set Deadlines</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}