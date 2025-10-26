// app/notes/filter/@sidebar/default.tsx
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ALL_NOTES, NOTES_CATEGORIES } from '@/lib/constants';
import css from './default.module.css';

const NotesSidebar = () => {
  const params = useParams();
  const currentCategory = params.slug?.[0] || ALL_NOTES;

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link
          href="/notes/filter/all"
          className={`${css.menuLink} ${currentCategory === 'all' ? css.active : ''}`}
        >
          All notes
        </Link>
      </li>
      {NOTES_CATEGORIES.map((category) => (
        <li className={css.menuItem} key={category}>
          <Link
            href={`/notes/filter/${category}`}
            className={`${css.menuLink} ${currentCategory === category ? css.active : ''}`}
          >
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NotesSidebar;
