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
  }

  .logo {
    width: 120px;
    height: 120px;
    margin-bottom: 2rem;
    will-change: filter;
    transition: filter 300ms;
  }
  
  .logo:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
    margin-bottom: 1rem;
    color: #ff3e00;
  }

  p {
    margin-bottom: 2rem;
    font-size: 1.2rem;
    color: #888;
    max-width: 600px;
  }

  .start-button {
    background-color: #ff3e00;
    color: white;
    border: none;
    padding: 0.8rem 1.6rem;
    font-size: 1.2rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .start-button:hover {
    background-color: #e63600;
  }
</style>
