<script lang="ts">
  import toast, { Toaster } from 'svelte-french-toast';
  import { applyAction, enhance } from '$app/forms';
  import type { ActionData, PageData } from './$types';
  import { page } from '$app/stores';

  export let form: ActionData;
  export let data: PageData;

  const { user } = data;

  const profiles = $page.data.props.profiles.profiles;
  let isProfilePresent = profiles && profiles.length > 0;

  let isUsernameShowCreateChecked = profiles && profiles[0] && profiles[0].username_show;
  let isEmailShowCreateChecked = profiles && profiles[0] && profiles[0].email_show;

  let isUsernameShowUpdateChecked = profiles && profiles[0] && profiles[0].username_show;
  let isEmailShowUpdateChecked = profiles && profiles[0] && profiles[0].email_show;
</script>

<svelte:head>
  <title>유저정보 : 프로필 정보</title>
</svelte:head>

<Toaster />

<main class="container">
  <div class="content">
    {#if data.user}
      <div class="management-container">
        <h1>
          프로필 정보
          <strong>각 항목의 값을 비우면 이력서에 공개되지 않습니다</strong>
        </h1>
        <form
          action="?/updateProfile"
          method="POST"
          use:enhance={() => async (event) => {
            await applyAction(event.result);
            if (event.result.type === 'success') {
              toast.success('저장되었습니다', {
                duration: 5000,
                position: 'top-center'
              });
            } else {
              toast.error('알 수 없는 에러가 발생했습니다', {
                duration: 5000,
                position: 'top-center'
              });
            }
          }}
        >
          <fieldset>
            <legend>회원가입 양식</legend>
            <div class="form-group">
              {#if isProfilePresent}
                <div class="checkbox-group">
                  <div>
                    <input
                      type="checkbox"
                      id="username_show"
                      name="username_show"
                      bind:checked={isUsernameShowUpdateChecked}
                    />
                    <label for="username_show">사용자 이름 표시</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="email_show"
                      name="email_show"
                      bind:checked={isEmailShowUpdateChecked}
                    />
                    <label for="email_show">이메일 표시</label>
                  </div>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="주소"
                    value={profiles?.[0].address || ''}
                  />
                  <label for="address">주소</label>
                </div>
                <div class="field-group">
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={profiles?.[0].telephone || ''}
                    placeholder="연락처"
                  />
                  <label for="telephone">연락처</label>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="veteran"
                    name="veteran"
                    value={profiles?.[0].veteran || ''}
                    placeholder="보훈대상"
                  />
                  <label for="veteran">보훈대상</label>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="disability"
                    name="disability"
                    value={profiles?.[0].disability || ''}
                    placeholder="장애대상"
                  />
                  <label for="disability">장애대상</label>
                </div>
              {:else}
                <div class="checkbox-group">
                  <div>
                    <input
                      type="checkbox"
                      id="username_show"
                      name="username_show"
                      bind:checked={isUsernameShowCreateChecked}
                    />
                    <label for="username_show">사용자 이름 표시</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="email_show"
                      name="email_show"
                      bind:checked={isEmailShowCreateChecked}
                    />
                    <label for="email_show">이메일 표시</label>
                  </div>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="주소"
                    value={profiles?.address || ''}
                  />
                  <label for="address">주소</label>
                </div>
                <div class="field-group">
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={profiles?.telephone || ''}
                    placeholder="연락처"
                  />
                  <label for="telephone">연락처</label>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="veteran"
                    name="veteran"
                    value={profiles?.veteran || ''}
                    placeholder="보훈대상"
                  />
                  <label for="veteran">보훈대상</label>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="disability"
                    name="disability"
                    value={profiles?.disability || ''}
                    placeholder="장애대상"
                  />
                  <label for="disability">장애대상</label>
                </div>
              {/if}
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
