<script lang="ts">
	import { Kind } from 'nostr-tools';
	import Profile from './Profile.svelte';
	import RepostedNote from './RepostedNote.svelte';
	import Reaction from './Reaction.svelte';
	import Channel from './Channel.svelte';
	import Zap from './Zap.svelte';
	import Note from './Note.svelte';
	import { Metadata, type Item } from '$lib/Items';
	import CustomEmojiList from './CustomEmojiList.svelte';
	import UserStatus from './UserStatus.svelte';

	export let item: Item;
	export let readonly: boolean;
	export let createdAtFormat: 'auto' | 'time' = 'auto';
	export let full = false;
</script>

{#if item.event.kind === Kind.Metadata}
	<Profile metadata={new Metadata(item.event)} />
{:else if Number(item.event.kind) === 6}
	<RepostedNote {item} {readonly} {createdAtFormat} />
{:else if item.event.kind === Kind.Reaction}
	<Reaction {item} {readonly} {createdAtFormat} />
{:else if item.event.kind === Kind.ChannelCreation || item.event.kind === Kind.ChannelMetadata}
	<Channel event={item.event} />
{:else if item.event.kind === Kind.Zap}
	<Zap {item} {readonly} {createdAtFormat} />
{:else if Number(item.event.kind) === 30030}
	<CustomEmojiList tags={item.event.tags} />
{:else if Number(item.event.kind) === 30315}
	<UserStatus {item} {createdAtFormat} />
{:else}
	<Note {item} {readonly} {createdAtFormat} {full} />
{/if}
