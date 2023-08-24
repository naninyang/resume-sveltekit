<script lang="ts">
  import { onMount } from 'svelte';
  import type { LayoutData } from './$types';
  import { page } from '$app/stores';
  import LinkButton from '$lib/components/LinkButton.svelte';
  export let data: LayoutData;

  let currentRouterPath = '';

  onMount(() => {
    currentRouterPath = window.location.pathname;
  });

  function isCurrentRouter(paths: string[]): boolean {
    return paths.includes(currentRouterPath);
  }
</script>

<style lang="sass">
  @import 'lib/styles/_designSystem'
  
  nav
    font-size: rem(16)

  .item-parent
    &-active
      & > a
        font-weight: 700
        color: $hex-light

    &-inactive
      & > a
        font-weight: unset
        color: $rgba-light70
      & ol
        display: none

  .li-child
    &-active
      & a
        border-radius: rem(52)
        background-color: $hex-mint
        font-weight: 700
        color: $hex-dark

    &-inactive
      & a
        border-radius: unset
        background-color: unset
        font-weight: unset
        color: $hex-dark
</style>

{#if data.user}
  <form method="POST" action="?/logout">
    <nav class="nav">
      <ol>
        <li
          class="item-parent-{isCurrentRouter(['/manages/settings', '/manages/profile'])
            ? 'active'
            : 'inactive'}"
        >
          <LinkButton href="/manages/settings">유저정보</LinkButton>
          <ol>
            <li class="item-child-{isCurrentRouter(['/manages/settings']) ? 'active' : 'inactive'}">
              <LinkButton href="/manages/settings">로그인 정보</LinkButton>
            </li>
            <li class="item-child-{isCurrentRouter(['/manages/profile']) ? 'active' : 'inactive'}">
              <LinkButton href="/manages/profile">프로필 정보</LinkButton>
            </li>
          </ol>
        </li>
        <li
          class="item-parent-{isCurrentRouter(['/manages/military-service', '/manages/education'])
            ? 'active'
            : 'inactive'}"
        >
          <LinkButton href="/manages/military-service">기본사항</LinkButton>
          <ol>
            <li
              class="item-child-{isCurrentRouter(['/manages/military-service'])
                ? 'active'
                : 'inactive'}"
            >
              <LinkButton href="/manages/military-service">병역사항</LinkButton>
            </li>
            <li
              class="item-child-{isCurrentRouter(['/manages/education']) ? 'active' : 'inactive'}"
            >
              <LinkButton href="/manages/education">학력사항</LinkButton>
            </li>
          </ol>
        </li>
        <li
          class="item-parent-{isCurrentRouter([
            '/manages/certificate',
            '/manages/language',
            '/manages/award',
            '/manages/skill'
          ])
            ? 'active'
            : 'inactive'}"
        >
          <LinkButton href="/manages/certificate">능력사항</LinkButton>
          <ol>
            <li
              class="item-parent-{isCurrentRouter(['/manages/certificate'])
                ? 'active'
                : 'inactive'}"
            >
              <LinkButton href="/manages/certificate">자격증</LinkButton>
            </li>
            <li
              class="item-parent-{isCurrentRouter(['/manages/language']) ? 'active' : 'inactive'}"
            >
              <LinkButton href="/manages/language">외국어능력</LinkButton>
            </li>
            <li class="item-parent-{isCurrentRouter(['/manages/award']) ? 'active' : 'inactive'}">
              <LinkButton href="/manages/award">수상기록</LinkButton>
            </li>
            <li class="item-parent-{isCurrentRouter(['/manages/skill']) ? 'active' : 'inactive'}">
              <LinkButton href="/manages/skill">보유기술</LinkButton>
            </li>
          </ol>
        </li>
        <li
          class="item-parent-{isCurrentRouter(['/manages/activity', '/manages/career'])
            ? 'active'
            : 'inactive'}"
        >
          <LinkButton href="/manages/activity">활동사항</LinkButton>
          <ol>
            <li
              class="item-parent-{isCurrentRouter(['/manages/activity']) ? 'active' : 'inactive'}"
            >
              <LinkButton href="/manages/activity">대외활동</LinkButton>
            </li>
            <li class="item-parent-{isCurrentRouter(['/manages/career']) ? 'active' : 'inactive'}">
              <LinkButton href="/manages/career">경력사항</LinkButton>
            </li>
          </ol>
        </li>
        <li
          class="item-parent-{isCurrentRouter(['/manages/reference', '/manages/essay'])
            ? 'active'
            : 'inactive'}"
        >
          <LinkButton href="/manages/reference">추가정보</LinkButton>
          <ol>
            <li
              class="item-parent-{isCurrentRouter(['/manages/reference']) ? 'active' : 'inactive'}"
            >
              <LinkButton href="/manages/reference">소셜미디어/홈페이지</LinkButton>
            </li>
            <li class="item-parent-{isCurrentRouter(['/manages/essay']) ? 'active' : 'inactive'}">
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
