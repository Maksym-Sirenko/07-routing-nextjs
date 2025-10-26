import axios from 'axios';
import type { Note } from '@/types/note';

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
export const PER_PAGE = 12;

const NoteService = axios.create({
  baseURL: 'https://notehub-public.goit.study/api/notes',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  search = '',
  page = 1,
  perPage = PER_PAGE,
}: {
  search?: string;
  page?: number;
  perPage?: number;
} = {}): Promise<FetchNotesResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { data } = await axios.get<FetchNotesResponse>(
    'https://notehub-public.goit.study/api/notes',
    {
      params: { search, page, perPage },
      headers: { Authorization: `Bearer ${API_KEY}` },
    },
  );
  return data;
};

export const createNote = async (newNote: {
  title: string;
  content: string;
  tag: string;
}) => {
  const { data } = await NoteService.post<Note>('', newNote);
  return data as Note;
};

export const deleteNote = async (noteId: string) => {
  const { data } = await NoteService.delete<Note>(`/${noteId}`);
  return data as Note;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const { data } = await NoteService.get<Note>(`/${noteId}`);
  return data;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export const getCategories = async () => {
  const res = await axios<Category[]>('/categories');
  return res.data;
};
