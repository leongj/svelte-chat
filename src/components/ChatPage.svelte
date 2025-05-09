<script lang="ts">
  interface ChatMessage {
    text: string;
    isUser: boolean;
    isError?: boolean;
  }

  // Chat related state using Svelte 5 runes
  let messages = $state<ChatMessage[]>([]);
  let newMessage = $state('');
  let isLoading = $state(false);

  // Effect for scrolling chat to bottom when messages change
  $effect(() => {
    if (messages.length) {
      setTimeout(() => {
        const chatContainer = document.querySelector('.messages-container');
        if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 0);
    }
  });

  // Function to handle sending messages
  async function sendMessage(): Promise<void> {
    if (!newMessage.trim()) return;
    
    const userMessage: string = newMessage.trim();
    messages = [...messages, { text: userMessage, isUser: true }];
    newMessage = '';
    isLoading = true;
    
    try {
      const response: Response = await fetch('http://localhost:3001/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });
      
      const data: { reply: string; error?: string } = await response.json();
      
      if (response.ok) {
        messages = [...messages, { text: data.reply, isUser: false }];
      } else {
        messages = [...messages, { text: `Error: ${data.error || 'Failed to get a response'}`, isUser: false, isError: true }];
      }
    } catch (error: unknown) {
      console.error('Error sending message:', error);
      messages = [...messages, { text: 'Error connecting to the server. Please try again later.', isUser: false, isError: true }];
    } finally {
      isLoading = false;
    }
  }

  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }
</script>

<div class="chat-container">
  <div class="chat-header">
    <h2>Chat Demo</h2>
    <button class="back-button" on:click={() => window.location.reload()}>Back</button>
  </div>
  
  <div class="messages-container">
    {#if messages.length === 0}
      <div class="empty-state">
        <p>Start a conversation by sending a message</p>
      </div>
    {:else}
      {#each messages as message}
        <div class="message {message.isUser ? 'user-message' : 'ai-message'} {message.isError ? 'error-message' : ''}">
          <div class="message-content">
            <p>{message.text}</p>
          </div>
        </div>
      {/each}
      {#if isLoading}
        <div class="message ai-message loading">
          <div class="loading-indicator">
            <span>•</span><span>•</span><span>•</span>
          </div>
        </div>
      {/if}
    {/if}
  </div>
  
  <div class="input-container">
    <textarea 
      bind:value={newMessage} 
      on:keydown={handleKeyDown}
      placeholder="Type a message..."
      rows="3"
    ></textarea>
    <button on:click={sendMessage} disabled={isLoading || !newMessage.trim()}>
      {isLoading ? 'Sending...' : 'Send'}
    </button>
  </div>
</div>

<style>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 1000px;
    margin: 0 auto;
    padding: 1rem;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }

  .chat-header h2 {
    margin: 0;
    color: #ff3e00;
  }

  .back-button {
    background-color: #f0f0f0;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .back-button:hover {
    background-color: #e0e0e0;
  }

  .messages-container {
    flex-grow: 1;
    overflow-y: auto;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #888;
  }

  .message {
    max-width: 80%;
    padding: 0.8rem 1rem;
    border-radius: 8px;
    margin-bottom: 0.5rem;
  }

  .user-message {
    align-self: flex-end;
    background-color: #ff3e00;
    color: white;
  }

  .ai-message {
    align-self: flex-start;
    background-color: #f0f0f0;
    color: #333;
  }

  .error-message {
    background-color: #ffebee;
    color: #c62828;
  }

  .message p {
    margin: 0;
    word-break: break-word;
  }

  .input-container {
    display: flex;
    gap: 0.5rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }

  textarea {
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    resize: none;
    font-family: inherit;
    font-size: 1rem;
  }

  button {
    padding: 0 1.5rem;
    background-color: #ff3e00;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover:not(:disabled) {
    background-color: #e63600;
  }

  button:disabled {
    background-color: #ffccbc;
    cursor: not-allowed;
  }

  .loading-indicator {
    display: flex;
    gap: 0.25rem;
  }

  .loading-indicator span {
    animation: blink 1.4s infinite both;
  }

  .loading-indicator span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .loading-indicator span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes blink {
    0% { opacity: 0.2; }
    20% { opacity: 1; }
    100% { opacity: 0.2; }
  }

  @media (max-width: 640px) {
    .message {
      max-width: 90%;
    }
  }
</style>
