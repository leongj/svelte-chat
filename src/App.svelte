<script lang="ts">
  import svelteLogo from './assets/svelte.svg';
  import LandingPage from './components/LandingPage.svelte';
  import ChatPage from './components/ChatPage.svelte';

  let showChat = $state(false);

  function handleStartDemo(): void {
    showChat = true;
  }
</script>

<main>
  {#if !showChat}
    <LandingPage onStartDemo={handleStartDemo} />
  {:else}
    <ChatPage />
  {/if}
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
