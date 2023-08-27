<script lang="ts">
  import toast, { Toaster } from 'svelte-french-toast';
  import { applyAction, enhance } from '$app/forms';
  import type { PageData } from './$types';
  import { page } from '$app/stores';

  export let data: PageData;
  const { user } = data;

  const military_services = $page.data.props.military_services.military_services;
  let isMilitaryServicePresent = military_services && military_services.length > 0;

  let isMilitaryStatsUpdateChecked =
    military_services && military_services[0] && military_services[0].military_stats;
  let isMilitaryShowUpdateChecked =
    military_services && military_services[0] && military_services[0].military_show;

  let isMilitaryStatsCreateChecked = military_services && military_services.military_stats;
  let isMilitaryShowCreateChecked = military_services && military_services.military_show;

  let isMilitaryStatsUpdateDisplay: boolean;
  let isMilitaryStatsCreateDisplay: boolean;

  $: {
    isMilitaryStatsUpdateDisplay = !isMilitaryStatsUpdateChecked;
    isMilitaryStatsCreateDisplay = !isMilitaryStatsCreateChecked;
  }

  console.log(isMilitaryStatsCreateChecked);
</script>

<svelte:head>
  <title>기본사항 : 병역사항</title>
</svelte:head>

<Toaster />

<main class="container">
  <div class="content">
    {#if data.user}
      <div class="management-container">
        <h1>병역사항</h1>
        <form
          action="?/updateSinglepart"
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
              {#if isMilitaryServicePresent}
                <div class="checkbox-group">
                  <div>
                    <input
                      type="checkbox"
                      id="military_stats"
                      name="military_stats"
                      bind:checked={isMilitaryStatsUpdateChecked}
                    />
                    <label for="military_stats">병역여부</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="military_show"
                      name="military_show"
                      bind:checked={isMilitaryShowUpdateChecked}
                    />
                    <label for="military_show">공개여부</label>
                  </div>
                </div>
                {#if isMilitaryStatsUpdateDisplay}
                  <div class="field-group">
                    <input
                      type="text"
                      id="conscription_exemption"
                      name="conscription_exemption"
                      placeholder="면제사유"
                      value={military_services?.[0].conscription_exemption || ''}
                    />
                    <label for="conscription_exemption">면제사유</label>
                  </div>
                {:else}
                  <div class="field-group">
                    <input
                      type="text"
                      id="military_group"
                      name="military_group"
                      value={military_services?.[0].military_group || ''}
                      placeholder="군별"
                    />
                    <label for="military_group">군별</label>
                  </div>
                  <div class="field-group">
                    <input
                      type="text"
                      id="branch"
                      name="branch"
                      value={military_services?.[0].branch || ''}
                      placeholder="병과"
                    />
                    <label for="branch">병과</label>
                  </div>
                  <div class="field-group">
                    <input
                      type="text"
                      id="rank"
                      name="rank"
                      value={military_services?.[0].rank || ''}
                      placeholder="계급"
                    />
                    <label for="rank">계급</label>
                  </div>
                  <div class="field-group">
                    <input
                      type="text"
                      id="discharge"
                      name="discharge"
                      value={military_services?.[0].discharge || ''}
                      placeholder="병역"
                    />
                    <label for="discharge">병역</label>
                  </div>
                  <div class="field-group">
                    <input
                      type="month"
                      id="start_date"
                      name="start_date"
                      value={military_services?.[0].start_date || ''}
                      placeholder="복무 시작일"
                    />
                    <label for="start_date">복무 시작일</label>
                  </div>
                  <div class="field-group">
                    <input
                      type="month"
                      id="end_date"
                      name="end_date"
                      value={military_services?.[0].end_date || ''}
                      placeholder="전역/제대일"
                    />
                    <label for="end_date">전역/제대일</label>
                  </div>
                {/if}
              {:else}
                <div class="checkbox-group">
                  <div>
                    <input
                      type="checkbox"
                      id="military_stats"
                      name="military_stats"
                      bind:checked={isMilitaryStatsCreateChecked}
                    />
                    <label for="military_stats">병역여부</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="military_show"
                      name="military_show"
                      bind:checked={isMilitaryShowCreateChecked}
                    />
                    <label for="military_show">공개여부</label>
                  </div>
                </div>
                {#if isMilitaryStatsCreateDisplay}
                  <div class="field-group">
                    <input
                      type="text"
                      id="conscription_exemption"
                      name="conscription_exemption"
                      placeholder="면제사유"
                      value={military_services?.conscription_exemption || ''}
                    />
                    <label for="conscription_exemption">면제사유</label>
                  </div>
                {:else}
                  <div class="field-group">
                    <input
                      type="text"
                      id="military_group"
                      name="military_group"
                      value={military_services?.military_group || ''}
                      placeholder="군별"
                    />
                    <label for="military_group">군별</label>
                  </div>
                  <div class="field-group">
                    <input
                      type="text"
                      id="branch"
                      name="branch"
                      value={military_services?.branch || ''}
                      placeholder="병과"
                    />
                    <label for="branch">병과</label>
                  </div>
                  <div class="field-group">
                    <input
                      type="text"
                      id="rank"
                      name="rank"
                      value={military_services?.rank || ''}
                      placeholder="계급"
                    />
                    <label for="rank">계급</label>
                  </div>
                  <div class="field-group">
                    <input
                      type="text"
                      id="discharge"
                      name="discharge"
                      value={military_services?.discharge || ''}
                      placeholder="병역"
                    />
                    <label for="discharge">병역</label>
                  </div>
                  <div class="field-group">
                    <input
                      type="month"
                      id="start_date"
                      name="start_date"
                      value={military_services?.start_date || ''}
                      placeholder="복무 시작일"
                    />
                    <label for="start_date">복무 시작일</label>
                  </div>
                  <div class="field-group">
                    <input
                      type="month"
                      id="end_date"
                      name="end_date"
                      value={military_services?.end_date || ''}
                      placeholder="전역/제대일"
                    />
                    <label for="end_date">전역/제대일</label>
                  </div>
                {/if}
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
