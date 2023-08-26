<script lang="ts">
  import type { LayoutData } from './$types';
  import LinkButton from '$lib/components/LinkButton.svelte';
  import { page } from '$app/stores';
  export let data: LayoutData;
</script>

<style lang="sass">
  @import 'lib/styles/_designSystem'
  
  nav.nav
    font-size: rem(16)
</style>

{#if data.user}
  <form method="POST" action="?/logout">
    <nav class="nav">
      <ol>
        <li
          class={$page.url.pathname === '/manages/settings' ||
          $page.url.pathname === '/manages/profile'
            ? 'item-parent-active'
            : 'item-parent-inactive'}
        >
          <LinkButton href="/manages/settings">유저정보</LinkButton>
          <ol>
            <li
              class={$page.url.pathname === '/manages/settings'
                ? 'item-child-active'
                : 'item-child-inactive'}
            >
              <LinkButton href="/manages/settings">로그인 정보</LinkButton>
            </li>
            <li
              class={$page.url.pathname === '/manages/profile'
                ? 'item-child-active'
                : 'item-child-inactive'}
            >
              <LinkButton href="/manages/profile">프로필 정보</LinkButton>
            </li>
          </ol>
        </li>
        <li
          class={$page.url.pathname === '/manages/military-service' ||
          $page.url.pathname === '/manages/education'
            ? 'item-parent-active'
            : 'item-parent-inactive'}
        >
          <LinkButton href="/manages/military-service">기본사항</LinkButton>
          <ol>
            <li
              class={$page.url.pathname === '/manages/military-service'
                ? 'item-child-active'
                : 'item-child-inactive'}
            >
              <LinkButton href="/manages/military-service">병역사항</LinkButton>
            </li>
            <li
              class={$page.url.pathname === '/manages/education'
                ? 'item-child-active'
                : 'item-child-inactive'}
            >
              <LinkButton href="/manages/education">학력사항</LinkButton>
            </li>
          </ol>
        </li>
        <li
          class={$page.url.pathname === '/manages/certificate' ||
          $page.url.pathname === '/manages/language' ||
          $page.url.pathname === '/manages/award' ||
          $page.url.pathname === '/manages/skill'
            ? 'item-parent-active'
            : 'item-parent-inactive'}
        >
          <LinkButton href="/manages/certificate">능력사항</LinkButton>
          <ol>
            <li
              class={$page.url.pathname === '/manages/certificate'
                ? 'item-child-active'
                : 'item-child-inactive'}
            >
              <LinkButton href="/manages/certificate">자격증</LinkButton>
            </li>
            <li
              class={$page.url.pathname === '/manages/language'
                ? 'item-child-active'
                : 'item-child-inactive'}
            >
              <LinkButton href="/manages/language">외국어능력</LinkButton>
            </li>
            <li
              class={$page.url.pathname === '/manages/award'
                ? 'item-child-active'
                : 'item-child-inactive'}
            >
              <LinkButton href="/manages/award">수상기록</LinkButton>
            </li>
            <li
              class={$page.url.pathname === '/manages/skill'
                ? 'item-child-active'
                : 'item-child-inactive'}
            >
              <LinkButton href="/manages/skill">보유기술</LinkButton>
            </li>
          </ol>
        </li>
        <li
          class={$page.url.pathname === '/manages/activity' ||
          $page.url.pathname === '/manages/career'
            ? 'item-parent-active'
            : 'item-parent-inactive'}
        >
          <LinkButton href="/manages/activity">활동사항</LinkButton>
          <ol>
            <li
              class={$page.url.pathname === '/manages/activity'
                ? 'item-child-active'
                : 'item-child-inactive'}
            >
              <LinkButton href="/manages/activity">대외활동</LinkButton>
            </li>
            <li
              class={$page.url.pathname === '/manages/career'
                ? 'item-child-active'
                : 'item-child-inactive'}
            >
              <LinkButton href="/manages/career">경력사항</LinkButton>
            </li>
          </ol>
        </li>
        <li
          class={$page.url.pathname === '/manages/reference' ||
          $page.url.pathname === '/manages/essay'
            ? 'item-parent-active'
            : 'item-parent-inactive'}
        >
          <LinkButton href="/manages/reference">추가정보</LinkButton>
          <ol>
            <li
              class={$page.url.pathname === '/manages/reference'
                ? 'item-child-active'
                : 'item-child-inactive'}
            >
              <LinkButton href="/manages/reference">소셜미디어/홈페이지</LinkButton>
            </li>
            <li
              class={$page.url.pathname === '/manages/essay'
                ? 'item-child-active'
                : 'item-child-inactive'}
            >
              <LinkButton href="/manages/essay">자기소개서</LinkButton>
            </li>
          </ol>
        </li>
        <li><LinkButton href="/">이력서보기</LinkButton></li>
        <li>
          <button type="submit" name="logout" value="true">로그아웃</button>
        </li>
      </ol>
    </nav>
  </form>
{/if}
<slot />
