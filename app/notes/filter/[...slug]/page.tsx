// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from '@tanstack/react-query';
// import NotesClient from './Notes.client';
// import { fetchNotes, PER_PAGE } from '@/lib/api';

// interface Props {
//   params: Promise<{ slug: string[] }>;
// }

// export default async function NotePage({ params }: Props) {
//   const { slug } = await params;
//   const queryClient = new QueryClient();

//   const category = slug[0] === 'All' ? null : slug[0];

//   await queryClient.prefetchQuery({
//     queryKey: [
//       'notes',
//       { search: '', tag: category, page: 1, perPage: PER_PAGE },
//     ],
//     queryFn: () => fetchNotes('', null, 1, PER_PAGE),
//   });
//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <NotesClient category={category} />
//     </HydrationBoundary>
//   );
// }

// app/notes/filter/[...slug]/page.tsx

import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';

interface Props {
  params: Promise<{ slug: string[] }>;
}

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const category = slug[0] === 'all' ? undefined : slug[0];
  const response = await fetchNotes(category);

  return (
    <div>
      <h1>Notes List</h1>
      {response?.notes?.length > 0 && <NoteList notes={response.notes} />}
    </div>
  );
};

export default NotesByCategory;
