<script lang="ts">
  import svelteLogo from '../assets/svelte.svg';
  
  // Props - in Svelte 5, we can continue using the export syntax for props
  export let onStartDemo: () => void;
  
  // If you had any reactive variables, you would use $state for them
  // Example: let count = $state(0);
</script>

<div class="landing-container">
  <img src={svelteLogo} class="logo" alt="Svelte Logo" />
  <h1>Svelte Demo</h1>
  <p>A demo application with camera, speech, microphone, LLM and Azure API integration</p>
  <button class="start-button" on:click={onStartDemo}>Start Demo</button>
</div>

<style>
  .landing-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    padding: 0 1rem;
    background: linear-gradient(135deg, var(--blue-400) 0%, var(--blue-700) 100%);
    color: var(--blue-50);
  }

  .logo {
    width: 120px;
    height: 120px;
    margin-bottom: 2rem;
    will-change: filter;
    transition: filter 300ms;
    filter: drop-shadow(0 0 2em var(--blue-200));
  }
  
  .logo:hover {
    filter: drop-shadow(0 0 2em var(--blue-400));
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
    margin-bottom: 1rem;
    color: var(--blue-100);
    text-shadow: 0 2px 8px var(--blue-700);
  }

  p {
    margin-bottom: 2rem;
    font-size: 1.2rem;
    color: var(--blue-200);
    max-width: 600px;
  }

  .start-button {
    background-color: var(--blue-500);
    color: var(--blue-50);
    border: none;
    padding: 0.8rem 1.6rem;
    font-size: 1.2rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    box-shadow: 0 2px 8px var(--blue-900);
  }

  .start-button:hover {
    background-color: var(--blue-700);
  }
</style>
