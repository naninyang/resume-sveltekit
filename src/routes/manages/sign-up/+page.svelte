<script lang="ts">
  import toast, { Toaster } from 'svelte-french-toast';
  import { applyAction, enhance } from '$app/forms';
  import type { ActionData } from './$types';
  import { goto } from '$app/navigation';
  export let form: ActionData;
</script>

<Toaster />

<main class="container">
  <div class="content">
    <form
      method="POST"
      use:enhance={() =>
        async ({ result }) => {
          await applyAction(result);
          if (result.type === 'success') {
            const user = result.data?.user;
            await goto('/manages/pass');
          } else {
            toast.error('잘못 입력된 항목이 있습니다.', {
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
            <input type="text" id="userid" name="userid" placeholder="아이디" required />
            <label for="userid">아이디</label>
            {#if form?.errors?.userid}
              <p>{form.errors.userid}</p>
            {/if}
          </div>
          <div class="field-group">
            <input type="text" id="username" name="username" placeholder="사용자 이름" required />
            <label for="username">사용자 이름</label>
            {#if form?.errors?.username}
              <p>{form.errors.username}</p>
            {/if}
          </div>
          <div class="field-group">
            <input type="email" id="email" name="email" placeholder="이메일 주소" required />
            <label for="email">이메일 주소</label>
            {#if form?.errors?.email}
              <p>{form.errors.email}</p>
            {/if}
          </div>
          <div class="field-group">
            <input type="password" id="password" name="password" placeholder="비밀번호" required />
            <label for="password">비밀번호</label>
            {#if form?.errors?.password}
              <p>{form.errors.password}</p>
            {/if}
          </div>
          <div class="field-group">
            <input
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="비밀번호 확인"
              required
            />
            <label for="passwordConfirmation">비밀번호 확인</label>
            {#if form?.errors?.passwordConfirmation}
              <p>{form.errors.passwordConfirmation}</p>
            {/if}
          </div>
        </div>
        <div class="button-group">
          <button type="submit">등록하기</button>
        </div>
      </fieldset>
    </form>
  </div>
</main>
