/* import { supabase } from '@/lib/supabaseClient';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const notes = await prisma.note.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  return new Response(JSON.stringify(notes), { status: 200 });
}

export async function POST(req: Request) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { title, content } = await req.json();
  if (!title || !content) return new Response("Title and content required", { status: 400 });

  const note = await prisma.note.create({
    data: { title, content, userId: session.user.id },
  });

  return new Response(JSON.stringify(note), { status: 201 });
}

export async function PUT(req: Request) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { id, title, content } = await req.json();
  if (!id || !title || !content) return new Response("ID, title, and content required", { status: 400 });

  const note = await prisma.note.updateMany({
    where: { id, userId: session.user.id },
    data: { title, content },
  });

  if (note.count === 0) return new Response("Note not found", { status: 404 });

  return new Response(JSON.stringify({ message: "Note updated" }), { status: 200 });
}

export async function DELETE(req: Request) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { id } = await req.json();
  if (!id) return new Response("ID required", { status: 400 });

  const note = await prisma.note.deleteMany({
    where: { id, userId: session.user.id },
  });

  if (note.count === 0) return new Response("Note not found", { status: 404 });

  return new Response(JSON.stringify({ message: "Note deleted" }), { status: 200 });
}

*/

import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import { createSupabaseServerClient } from '@/lib/supabaseServer';

export async function GET() {
  const supabase = await createSupabaseServerClient();

  const{data: {session},} = await supabase.auth.getSession();

  if (!session){
    return NextResponse.json(
      {error: 'Unauthorized'},
      {status: 401}
    );
  }

  const notes = await prisma.note.findMany({
    where: {userId: session.user.id},
    orderBy: {createdAt: 'desc'},
  });

  return NextResponse.json(notes);
}
