import React from 'react';
import { Button } from './ui/button';
import { Card, CardFooter, CardHeader, CardDescription, CardContent } from './ui/card';

export default function NotesGrid({ notes, onEdit, onDelete }) {
  if (!notes || notes.length === 0) {
    return <div className="p-4 text-center">No notes found</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {notes.map((note) => (
        <Card key={note.id || note._id} className="w-[350px]">
          <CardContent>
          <CardHeader>
          <h3 className="font-bold">{note.title}</h3>
          </CardHeader>
          <CardDescription>
          <p className="px-6">{note.content}</p>
          </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="mx-2"onClick={() => onEdit(note.id || note._id)}>
              Edit
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => onDelete(note.id || note._id)}
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}