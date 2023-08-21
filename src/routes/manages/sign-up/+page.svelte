<script lang="ts">
  import { toast } from 'svelte-french-toast';
  import { applyAction, enhance } from '$app/forms';
  import type { ActionData } from './$types';
  import { goto } from '$app/navigation';
  export let form: ActionData;
</script>

<main class="container">
  <div class="content">
    <form
      method="POST"
      use:enhance={() =>
        async ({ result }) => {
          await applyAction(result);
          if (result.type === 'success') {
            const user = result.data?.user;
            toast('회원가입에 성공했습니다.', {
              duration: 2000,
              position: 'top-center'
            });
            await goto('/manages/pass');
          }
        }}
    >
      <fieldset>
        <legend>회원가입 양식</legend>
        <div class="form-group">
          <div class="field-group">
            <input id="userid" name="userid" placeholder="아이디" />
            <label for="userid">아이디</label>
          </div>
          <div class="field-group">
            <input id="username" name="username" placeholder="사용자 이름" />
            <label for="username">사용자 이름</label>
          </div>
          <div class="field-group">
            <input type="email" id="email" name="email" placeholder="이메일 주소" />
            <label for="email">이메일 주소</label>
          </div>
          <div class="field-group">
            <input type="password" id="password" name="password" placeholder="비밀번호" />
            <label for="password">비밀번호</label>
          </div>
          <div class="field-group">
            <input
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="비밀번호 확인"
            />
            <label for="passwordConfirmation">비밀번호 확인</label>
          </div>
        </div>
        <div class="button-group">
          <button type="submit">등록하기</button>
        </div>
      </fieldset>
    </form>
  </div>
</main>
