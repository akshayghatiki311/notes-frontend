import React from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Share2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const NotesGrid = ({ notes, onEdit, onDelete }) => {
  // Group notes into rows of 3
  const rows = [];
  for (let i = 0; i < notes.length; i += 3) {
    rows.push(notes.slice(i, i + 3));
  }

  return (
    <>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-6 mb-6">
          {row.map((note) => (
            <Card 
              key={note._id} 
              className="flex-1 flex flex-col h-[200px] hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {note.title}
                </h3>
              </CardHeader>
              
              <CardContent className="flex-grow pb-2">
                <p className="text-gray-600 line-clamp-3 text-sm">
                  {note.content}
                </p>
              </CardContent>

              <CardFooter className="flex justify-end gap-2 pt-4 border-t bg-white">
                
                <Button
                  onClick={() => onEdit(note._id)}
                  variant="ghost"
                  size="sm"
                  className="bg-white text-green-600 hover:text-green-700 hover:bg-green-50 p-2 h-8 w-8"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => onDelete(note._id)}
                  variant="ghost"
                  size="sm"
                  className="bg-white text-red-600 hover:text-red-700 hover:bg-red-50 p-2 h-8 w-8"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
          {/* Fill empty spaces with invisible cards if row is not complete */}
          {Array(3 - row.length).fill(0).map((_, i) => (
            <div key={i} className="flex-1" />
          ))}
        </div>
      ))}
    </>
  );
};

export default NotesGrid;