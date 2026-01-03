'use client';

import {useEffect, useState} from 'react';

type Note = {
    id: string;
    title: string;
    content: string;
}

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchNotes(){
            try{
                const res = await fetch('/api/notes');
                if (!res.ok){
                    throw new Error ('Failed to fetch notes');
                }

                const notesData: Note[] = await res.json();
                setNotes(notesData);
            } catch (err){
                setError('You must be logged in');
            } finally{
                setLoading(false)
            }
        }

        fetchNotes();
    }, []);

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return(
        <main>
            <h1>My Notes</h1>

            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                    </li>
                ))}
            </ul>
        </main>
    )
}
