import type { ParamMatcher } from '@sveltejs/kit';
import { match as matchNaddr } from './naddr';
import { match as matchNote } from './note';

export const match = ((param) => {
	return (
		/^(npub|nprofile)1[a-z0-9]{6,}$/i.test(param) ||
		(!matchNote(param) && !matchNaddr(param) && /^(?:[\w-.]+@)?[\w-.]+$/.test(param))
	);
}) satisfies ParamMatcher;
