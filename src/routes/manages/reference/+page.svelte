<script lang="ts">
  import toast, { Toaster } from 'svelte-french-toast';
  import { applyAction, enhance } from '$app/forms';
  import type { PageData } from './$types';
  import { page } from '$app/stores';

  export let data: PageData;
  const { user } = data;

  const references = $page.data.props.references.references;
  let referencesPresent = references && references.length > 0;
</script>

<svelte:head>
  <title>추가정보 : 레퍼런스</title>
</svelte:head>

<Toaster />

<main class="container">
  <div class="content">
    {#if data.user}
      <div class="management-container">
        <h1>레퍼런스</h1>
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
              {#if referencesPresent}
                <div class="field-group">
                  <input
                    type="text"
                    id="github"
                    name="github"
                    value={references?.[0].github || ''}
                    placeholder="Github"
                  />
                  <label for="github">Github</label>
                  <p>Gibhub 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="velog"
                    name="velog"
                    value={references?.[0].velog || ''}
                    placeholder="Velog"
                  />
                  <label for="velog">Velog</label>
                  <p>Velog 계정 이름만 입력하세요 (@ 제외)</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={references?.[0].instagram || ''}
                    placeholder="Instagram"
                  />
                  <label for="instagram">Instagram</label>
                  <p>instagram 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="twitter"
                    name="twitter"
                    value={references?.[0].twitter || ''}
                    placeholder="Twitter"
                  />
                  <label for="twitter">Twitter</label>
                  <p>Twitter(X) 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="facebook"
                    name="facebook"
                    value={references?.[0].facebook || ''}
                    placeholder="Facebook"
                  />
                  <label for="facebook">Facebook</label>
                  <p>Facebook 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="leadme"
                    name="leadme"
                    value={references?.[0].leadme || ''}
                    placeholder="LeadMe"
                  />
                  <label for="leadme">LeadMe</label>
                  <p>LeadMe 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="brunch"
                    name="brunch"
                    value={references?.[0].brunch || ''}
                    placeholder="Brunch"
                  />
                  <label for="brunch">Brunch</label>
                  <p>Brunch 계정 이름만 입력하세요 (@ 제외)</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="tistory"
                    name="tistory"
                    value={references?.[0].tistory || ''}
                    placeholder="Tistory"
                  />
                  <label for="tistory">Tistory</label>
                  <p>Tistory 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="pinterest"
                    name="pinterest"
                    value={references?.[0].pinterest || ''}
                    placeholder="Pinterest"
                  />
                  <label for="pinterest">Pinterest</label>
                  <p>Pinterest 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    value={references?.[0].linkedin || ''}
                    placeholder="LinkedIn"
                  />
                  <label for="linkedin">LinkedIn</label>
                  <p>LinkedIn 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="dribble"
                    name="dribble"
                    value={references?.[0].dribble || ''}
                    placeholder="Dribble"
                  />
                  <label for="dribble">Dribble</label>
                  <p>Dribble 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="postype"
                    name="postype"
                    value={references?.[0].postype || ''}
                    placeholder="Postype"
                  />
                  <label for="postype">Postype</label>
                  <p>Postype 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="url"
                    id="blog"
                    name="blog"
                    value={references?.[0].blog || ''}
                    placeholder="블로그"
                  />
                  <label for="blog">블로그</label>
                  <p>블로그 주소 전체를 입력하세요 (https:// 포함)</p>
                </div>
                <div class="field-group">
                  <input
                    type="url"
                    id="homepage"
                    name="homepage"
                    value={references?.[0].homepage || ''}
                    placeholder="홈페이지"
                  />
                  <label for="homepage">홈페이지</label>
                  <p>홈페이지 주소 전체를 입력하세요 (https:// 포함)</p>
                </div>
              {:else}
                <div class="field-group">
                  <input
                    type="text"
                    id="github"
                    name="github"
                    value={references?.github || ''}
                    placeholder="Github"
                  />
                  <label for="github">Github</label>
                  <p>Gibhub 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="velog"
                    name="velog"
                    value={references?.velog || ''}
                    placeholder="Velog"
                  />
                  <label for="velog">Velog</label>
                  <p>Velog 계정 이름만 입력하세요 (@ 제외)</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={references?.instagram || ''}
                    placeholder="Instagram"
                  />
                  <label for="instagram">Instagram</label>
                  <p>instagram 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="twitter"
                    name="twitter"
                    value={references?.twitter || ''}
                    placeholder="Twitter"
                  />
                  <label for="twitter">Twitter</label>
                  <p>Twitter(X) 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="facebook"
                    name="facebook"
                    value={references?.facebook || ''}
                    placeholder="Facebook"
                  />
                  <label for="facebook">Facebook</label>
                  <p>Facebook 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="leadme"
                    name="leadme"
                    value={references?.leadme || ''}
                    placeholder="LeadMe"
                  />
                  <label for="leadme">LeadMe</label>
                  <p>LeadMe 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="brunch"
                    name="brunch"
                    value={references?.brunch || ''}
                    placeholder="Brunch"
                  />
                  <label for="brunch">Brunch</label>
                  <p>Brunch 계정 이름만 입력하세요 (@ 제외)</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="tistory"
                    name="tistory"
                    value={references?.tistory || ''}
                    placeholder="Tistory"
                  />
                  <label for="tistory">Tistory</label>
                  <p>Tistory 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="pinterest"
                    name="pinterest"
                    value={references?.pinterest || ''}
                    placeholder="Pinterest"
                  />
                  <label for="pinterest">Pinterest</label>
                  <p>Pinterest 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    value={references?.linkedin || ''}
                    placeholder="LinkedIn"
                  />
                  <label for="linkedin">LinkedIn</label>
                  <p>LinkedIn 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="dribble"
                    name="dribble"
                    value={references?.dribble || ''}
                    placeholder="Dribble"
                  />
                  <label for="dribble">Dribble</label>
                  <p>Dribble 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="text"
                    id="postype"
                    name="postype"
                    value={references?.postype || ''}
                    placeholder="Postype"
                  />
                  <label for="postype">Postype</label>
                  <p>Postype 계정 이름만 입력하세요</p>
                </div>
                <div class="field-group">
                  <input
                    type="url"
                    id="blog"
                    name="blog"
                    value={references?.blog || ''}
                    placeholder="블로그"
                  />
                  <label for="blog">블로그</label>
                  <p>블로그 주소 전체를 입력하세요 (https:// 포함)</p>
                </div>
                <div class="field-group">
                  <input
                    type="url"
                    id="homepage"
                    name="homepage"
                    value={references?.homepage || ''}
                    placeholder="홈페이지"
                  />
                  <label for="homepage">홈페이지</label>
                  <p>홈페이지 주소 전체를 입력하세요 (https:// 포함)</p>
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
