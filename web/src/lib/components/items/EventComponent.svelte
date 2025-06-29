<script lang="ts">
	import { kinds as Kind } from 'nostr-tools';
	import Profile from './Profile.svelte';
	import RepostedNote from './RepostedNote.svelte';
	import Reaction from './Reaction.svelte';
	import Channel from './Channel.svelte';
	import Zap from './Zap.svelte';
	import Note from './Note.svelte';
	import { Metadata, type Item } from '$lib/Items';
	import CustomEmojiList from './CustomEmojiList.svelte';
	import UserStatus from './UserStatus.svelte';
	import LongFormContent from '$lib/components/content/LongFormContent.svelte';
	import BadgeAward from './BadgeAward.svelte';
	import BadgeDefinition from './BadgeDefinition.svelte';
	import List from './List.svelte';
	import LegacyDirectMessage from './LegacyDirectMessage.svelte';
	import Picture from './Picture.svelte';
	import Poll from './Poll.svelte';
	import { pollKind } from '$lib/Poll';
	import Highlight from './Highlight.svelte';

	export let item: Item;
	export let readonly: boolean;
	export let createdAtFormat: 'auto' | 'time' = 'auto';
	export let full = false;
</script>

{#if item.event.kind === Kind.Metadata}
	<Profile metadata={new Metadata(item.event)} />
{:else if Number(item.event.kind) === 4}
	<LegacyDirectMessage event={item.event} />
{:else if Number(item.event.kind) === 6}
	<RepostedNote {item} {readonly} {createdAtFormat} />
{:else if item.event.kind === Kind.Reaction}
	<Reaction {item} {readonly} {createdAtFormat} />
{:else if item.event.kind === Kind.BadgeAward}
	<BadgeAward {item} {readonly} {createdAtFormat} />
{:else if Number(item.event.kind) === 20}
	<Picture {item} {readonly} {createdAtFormat} />
{:else if item.event.kind === Kind.ChannelCreation || item.event.kind === Kind.ChannelMetadata}
	<Channel {item} />
{:else if Number(item.event.kind) === pollKind}
	<Poll {item} {createdAtFormat} />
{:else if item.event.kind === Kind.Highlights}
	<Highlight {item} {createdAtFormat} />
{:else if item.event.kind === Kind.LongFormArticle}
	<LongFormContent event={item.event} />
{:else if item.event.kind === Kind.Zap}
	<Zap {item} {readonly} {createdAtFormat} />
{:else if Number(item.event.kind) === 30000}
	<List event={item.event} />
{:else if Number(item.event.kind) === 30009}
	<BadgeDefinition event={item.event} />
{:else if Number(item.event.kind) === 30030}
	<CustomEmojiList event={item.event} />
{:else if Number(item.event.kind) === 30315}
	<UserStatus {item} {createdAtFormat} />
{:else}
	<Note {item} {readonly} {createdAtFormat} {full} />
{/if}
