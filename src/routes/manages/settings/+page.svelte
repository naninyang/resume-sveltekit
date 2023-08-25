<script lang="ts">
  import toast, { Toaster } from 'svelte-french-toast';
  import { applyAction, enhance } from '$app/forms';
  import type { ActionData, PageData } from './$types';
  export let form: ActionData;
  export let data: PageData;

  const { user } = data;
</script>

<svelte:head>
  <title>유저정보 : 로그인 정보</title>
</svelte:head>

<Toaster />

<main class="container">
  <div class="content">
    {#if data.user}
      <div class="management-container">
        <h1>
          로그인 정보
          <strong>아이디와 비밀번호는 수정할 수 없습니다</strong>
        </h1>
        <form
          action="?/updateUser"
          method="POST"
          use:enhance={() => async (event) => {
            await applyAction(event.result);
            if (event.result.type === 'success') {
              toast.success('저장되었습니다', {
                duration: 5000,
                position: 'top-center'
              });
            } else {
              toast.error('잘못 입력된 항목이 있습니다', {
                duration: 5000,
                position: 'top-center'
              });
            }
          }}
        >
          <fieldset>
            <legend>회원가입 양식</legend>
            <div class="form-group">
              <div class="field-group">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="사용자 이름"
                  value={data.user.username}
                  required
                />
                <label for="username">사용자 이름</label>
                {#if form?.errors?.username}
                  <p>{form.errors.username}</p>
                {/if}
              </div>
              <div class="field-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.user.email}
                  placeholder="이메일 주소"
                  required
                />
                <label for="email">이메일 주소</label>
                {#if form?.errors?.email}
                  <p>{form.errors.email}</p>
                {/if}
              </div>
            </div>
            <div class="button-group">
              <button type="submit">갱신하기</button>
            </div>
          </fieldset>
        </form>
      </div>
    {:else}
      <p class="auth-message">로그인을 하셔야 합니다</p>
    {/if}
  </div>
</main>
