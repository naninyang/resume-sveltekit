<script lang="ts">
  import toast, { Toaster } from 'svelte-french-toast';
  import { applyAction, enhance } from '$app/forms';
  import type { PageData } from './$types';
  import { page } from '$app/stores';

  export let data: PageData;
  const { user } = data;

  const educations = $page.data.props.educations.educations;
  let educationsPresent = educations && educations.length > 0;
  let editingIndex: number | null = null;
  let newIndex: number | null = null;
  let newEducation: App.education = {
    school: '',
    major: '',
    category: '',
    stats: '',
    degree: '',
    degree_num: '',
    record: '',
    start_date: '',
    end_date: ''
  };
</script>

<svelte:head>
  <title>기본사항 : 학력사항</title>
</svelte:head>

<Toaster />

<main class="container">
  <div class="content">
    {#if data.user}
      <div class="array-container">
        <h1>
          학력사항
          <strong
            >입학/졸업일 상관없이 추가하시면 됩니다. 이력서에서는 자동으로 가장 오래된 학력 기준으로
            보여집니다.</strong
          >
        </h1>
        <div class="data-group">
          {#if educationsPresent}
            <div class="list">
              {#each educations as education}
                <div class="item">
                  {#if editingIndex === education.id}
                    <form
                      action="?/updateEdit"
                      method="POST"
                      use:enhance={() => async (event) => {
                        await applyAction(event.result);
                        if (event.result.type === 'success') {
                          toast.success('수정되었습니다', {
                            duration: 5000,
                            position: 'top-center'
                          });
                          window.location.reload();
                        } else {
                          toast.error('알 수 없는 에러가 발생했습니다', {
                            duration: 5000,
                            position: 'top-center'
                          });
                        }
                      }}
                    >
                      <fieldset>
                        <legend>학력사항 수정 양식</legend>
                        <div class="form-group-component">
                          <input type="hidden" name="id" value={education.id} />
                          <div>
                            <div class="field-group">
                              <input
                                type="text"
                                id="school"
                                name="school"
                                value={education.school}
                                placeholder="학교명"
                              />
                              <label for="school">학교명</label>
                            </div>
                            <div class="field-group">
                              <input
                                type="category"
                                id="category"
                                name="category"
                                value={education.category}
                                placeholder="분류"
                              />
                              <label for="category">분류</label>
                            </div>
                            <div class="field-group">
                              <input
                                type="text"
                                id="major"
                                name="major"
                                value={education.major}
                                placeholder="학점"
                              />
                              <label for="major">학점</label>
                            </div>
                          </div>
                          <div>
                            <div class="field-group">
                              <input
                                type="text"
                                id="degree"
                                name="degree"
                                value={education.degree}
                                placeholder="학위명"
                              />
                              <label for="degree">학위명</label>
                            </div>
                            <div class="field-group">
                              <input
                                type="text"
                                id="degree_num"
                                name="degree_num"
                                value={education.degree_num}
                                placeholder="학위등록번호"
                              />
                              <label for="degree_num">학위등록번호</label>
                            </div>
                            <div class="field-group">
                              <input
                                type="text"
                                id="stats"
                                name="stats"
                                value={education.stats}
                                placeholder="상태"
                              />
                              <label for="stats">상태</label>
                            </div>
                            <div class="field-group">
                              <input
                                type="month"
                                id="start_date"
                                name="start_date"
                                value={education.start_date}
                                placeholder="입학일"
                              />
                              <label for="brunch">입학일</label>
                            </div>
                            <div class="field-group">
                              <input
                                type="month"
                                id="end_date"
                                name="end_date"
                                value={education.end_date}
                                placeholder="졸업일"
                              />
                              <label for="end_date">졸업일</label>
                            </div>
                          </div>
                        </div>
                        <div class="button-group">
                          <button type="submit">수정 완료</button>
                          <div class="util">
                            <div class="session-util" />
                            <div class="find-util">
                              <button type="button" on:click={() => (editingIndex = 1)}
                                >취소하기</button
                              >
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </form>
                  {:else}
                    <div class="view">
                      <dl class="definition-group">
                        <div>
                          <div class="item-group">
                            <dt>학교명</dt>
                            <dd>
                              <span>{education.school}</span>
                            </dd>
                          </div>
                          <div class="item-group">
                            <dt>분류</dt>
                            <dd>
                              <span>{education.category}</span>
                            </dd>
                          </div>
                          <div class="item-group">
                            <dt>전공</dt>
                            <dd>
                              <span>{education.major}</span>
                            </dd>
                          </div>
                          <div class="item-group">
                            <dt>학점</dt>
                            <dd>
                              <span>{education.record}</span>
                            </dd>
                          </div>
                        </div>
                        <div>
                          <div class="item-group">
                            <dt>학위명</dt>
                            <dd>
                              <span>{education.degree}</span>
                            </dd>
                          </div>
                          <div class="item-group">
                            <dt>학위등록번호</dt>
                            <dd>
                              <span>{education.degree_num}</span>
                            </dd>
                          </div>
                          <div class="item-group">
                            <dt>상태</dt>
                            <dd>
                              <span>{education.stats}</span>
                            </dd>
                          </div>
                          <div class="item-group">
                            <dt>입학일</dt>
                            <dd>
                              <span>{education.start_date}</span>
                            </dd>
                          </div>
                          <div class="item-group">
                            <dt>졸업일</dt>
                            <dd>
                              <span>{education.end_date}</span>
                            </dd>
                          </div>
                        </div>
                      </dl>
                      <form
                        method="POST"
                        action="?/delete&id={education.id}"
                        class="item-management"
                      >
                        <button
                          type="button"
                          class="edit"
                          on:click={() => (editingIndex = education.id)}>수정</button
                        >
                        <button type="submit" class="del" name="delete" value="true">삭제</button>
                      </form>
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          {:else}
            <p class="no-data">등록된 학력사항이 없습니다</p>
          {/if}
          {#if newIndex !== -1}
            <div class="button-group">
              <button on:click={() => (newIndex = -1)}>추가</button>
            </div>
          {/if}
          {#if newIndex === -1}
            <form
              action="?/updateAdd"
              method="POST"
              use:enhance={() => async (event) => {
                await applyAction(event.result);
                if (event.result.type === 'success') {
                  toast.success('추가되었습니다', {
                    duration: 5000,
                    position: 'top-center'
                  });
                  window.location.reload();
                } else {
                  toast.error('알 수 없는 에러가 발생했습니다', {
                    duration: 5000,
                    position: 'top-center'
                  });
                }
              }}
            >
              <fieldset>
                <legend>학력사항 수정 양식</legend>
                <div class="form-group-component">
                  <div>
                    <div class="field-group">
                      <input
                        type="text"
                        id="school"
                        name="school"
                        value={newEducation.school}
                        placeholder="학교명"
                        required
                      />
                      <label for="school">학교명</label>
                    </div>
                    <div class="field-group">
                      <input
                        type="category"
                        id="category"
                        name="category"
                        value={newEducation.category}
                        placeholder="분류"
                        required
                      />
                      <label for="category">분류</label>
                    </div>
                    <div class="field-group">
                      <input
                        type="text"
                        id="major"
                        name="major"
                        value={newEducation.major}
                        placeholder="전공"
                        required
                      />
                      <label for="major">전공</label>
                    </div>
                    <div class="field-group">
                      <input
                        type="text"
                        id="record"
                        name="record"
                        value={newEducation.record}
                        placeholder="학점"
                      />
                      <label for="record">학점</label>
                    </div>
                  </div>
                  <div>
                    <div class="field-group">
                      <input
                        type="text"
                        id="degree"
                        name="degree"
                        value={newEducation.degree}
                        placeholder="학위명"
                      />
                      <label for="degree">학위명</label>
                    </div>
                    <div class="field-group">
                      <input
                        type="text"
                        id="degree_num"
                        name="degree_num"
                        value={newEducation.degree_num}
                        placeholder="학위등록번호"
                      />
                      <label for="degree_num">학위등록번호</label>
                    </div>
                    <div class="field-group">
                      <input
                        type="text"
                        id="stats"
                        name="stats"
                        value={newEducation.stats}
                        placeholder="상태"
                        required
                      />
                      <label for="stats">상태</label>
                    </div>
                    <div class="field-group">
                      <input
                        type="month"
                        id="start_date"
                        name="start_date"
                        value={newEducation.start_date}
                        placeholder="입학일"
                        required
                      />
                      <label for="brunch">입학일</label>
                    </div>
                    <div class="field-group">
                      <input
                        type="month"
                        id="end_date"
                        name="end_date"
                        value={newEducation.end_date}
                        placeholder="졸업일"
                      />
                      <label for="end_date">졸업일</label>
                    </div>
                  </div>
                  <div class="button-group">
                    <button type="submit">추가 완료</button>
                    <div class="util">
                      <div class="session-util" />
                      <div class="find-util">
                        <button type="button" on:click={() => (newIndex = 1)}>취소하기</button>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
          {/if}
        </div>
      </div>
    {:else}
      <p class="auth-message">로그인을 하셔야 합니다</p>
    {/if}
  </div>
</main>
