<script lang="ts">
  import toast, { Toaster } from 'svelte-french-toast';
  import { applyAction, enhance } from '$app/forms';
  import type { ActionData, PageData } from './$types';

  export let form: ActionData;
  export let data: PageData;

  const { user } = data;
</script>

<svelte:head>
  <title>로그인</title>
</svelte:head>

<Toaster />

<main class="container">
  <div class="content">
    {#if data?.user}
      <p class="auth-message">로그인이 되어 있습니다</p>
    {:else}
      <form
        method="POST"
        use:enhance={() =>
          async ({ result }) => {
            await applyAction(result);
            if (result.type === 'success') {
              const user = result.data?.user;
            } else {
              toast.error('계정이 없거나 ID/비밀번호가 잘못되었습니다', {
                duration: 5000,
                position: 'top-center'
              });
            }
          }}
      >
        <fieldset>
          <legend>로그인 양식</legend>
          <div class="form-group">
            <div class="field-group">
              <input type="text" id="userid" name="userid" placeholder="아이디" required />
              <label for="userid">아이디</label>
            </div>
            <div class="field-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호"
                required
              />
              <label for="password">비밀번호</label>
            </div>
          </div>
          <div class="button-group">
            <button type="submit">로그인하기</button>
          </div>
        </fieldset>
      </form>
    {/if}
  </div>
</main>
